<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;
use App\Services\BiometricService;
use App\Services\MessageService;
use App\Services\ProgramService;
use App\Services\SubscriptionService;
use App\Support\HelperFunctions;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class StripePaymentController extends Controller
{
    protected $workoutController;
    protected $helperFunctions;
    protected $messageService;
    protected $user;
    protected $programService;
    protected $biometricService;
    protected $subscriptionService;

    public function __construct(
        WorkoutTrainerController $workoutController,
        HelperFunctions $helperFunctions,
        MessageService $messageService,
        UserRepository $user,
        ProgramService $programService,
        BiometricService $biometricService,
        SubscriptionService $subscriptionService,
    ) {
        $this->workoutController = $workoutController;
        $this->helperFunctions = $helperFunctions;
        $this->messageService = $messageService;
        $this->user = $user;
        $this->programService = $programService;
        $this->biometricService = $biometricService;
        $this->subscriptionService = $subscriptionService;
    }

    /**
     *
     * Checkout page
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function checkout()
    {
        return view('stripe.checkout');
    }

    /**
     * Create a Stripe Checkout session for the user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function createSession(Request $request)
    {
        $userId = (int) $request->get('user_id', 0);
        $amount = (int) $request->get('amount', 1);

        $products = $this->getProductData();

        $product = $products[$amount] ?? $products[1];

        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            if ($amount === 1) {
                $this->subscriptionService->create($userId, $amount);
            } else {
                $this->subscriptionService->updateSubscriptionToPremium($userId);
            }

            $session = $this->createPaymentSession(
                $userId,
                $amount,
                $product['mode'],
                $product['name'],
                $product['description'],
                $product['unit_amount']
            );

            $this->subscriptionService->updatePaymentData($session, $userId, $product['name']);

            if (empty($session->url)) {
                return redirect()->route('checkout')->withErrors('Unable to create payment session.');
            }

            return redirect($session->url);
        } catch (\Exception $e) {
            \Log::error('Stripe createSession error: ' . $e->getMessage(), [
                'user_id' => $userId,
                'amount' => $amount,
            ]);
            return redirect()->route('checkout')->withErrors('There was a problem creating your payment session. Please try again.');
        }
    }

    /**
     * Summary of success
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Contracts\View\View|\Illuminate\Http\RedirectResponse
     */
    public function success(Request $request)
    {
        $sessionId = $request->query('session_id');
        $userId = $request->query('user_id');
        $amount = $request->query('amount') ?: 1;

        if (!$sessionId) {
            abort(400, 'Missing session_id');
        }

        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            $session = Session::retrieve($sessionId);

            $phoneNumber = $this->biometricService->getPhoneNumberById($userId);

            $welcomeMessage = $this->messageService->getWelcomeMessageOnSubscription($amount);

            $this->helperFunctions->updateSubscriptionOnPaymentSuccess($session);
            $this->helperFunctions->createInitialConversation($userId, $welcomeMessage);
            $this->messageService->sendSms($phoneNumber, $welcomeMessage);

            $user = $this->user->getUserDataByPhoneNumber($phoneNumber);

            // Log program and plan if user subscribed to premium else send daily update
            if ((string)$amount === '49') {
                $this->programService->create($user);
            } else {
                $this->messageService->sendDailyUpdateForTrialProgram($user, 1, 'trial');
            }

            return view('stripe.success');
        } catch (\Exception $e) {
            return redirect()->route('checkout')->withErrors('Payment verification failed.');
        }
    }

    /**
     * Summary of cancel
     * @return \Illuminate\Contracts\View\View
     */
    public function cancel()
    {
        return view('stripe.cancel');
    }

    /**
     * Create a Stripe payment session.
     *
     * @param int $userId
     * @param int $amount
     * @param string $mode
     * @param string $name
     * @param string $description
     * @param int $unitAmount
     * @return \Stripe\Checkout\Session
     */
    private function createPaymentSession($userId, $amount, $mode, $name, $description, $unitAmount): Session
    {
        $lineItem = [
            'quantity' => 1,
            'price_data' => [
                'currency' => 'USD',
                'product_data' => [
                    'name' => $name,
                    'description' => $description,
                ],
                'unit_amount' => $unitAmount,
            ],
        ];

        if ($mode === 'subscription') {
            $lineItem['price_data']['recurring'] = [
                'interval' => 'month',
                'interval_count' => 1,
            ];
        }

        try {
            return Session::create([
                'line_items' => [$lineItem],
                'mode' => $mode,
                'success_url' => route('success') . "?session_id={CHECKOUT_SESSION_ID}&user_id=$userId&amount=$amount",
                'cancel_url' => route('checkout'),
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Summary of getProductData
     * @return array{description: string, mode: string, name: string, unit_amount: int[]}
     */
    public function getProductData()
    {
        return [
            1 => [
                'name' => 'Go Peaf Fit 5-Day Challenge',
                'description' => 'For just $1, you’re getting 5 days of structure, accountability, and real results. No guesswork, no gimmicks—just a proven plan to jumpstart your transformation.',
                'unit_amount' => 100,
                'mode' => 'payment',
            ],
            49 => [
                'name' => 'Go Peaf Fit 1-on-1 Coaching',
                'description' => 'Access to real human coaching and personalized plans for $49/month.',
                'unit_amount' => 4900,
                'mode' => 'subscription',
            ],
        ];
    }
}
