<?php

namespace App\Jobs;

use App\Services\ProgramService;
use App\Services\UserService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CreateWeeklyProgram implements ShouldQueue
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
    public function handle(ProgramService $programService, UserService $userService): void
    {
        $user = $userService->show($this->userId);

        if (!$user) {
            return;
        }

        $programService->create($user);
    }
}
