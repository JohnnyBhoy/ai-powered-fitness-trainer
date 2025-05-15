<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MealController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        // Simulated meal data (replace with DB calls later)
        $meals = [
            'Breakfast' => 'Oatmeal with berries and eggs',
            'Snack (Morning)' => 'Greek yogurt and almonds',
            'Lunch' => 'Grilled chicken with brown rice and broccoli',
            'Snack (Afternoon)' => 'Protein shake',
            'Dinner' => 'Salmon, quinoa, and mixed salad',
        ];

        $messages = [
            ['sender' => 'Coach', 'text' => 'Don’t skip breakfast!'],
            ['sender' => 'You', 'text' => 'Just had my salmon dinner!'],
        ];

        return Inertia::render('Meals/MealPage', [
            'meals' => $meals,
            'messages' => $messages,
        ]);
    }
}

