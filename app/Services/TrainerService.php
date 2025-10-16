<?php

namespace App\Services;

use App\Repositories\TrainerRepository;
use Illuminate\Database\Eloquent\Collection;

class TrainerService
{
    protected $trainerRepository;

    public function __construct(TrainerRepository $trainerRepository)
    {
        $this->trainerRepository = $trainerRepository;
    }

    /**
     * Summary of all
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllTrainers(): Collection
    {
        return $this->trainerRepository->all();
    }

    /**
     * Create Trainer
     * @param array $data
     */
    public function store(array $data)
    {
        return $this->trainerRepository->store($data);
    }
}
