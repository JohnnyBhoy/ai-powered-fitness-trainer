<?php

use App\Http\Controllers\AIChatController;
use App\Http\Controllers\ConsentController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\WorkoutTrainerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StripePaymentController;

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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {return Inertia::render('Dashboard');})->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/progess', [ProfileController::class, 'destroy'])->name('progress');
    Route::get('/conversation', [ProfileController::class, 'destroy'])->name('conversation');
    Route::get('/workout', [WorkoutController::class, 'index'])->name('workout');
    Route::get('/meals', [MealController::class, 'index'])->name('meals');
    Route::get('/progress', [ProgressController::class, 'index'])->name('progress');
});


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
Route::post('/sms', [WorkoutTrainerController::class, 'handleIncomingSms']);  // Handle SMS replies
Route::get('/send-encouragement', [WorkoutTrainerController::class, 'sendWorkoutEncouragement']);  // Trigger 3x day SMS

// Twilio proof of consent
Route::get('/consent', function () {
  return Inertia::render('ConsentForm');
})->name('consent.form');

require __DIR__.'/auth.php';
