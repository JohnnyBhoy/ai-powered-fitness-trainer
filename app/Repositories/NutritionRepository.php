<?php

namespace App\Repositories;

use App\Models\GpfNutritionPlan;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class NutritionRepository
{
    protected $nutrition;

    public function __construct(GpfNutritionPlan $nutrition)
    {
        $this->nutrition = $nutrition;
    }


    /**
     * Create weekly nutrition plan
     * @param mixed $plans
     * @return void
     */
    public function create($plans): void
    {
        if (is_array($plans)) {
            foreach ($plans as $plan) {
                $this->nutrition->create($plan);
            }
        }
    }

    /**
     * Find the weekly nutrition using the
     * @param int $userId
     * @return GpfNutritionPlan|null
     */
    public function find(int $userId)
    {
        return $this->nutrition->where('user_id', $userId)->first();
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

    /**
     * Summary of getAll
     * @return array of Data
     */
    public function getAll(): array
    {
        return DB::table('users as u')
            ->leftJoin('gpf_nutrition_plan_logs as l', 'u.id', '=', 'l.user_id')
            ->select(
                'u.id as userId',
                'u.first_name',
                'u.last_name',
                'u.email',
                'l.week_number',
                'l.nutrition_plan',
                'l.id',
                'l.created_at',
            )
            ->where('u.is_active', 1)
            ->where('u.role', 3)
            ->get()
            ->toArray();
    }
}
