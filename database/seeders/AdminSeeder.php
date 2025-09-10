<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'gopeakfitadmin2025@gmail.com'],
            [
                'first_name' => 'Go Peak Fit',
                'last_name' => 'Admin',
                'user_name' => 'GoPeakFit Admin',
                'password' => Hash::make('QgU+U966N6rA?mE2'),
                'role' => 1,
            ]
        );
    }
}
