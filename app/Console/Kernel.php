<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Send training update and reminder 3x daily 4am in the morning, 1pm in the afternoon and 9pm in the evening
        $schedule->command('workout:send-encouragement')->twiceDaily(4, 13);
        $schedule->command('workout:send-encouragement')->dailyAt('21:00');
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
