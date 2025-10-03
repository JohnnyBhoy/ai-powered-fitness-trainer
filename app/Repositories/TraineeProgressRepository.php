<?php

namespace App\Repositories;

use App\Models\GpfTraineeProgress;
use Illuminate\Database\Eloquent\Collection;

class TraineeProgressRepository
{
    protected $progress;

    public function __construct(GpfTraineeProgress $progress)
    {
        $this->progress = $progress;
    }

    /**
     * Get all progress records for a specific trainee, ordered by week ascending.
     *
     * @param int $userId
     * @return Collection
     */
    public function getProgressByUser(int $userId): Collection
    {
        return $this->queryByUser($userId)
            ->orderBy('week', 'asc')
            ->get();
    }

    /**
     * Get the latest progress record for a specific trainee.
     *
     * @param int $userId
     * @return GpfTraineeProgress|null
     */
    public function getLatestProgressByUser(int $userId): ?GpfTraineeProgress
    {
        return $this->queryByUser($userId)
            ->orderByDesc('week')
            ->first();
    }

    /**
     * Calculate the weight difference between current weight and recorded weight.
     *
     * @param int $userId
     * @param float|int $currentWeight
     * @return float|int
     */
    public function getNewWeight(int $userId, float|int $currentWeight): float|int
    {
        $latestWeight = $this->queryByUser($userId)
            ->orderByDesc('week')
            ->value('weight_lbs');

        if ($latestWeight === null) {
            return 0;
        }

        return $currentWeight - $latestWeight;
    }

    /**
     * Summary of queryByUser
     * @param int $userId
     * @return GpfTraineeProgress
     */
    private function queryByUser(int $userId)
    {
        return $this->progress->where('user_id', $userId);
    }
}
