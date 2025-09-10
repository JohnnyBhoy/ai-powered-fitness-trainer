<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProgramUpdateRequest;
use App\Models\GpfFiveDaysProgram;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ProgramController extends Controller
{
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
