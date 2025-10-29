<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ConsentController;
use App\Http\Controllers\GoPeakFitTraineeController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\TrainerController;
use App\Http\Controllers\TrialProgramController;
use App\Http\Controllers\WorkoutTrainerController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PromoController;
use App\Http\Controllers\NonGoPeakFitTraineeController;
use App\Http\Controllers\NutritionController;
use App\Http\Controllers\TraineeController;

/*
|--------------------------------------------------------------------------
| API Portal for GoPeakFit SMS with Twilio Service
|--------------------------------------------------------------------------
|
| This routes consist of sms for trainee reply to daily update
| User subscription to get what trianee subscribed plan (trial or premium)
| Consent or user permission to particapate in program and promocode if applicable
|
*/

Route::post('/sms', [WorkoutTrainerController::class, 'handleIncomingSms'])
    ->name('incoming.sms');

Route::get('/subscriptions', [SubscriptionController::class, 'getValues'])
    ->name('user.subscriptions');

Route::post('/consent', [ConsentController::class, 'store'])
    ->name('user.consent');

Route::post('/promocode/apply', [PromoController::class, 'update'])
    ->name('promocode.apply');



/*
|--------------------------------------------------------------------------
| API Portal for GoPeakFit Admin
|--------------------------------------------------------------------------
|
| This is route for retrieving trainees (gopeakfit user or added manually by trainer)
| Route to Update trainee information
|
*/
Route::middleware(['auth:sanctum', 'role:1'])->prefix('admin')->group(function () {
    Route::get('/get-gpf-trainees', [GoPeakFitTraineeController::class, 'index'])
        ->name('admin.getGpfUsers');

    Route::get('/get-non-gpf-trainees', [NonGoPeakFitTraineeController::class, 'index'])
        ->name('admin.getNonGpfUsers');

    Route::get('/get-trainers', [TrainerController::class, 'index'])
        ->name('admin.getTrainers');

    Route::get('/trainee-update', [TraineeController::class, 'update'])
        ->name('admin.trainee.update');

    Route::get('/get-data', [AdminController::class, 'getAdminDashboardData'])
        ->name('admin.get.data');

    Route::put('/update-trial-programs', [TrialProgramController::class, 'update'])
        ->name('admin.trial.update');

    Route::post('/generate-weekly-program', [ProgramController::class, 'store'])
        ->name('admin.program.generate');

    Route::post('/generate-weekly-nutrition', [NutritionController::class, 'store'])
        ->name('admin.nutrition.generate');
});
