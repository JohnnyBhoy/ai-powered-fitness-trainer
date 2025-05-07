<?php

namespace App\Http\Controllers;

use App\Http\Requests\GoalRequest;
use App\Models\GpfGoals;

class GoalsController extends Controller
{
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
}
