<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Api\PromoController;
use App\Http\Controllers\NutritionPlanController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\ProgressRecordController;
use App\Http\Controllers\TraineeController;
use App\Http\Controllers\TrainerController;
use App\Http\Controllers\WorkoutTrainerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StripePaymentController;
use App\Http\Controllers\TraineeProgressController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/registration', function () {
    return Inertia::render('Register');
})->name('registers');

Route::get('/privacy-policy', function () {
    return Inertia::render('Privacy/Index');
})->name('privacy-policy');

Route::get('/terms-and-conditions', function () {
    return Inertia::render('Terms/Index');
})->name('terms-and-conditions');

// Stripe payment
Route::get('/checkout', [StripePaymentController::class, 'checkout'])->name('checkout');
Route::post('/session', [StripePaymentController::class, 'createSession'])->name('session');
Route::get('/success', [StripePaymentController::class, 'success'])->name('success');
Route::get('/cancel', [StripePaymentController::class, 'cancel'])->name('cancel');


/*
|--------------------------------------------------------------------------
| Web Portal for AI Workout Bot
|--------------------------------------------------------------------------
|
| This route is for web portal simulator of Workout bot
| This will act as test of sms based expert ai workout
| trainer
|
*/
/** Workout trainer bot */
Route::get('/send-encouragement', [WorkoutTrainerController::class, 'sendWorkoutEncouragement']);  // Trigger 3x day SMS

// Twilio proof of consent
Route::get('/consent', function () {
    return Inertia::render('ConsentForm');
})->name('consent.form');

//30-Day Promo Code
Route::get('promocode', [PromoController::class, 'index'])->name('promo.challenge');



//Admin Route
Route::get('/admin/login', [AdminController::class, 'showLoginForm'])->name('admin.login');
Route::post('/admin/login', [AdminController::class, 'login'])->name('admin.login.submit');

//Routing for GoPeakFit Trainees
Route::middleware(['auth', 'role:3'])->prefix('/trainee')->group(function () {
    Route::get('/dashboard', [TraineeController::class, 'index'])->name('dashboard');
});

//Routing for GoPeakFit Trainees
Route::middleware(['auth', 'role:2'])->prefix('/trainer')->group(function () {
    Route::get('/dashboard', [TrainerController::class, 'index'])->name('trainer.dashboard');
    Route::get('/trainees', [TrainerController::class, 'show'])->name('trainer.trainees');
});


//Routing for GoPeakFitAdmin
Route::middleware(['auth', 'role:1'])->prefix('/admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/gpf-trainees', [AdminController::class, 'indexOfGpfTrainees'])->name('admin.gpf-trainees');
    Route::get('/trainers', [AdminController::class, 'indexOfTrainers'])->name('admin.trainers');
    Route::get('/non-gpf-trainees', [AdminController::class, 'indexOfNonGpfTrainees'])->name('admin.trainees');
    Route::get('/trainers/create', [TrainerController::class, 'create'])->name('admin.trainer.create');
    Route::post('/trainers/store', [TrainerController::class, 'store'])->name('admin.trainers.store');

    // Program and workouts
    Route::get('/five-days-trail', [ProgramController::class, 'index'])->name('admin.five-days-trials');
    Route::get('/trainees-in-trial-by-day/{id}', [ProgramController::class, 'show'])
        ->name('admin.trainees-in-trial-by-day.show');
    Route::patch('/programs/{program}', [ProgramController::class, 'update'])
        ->name('programs.update');

    // Nutrition plan
    Route::resource('nutrition-plans', NutritionPlanController::class);

    // Progress tracking
     Route::get('/progress-tracking', [TraineeProgressController::class, 'index'])
        ->name('trainee-progress.index');
});


require __DIR__ . '/auth.php';
