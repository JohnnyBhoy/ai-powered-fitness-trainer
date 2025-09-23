<?php

namespace App\Services;

use App\Repositories\TraineeProgressRepository;

class TraineeProgressService
{
    protected $traineeProgressRepository;

    public function __construct(TraineeProgressRepository $traineeProgressRepository)
    {
        $this->traineeProgressRepository = $traineeProgressRepository;
    }

    /**
     * Summary of getNewWeight
     * @param mixed $id
     * @param mixed $currentWeight
     * @return float|int
     */
    public function getNewWeight($id, $currentWeight): float|int
    {
        return $this->traineeProgressRepository->getNewWeight($id, $currentWeight);
    }
}
