<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UserService
{
    protected $userRepository;

    /**
     * Service Constructor
     * @param \App\Repositories\UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }


    /**
     * Retrieve user data by Id
     * @param mixed $id
     * @return object|null
     */
    public function show($id)
    {
        return $this->userRepository->show($id);
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

    /**
     * Summary of getUserDataByPhoneNumber
     * Return users info with the given phone number during sms
     * @param mixed $userPhone
     * @return object|null
     */
    public function getUserDataByPhoneNumber($userPhone)
    {
        return $this->userRepository->getUserDataByPhoneNumber($userPhone);
    }


    /**
     * Summary of getAllUsersGoalsAndBiometric
     * @return mixed
     */
    public function getAllUsersGoalsAndBiometric(): mixed
    {
        return $this->userRepository->getAllUsersGoalsAndBiometric();
    }

    /**
     * Get all user Id to array
     * @return array
     */
    public function getActiveTraineesId()
    {
        return $this->userRepository->getActiveTraineesId();
    }

    /**
     *Get user growth compare to last month
     * @return float
     */
    public function getUsersGrowthPercentage(): float
    {
        return $this->userRepository->getUserSignupGrowthPercentage();
    }

    /**
     * Get percentage of GoPeakFit trainee signup growth vs last month
     * (role = 3, trainer_id = null)
     */
    public function getGpfTraineeGrowthPercentage(): float
    {
        return $this->userRepository->getGoPeakFitTraineeGrowthPercentage();
    }

    /**
     * Get percentage of Non-GoPeakFit trainee signup growth vs last month
     * (role = 3, trainer_id != null)
     */
    public function getNonGpfTraineeGrowthPercentage(): float
    {
        return $this->userRepository->getNonGpfTraineeGrowthPercentage();
    }

    /**
     * Get percentage of Trainer signup growth vs last month
     * (role = 2)
     */
    public function getTrainerGrowthPercentage(): float
    {
        return $this->userRepository->getTrainerGrowthPercentage();
    }

    public function getTraineesPerState()
    {
        return $this->userRepository->getTraineesPerState();
    }

    /**
     * Get the most recent trainees with biometric info
     * Joins users and gpf_biometrics
     * Returns role = 3 (trainees) only
     */
    public function getRecentTrainees($limit = 10)
    {
        return $this->userRepository->getRecentTrainees($limit);
    }

    /**
     * Update user's data
     * @param mixed $data
     * @param mixed $id
     * @return bool
     */
    public function updateUser($data, $id): bool
    {
        return $this->userRepository->updateUser($data, $id);
    }
}
