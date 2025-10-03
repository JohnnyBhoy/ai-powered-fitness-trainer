<?php

use Illuminate\Support\Facades\Schedule;

$denverTimezone = 'America/Denver';
$workoutTimes = ['04:00', '13:00', '21:00'];

// Schedule workout reminders
foreach ($workoutTimes as $time) {
    Schedule::command('workout:send-encouragement')
        ->dailyAt($time)
        ->timezone($denverTimezone);
}

// Schedule weekly program generation
Schedule::command('generate:weekly-plan')
    ->dailyAt('23:00')
    ->timezone($denverTimezone);
