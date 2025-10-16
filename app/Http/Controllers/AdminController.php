<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminLoginRequest;
use App\Services\UserService;
use App\Support\HelperFunctions;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{

    protected $userService;
    protected $helperFunctions;

    /**
     * Summary of __construct
     * @param \App\Services\UserService $userService
     * @param \App\Support\HelperFunctions $helperFunctions
     */
    public function __construct(UserService $userService, HelperFunctions $helperFunctions)
    {
        $this->userService = $userService;
        $this->helperFunctions = $helperFunctions;
    }

    /**
     * Summary of showLoginForm
     * @return \Inertia\Response
     */
    public function showLoginForm()
    {
        return Inertia::render('Admin/Login');
    }

    /**
     * Summary of login
     * @param \App\Http\Requests\AdminLoginRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function login(AdminLoginRequest $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password, 'role' => 1])) {
            return redirect()->route('admin.dashboard');
        }

        return back()->withErrors(['email' => 'Invalid credentials or not an admin.']);
    }

    /**
     * Summary of index
     * @return \Inertia\Response
     */
    public function index(): Response
    {
        try {
            return Inertia::render('Admin/Dashboard');
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Get the admin dashboard data
     */
    public function getAdminDashboardData()
    {
        try {
            return response()->json([
                'totalTrainees' => $this->userService->countGoPeakFitTrainees() + $this->userService->countTraineesAddedByTrainer(),
                'totalTrainers' => $this->userService->countTrainer(),
                'monthlyTrainees' => $this->getUserCountByMonthBaseOnRole(3, 1),
                'monthlyUsers' => $this->getUserCountByMonthBaseOnRole(3, null),
                'usersPercentageComparedLastMonth' => $this->userService->getUsersGrowthPercentage(),
                'gopeakfitTraineesPercentageComparedLastMonth' => $this->userService->getGpfTraineeGrowthPercentage(),
                'nonGopeakfitTraineesPercentageComparedLastMonth' => $this->userService->getNonGpfTraineeGrowthPercentage(),
                'trainersPercentageComparedLastMonth' => $this->userService->getTrainerGrowthPercentage(),
                'traineesPerStates' => $this->userService->getTraineesPerState(),
                'recentTrainees' => $this->userService->getRecentTrainees(8),
                'monthlyGpfTrainees' => $this->helperFunctions->getMonthlyUserCountByRole(3, null),
                'monthlyNonGpfTrainees' => $this->helperFunctions->getMonthlyUserCountByRole(3, 1),
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }


    //Counter based on role
    public function getUserCountByMonthBaseOnRole(Int $role, Int|null $trainerId)
    {
        try {
            // Query users created in the current year, grouped by month
            $allMonths = $this->helperFunctions->getMonthlyUserCountByRole($role, $trainerId);

            return response()->json($allMonths)->original;
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
