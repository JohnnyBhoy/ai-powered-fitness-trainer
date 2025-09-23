<?php

namespace App\Repositories;

use App\Models\GpfFitnessProgram;
use Carbon\Carbon;

class ProgramLogRepository
{
    protected $programLog;

    public function __construct(GpfFitnessProgram $programLog)
    {
        $this->programLog = $programLog;
    }

    /**
     * Log the program as it will replace weekly for archive purposes
     * @param array $data
     * @return \App\Models\GpfFitnessProgram | null
     */
    public function create(array $data): GpfFitnessProgram | null
    {
        try {
            $existing = $this->programLog->where('user_id', $data['userId'])
                ->whereDate('created_at', Carbon::today())
                ->first();

            if (!$existing) {
                return $this->programLog->create($data);
            }
        } catch (\Throwable $th) {
            throw $th;
        }

        return null;
    }

    /**
     * Get week number of program
     * @param int $userId
     * @return int
     */
    public function getWeekNumberById(Int $userId): int
    {
        $weekNumber = $this->programLog->where('user_id', $userId)
            ->select('week_number')
            ->orderByDesc('week_number')
            ->value('week_number');

        return $weekNumber ? $weekNumber + 1 : 1;
    }

    /**
     * Summary of getTrialProgramByDay
     * @param mixed $day
     * @return GpfFitnessProgram|null
     */
    public function getTrialProgramByDay($day)
    {
        return $this->programLog->where('day', $day)->first();
    }
}
