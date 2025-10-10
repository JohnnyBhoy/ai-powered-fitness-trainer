<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ConsentController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\TrialProgramController;
use App\Http\Controllers\WorkoutTrainerController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PromoController;
use App\Http\Controllers\TraineeController;
use App\Http\Controllers\UserController;

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
Route::prefix('admin')->group(function () {
    Route::get('/get-gpf-trainees', [AdminController::class, 'indexOfGpfTrainees'])
        ->name('admin.getGpfUsers');

    Route::get('/get-non-gpf-trainees', [AdminController::class, 'indexOfNonGpfTrainees'])
        ->name('admin.getNonGpfUsers');

    Route::get('/get-trainers', [AdminController::class, 'indexOfTrainers'])
        ->name('admin.getTrainers');

    Route::get('/trainee-update', [TraineeController::class, 'update'])
        ->name('admin.trainee.update');

    Route::get('/get-data', [AdminController::class, 'getAdminDashboardData'])
        ->name('admin.get.data');

    Route::put('/update-trial-programs', [TrialProgramController::class, 'update'])
        ->name('admin.trial.update');
});
