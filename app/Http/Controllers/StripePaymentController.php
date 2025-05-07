<?php

namespace App\Http\Controllers;

use App\Models\GpfBiometric;
use App\Models\GpfMessage;
use App\Models\GpfSubscription;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class StripePaymentController extends Controller
{
    protected $workoutController;

    public function __construct(WorkoutTrainerController $workoutController)
    {
        $this->workoutController = $workoutController;
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

    // @phpstan-ignore-next-line
    public function createSession(Request $request)
    {
        $userId = $request->get('user_id') ?? 0;

        Stripe::setApiKey(config('services.stripe.secret'));


        // Log payment transactions to gpf_subscriptions table
        GpfSubscription::create([
            'user_id' => $userId,
            'subscription' => 'trial',
            'amount' => 1,
            'quantity' => 1,
            'total_amount' => 1,
            'payment_status' => 'pending',
            'payment_type' => 'card',
            'status' => 'pending',
            'currency' => 'usd',
            'session_id' => null,
            'payment_intent_id' => null,
            'days_left' => 5,
        ]);

        $session = Session::create([
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'USD',
                        'product_data' => [
                            'name' => 'Go Peaf Fit 5-Day Challenge',
                            'description' => 'For just $1, you’re getting 5 days of structure, accountability, and real results. No guesswork, no gimmicks—just a proven plan to jumpstart your transformation.'
                        ],
                        'unit_amount' => 100,
                    ],
                    'quantity' => 1,
                ],
            ],
            'mode' => 'payment',
            'success_url' => route('success') . '?session_id={CHECKOUT_SESSION_ID}&user_id=' . $userId,
            'cancel_url' => route('checkout'),
        ]);

        // Store the important payment details in db
        $stripePaymentData = [
            'session_id' => $session->id,
            'currency' => $session->currency,
            'product_name' => 'Go Peak Fit 5-Days Trial',
            'status' => $session->status,
            'amount' => $session->amount_total,
        ];

        GpfSubscription::where('user_id', $userId)->update($stripePaymentData);

        return redirect($session->url);
    }

    public function success(Request $request)
    {
        $sessionId = $request->query('session_id');
        $userId = $request->query('user_id');

        // Get the user phone number
        $phoneNumber = GpfBiometric::where('user_id', $userId)->value('phone_number');

        if (!$sessionId) {
            abort(400, 'Missing session_id');
        }

        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            $session = Session::retrieve($sessionId);
            $welcomeMessage = "Welcome to GoPeakFit! You’ve made the first move—now it's time to commit, grind, and grow. Every rep, meal, and choice matters. Stay focused, trust the process, and show up for yourself daily. This isn’t just a program—it’s your path to real, lasting change. Let’s make it count.";

            // Update your subscription table
            GpfSubscription::where('session_id', $session->id)->update([
                'payment_status' => $session->payment_status,
                'status' => $session->status,
                'payment_intent_id' => $session->payment_intent,
                'customer_id' => $session->customer ?? $session->created,
            ]);

            // Create first conversation
            GpfMessage::where('user_id', $userId)
                ->update(['conversations' => $welcomeMessage]);

            // Send welcome sms to user phone number
            $this->workoutController->sendSms($phoneNumber, $welcomeMessage);

            return view('stripe.success'); // your success page
        } catch (\Exception $e) {
            return redirect()->route('checkout')->withErrors('Payment verification failed.');
        }
    }

    public function cancel()
    {
        return view('stripe.cancel');
    }
}
