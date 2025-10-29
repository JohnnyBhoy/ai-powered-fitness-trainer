<?php

namespace App\Repositories;

use App\Models\GpfWeeklyProgramLog;
use Carbon\Carbon;

class ProgramLogRepository
{
    protected $programLog;

    public function __construct(GpfWeeklyProgramLog $programLog)
    {
        $this->programLog = $programLog;
    }

    /**
     * Log the program as it will replace weekly for archive purposes
     * @param array $data
     * @return \App\Models\GpfWeeklyProgramLog | null
     */
    public function create(array $data): GpfWeeklyProgramLog | null
    {
        try {
            $existing = $this->programLog->where('user_id', $data['user_id'])
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
     * Retrieve program data
     * @param int $userId
     */
    public function getProgramData(Int $userId)
    {
        return $this->programLog
            ->where('user_id', $userId)
            ->orderByDesc('week_number')
            ->first();
    }

    /**
     * Get week number of program
     * @param int $userId
     * @return int
     */
    public function getWeekNumberById(Int $userId): int
    {
        $weekNumber = $this->programLog
            ->where('user_id', $userId)
            ->orderByDesc('week_number')
            ->value('week_number');

        return $weekNumber ? $weekNumber + 1 : 1;
    }

    /**
     * Summary of getTrialProgramByDay
     * @param mixed $day
     * @return GpfWeeklyProgramLog|null
     */
    public function getTrialProgramByDay($day)
    {
        return $this->programLog->where('day', $day)->first();
    }

    /**
     * Get the date program was created
     * @param int $userId
     * @return string
     */
    public function getDateProgramCreated(int $userId): string
    {
        return $this->programLog->where('user_id', $userId)->value('created_at');
    }
}
