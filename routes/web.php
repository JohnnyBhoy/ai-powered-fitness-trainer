<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Api\PromoController;
use App\Http\Controllers\BiometricController;
use App\Http\Controllers\GoalsController;
use App\Http\Controllers\NutritionController;
use App\Http\Controllers\NutritionPlanController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\TraineeController;
use App\Http\Controllers\TrainerController;
use App\Http\Controllers\TrialProgramController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StripePaymentController;
use App\Http\Controllers\TraineeProgressController;
use App\Http\Controllers\WorkoutController;


/*
|--------------------------------------------------------------------------
| Web Portal Homepage or Landing Page
|--------------------------------------------------------------------------
|
| Homepag url or index url of the application
| Login and registration form included
| For guest users / web visitors
|
*/

Route::get('/', function () {
    $user = auth()->user();

    // Check if there are user's signed in
    if ($user) {
        $role = $user->role;
        $route = 'dashboard';

        if ($role == 3) {
            $route = 'dashboard';
        }

        if ($role == 2) {
            $route = 'trainer.dashboard';
        }

        if ($role == 1) {
            $route = 'admin.dashboard';
        }

        return redirect()->route($route);
    }

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


/*
|--------------------------------------------------------------------------
| Web Portal for Stripe Payment
|--------------------------------------------------------------------------
|
| This is routes is for users who will subscribed to our plans
| Checkout payment transactions
|
*/
Route::get(
    '/checkout',
    [StripePaymentController::class, 'checkout']
)->name('checkout');

Route::post('/session', [StripePaymentController::class, 'createSession'])
    ->name('session');

Route::get('/success', [StripePaymentController::class, 'success'])
    ->name('success');

Route::get('/cancel', [StripePaymentController::class, 'cancel'])
    ->name('cancel');


/*
|--------------------------------------------------------------------------
| Web Portal for Consent and Promocode only for guest users
|--------------------------------------------------------------------------
|
*/
Route::get('/consent', function () {
    return Inertia::render('ConsentForm');
})->name('consent.form');

Route::get('promocode', [PromoController::class, 'index'])
    ->name('promo.challenge');


/*
|--------------------------------------------------------------------------
| Web Portal for GoPeakFit Admin Login
|--------------------------------------------------------------------------
|
| This route is for web portal admin dashboard, programs
| Trainees and trainer, trial programs and
| Nutrition plans
|
*/
Route::get('/admin/login', action: [AdminController::class, 'showLoginForm'])
    ->name('admin.login');

Route::post('/admin/login', [AdminController::class, 'login'])
    ->name('admin.login.submit');


/*
|--------------------------------------------------------------------------
| Web Portal for GoPeakFit Trainees
|--------------------------------------------------------------------------
|
| This route is for web portal trainee
| Dashboard, Weekly Program, Weekly Nutrition Plan
| Daily Program and daily nutrition plan, Settings
|
*/
Route::middleware(['auth', 'role:3'])->prefix('/trainee')->group(function () {
    Route::get('/dashboard', [TraineeController::class, 'index'])
        ->name('dashboard');

    Route::get('/workout', [WorkoutController::class, 'index'])
        ->name('trainee.workout');

    Route::get('/nutrition', [NutritionController::class, 'index'])
        ->name('trainee.nutrition');

    Route::get('/progress', [ProgressController::class, 'index'])
        ->name('trainee.progress');

    Route::get('/settings', [TraineeController::class, 'settings'])
        ->name('trainee.settings');
});


/*
|--------------------------------------------------------------------------
| Web Portal for GoPeakFit Trainer
|--------------------------------------------------------------------------
|
| This route is for web portal Trainer's dashboard, programs
| Trainees and trainer, trial programs and
| Nutrition plans
|
*/
Route::middleware(['auth', 'role:2'])->prefix('/trainer')->group(function () {
    Route::get('/dashboard', [TrainerController::class, 'index'])
        ->name('trainer.dashboard');

    Route::get('/trainees', [TrainerController::class, 'show'])
        ->name('trainer.trainees');
});


/*
|--------------------------------------------------------------------------
| Web Portal for GoPeakFit Admin
|--------------------------------------------------------------------------
|
| This route is for web portal admin dashboard, programs
| Trainees and trainer, trial programs and
| Nutrition plans
|
*/
Route::middleware(['auth', 'role:1'])->prefix('/admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'index'])
        ->name('admin.dashboard');

    Route::get('/gpf-trainees', [AdminController::class, 'indexOfGpfTrainees'])
        ->name('admin.gpf-trainees');

    Route::get('/trainers', [AdminController::class, 'indexOfTrainers'])
        ->name('admin.trainers');

    Route::get('/non-gpf-trainees', [AdminController::class, 'indexOfNonGpfTrainees'])
        ->name('admin.trainees');

    Route::get('/trainers/create', [TrainerController::class, 'create'])
        ->name('admin.trainer.create');

    Route::post('/trainers/store', [TrainerController::class, 'store'])
        ->name('admin.trainers.store');

    // Program and workouts
    Route::get('/five-days-trail', [TrialProgramController::class, 'index'])
        ->name('admin.five-days-trials');

    Route::get('/trainees-in-trial-by-day/{id}', [ProgramController::class, 'show'])
        ->name('admin.trainees-in-trial-by-day.show');

    Route::patch('/programs/{program}', [ProgramController::class, 'update'])
        ->name('programs.update');

    // Nutrition plan
    Route::resource('nutrition-plans', NutritionPlanController::class);

    // Progress tracking
    Route::get('/progress-tracking', [TraineeProgressController::class, 'index'])
        ->name('trainee-progress.index');

    Route::put('/update-user/{id}', [UserController::class, 'update'])
        ->name('admin.update.user');

    Route::put('/update-biometrics/{id}', [BiometricController::class, 'update'])
        ->name('admin.update.biometrics');

    Route::put('/update-goals/{id}', [GoalsController::class, 'update'])
        ->name('admin.update.goals');

    Route::get('/weekly-program', [ProgramController::class, 'all'])
        ->name('admin.program');
});


require __DIR__ . '/auth.php';
