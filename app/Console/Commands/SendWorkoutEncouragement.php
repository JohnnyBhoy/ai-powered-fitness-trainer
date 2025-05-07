<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\WorkoutTrainerController;

class SendWorkoutEncouragement extends Command
{
    protected $signature = 'workout:send-encouragement';
    protected $description = 'Expert workout and diet trainer';

    protected $workoutController;

    public function __construct(WorkoutTrainerController $workoutController)
    {
        parent::__construct();
        $this->workoutController = $workoutController;
    }

    public function handle()
    {
        // Call the method to send the encouragement message
        $this->workoutController->sendWorkoutEncouragement();

        $this->info('Workout and diet message sent successfully!');
    }
}
