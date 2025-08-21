<?php

use Illuminate\Support\Facades\Schedule;

// Send training update and reminder 3x daily
//Schedule::command('workout:send-encouragement')->twiceDaily(4, 13);
//Schedule::command('workout:send-encouragement')->dailyAt('21:00');