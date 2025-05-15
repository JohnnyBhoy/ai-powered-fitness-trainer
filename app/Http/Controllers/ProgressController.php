<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgressController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        // Simulated progress data — replace with DB queries
        $progress = [
            'workoutsCompleted' => 18,
            'mealsLogged' => 34,
            'startingWeight' => 82,
            'currentWeight' => 78.5,
            'goalWeight' => 75,
        ];

        $messages = [
            ['sender' => 'Coach', 'text' => 'Great job! Down 3.5kg already! 🎉'],
            ['sender' => 'You', 'text' => 'Thanks! Feeling stronger every week.'],
        ];

        return Inertia::render('Progress/ProgressPage', [
            'progress' => $progress,
            'messages' => $messages,
        ]);
    }
}

