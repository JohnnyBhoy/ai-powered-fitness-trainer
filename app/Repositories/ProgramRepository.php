<?php

namespace App\Repositories;

use App\Models\GpfFitnessProgram;
use App\Models\GpfWeeklyProgram;
use Carbon\Carbon;

class ProgramRepository
{
    protected $program;

    public function __construct(GpfWeeklyProgram $program)
    {
        $this->program = $program;
    }

    /**
     * Summary of createWeeklyProgram
     * @param mixed $userId
     * @param mixed $programs
     * @param mixed $weekNumber
     * @return void
     */
    public function create($userId, $programs, $weekNumber): void
    {
        // Replace new set of weekly program
        if ($weekNumber > 1) {
            $this->program->where('user_id', $userId)->delete();
        }

        if (is_array($programs)) {
            foreach ($programs as $data) {
                $this->program->create($data);
            }
        }
    }

    /**
     * @param mixed $userId
     * @param mixed $day
     * @return GpfWeeklyProgram|null
     */
    public function getProgramByDay(Int $userId, Int $day): GpfWeeklyProgram|null
    {
        return $this->program->where('user_id', $userId)
            ->where('day', $day)
            ->first();
    }
}
