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
            $latestUsers  = $this->userService->getLatestUsers();
            $gpfUser =  $this->userService->countGoPeakFitTrainees();

            $trainerCount = $this->userService->countTrainer();
            $traineeCount = $this->userService->countTraineesAddedByTrainer();

            $monthlyGpfTrainerCount = $this->getUserCountByMonthBaseOnRole(3, null);
            $monthlyTrainerCount = $this->getUserCountByMonthBaseOnRole(2, 1);
            $monthlyTraineeCount = $this->getUserCountByMonthBaseOnRole(3, 1);

            return Inertia::render('Admin/Dashboard', [
                'latestUsers' => $latestUsers,
                'gpfUsersCount' => $gpfUser,
                'trainerCount' => $trainerCount,
                'traineeCount' => $traineeCount,
                'monthlyGpfTrainerCount' => $monthlyGpfTrainerCount,
                'monthlyTrainerCount' => $monthlyTrainerCount,
                'monthlyTraineeCount' => $monthlyTraineeCount,
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Table page for Gopeakfit Trainees
     * @param Request $request
     * @return  Response || Illuminate\Http\JsonResponse
     */
    public function indexOfGpfTrainees(Request $request): JsonResponse|Response
    {
        $pageNumber = $request->get('page_number') ?? 1;
        $perPage = $request->get('per_page') ?? 10;
        $strictnessLevel = $request->get('strictness_level') ?? 0;

        try {
            $result =  $this->userService->getPaginateGoPeakFitUsers($pageNumber, $perPage, $strictnessLevel);
        } catch (\Throwable $th) {
            throw $th;
        }

        if (request()->wantsJson() || $pageNumber != 1) {
            $this->jsonReturn($pageNumber, $result, $perPage);
        }

        return Inertia::render('Trainee/GpfTrainee/GpfTrainee', [
            'data' => $result,
        ]);
    }

    /**
     * Table page for Gopeakfit Trainees
     * @param Request $request
     * @return  Response || Illuminate\Http\JsonResponse
     */
    public function indexOfNonGpfTrainees(Request $request): JsonResponse|Response
    {
        $pageNumber = $request->get('page_number') ?? 1;
        $perPage = $request->get('per_page') ?? 10;
        $strictnessLevel = $request->get('strictness_level') ?? 0;

        try {
            $result =  $this->userService->getPaginateNonGoPeakFitUsers($pageNumber, $perPage, $strictnessLevel);
        } catch (\Throwable $th) {
            throw $th;
        }

        if (request()->wantsJson() || $pageNumber != 1) {
            $this->jsonReturn($pageNumber, $result, $perPage);
        }

        return Inertia::render('Trainee/NonGpfTrainee/NonGpfTrainee', [
            'data' => $result,
        ]);
    }

    /**
     * Table page for Trainers
     * @param Request $request
     * @return  Response || Illuminate\Http\JsonResponse
     */
    public function indexOfTrainers(Request $request): JsonResponse|Response
    {
        $pageNumber = $request->get('page_number') ?? 1;
        $perPage = $request->get('per_page') ?? 10;

        try {
            $result =  $this->userService->getPaginateTrainers($pageNumber, $perPage);
        } catch (\Throwable $th) {
            throw $th;
        }

        if (request()->wantsJson() || $pageNumber != 1) {
            $this->jsonReturn($pageNumber, $result, $perPage);
        }

        return Inertia::render('Trainer/Trainer', [
            'data' => $result,
        ]);
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

    /**
     * Summary of jsonReturn
     * @param mixed $pageNumber
     * @param mixed $result
     * @param mixed $perPage
     * @return JsonResponse
     */
    private function jsonReturn($pageNumber, $result, $perPage)
    {
        return response()->json([
            'success' => true,
            'data' => $result,
            'pagination' => [
                'page' => $pageNumber,
                'per_page' => $perPage,
                'total' => $result->total() ?? null, // if using LengthAwarePaginator
            ],
        ]);
    }
}
