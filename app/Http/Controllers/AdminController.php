<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{

    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function showLoginForm()
    {
        return Inertia::render('Admin/Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password, 'role' => 1])) {
            return redirect()->route('admin.dashboard');
        }

        return back()->withErrors(['email' => 'Invalid credentials or not an admin.']);
    }

    //Admin dashboard
    public function index(): Response
    {
        // Query users created on that exact date
        $latestUsers  = $this->userService->getLatestUsers();

        //GoPeakFit user without Trainer
        $gpfUser =  $this->userService->countGoPeakFitTrainees();

        // Get count of Trainee and Trainer
        $trainerCount = $this->userService->countTrainer();
        $traineeCount = $this->userService->countTraineesAddedByTrainer();

        //This is for chart data count in dashboard for GPF trainee, trainer and trainee added by trainer
        $monthlyGpfTrainerCount = $this->getUserCountByMonthBaseOnRole(3, null);
        $monthlyTrainerCount = $this->getUserCountByMonthBaseOnRole(2, 1);
        $monthlyTraineeCount = $this->getUserCountByMonthBaseOnRole(3, 1);

        // Render with Inertia
        return Inertia::render('Admin/Dashboard', [
            'latestUsers' => $latestUsers,
            'gpfUsersCount' => $gpfUser,
            'trainerCount' => $trainerCount,
            'traineeCount' => $traineeCount,
            'monthlyGpfTrainerCount' => $monthlyGpfTrainerCount,
            'monthlyTrainerCount' => $monthlyTrainerCount,
            'monthlyTraineeCount' => $monthlyTraineeCount,
        ]);
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

        // If API call (like "Load more"), return JSON
        if (request()->wantsJson() || $pageNumber != 1) {
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

        // Otherwise, render Inertia for the initial page
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

        // If API call (like "Load more"), return JSON
        if (request()->wantsJson() || $pageNumber != 1) {
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

        // Otherwise, render Inertia for the initial page
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

        // If API call (like "Load more"), return JSON
        if (request()->wantsJson() || $pageNumber != 1) {
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

        // Otherwise, render Inertia for the initial page
        return Inertia::render('Trainer/Trainer', [
            'data' => $result,
        ]);
    }

    //Counter based on role
    public function getUserCountByMonthBaseOnRole(Int $role, Int|null $trainerId)
    {
        $currentYear = Carbon::now()->year;

        // Query users created in the current year, grouped by month
        $query =  DB::table('users')
            ->select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as total'))
            ->where('role', $role)
            ->whereYear('created_at', $currentYear);

        // For GoPeakFit Users, not added by trainer
        if ($trainerId == null) {
            $query = $query->where('trainer_id', null);
        }

        // Final Query
        $usersByMonth = $query->groupBy(DB::raw('MONTH(created_at)'))
            ->pluck('total', 'month');

        // Create array for all 12 months initialized to 0
        $allMonths = collect(range(1, 12))->mapWithKeys(function ($monthNumber) use ($usersByMonth) {
            $monthName = Carbon::create()->month($monthNumber)->format('F');
            return [$monthName => $usersByMonth[$monthNumber] ?? 0];
        });

        return response()->json($allMonths)->original;
    }
}
