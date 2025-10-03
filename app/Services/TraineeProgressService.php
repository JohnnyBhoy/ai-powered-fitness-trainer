<?php

namespace App\Services;

use App\Repositories\TraineeProgressRepository;
use Illuminate\Database\Eloquent\Collection;
use App\Models\GpfTraineeProgress;

class TraineeProgressService
{
    protected TraineeProgressRepository $progressRepo;

    public function __construct(TraineeProgressRepository $progressRepo)
    {
        $this->progressRepo = $progressRepo;
    }

    /**
     * Get all progress records for a trainee.
     *
     * @param int $userId
     * @return Collection
     */
    public function getAllProgress(int $userId): Collection
    {
        return $this->progressRepo->getProgressByUser($userId);
    }

    /**
     * Get latest progress for a trainee.
     *
     * @param int $userId
     * @return GpfTraineeProgress|null
     */
    public function getLatestProgress(int $userId): ?GpfTraineeProgress
    {
        return $this->progressRepo->getLatestProgressByUser($userId);
    }

    /**
     * Calculate the weight difference for a trainee.
     *
     * @param int $userId
     * @param float|int $currentWeight
     * @return float|int
     */
    public function calculateWeightChange(int $userId, float|int $currentWeight): float|int
    {
        return $this->progressRepo->getNewWeight($userId, $currentWeight);
    }
}
