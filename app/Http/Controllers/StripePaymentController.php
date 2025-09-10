<?php

namespace App\Http\Controllers;

use App\Models\GpfSubscription;
use App\Repositories\MessageRepository;
use App\Repositories\UserRepository;
use App\Support\HelperFunctions;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class StripePaymentController extends Controller
{
    protected $workoutController;
    protected $helperFunctions;
    protected $message;
    protected $user;

    public function __construct(WorkoutTrainerController $workoutController, HelperFunctions $helperFunctions, MessageRepository $message, UserRepository $user)
    {
        $this->workoutController = $workoutController;
        $this->helperFunctions = $helperFunctions;
        $this->message = $message;
        $this->user = $user;
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
     * Summary of createSession
     * @param \Illuminate\Http\Request $request
     */
    public function createSession(Request $request)
    {
        $userId = $request->get('user_id') ?? 0;
        $amount = $request->get('amount') ?? 1;
        $productName =  $amount == 1 ? 'Go Peaf Fit 5-Day Challenge' : 'Go Peaf Fit 1-on-1 Coaching';
        $productDescription =   $amount == 1 ? 'For just $1, you’re getting 5 days of structure, accountability, and real results. No guesswork, no gimmicks—just a proven plan to jumpstart your transformation.' : 'Access to real human coaching and personalized plans for $49/month.';
        $unitAmount = $amount == 1 ? 100 : 4900;
        $mode = $amount == 1 ? 'payment' : 'subscription';

        Stripe::setApiKey(config('services.stripe.secret'));

        // Trial Payment
        if ($amount == 1) {
            // Log payment transactions to gpf_subscriptions table
            $this->logPaymentTransaction($userId, $amount);

            $session = $this->createPaymentSession($userId, $amount, $mode, $productName, $productDescription, $unitAmount);
        } else {
            // Regular Subscription (49)
            $session = $this->createPaymentSession($userId, $amount, $mode, $productName, $productDescription, $unitAmount);

            //Update to premium
            $this->updateSubscriptionToPremium($userId);
        }

        // Store the important payment details in db
        $this->updatePaymentData($session, $userId, $productName);

        return redirect($session->url);
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

        // Get the user phone number
        $phoneNumber = $this->helperFunctions->getPhoneNumberById($userId);

        if (!$sessionId) {
            abort(400, 'Missing session_id');
        }

        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            $session = Session::retrieve($sessionId);
            $welcomeMessage = "Welcome to GoPeakFit! 🙌 We're grateful to have you on board. Day 1 of your 5-Day Trial starts now — and I’m here to guide you. Let’s crush your goals together. You’ve got this! 💪";

            // Update your subscription table
            $this->helperFunctions->updateSubscriptionOnPaymentSuccess($session);

            // Create first conversation
            $this->helperFunctions->createInitialConversation($userId, $welcomeMessage);

            // Send welcome sms to user phone number
            $this->message->sendSms($phoneNumber, $welcomeMessage);

            // Send 1st day on 5-day trial program
            $user = $this->user->getUserDataByPhoneNumber($phoneNumber);
            $this->message->sendDailyUpdateForTrialProgram($user, 1, 'trial');

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
     * Summary of logPaymentTransaction
     * @param mixed $userId
     * @param mixed $amount
     * @return GpfSubscription
     */
    private function logPaymentTransaction($userId, $amount): GpfSubscription
    {
        return  GpfSubscription::create([
            'user_id' => $userId,
            'subscription' => 'trial',
            'amount' => $amount,
            'quantity' => 1,
            'total_amount' => $amount,
            'payment_status' => 'pending',
            'payment_type' => 'card',
            'status' => 'pending',
            'currency' => 'usd',
            'session_id' => null,
            'payment_intent_id' => null,
            'days_left' => 5,
        ]);
    }

    /**
     * Summary of createPaymentSession
     * @param mixed $userId
     * @param mixed $amount
     * @return \Stripe\Checkout\Session
     */
    private function createPaymentSession($userId, $amount, $mode, $name, $description, $unitAmount): Session
    {
        try {
            return  Session::create([
                'line_items' => [
                    [
                        'price_data' => [
                            'currency' => 'USD',
                            'product_data' => [
                                'name' => $name,
                                'description' => $description,
                            ],
                            'unit_amount' => $unitAmount,
                        ],
                        'quantity' => 1,
                    ],
                ],
                'mode' => $mode,
                'success_url' => route('success') . "?session_id={CHECKOUT_SESSION_ID}&user_id=$userId&amount=$amount",
                'cancel_url' => route('checkout'),
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Summary of updateSubscriptionToPremium
     * @param mixed $userId
     * @return bool
     */
    private function updateSubscriptionToPremium($userId): bool
    {
        return GpfSubscription::where('user_id', $userId)->update(['subscription' => 'premium']);
    }

    /**
     * Summary of updatePaymentData
     * @param mixed $session
     * @param mixed $userId
     * @param mixed $productName
     * @return bool
     */
    private function updatePaymentData($session, $userId, $productName): bool
    {
        $stripePaymentData = [
            'session_id' => $session->id,
            'currency' => $session->currency,
            'product_name' => $productName,
            'status' => $session->status,
            'amount' => $session->amount_total,
        ];

        return GpfSubscription::where('user_id', $userId)->update($stripePaymentData);
    }
}
