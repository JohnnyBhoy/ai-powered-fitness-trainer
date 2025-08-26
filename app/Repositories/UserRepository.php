<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class UserRepository
{
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
            ->select(
                'u1.*',
                'gb.*',
                'g.*',
                'gm.conversations',
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
        $trainers = User::where('role', 2)
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
        return User::where('role', 3)
            ->where('trainer_id', null)
            ->count();
    }

    /**
     * Count of the Trainees
     * @return int count
     */
    public function countTraineesAddedByTrainer(): int
    {
        return User::where('role', 3)
            ->whereNot('trainer_id', null)
            ->count();
    }

    /**
     * Count of the Trainers
     * @return int count
     */
    public function countTrainer(): int
    {
        return  User::where('role', 2)->count();
    }
}
