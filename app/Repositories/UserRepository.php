<?php

namespace App\Repositories;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserRepository
{
    protected $user;

    /**
     * Repository constructor
     * @param \App\Models\User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Summary of show
     * @param mixed $id
     * @return object|null
     */
    public function show($id)
    {
        return  DB::table('users as u')
            ->leftJoin('gpf_messages as gm', 'u.id', '=', 'gm.user_id')
            ->leftJoin('gpf_biometrics as b', 'u.id', '=', 'b.user_id')
            ->leftJoin('gpf_goals as g', 'u.id', '=', 'g.user_id')
            ->leftJoin('gpf_subscriptions as gs', 'u.id', '=', 'gs.user_id')
            ->where('u.id', $id)
            ->first();
    }
    /**
     * Summary of create
     * @param mixed $request
     * @return User
     */
    public function store($request): User
    {
        return $this->user->create([
            'first_name' => $request->firstName,
            'last_name'  => $request->lastName,
            'email'      => $request->email,
            'user_name'   => $request->username,
            'password'   => Hash::make($request->password),
        ]);
    }

    /**
     * Paginated Lists of GoPeakFit Users
     * @param  int $pageNumber Page number in table
     * @param  int $perPage     Rows to be shown per page in table
     * @param  int $strictnessLevel     Chill, Strict
     * @return LengthAwarePaginator
     */
    public function getPaginatedGoPeakFitUsers(Int $pageNumber, Int $perPage, Int $strictnessLevel): LengthAwarePaginator
    {
        $query = DB::table('users as u1')
            ->leftJoin('gpf_biometrics as gb', 'u1.id', '=', 'gb.user_id')
            ->leftJoin('gpf_goals as g', 'u1.id', '=', 'g.user_id')
            ->leftJoin('gpf_messages as gm', 'u1.id', '=', 'gm.user_id')
            ->leftJoin('gpf_weekly_program_logs as gwp', 'u1.id', '=', 'gwp.user_id')
            ->leftJoin('gpf_nutrition_plan_logs as gwn', 'u1.id', '=', 'gwn.user_id')
            ->select(
                'u1.*',
                'gb.*',
                'g.*',
                'gm.conversations',
                'gwp.*',
                'gwn.*'
            )
            ->where('role', 3)
            ->whereNull('trainer_id');

        if ($strictnessLevel != 0) {
            $query = $query->where('gb.strictness_level', $strictnessLevel);
        }

        $goPeakFitUsers = $query->orderBy('u1.created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', page: $pageNumber);

        return  $goPeakFitUsers;
    }

    /**
     * Paginated lists of non GoPeakFit Users, user added by trainer
     * @param  int $pageNumber Page number in table
     * @param  int $perPage     Rows to be shown per page in table
     * @param  int $strictnessLevel     Chill, Strict
     * @return LengthAwarePaginator
     */
    public function getPaginatedNonGoPeakFitUsers(Int $pageNumber, Int $perPage, Int $strictnessLevel): LengthAwarePaginator
    {
        $query = DB::table('users as u1')
            ->leftJoin('gpf_biometrics as gb', 'u1.id', '=', 'gb.user_id')
            ->leftJoin('gpf_goals as g', 'u1.id', '=', 'g.user_id')
            ->select(
                'u1.*',
                'gb.*',
                'g.*'
            )
            ->where('role', 3)
            ->whereNotNull('trainer_id');

        if ($strictnessLevel != 0) {
            $query = $query->where('gb.strictness_level', $strictnessLevel);
        }

        $nonGoPeakFitUsers = $query->orderBy('u1.created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $pageNumber);

        return  $nonGoPeakFitUsers;
    }

    /**
     * Paginated lists of Trainers, have their own Program
     * @param  int $pageNumber Page number in table
     * @param  int $perPage     Rows to be shown per page in table
     * @return LengthAwarePaginator
     */
    public function getPaginatedTrainers(Int $pageNumber, Int $perPage): LengthAwarePaginator
    {
        $trainers = $this->user->where('role', 2)
            ->with(['trainees' => function ($query) {
                $query->select('id', 'first_name', 'last_name', 'trainer_id');
            }])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $pageNumber);


        return  $trainers;
    }

    /**
     * Get latest Users
     * @return \Illuminate\Support\Collection
     */
    public function getLatestUsers(): Collection
    {
        return DB::table('users as u1')
            ->join('gpf_biometrics as gb', 'u1.id', '=', 'gb.user_id')
            ->join('users as u2', 'u1.trainer_id', '=', 'u2.id')
            ->select(
                'u1.*',
                'u2.first_name as trainer_first_name',
                'u2.last_name as trainer_last_name',
                'gb.*'
            )
            ->orderBy('u1.created_at', 'desc')
            ->limit(10)
            ->get();
    }

    /**
     * Count of the GoPeakFit Trainees
     * @return int count
     */
    public function countGoPeakFitTrainees(): int
    {
        return $this->user->where('role', 3)
            ->where('trainer_id', null)
            ->count();
    }

    /**
     * Count of the Trainees
     * @return int count
     */
    public function countTraineesAddedByTrainer(): int
    {
        return $this->user->where('role', 3)
            ->whereNot('trainer_id', null)
            ->count();
    }

    /**
     * Count of the Trainers
     * @return int count
     */
    public function countTrainer(): int
    {
        return  $this->user->where('role', 2)->count();
    }

    /**
     * Summary of getUserDataByPhoneNumber
     * Return users info with the given phone number during sms
     * @param mixed $userPhone
     * @return object|null
     */
    public function getUserDataByPhoneNumber($userPhone)
    {
        return  DB::table('users as u')
            ->leftJoin('gpf_messages as gm', 'u.id', '=', 'gm.user_id')
            ->leftJoin('gpf_biometrics as b', 'u.id', '=', 'b.user_id')
            ->leftJoin('gpf_goals as g', 'u.id', '=', 'g.user_id')
            ->leftJoin('gpf_subscriptions as gs', 'u.id', '=', 'gs.user_id')
            ->where('b.phone_number', $userPhone)
            ->first();
    }

    /**
     * Summary of getAllUsersGoalsAndBiometric
     * Return user's info such as location, biometrics and fitness goals
     * @return \Illuminate\Support\Collection<int, \stdClass>
     */
    public function getAllUsersGoalsAndBiometric()
    {
        return DB::table('users as u')
            ->leftJoin('gpf_messages as gm', 'u.id', '=', 'gm.user_id')
            ->leftJoin('gpf_biometrics as b', 'u.id', '=', 'b.user_id')
            ->leftJoin('gpf_goals as g', 'u.id', '=', 'g.user_id')
            ->leftJoin('gpf_subscriptions as gs', 'u.id', '=', 'gs.user_id')
            ->where('is_active', 1)
            ->get();
    }

    /**
     * Get all user Id to array
     * @return array
     */
    public function getActiveTraineesId()
    {
        return $this->user->where('is_active', 1)
            ->where('role', 3)
            ->pluck('id')
            ->toArray();
    }

    /**
     * Get percentage of user signup growth (all users) vs last month
     * @return float
     */
    public function getUserSignupGrowthPercentage(): float
    {
        // Get the start and end of this month
        $startOfCurrentMonth = Carbon::now()->startOfMonth();
        $endOfCurrentMonth = Carbon::now()->endOfMonth();

        // Get the start and end of last month
        $startOfLastMonth = Carbon::now()->subMonth()->startOfMonth();
        $endOfLastMonth = Carbon::now()->subMonth()->endOfMonth();

        // Count new users for each month
        $currentMonthCount = User::whereBetween('created_at', [$startOfCurrentMonth, $endOfCurrentMonth])->count();
        $lastMonthCount = User::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();

        // If there were no users last month, return 100% if there are any this month
        if ($lastMonthCount === 0) {
            return $currentMonthCount > 0 ? 100.0 : 0.0;
        }

        // Calculate percentage growth ((current - last) / last) * 100
        $growth = (($currentMonthCount - $lastMonthCount) / $lastMonthCount) * 100;

        return round($growth, 2);
    }

    /**
     * Get percentage of GoPeakFit trainee signup growth vs last month
     * (role = 3, trainer_id = null)
     * @return float
     */
    public function getGoPeakFitTraineeGrowthPercentage(): float
    {
        $startOfCurrentMonth = Carbon::now()->startOfMonth();
        $endOfCurrentMonth = Carbon::now()->endOfMonth();

        $startOfLastMonth = Carbon::now()->subMonth()->startOfMonth();
        $endOfLastMonth = Carbon::now()->subMonth()->endOfMonth();

        // Count GPF trainees created this month
        $currentMonthCount = User::where('role', 3)
            ->whereNull('trainer_id')
            ->whereBetween('created_at', [$startOfCurrentMonth, $endOfCurrentMonth])
            ->count();

        // Count GPF trainees created last month
        $lastMonthCount = User::where('role', 3)
            ->whereNull('trainer_id')
            ->whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])
            ->count();

        if ($lastMonthCount === 0) {
            return $currentMonthCount > 0 ? 100.0 : 0.0;
        }

        $growth = (($currentMonthCount - $lastMonthCount) / $lastMonthCount) * 100;

        return round($growth, 2);
    }

    /**
     * Get percentage of Non-GoPeakFit trainee signup growth vs last month
     * (role = 3, trainer_id != null)
     */
    public function getNonGpfTraineeGrowthPercentage(): float
    {
        $startOfCurrentMonth = now()->startOfMonth();
        $endOfCurrentMonth = now()->endOfMonth();

        $startOfLastMonth = now()->subMonth()->startOfMonth();
        $endOfLastMonth = now()->subMonth()->endOfMonth();

        // Count Non-GPF trainees created this month
        $currentMonthCount = User::where('role', 3)
            ->whereNotNull('trainer_id')
            ->whereBetween('created_at', [$startOfCurrentMonth, $endOfCurrentMonth])
            ->count();

        // Count Non-GPF trainees created last month
        $lastMonthCount = User::where('role', 3)
            ->whereNotNull('trainer_id')
            ->whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])
            ->count();

        if ($lastMonthCount === 0) {
            return $currentMonthCount > 0 ? 100.0 : 0.0;
        }

        return round((($currentMonthCount - $lastMonthCount) / $lastMonthCount) * 100, 2);
    }

    /**
     * Get percentage of Trainer signup growth vs last month
     * (role = 2)
     */
    public function getTrainerGrowthPercentage(): float
    {
        $startOfCurrentMonth = now()->startOfMonth();
        $endOfCurrentMonth = now()->endOfMonth();

        $startOfLastMonth = now()->subMonth()->startOfMonth();
        $endOfLastMonth = now()->subMonth()->endOfMonth();

        // Count trainers created this month
        $currentMonthCount = User::where('role', 2)
            ->whereBetween('created_at', [$startOfCurrentMonth, $endOfCurrentMonth])
            ->count();

        // Count trainers created last month
        $lastMonthCount = User::where('role', 2)
            ->whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])
            ->count();

        if ($lastMonthCount === 0) {
            return $currentMonthCount > 0 ? 100.0 : 0.0;
        }

        return round((($currentMonthCount - $lastMonthCount) / $lastMonthCount) * 100, 2);
    }

    /**
     * Get count of trainees per state
     * Joins users and gpf_biometrics tables
     * Filters only role = 3 (trainees)
     */
    public function getTraineesPerState()
    {
        return \DB::table('users')
            ->join('gpf_biometrics', 'users.id', '=', 'gpf_biometrics.user_id')
            ->select('gpf_biometrics.state', \DB::raw('COUNT(users.id) as total'))
            ->where('users.role', 3)
            ->groupBy('gpf_biometrics.state')
            ->orderBy('total', 'desc')
            ->get();
    }

    /**
     * Get the most recent trainees with biometric info
     * Joins users and gpf_biometrics
     * Returns role = 3 (trainees) only
     */
    public function getRecentTrainees(int $limit = 10)
    {
        return \DB::table('users')
            ->join('gpf_biometrics', 'users.id', '=', 'gpf_biometrics.user_id')
            ->select(
                'users.id',
                'users.first_name',
                'users.last_name',
                'users.trainer_id',
                'users.email',
                'gpf_biometrics.city',
                'gpf_biometrics.state',
                'users.created_at'
            )
            ->where('users.role', 3)
            ->orderBy('users.created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Update user data
     * @param mixed $data
     * @param mixed $id
     * @return bool
     */
    public function updateUser($data, $id): bool
    {
        return $this->user->where('id', $id)->update($data);
    }
}
