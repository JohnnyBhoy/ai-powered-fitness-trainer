<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class TraineeProgressController extends Controller
{
    public function index()
    {
        $trainees = User::with([
            'biometric',
            'progress' => function ($query) {
                $query->orderBy('recorded_at', 'desc');
            }
        ])
            ->where('role', 3)
            ->get();

        return inertia('Admin/TraineeProgress/Index', [
            'trainees' => $trainees,
        ]);
    }
}
