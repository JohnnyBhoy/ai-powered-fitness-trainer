<?php

namespace App\Http\Controllers;

use App\Models\GpfBiometric;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TraineeController extends Controller
{
    /**
     * Summary of index
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Trainee/Dashboard');
    }

    /**
     * Update strictness level in trainee
     * @param Request $request HttpRequest
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        $userId = $request->get('user_id');
        $strictnessLevel = $request->get('strictness_level');

        try {
            $update = GpfBiometric::where('user_id', $userId)
                ->update([
                    'strictness_level' => $strictnessLevel
                ]);
        } catch (\Throwable $th) {
            throw $th;
        }

        return response()->json([
            'success' => true,
            'data' => $update,
            'status' => 200,
        ]);
    }
}
