<?php

namespace App\Http\Controllers;

use App\Services\BiometricService;
use App\Services\MessageService;
use App\Services\NutritionService;
use App\Services\ProgramService;
use App\Services\SubscriptionService;
use App\Services\UserService;
use App\Support\HelperFunctions;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class StripePaymentController extends Controller
{
    protected $workoutController;
    protected $helperFunctions;
    protected $messageService;
    protected $programService;
    protected $biometricService;
    protected $subscriptionService;
    protected $userService;
    protected $nutritionService;

    public function __construct(
        WorkoutTrainerController $workoutController,
        HelperFunctions $helperFunctions,
        MessageService $messageService,
        ProgramService $programService,
        BiometricService $biometricService,
        SubscriptionService $subscriptionService,
        UserService $userService,
        NutritionService $nutritionService,
    ) {
        $this->workoutController = $workoutController;
        $this->helperFunctions = $helperFunctions;
        $this->messageService = $messageService;
        $this->programService = $programService;
        $this->biometricService = $biometricService;
        $this->subscriptionService = $subscriptionService;
        $this->userService = $userService;
        $this->nutritionService = $nutritionService;
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
        // Get the session details id, user id and amount
        $sessionId = $request->query('session_id');
        $userId = $request->query('user_id');
        $amount = $request->query('amount') ?: 1;

        // Abort if no session found
        if (!$sessionId) {
            abort(400, 'Missing session_id');
        }

        // Get stripe config up
        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            // Get user session
            $session = Session::retrieve($sessionId);
            $user = $this->userService->show($userId);
            $welcomeMessage = $this->messageService->getWelcomeMessageOnSubscription($amount);

            // Update subscription trial = $1  / premium = $49
            $this->helperFunctions->updateSubscriptionOnPaymentSuccess($session);

            // Polulate conversation with greetings to trainee
            $this->helperFunctions->createInitialConversation($userId, $welcomeMessage);

            // Send welcome sms via twilio
            //$this->messageService->sendSms($user->phone_number, $welcomeMessage);

            // Create weekly nutrition plan for trainee
            $this->nutritionService->create($user);

            // Create weekly program on premium subscription
            if ((string)$amount === '49') {
                $this->programService->create($user);
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
        // Prepate line of product
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

        // Check payment mode
        if ($mode === 'subscription') {
            $lineItem['price_data']['recurring'] = [
                'interval' => 'month',
                'interval_count' => 1,
            ];
        }

        try {
            // Create session
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
     * Product to be select when user subscribe
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
