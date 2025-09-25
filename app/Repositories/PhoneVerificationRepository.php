<?php

namespace App\Repositories;

use App\Models\GpfPhoneVerification;

class PhoneVerificationRepository
{
    protected $phoneVerification;

    public function __construct(GpfPhoneVerification $phoneVerification)
    {
        $this->phoneVerification = $phoneVerification;
    }

    /**
     * Summary of create
     * @param array $data
     * @return GpfPhoneVerification
     */
    public function create($data)
    {
        return  $this->phoneVerification->create($data);
    }

    /**
     * Summary of show
     * @param mixed $id
     * @return GpfPhoneVerification|null
     */
    public function show($id)
    {
        return $this->phoneVerification->where('user_id', $id)
            ->first();
    }

    /**
     * Summary of update
     * @param mixed $id
     * @return bool
     */
    public function update($id)
    {
        return $this->phoneVerification->where('user_id', $id)
            ->update(['is_verified' => 1]);
    }

    /**
     * Update OTP when resend otp is clicked
     * @param int $userId
     * @param int $newOtp
     * @return bool
     */
    public function updateOtp($userId, $newOtp): bool
    {
        return $this->phoneVerification->where('user_id', $userId)
            ->update(['otp' => $newOtp]);
    }
}
