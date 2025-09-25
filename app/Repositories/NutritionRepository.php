<?php

namespace App\Repositories;

use App\Models\GpfNutritionPlan;
use Illuminate\Database\Eloquent\Collection;

class NutritionRepository
{
    protected $nutrition;

    public function __construct(GpfNutritionPlan $nutrition)
    {
        $this->nutrition = $nutrition;
    }

    /**
     * Create weekly nutrition plan for trainee
     * @param array $data
     * @return GpfNutritionPlan
     */
    public function create($data)
    {
        return $this->nutrition->create($data);
    }

    /**
     * Remove nutrition plan by the given user id
     * @param int $userId
     * @return bool Success/failed deleting nutrition plan
     */
    public function delete($userId): bool|null
    {
        return $this->nutrition->where('user_id', $userId)->delete();
    }

    /**
     * Summary of getDailyPlan
     * @param int $userId
     * @param int $day
     * @return \Illuminate\Database\Eloquent\Collection<int, GpfNutritionPlan>
     */
    public function getDailyPlan(int $userId, int $day): Collection
    {
        return $this->nutrition->where('user_id', $userId)
            ->where('day_number', $day)
            ->get();
    }
}
