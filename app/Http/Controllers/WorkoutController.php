<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkoutController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        // Example static data — replace with real DB queries
        $workoutPlan = [
            'Monday' => 'Chest & Triceps',
            'Tuesday' => 'Back & Biceps',
            'Wednesday' => 'Rest',
            'Thursday' => 'Leg Day',
            'Friday' => 'Shoulders',
        ];

        $dietPlan = [
            'Breakfast' => 'Oats + eggs',
            'Lunch' => 'Chicken + rice',
            'Dinner' => 'Salmon + salad',
        ];

        $messages = [
            ['sender' => 'Coach', 'text' => 'Time for leg day!'],
            ['sender' => 'You', 'text' => 'Done with cardio 💪'],
        ];

        return Inertia::render('Workout/WorkoutPage', [
            'workoutPlan' => $workoutPlan,
            'dietPlan' => $dietPlan,
            'messages' => $messages,
        ]);
    }
}
