<?php

namespace App\Services;

use App\Repositories\SubscriptionRepository;

class SubscriptionService
{
    protected $subscriptionRepository;

    public function __construct(SubscriptionRepository $subscriptionRepository)
    {
        $this->subscriptionRepository = $subscriptionRepository;
    }


    /**
     * Insert data to Gpf Subscription
     * @param mixed $userId
     * @param mixed $amount
     * @return \App\Models\GpfSubscription
     */
    public function create($userId, $amount)
    {
        return $this->subscriptionRepository->create($userId, $amount);
    }

    /**
     * Update subscription value
     * Run every day to update the days old of user since he created his account
     * @param mixed $userId
     * @param mixed $trialDays
     * @param mixed $daysSinceAccountCreated
     * @return bool
     */
    public function update($userId, $trialDays, $daysSinceAccountCreated)
    {
        return $this->subscriptionRepository->update($userId, $trialDays, $daysSinceAccountCreated);
    }

    /**
     * Summary of updateSubscriptionToPremium
     * @param mixed $userId
     * @return bool
     */
    public function updateSubscriptionToPremium($userId): bool
    {
        return $this->subscriptionRepository->updateSubscriptionToPremium($userId);
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
        return $this->subscriptionRepository->updatePaymentData($session, $userId, $productName);
    }
}
