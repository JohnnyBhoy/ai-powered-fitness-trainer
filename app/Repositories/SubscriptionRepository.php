<?php

namespace App\Repositories;

use App\Models\GpfSubscription;

class SubscriptionRepository
{
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
        return GpfSubscription::where('user_id', $userId)
            ->update(['days_left' => $trialDays - $daysSinceAccountCreated]);
    }

}
