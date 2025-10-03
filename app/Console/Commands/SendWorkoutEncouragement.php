<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\MessageService;
use Illuminate\Support\Facades\Log;

class SendWorkoutEncouragement extends Command
{
    protected $signature = 'workout:send-encouragement';
    protected $description = 'Daily SMS update to GoPeakFit Trainee';

    /**
     * Send encouragement 3x per day
     * @param \App\Services\MessageService $messageService
     * @return void
     */
    public function handle(MessageService $messageService): void
    {
        try {
            $this->info('Starting to send workout encouragement messages...');

            // Assume this method returns the number of messages sent
            $count = $messageService->sendWorkoutEncouragement();

            if ($count > 0) {
                $this->info("Workout encouragement messages sent to {$count} trainees.");
                Log::info("Workout encouragement messages sent to {$count} trainees.");
            } else {
                $this->info('No trainees to send messages to today.');
                Log::info('No workout encouragement messages sent today.');
            }
        } catch (\Exception $e) {
            $this->error('Failed to send workout messages: ' . $e->getMessage());
            Log::error('Error sending workout messages: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);
        }
    }
}
