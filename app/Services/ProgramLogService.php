<?php

namespace App\Services;

use App\Models\GpfWeeklyProgramLog;
use App\Repositories\ProgramLogRepository;

class ProgramLogService
{
    protected $programLogRepository;

    /**
     * Summary of __construct
     * @param \App\Repositories\ProgramLogRepository $programLogRepository
     */
    public function __construct(ProgramLogRepository $programLogRepository)
    {
        $this->programLogRepository = $programLogRepository;
    }



    /**
     * Log the program as it will replace weekly for archive purposes
     * @param array $data
     * @return \App\Models\GpfWeeklyProgramLog | null
     */
    public function create(array $data): GpfWeeklyProgramLog | null
    {
        return $this->programLogRepository->create($data);
    }

    /**
     * Get week number of program
     * @param int $userId
     * @return int
     */
    public function getWeekNumberById(Int $userId): int
    {
        return $this->programLogRepository->getWeekNumberById($userId);
    }


    /**
     * Summary of getTrialProgramByDay
     * @param mixed $day
     * @return \App\Models\GpfWeeklyProgramLog|null
     */
    public function getTrialProgramByDay($day): GpfWeeklyProgramLog|null
    {
        return $this->programLogRepository->getTrialProgramByDay($day);
    }

    /**
     * Get the date program was created
     * @param int $userId
     * @return string
     */
    public function getDateProgramCreated(int $userId): string
    {
        return $this->programLogRepository->getDateProgramCreated($userId);
    }
}
