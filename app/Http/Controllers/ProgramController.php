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
        $programs = GpfFiveDaysProgram::all();

        $users = User::select(DB::raw('DATEDIFF(CURDATE(), DATE(created_at)) as days_ago'), DB::raw('COUNT(*) as count'))
            ->where('role', 3)
            ->whereNull('trainer_id')
            ->where('created_at', '>=', Carbon::now()->subDays(5)->startOfDay())
            ->groupBy('days_ago')
            ->orderBy('days_ago')
            ->get();

        $dayCounts = collect(range(1, 5))->mapWithKeys(function ($day) use ($users) {
            $count = $users->firstWhere('days_ago', $day)['count'] ?? 0;
            return [$day => $count];
        });


        return Inertia::render('Programs/Index', [
            'programs' => $programs,
            'freeTrialTraineesCountByDays' => $dayCounts,
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
