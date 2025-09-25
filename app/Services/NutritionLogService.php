<?php

namespace App\Services;

use App\Repositories\NutritionLogRepository;

class NutritionLogService
{
    protected $nutritionLogRepository;

    public function __construct(NutritionLogRepository $nutritionLogRepository)
    {
        $this->nutritionLogRepository = $nutritionLogRepository;
    }

    /**
     * Summary of create
     * @param int $userId
     * @param int $weekNumber
     * @param string $nutritionPlan
     * @return \App\Models\GpfNutritionPlanLog|null
     */
    public function create(Int $userId, Int $weekNumber, String $nutritionPlan)
    {
        $data = [
            'user_id' => $userId,
            'week_number' => $weekNumber,
            'nutrition_plan' => $nutritionPlan,
        ];

        return $this->nutritionLogRepository->create($data);
    }

    /**
     * Summary of getWeekNumber
     * @param int $userId
     * @return int
     */
    public function getWeekNumber(Int $userId): Int
    {
        return $this->nutritionLogRepository->getWeekNumber($userId);
    }
}
