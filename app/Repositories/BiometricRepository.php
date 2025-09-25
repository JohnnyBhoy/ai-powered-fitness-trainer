<?php

namespace App\Repositories;

use App\Models\GpfBiometric;

class BiometricRepository
{

    protected $biometric;

    public function __construct(GpfBiometric $biometric)
    {
        $this->biometric = $biometric;
    }

    /**
     * Summary of create
     * @param array $data
     * @return GpfBiometric
     */
    public function create($data): GpfBiometric
    {
        return $this->biometric->create($data);
    }

    /**
     * Get phone number by user id
     * @param int $userId
     */
    public function getPhoneNumberById(int $userId)
    {
        return $this->biometric->where('user_id', $userId)
            ->value('phone_number');
    }
}
