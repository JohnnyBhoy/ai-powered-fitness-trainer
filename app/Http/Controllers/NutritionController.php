<?php

namespace App\Http\Controllers;

use App\Models\NutritionMeal;
use App\Services\NutritionService;
use App\Services\UserService;
use App\Support\HelperFunctions;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NutritionController extends Controller
{
    protected $nutritionService;
    protected $userService;
    protected $helper;

    /**
     * Return Daily Nutrition Plan for the Trainee
     * @param \App\Services\NutritionService $nutritionService
     */
    public function __construct(
        NutritionService $nutritionService,
        UserService $userService,
        HelperFunctions $helper
    ) {
        $this->nutritionService = $nutritionService;
        $this->userService = $userService;
        $this->helper = $helper;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = auth()->user()->id;
        $user = $this->userService->show($userId);
        $daySinceCreated = $this->helper->getDaysSinceAccountCreated($user->created_at);

        try {
            $plan = $this->nutritionService->getDailyPlan($userId, $daySinceCreated);

            return Inertia::render('Trainee/GpfTrainee/NutritionPlan', [
                'plan' => $plan,
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show(NutritionMeal $nutritionMeal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(NutritionMeal $nutritionMeal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, NutritionMeal $nutritionMeal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NutritionMeal $nutritionMeal)
    {
        //
    }
}
