<?php

namespace App\Jobs;

use App\Services\NutritionService;
use App\Services\ProgramService;
use App\Services\UserService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class CreateWeeklyNutrition implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $userId;

    /**
     * Create new job instance
     * @param int $userId
     */
    public function __construct(int $userId)
    {
        $this->userId = $userId;
    }

    /**
     * Execute the job
     * @param int $userId
     * @return void
     */
    public function handle(NutritionService $nutritionService, UserService $userService): void
    {
        Log::info('CreateWeeklyNutrition Job started', ['userId' => $this->userId]);

        $user = $userService->show($this->userId);

        Log::info('Fetched user object', ['user' => $user]);

        if (!$user) {
            return;
        }

        $nutritionService->create($user);
    }
}
