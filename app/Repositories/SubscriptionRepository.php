<?php

namespace App\Repositories;

use App\Models\GpfSubscription;

class SubscriptionRepository
{
    protected $subscription;

    /**
     * Summary of __construct
     * @param \App\Models\GpfSubscription $subscription
     */
    public function __construct(GpfSubscription $subscription)
    {
        $this->subscription = $subscription;
    }


    /**
     * Summary of create
     * @param mixed $userId
     * @param mixed $amount
     * @return GpfSubscription
     */
    public function create($userId, $amount)
    {
        return $this->subscription->create([
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
     * Summary of updateDaysLeftSinceAccountCreated
     * Run every day to update the days old of user since he created his account
     * @param mixed $userId
     * @param mixed $trialDays
     * @param mixed $daysSinceAccountCreated
     * @return bool
     */
    public function update($userId, $trialDays, $daysSinceAccountCreated)
    {
        return $this->subscription->where('user_id', $userId)
            ->update(['days_left' => $trialDays - $daysSinceAccountCreated]);
    }


    /**
     * Summary of updateSubscriptionToPremium
     * @param mixed $userId
     * @return bool
     */
    public function updateSubscriptionToPremium($userId): bool
    {
        return  $this->subscription->where('user_id', $userId)->update(['subscription' => 'premium']);
    }

    /**
     * Summary of updatePaymentData
     * @param mixed $session
     * @param mixed $userId
     * @param mixed $productName
     * @return bool
     */
    public function updatePaymentData($session, $userId, $productName): bool
    {
        $stripePaymentData = [
            'session_id' => $session->id,
            'currency' => $session->currency,
            'product_name' => $productName,
            'status' => $session->status,
            'amount' => $session->amount_total,
        ];

        return  $this->subscription->where('user_id', $userId)->update($stripePaymentData);
    }
}
