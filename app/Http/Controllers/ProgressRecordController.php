<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;

class ProgressRecordController extends Controller
{
    /**
     * Summary of index
     * @param \App\Models\User $trainee
     * @return \Inertia\Response
     */
    public function index(User $trainee)
    {
        $records = $trainee->progressRecords()
            ->orderBy('recorded_at', 'desc')
            ->get();

        return Inertia::render('Admin/Progress/Index', [
            'trainee' => $trainee,
            'records' => $records,
        ]);
    }

    /**
     * Summary of store
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\User $trainee
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request, User $trainee)
    {
        $data = $request->validate([
            'recorded_at' => 'required|date',
            'weight_lbs' => 'required|numeric|min:1',
            'body_fat_percent' => 'nullable|numeric|min:0|max:100',
            'muscle_mass_lbs' => 'nullable|numeric|min:0',
            'waist_cm' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string|max:500',
        ]);

        $trainee->progressRecords()->create($data);

        return back()->with('success', 'Progress record added successfully!');
    }
}
