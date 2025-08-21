<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ConsentController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\WorkoutTrainerController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PromoController;
use App\Http\Controllers\TraineeController;

Route::post('/sms', [WorkoutTrainerController::class, 'handleIncomingSms']);  // Handle SMS replies
Route::get('/subscriptions', [SubscriptionController::class, 'getValues']);

Route::post('/consent', [ConsentController::class, 'store']);

//SMS Test
//Route::post('/send-sms/{to}/{message}', [WorkoutTrainerController::class, 'sendSms']);

//PROMO CODE
Route::post('/promocode/apply', [PromoController::class, 'update']);


// Api routes for rep-searcher's admin
Route::prefix('admin')->group(function () {
    Route::get('/get-gpf-trainees', [AdminController::class, 'indexOfGpfTrainees'])->name('admin.getGpfUsers');
    Route::get('/get-non-gpf-trainees', [AdminController::class, 'indexOfNonGpfTrainees'])->name('admin.getNonGpfUsers');
    Route::get('/get-trainers', [AdminController::class, 'indexOfTrainers'])->name('admin.getTrainers');
    Route::get('/trainee-update', [TraineeController::class, 'update'])->name('admin.trainee.update');
});
