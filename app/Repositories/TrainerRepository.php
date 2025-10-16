<?php

namespace App\Repositories;

use App\Models\GpfTrainer;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class TrainerRepository
{
    protected $trainer;
    protected $user;

    public function __construct(GpfTrainer $trainer, User $user)
    {
        $this->trainer = $trainer;
        $this->user = $user;
    }

    /**
     * Summary of all
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function all(): Collection
    {
        return $this->trainer->all();
    }

    /**
     * Create trainer
     * @param array $data
     * @return void
     */
    public function store(array $data)
    {
        $this->user->create($data);
    }
}
