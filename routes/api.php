<?php

use App\Http\Controllers\WorkoutTrainerController;
use Illuminate\Support\Facades\Route;

Route::post('/sms', [WorkoutTrainerController::class, 'handleIncomingSms']);  // Handle SMS replies
