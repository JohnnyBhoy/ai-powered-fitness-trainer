<?php

namespace App\Http\Controllers;

use App\Jobs\CreateWeeklyNutrition;
use App\Models\NutritionMeal;
use App\Services\NutritionLogService;
use App\Services\NutritionService;
use App\Services\UserService;
use App\Support\HelperFunctions;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NutritionController extends Controller
{
    protected $nutritionService;
    protected $nutritionLogService;
    protected $userService;
    protected $helper;

    /**
     * Return Daily Nutrition Plan for the Trainee
     * @param \App\Services\NutritionService $nutritionService
     */
    public function __construct(
        NutritionService $nutritionService,
        UserService $userService,
        HelperFunctions $helper,
        NutritionLogService $nutritionLogService,
    ) {
        $this->nutritionService = $nutritionService;
        $this->userService = $userService;
        $this->helper = $helper;
        $this->nutritionLogService = $nutritionLogService;
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
     * Generate Weekly Program
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, UserService $userService)
    {
        $userId  = $request->input('user_id');

        try {
            CreateWeeklyNutrition::dispatch($userId);

            $nutrition = $this->nutritionLogService->getNutritionData($userId);

            return response()->json([
                'success' => true,
                'data' => $nutrition,
                'user_id' => $userId,
                'message' => 'Nutrition plan generated successfully.',
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
