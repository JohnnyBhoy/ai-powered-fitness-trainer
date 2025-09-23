<?php

namespace App\Services;

use App\Repositories\ProgramRepository;
use App\Support\ProgramHelper;

class ProgramService
{
    protected $programRepository;
    protected $programHelper;
    protected $aiService;
    protected $programLogService;

    public function __construct(
        ProgramRepository $programRepository,
        ProgramHelper $programHelper,
        AiService $aiService,
        ProgramLogService $programLogService
    ) {
        $this->programRepository = $programRepository;
        $this->programHelper = $programHelper;
        $this->aiService = $aiService;
        $this->programLogService = $programLogService;
    }

    /**
     * Create weekly program
     * @param mixed $user
     */
    public function create($user)
    {
        $systemPrompt = $this->programHelper->systemPrompt();
        $userPrompt = $this->programHelper->userPrompt($user);

        // Get response in string
        $response = $this->aiService->get($systemPrompt, $userPrompt);

        // Add program to fitness program to archive / log
        $weekNumber = $this->programLogService->getWeekNumberById($user->user_id);
        $data = [
            'user_id' => $user->user_id,
            'week_number' => $weekNumber,
            'program_data' => $response,
        ];
        $this->programLogService->create($data);

        // Extract json response to array (iterable create program by day)
        $programs = $this->programHelper->extractArrayOfDataInAiResponse($response);

        return $this->programRepository->create($user->user_id, $programs, $weekNumber);
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
}
