<?php

namespace App\Http\Controllers;

use App\Services\TraineeProgressService;
use Inertia\Inertia;
use Inertia\Response;

class ProgressController extends Controller
{
    protected TraineeProgressService $progressService;

    public function __construct(TraineeProgressService $progressService)
    {
        $this->progressService = $progressService;
    }

    /**
     * Summary of index
     * @return \Inertia\Response
     */
    public function index(): Response
    {
        $userId = auth()->user()->id;
        $progress = $this->progressService->getAllProgress($userId);
        return Inertia::render('Trainee/GpfTrainee/WeeklyProgress', [
            'progress' => $progress,
        ]);
    }

    /**
     * Summary of latest
     * @param int $userId
     * @return Illuminate\Http\JsonResponse
     */
    public function latest()
    {
        $userId = auth()->user()->id;
        $latest = $this->progressService->getLatestProgress($userId);
        return response()->json($latest);
    }

    /**
     * Summary of weightChange
     * @param int $userId
     * @param float $currentWeight
     * @return Illuminate\Http\JsonResponse
     */
    public function weightChange(int $userId, float $currentWeight)
    {
        $change = $this->progressService->calculateWeightChange($userId, $currentWeight);
        return response()->json(['weight_change' => $change]);
    }
}
