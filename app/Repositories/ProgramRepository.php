<?php

namespace App\Repositories;

use App\Models\GpfWeeklyProgram;

class ProgramRepository
{
    protected $program;

    public function __construct(GpfWeeklyProgram $program)
    {
        $this->program = $program;
    }

    /**
     * Create new set of weekly program for trainee with the
     * @param array $programs Array or set of weekly programs in 7 json objects
     * @return void
     */
    public function create($programs): void
    {
        if (is_array($programs)) {
            foreach ($programs as $program) {
                $this->program->create($program);
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
        return $this->program
            ->where('user_id', $userId)
            ->where('day', $day)
            ->first();
    }

    /**
     * Delete the existing program by the given user id
     * @param mixed $userId
     * @return bool|null
     */
    public function delete($userId)
    {
        return $this->program
            ->where('user_id', $userId)
            ->delete();
    }

    /**
     * Get program by ID
     * @param mixed $userId
     * @return GpfWeeklyProgram|null
     */
    public function find(Int $userId): GpfWeeklyProgram|null
    {
        return $this->program->where('user_id', $userId)->first();
    }
}
