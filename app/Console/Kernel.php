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
        $denverTimezone = 'America/Denver';

        // Workout encouragement messages 3x daily (4am, 1pm, 9pm Denver time)
        $workoutTimes = ['04:00', '13:00', '21:00'];
        foreach ($workoutTimes as $time) {
            $schedule->command('workout:send-encouragement')
                ->dailyAt($time)
                ->timezone($denverTimezone)
                ->description("Send workout encouragement at $time Denver time");
        }

        // Generate weekly program daily at 11pm Denver time
        $schedule->command('generate:weekly-plan')
            ->dailyAt('23:00')
            ->timezone($denverTimezone)
            ->description('Generate weekly program for trainees ending their current plan');
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
