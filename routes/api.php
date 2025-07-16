<?php

use App\Http\Controllers\ConsentController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\WorkoutTrainerController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PromoController;

Route::post('/sms', [WorkoutTrainerController::class, 'handleIncomingSms']);  // Handle SMS replies
Route::get('/subscriptions', [SubscriptionController::class, 'getValues']);

Route::post('/consent', [ConsentController::class, 'store']);

//SMS Test
//Route::post('/send-sms/{to}/{message}', [WorkoutTrainerController::class, 'sendSms']);

//PROMO CODE
Route::post('/promocode/apply', [PromoController::class, 'update']);
