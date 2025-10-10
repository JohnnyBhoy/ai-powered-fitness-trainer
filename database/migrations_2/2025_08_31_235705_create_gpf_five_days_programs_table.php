<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('gpf_five_days_programs', function (Blueprint $table) {
            $table->id();
            $table->string('program_name'); // e.g. 5-Day Challenge Training Program
            $table->unsignedTinyInteger('day'); // 1 to 5
            $table->string('focus');
            $table->string('warm_up');
            $table->json('workout'); // Store exercises as JSON
            $table->string('cool_down');
            $table->string('alignment')->nullable(); // Optional explanation
            $table->timestamps();
        });

        $programName = '5-Day Challenge Training Program';

        DB::table('gpf_five_days_programs')->insert([
            [
                'program_name' => $programName,
                'day' => 1,
                'focus' => 'Protein Primer - Fueling with high protein + light activity',
                'warm_up' => '5-minute brisk walk or dynamic stretches',
                'workout' => json_encode([
                    'Bodyweight Squats: 3x15',
                    'Push-Ups: 3x10-12',
                    'Glute Bridges: 3x15',
                    'Plank Shoulder Taps: 3x20s',
                    'Jumping Jacks: 3x30s',
                ]),
                'cool_down' => '5-minute stretching (hamstrings, chest, shoulders)',
                'alignment' => 'Kickstarts metabolism; complements protein-focused meals.',
            ],
            [
                'program_name' => $programName,
                'day' => 2,
                'focus' => 'Strength Basics - Full-body strength training',
                'warm_up' => '5-minute dynamic stretches (arm circles, leg swings)',
                'workout' => json_encode([
                    'Dumbbell Deadlifts: 3x10',
                    'Dumbbell Bench Press: 3x10',
                    'Reverse Lunges: 3x10/side',
                    'Bent-Over Rows: 3x10',
                    'Plank Hold: 3x30s',
                ]),
                'cool_down' => 'Foam rolling (quads, back, calves)',
                'alignment' => 'Builds muscle; aligns with "Strength Basics" focus.',
            ],
            [
                'program_name' => $programName,
                'day' => 3,
                'focus' => 'Move More - Cardio & daily movement',
                'warm_up' => '5-minute brisk walk',
                'workout' => json_encode([
                    'Interval Walk: 1 min fast + 1 min moderate (30 min total)',
                    'Bonus: Bodyweight squats/lunges every 5 min',
                ]),
                'cool_down' => '5-minute slow walk + calf stretches',
                'alignment' => 'Promotes daily movement; aligns with "Move More" goal.',
            ],
            [
                'program_name' => $programName,
                'day' => 4,
                'focus' => 'Sleep Deep - Restorative movement for better sleep',
                'warm_up' => '5-minute gentle yoga flow (cat-cow, child’s pose)',
                'workout' => json_encode([
                    'Downward Dog → Cobra Flow: 5 reps',
                    'Pigeon Pose: 1 min/side',
                    'Legs-Up-the-Wall: 5 min',
                    'Seated Forward Fold: 2 min',
                    'Box Breathing: 5 cycles',
                ]),
                'cool_down' => 'Gentle stretching',
                'alignment' => 'Reduce stress; prepares body for deep sleep.',
            ],
            [
                'program_name' => $programName,
                'day' => 5,
                'focus' => 'Mindful Momentum - Mindfulness and functional movement',
                'warm_up' => '5-minute mindful breathing',
                'workout' => json_encode([
                    'Bird-Dog: 3x10/side',
                    'Dead Bug: 3x12',
                    'Side Plank: 3x20s/side',
                    'Hip Flexor Stretch: 2 min/side',
                    '10-Min Guided Meditation',
                ]),
                'cool_down' => 'Meditation reflection',
                'alignment' => 'Combines core stability with mindfulness to close the challenge.',
            ],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('gpf_five_days_programs');
    }
};
