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
     * @param int $pageNumber
     * @param int $perPage
     * @return  Response
     */
    public function indexOfGpfTrainees(Int $pageNumber = 0, Int $perPage = 10)
    {
        try {
            $result =  $this->userService->getPaginateGoPeakFitUsers($pageNumber, $perPage);
        } catch (\Throwable $th) {
            throw $th;
        }

        return Inertia::render('Trainee/GpfTrainee/GpfTrainee', [
            'data' => $result,
        ]);
    }

    /**
     * Table page for Non Gopeakfit Trainees
     * @param int $pageNumber
     * @param int $perPage
     * @return  Response
     */
    public function indexOfTrainees(Int $pageNumber, Int $perPage)
    {
        try {
            $result =  $this->getPaginateNonGoPeakFitUsers($pageNumber, $perPage);
        } catch (\Throwable $th) {
            throw $th;
        }

        return Inertia::render('NonGpfTrainee/Index', [
            'data' => $result,
        ]);
    }

    /**
     * Table page for Non Gopeakfit Trainees
     * @param int $pageNumber
     * @param int $perPage
     * @return  Response
     */
    public function getPaginateTrainers(Int $pageNumber, Int $perPage)
    {
        try {
            $result =  $this->getPaginatedGoPeakFitUsers($pageNumber, $perPage);
        } catch (\Throwable $th) {
            throw $th;
        }

        return Inertia::render('Trainers/Index', [
            'data' => $result,
        ]);
    }
    //Trainees Page
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
