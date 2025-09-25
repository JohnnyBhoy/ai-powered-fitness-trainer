<?php

namespace App\Services;

use App\Repositories\PhoneVerificationRepository;

class PhoneVerificationService
{
    protected $phoneVerificationRepository;

    public function __construct(PhoneVerificationRepository $phoneVerificationRepository)
    {
        $this->phoneVerificationRepository  = $phoneVerificationRepository;
    }


    /**
     * Create new phone verification with OTP(one time password)
     * @param array $data
     * @return \App\Models\GpfPhoneVerification
     */
    public function create($data)
    {
        return  $this->phoneVerificationRepository->create($data);
    }

    /**
     * Summary of show
     * @param mixed $id
     * @return \App\Models\GpfPhoneVerification|null
     */
    public function show($id)
    {
        return $this->phoneVerificationRepository->show($id);
    }

    /**
     * Summary of update
     * @param mixed $id
     * @return bool
     */
    public function update($id)
    {
        return $this->phoneVerificationRepository->update($id);
    }

    /**
     * Update OTP when resend otp is clicked
     * @param int $userId
     * @param int $newOtp
     * @return bool
     */
    public function updateOtp($userId, $newOtp): bool
    {
        return $this->phoneVerificationRepository->updateOtp($userId, $newOtp);
    }
}
