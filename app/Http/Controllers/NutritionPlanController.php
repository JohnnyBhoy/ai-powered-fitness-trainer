<?php

namespace App\Http\Controllers;

use App\Models\GpfNutritionPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NutritionPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $plans = GpfNutritionPlan::orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/NutritionPlans/Index', [
            'plans' => $plans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $data = $request->validate([
            'trainee_id' => 'required|exists:trainees,id',
            'calories' => 'required|integer',
            'protein_g' => 'required|numeric',
            'carbs_g' => 'required|numeric',
            'fats_g' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        return GpfNutritionPlan::create($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(GpfNutritionPlan $nutritionPlan)
    {
        return $nutritionPlan->load(['trainee', 'meals', 'supplements']);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GpfNutritionPlan $nutritionPlan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GpfNutritionPlan $nutritionPlan)
    {
        $nutritionPlan->update($request->all());
        return $nutritionPlan->fresh(['trainee', 'meals', 'supplements']);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GpfNutritionPlan $nutritionPlan)
    {
        $nutritionPlan->delete();
        return response()->noContent();
    }
}
