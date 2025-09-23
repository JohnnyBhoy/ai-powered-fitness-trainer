<?php

namespace App\Services;

use App\Repositories\TrialProgramRepository;

class TrialProgramService
{
    protected $trialProgramRepository;

    /**
     * Summary of __construct
     * @param \App\Repositories\TrialProgramRepository $trialProgramRepository
     */
    public function __construct(TrialProgramRepository $trialProgramRepository)
    {
        $this->trialProgramRepository = $trialProgramRepository;
    }

    /**
     * Get todays trial program based on day
     * @param mixed $day
     * @return \App\Models\GpfFiveDaysProgram|null
     */
    public function find($day)
    {
        return $this->trialProgramRepository->find($day);
    }
}
