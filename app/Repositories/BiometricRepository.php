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
     * @param mixed $request
     * @return GpfBiometric
     */
    public function create($request)
    {
        return $this->biometric->create([
            ...$request->validated(),
        ]);
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
