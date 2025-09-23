<?php

namespace App\Services;

use App\Models\GpfFitnessProgram;
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
     * @return \App\Models\GpfFitnessProgram | null
     */
    public function create(array $data): GpfFitnessProgram | null
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
     * @return \App\Models\GpfFitnessProgram|null
     */
    public function getTrialProgramByDay($day): GpfFitnessProgram|null
    {
        return $this->programLogRepository->getTrialProgramByDay($day);
    }
}
