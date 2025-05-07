<?php

use App\Http\Controllers\AIChatController;
use App\Http\Controllers\WorkoutTrainerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/test', function (Request $request) {
    return response()->json(['message' => 'API is working']);
});

Route::post('/sms', [WorkoutTrainerController::class, 'handleIncomingSms']);  // Handle SMS replies
