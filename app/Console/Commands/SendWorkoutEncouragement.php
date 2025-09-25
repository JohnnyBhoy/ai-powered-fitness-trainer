<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\MessageService;

class SendWorkoutEncouragement extends Command
{
    protected $signature = 'workout:send-encouragement';
    protected $description = 'Daily SMS update to GoPeakFit Trainee';

    public function handle(MessageService $messageService)
    {
        // Call the method to send the encouragement message
        $messageService->sendWorkoutEncouragement();

        $this->info('Workout and diet message sent successfully!');
    }
}
