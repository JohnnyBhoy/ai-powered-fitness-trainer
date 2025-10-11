<?php

namespace App\Http\Controllers;

use App\Http\Requests\GoalRequest;
use App\Http\Requests\GoalsUpdateRequest;
use App\Models\GpfGoals;

class GoalsController extends Controller
{
    /**
     * Summary of store
     * @param \App\Http\Requests\GoalRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(GoalRequest $request)
    {
        $goal = GpfGoals::create([
            ...$request->validated(),
        ]);

        return response()->json([
            'message' => 'Goals saved successfully!',
            'biometric' => $goal
        ]);
    }

    /**
     * Update trainee's goals
     * @param \App\Http\Requests\GoalsUpdateRequest $request
     */
    public function update(GoalsUpdateRequest $request, int $id)
    {
        $validated = $request->validated();

        try {
            $user = GpfGoals::where('user_id', $id);

            $user->update($validated);

            return redirect()->back()->with('success', 'Goals updated successfully');
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
