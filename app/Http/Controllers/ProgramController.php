<?php

namespace App\Http\Controllers;

use App\Models\GpfFiveDaysProgram;
use App\Models\GpfWeeklyProgram;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProgramController extends Controller
{
    /**
     * Show all program in DB
     * @return \Inertia\Response
     */
    public function all()
    {
        $programs = GpfWeeklyProgram::join('users', 'users.id', '=', 'gpf_weekly_programs.user_id')
            ->leftJoin('gpf_weekly_program_logs as gpl', 'users.id', '=', 'gpl.user_id')
            ->leftJoin('gpf_goals as g', 'users.id', '=', 'g.user_id')
            ->select('users.id', 'users.email', 'gpl.week_number', 'users.first_name', 'users.last_name', 'g.goal', 'gpf_weekly_programs.program_name', 'gpl.program_data', 'gpl.created_at')
            ->groupBy('users.id', 'users.email', 'gpl.week_number', 'users.first_name', 'users.last_name', 'g.goal', 'gpf_weekly_programs.program_name', 'gpl.program_data', 'gpl.created_at')
            ->get();

        try {
            return Inertia::render('Admin/Programs/WeeklyProgram', [
                'programs' => $programs,
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    /**
     * Summary of index
     * @return \Inertia\Response
     */
    public function index()
    {
        $today = Carbon::today();

        // Count trainees by the day they joined (Day 1 to Day 5)
        $traineeCounts = [];
        for ($day = 1; $day <= 5; $day++) {
            $targetDate = $today->copy()->subDays($day - 1);

            $traineeCounts["day_{$day}"] = User::where('role', 3)->whereDate('created_at', $targetDate)->count();
        }

        // Retrieve program details
        $program = GpfFiveDaysProgram::orderBy('day')->get();


        return Inertia::render('Admin/TraineeProgress/Programs/Index', [
            'programs' => $program,
            'freeTrialTraineesCountByDays' => $traineeCounts,
        ]);
    }

    /**
     * Summary of show
     * @param mixed $days
     * @return \Inertia\Response
     */
    public function show($days)
    {
        // Calculate the target day
        $targetDate = Carbon::today()->subDays($days);

        // Query users created exactly on that day
        $users = User::whereDate('created_at', $targetDate)
            ->where('role', 3)
            ->whereNull('trainer_id')
            ->latest()
            ->get();

        return Inertia::render('Admin/TraineesByDay', [
            'day'   => $days,
            'users' => $users,
        ]);
    }

    /**
     * Summary of update
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\GpfFiveDaysProgram $program
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, GpfFiveDaysProgram $program)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string:255'
        ]);

        try {
            $program->update($validated);
        } catch (\Throwable $th) {
            throw $th;
        }

        return redirect()
            ->back()
            ->with('success', 'Program updated successfully!');
    }
}
