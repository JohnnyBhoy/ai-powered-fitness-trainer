<?php

namespace App\Repositories;

use App\Models\GpfPhoneVerification;

class PhoneVerificationRepository
{
    /**
     * Summary of create
     * @param mixed $userId
     * @param mixed $otp
     * @return GpfPhoneVerification
     */
    public function create($userId, $otp)
    {
        return  GpfPhoneVerification::create([
            'user_id' => $userId,
            'otp' => $otp,
            'is_verified' => 0
        ]);
    }

    /**
     * Summary of show
     * @param mixed $id
     * @return GpfPhoneVerification|null
     */
    public function show($id)
    {
        return GpfPhoneVerification::where('user_id', $id)->first();
    }

    /**
     * Summary of update
     * @param mixed $id
     * @return bool
     */
    public function update($id)
    {
        return GpfPhoneVerification::where('user_id', $id)
            ->update(['is_verified' => 1]);
    }
}
