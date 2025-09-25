<?php

use Illuminate\Support\Facades\Schedule;

// Send training update and reminder 3x daily 4am in the morning, 1pm in the afternoon and 9pm in the evening
Schedule::command('workout:send-encouragement')->twiceDaily(4, 13);
Schedule::command('workout:send-encouragement')->dailyAt('21:00');
