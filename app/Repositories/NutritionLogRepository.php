<?php

namespace App\Repositories;

use App\Models\GpfNutritionPlanLog;
use Carbon\Carbon;

class NutritionLogRepository
{
    protected $nutritionLog;

    public function __construct(GpfNutritionPlanLog $nutritionLog)
    {
        $this->nutritionLog = $nutritionLog;
    }

    /**
     * Summary of logNutritionPlan
     * @param array $data
     * @return GpfNutritionPlanLog |null
     */
    public function create($data): GpfNutritionPlanLog|null
    {
        try {
            $existing = $this->nutritionLog->where('user_id', $data['user_id'])
                ->whereDate('created_at', Carbon::today())
                ->first();

            if (!$existing) {
                return $this->nutritionLog->create($data);
            }
        } catch (\Throwable $th) {
            throw $th;
        }

        return null;
    }

    /**
     * Summary of getWeekNumber
     * @param int $userId
     * @return int
     */
    public static function getWeekNumber(Int $userId): Int
    {
        $latestPlan = GpfNutritionPlanLog::where('user_id', $userId)
            ->orderByDesc('week_number')
            ->first();

        return $latestPlan ? $latestPlan->week_number  + 1 : 1;
    }

    /**
     * Retrieve program data
     * @param int $userId
     */
    public function getNutritionData(Int $userId)
    {
        return $this->nutritionLog->where('user_id', $userId)
            ->orderByDesc('week_number')
            ->first();
    }
}
