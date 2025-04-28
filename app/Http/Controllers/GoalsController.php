<?php

namespace App\Http\Controllers;

use App\Http\Requests\GoalRequest;
use App\Models\Goals;

class GoalsController extends Controller
{
    public function store(GoalRequest $request)
    {
        $goal = Goals::create([
            ...$request->validated(),
        ]);

        return response()->json([
            'message' => 'Goals saved successfully!',
            'biometric' => $goal
        ]);
    }
}
