<?php

namespace Database\Seeders;

use App\Models\GpfGoals;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\GpfBiometric;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Create 10 demo users
        for ($i = 120; $i <= 140; $i++) {
            $user = User::create([
                'first_name'        => fake()->firstName,
                'last_name'         => fake()->lastName,
                'user_name'         => fake()->userName(),
                'email'             => fake()->email(),
                'email_verified_at' => fake()->dateTime(),
                'password'          => Hash::make('password'), // default password
                'is_active'         => rand(0, 1),
                'is_promo'          => rand(0, 1),
                'role'              => 2,
                'trainer_id'        => null, // or assign to another user if needed
                'remember_token'    => Str::random(10),
                'created_at'        => fake()->dateTimeBetween('-1 year', now()),
                'updated_at'        => fake()->dateTimeBetween('-1 year', now()),
            ]);

            // Create related biometric entry
            GpfBiometric::create([
                'user_id'           => $user->id,
                'city'              => fake()->city,
                'state'             => fake()->address(),
                'phone_number'      => fake()->phoneNumber(),
                'age'               => rand(18, 60),
                'sex'               => ['male', 'female'][rand(0, 1)],
                'current_weight'    => rand(100, 300),
                'goal_weight'       => rand(100, 300),
                'fitness_level'     => ['beginner', 'intermediate', 'advanced'][rand(0, 2)],
                'equipment_access'  => ['none', 'some', 'full'][rand(0, 2)],
                'food_allergies'    => 'None',
                'strictness_level'  => rand(1, 5),
                'created_at'        =>  fake()->dateTimeBetween('-1 year', now()),
                'updated_at'        => fake()->dateTimeBetween('-1 year', now()),
            ]);

            // Create related goal entry
            GpfGoals::create([
                'user_id'           => $user->id,
                'goal'              => 'Lose weight',
                'why'               => 'To be healthier',
                'past_obstacles'    => 'Lack of time',
                'current_struggles' => 'Consistency',
                'created_at'        => fake()->dateTimeBetween('-1 year', now()),
                'updated_at'        => fake()->dateTimeBetween('-1 year', now()),
            ]);
        }
    }
}
