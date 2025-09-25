<?php

namespace App\Services;

use App\Repositories\BiometricRepository;

class BiometricService
{
    protected $biometricRepository;

    public function __construct(BiometricRepository $biometricRepository)
    {
        $this->biometricRepository = $biometricRepository;
    }

    /**
     * Summary of create
     * @param array $data
     * @return \App\Models\GpfBiometric
     */
    public function create($data)
    {
        return $this->biometricRepository->create($data);
    }

    /**
     * Get phone number by user id
     * @param int $userId
     */
    public function getPhoneNumberById(int $userId)
    {
        return $this->biometricRepository->getPhoneNumberById($userId);
    }
}
