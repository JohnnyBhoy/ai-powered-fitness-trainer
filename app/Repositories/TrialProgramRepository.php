<?php

namespace App\Repositories;

use App\Models\GpfFiveDaysProgram;

class TrialProgramRepository
{
    protected $trialProgram;

    public function __construct(GpfFiveDaysProgram $trialProgram)
    {
        $this->trialProgram = $trialProgram;
    }

    /**
     * Get active trial program based on day
     * @param mixed $day
     * @return \App\Models\GpfFiveDaysProgram|null
     */
    public function find($day): GpfFiveDaysProgram|null
    {
        return $this->trialProgram->where('day', $day)->first();
    }
}
