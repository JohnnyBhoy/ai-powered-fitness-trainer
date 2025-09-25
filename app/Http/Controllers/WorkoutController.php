<?php

namespace App\Http\Controllers;

use App\Services\ProgramService;
use App\Services\TrialProgramService;
use App\Services\UserService;
use App\Support\HelperFunctions;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkoutController extends Controller
{
    protected $programService;
    protected $trialProgramService;
    protected $userService;
    protected $helper;

    public function __construct(
        ProgramService $programService,
        TrialProgramService $trialProgramService,
        HelperFunctions $helper,
        UserService $userService
    ) {
        $this->programService = $programService;
        $this->trialProgramService = $trialProgramService;
        $this->helper = $helper;
        $this->userService = $userService;
    }

    public function index(Request $request)
    {
        $userId = auth()->user()->id;
        $user = $this->userService->show($userId);
        $isTrial = $user->subscription == 'trial';
        $daySinceCreated = $this->helper->getDaysSinceAccountCreated($user->created_at);

        try {
            if ($isTrial) {
               $todaysWorkoutProgram =  $this->trialProgramService->find($userId);
            } else {
                $todaysWorkoutProgram = $this->programService->getProgramByDay($userId, $daySinceCreated);
            }
        } catch (\Throwable $th) {
            throw $th;
        }

        return Inertia::render('Trainee/GpfTrainee/DailyProgram', [
            'program' => $todaysWorkoutProgram,
        ]);
    }
}
