<?php

namespace App\Services;

use App\Repositories\GoalRepository;

class GoalService
{
    private $goalRepository;

    public function __construct(GoalRepository $goalRepository)
    {
        $this->goalRepository  = $goalRepository;
    }

    /**
     * Summary of createGoal
     * @param array $data
     * @return \App\Models\GpfGoals
     */
    public function createGoal(array $data)
    {
        return $this->goalRepository->store($data);
    }

    /**
     * Get Goal By UserId
     * @param int $userId
     * @return \App\Models\GpfGoals
     */
    public function getGoal(int $userId)
    {
        return $this->goalRepository->show($userId);
    }
}
