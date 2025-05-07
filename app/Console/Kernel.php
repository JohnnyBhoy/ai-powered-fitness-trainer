<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected $emailService;

    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Send training update and reminder 3x daily
        $schedule->command('workout:send-encouragement')->twiceDaily(4, 13);  // 9 AM and 1 PM
        $schedule->command('workout:send-encouragement')->dailyAt('21:00'); // Sends at 9 PM
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
