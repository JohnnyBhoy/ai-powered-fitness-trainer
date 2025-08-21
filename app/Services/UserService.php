<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UserService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Summary of getPaginatedGoPeakFitUsers
     * @param  int $pageNumber Page number in table
     * @param  int $perPage     Rows to be shown per page in table
     * @param  int $strictnessLevel     Chill, Strict
     */
    public function getPaginateGoPeakFitUsers(Int $pageNumber, Int $perPage, Int $strictnessLevel): LengthAwarePaginator
    {

        try {
            return $this->userRepository->getPaginatedGoPeakFitUsers($pageNumber, $perPage, $strictnessLevel);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Paginated lists of Users added by trainer
     * @param  int $pageNumber Page number in table
     * @param  int $perPage     Rows to be shown per page in table
     * @param  int $strictnessLevel     Chill, Strict
     */
    public function getPaginateNonGoPeakFitUsers(Int $pageNumber, Int $perPage, Int $strictnessLevel): LengthAwarePaginator
    {
        try {
            return $this->userRepository->getPaginatedNonGoPeakFitUsers($pageNumber, $perPage, $strictnessLevel);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Paginated lists of Users added by trainer
     * @param  int $pageNumber Page number in table
     * @param  int $perPage     Rows to be shown per page in table
     */
    public function getPaginateTrainers(Int $pageNumber, Int $perPage): LengthAwarePaginator
    {
        try {
            return $this->userRepository->getPaginatedTrainers($pageNumber, $perPage);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * retrieve 10 new users
     */
    public function getLatestUsers()
    {
        try {
            return $this->userRepository->getLatestUsers();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Count of the GoPeakFit Trainees
     * @return int
     */
    public function countGoPeakFitTrainees(): int
    {
        try {
            return $this->userRepository->countGoPeakFitTrainees();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Count of Trainees Added By Trainer
     * @return int
     */
    public function countTraineesAddedByTrainer(): int
    {
        try {
            return $this->userRepository->countTraineesAddedByTrainer();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Count of the Trainer
     * @return int
     */
    public function countTrainer(): int
    {
        try {
            return $this->userRepository->countTrainer();
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
