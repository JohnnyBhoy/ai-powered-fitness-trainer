<?php

namespace App\Services;

use App\Jobs\CreateWeeklyNutrition;
use App\Jobs\CreateWeeklyProgram;
use App\Repositories\ProgramRepository;
use App\Support\ProgramHelper;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ProgramService
{
    protected $programRepository;
    protected $programHelper;
    protected $aiService;
    protected $programLogService;
    protected $userService;

    public function __construct(
        ProgramRepository $programRepository,
        ProgramHelper $programHelper,
        AiService $aiService,
        ProgramLogService $programLogService,
        UserService $userService,
    ) {
        $this->programRepository = $programRepository;
        $this->programHelper = $programHelper;
        $this->aiService = $aiService;
        $this->programLogService = $programLogService;
        $this->userService = $userService;
    }

    /**
     * Create weekly program
     * @param mixed $user
     * @return mixed
     */
    public function create($user)
    {
        $systemPrompt = $this->programHelper->systemPrompt();
        $userPrompt   = $this->programHelper->userPrompt($user);

        $weekNumber   = $this->programLogService->getWeekNumberById($user->userId);

        $maxRetries   = 3;
        $attempt      = 0;
        $programs     = [];
        $response     = null;

        while ($attempt < $maxRetries) {
            // Get AI response
            $response = $this->aiService->get($systemPrompt, $userPrompt);

            // Parse response into array
            $programs = $this->programHelper->extractArrayOfDataInAiResponse($response);

            // Stop if exactly 7 objects returned
            if (is_array($programs) && count($programs) === 7) {
                break;
            }

            $attempt++;
        }

        // Always log response for traceability
        $this->programLogService->create([
            'user_id'      => $user->userId,
            'week_number'  => $weekNumber,
            'program_data' => $response,
        ]);

        // Save only valid data
        if (is_array($programs) && count($programs) === 7) {
            //Remove the old weekly program
            $hasExistingProgram = $this->find($user->userId);
            
            if ($hasExistingProgram) {
                $this->delete($user->userId);
            }

            return $this->programRepository->create($programs);
        }

        // If retries exhausted, log warning
        \Log::warning("Failed to generate 7-day workout program for user {$user->userId} after {$attempt} attempts.");

        return null;
    }

    /**
     * Retrieve program by user id
     * @param int $userId Unique ID of the user
     * @return \App\Models\GpfWeeklyProgram|null
     */
    public function find(Int $userId)
    {
        return $this->programRepository->find($userId);
    }


    /**
     * Summary of getProgramByDay
     * @param int $userId
     * @param int $day
     * @return \App\Models\GpfWeeklyProgram|null
     */
    public function getProgramByDay(Int $userId, Int $day)
    {
        return $this->programRepository->getProgramByDay($userId, $day);
    }

    /**
     * Delete the existing program by the given user id
     * @param mixed $userId
     * @return bool|null
     */
    public function delete($userId): bool|null
    {
        return $this->programRepository->delete($userId);
    }

    /**
     * Create weekly program and nutrition plan
     * @return int
     */
    public function generateWeeklyProgramAndNutritionPlan(): int
    {
        $usersId = $this->userService->getActiveTraineesId();

        // Guard if no trainees found
        if (count($usersId) === 0 || empty($usersId)) {
            return 0;
        }

        // Check all trainees and create weekly program if 7-day or weekly program ended
        foreach ($usersId as $userId) {
            $dateProgramCreated = $this->programLogService->getDateProgramCreated($userId);

            $shouldGenerate = false;

            if (!$dateProgramCreated) {
                // No program yet
                $shouldGenerate = true;
            } elseif (Carbon::parse($dateProgramCreated)->addDays(7)->isPast()) {
                // Program expired after 7 days
                $shouldGenerate = true;
            }

            if ($shouldGenerate) {
                CreateWeeklyProgram::dispatch($userId);
                CreateWeeklyNutrition::dispatch($userId);

                Log::info("Program + Nutrition queued for user {$userId}");
            } else {
                Log::info("Skipped user {$userId} - program still active");
            }
        }

        return count($userId);
    }
}
