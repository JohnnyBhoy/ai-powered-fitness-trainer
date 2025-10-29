<?php

namespace App\Repositories;

use App\Models\GpfGoals;

class GoalRepository
{
    private $goal;

    public function __construct(GpfGoals $goal)
    {
        $this->goal = $goal;
    }

    /**
     * Create Goal
     * @param array $data
     * @return GpfGoals
     */
    public function store(array $data): GpfGoals
    {
        return $this->goal->create($data);
    }

    /**
     * Get Goal By UserId
     * @param int $userId
     * @return GpfGoals
     */
    public function show(int $userId)
    {
        return $this->goal->where('user_id', $userId)->first();
    }
}
