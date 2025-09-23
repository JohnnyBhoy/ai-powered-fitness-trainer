<?php

namespace App\Repositories;

use App\Models\TraineeProgress;

class TraineeProgressRepository
{
    protected $progress;

    public function __construct(TraineeProgress $progress)
    {
        $this->progress = $progress;
    }

    /**
     * Summary of getNewWeight
     * @param mixed $id
     * @param mixed $currentWeight
     * @return float|int
     */
    public function getNewWeight($id, $currentWeight): float|int
    {
        $newWeight = $this->progress->where('user_id', $id)->value('weight_lbs');

        return $currentWeight - $newWeight;
    }
}
