<?php

namespace App\Console\Commands;

use App\Services\ProgramService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class GenerateWeeklyProgramAndNutrition extends Command
{
    protected $signature = 'generate:weekly-plan';
    protected $description = 'Generate weekly program and nutrition plan for users if their last program is expired (7 days old)';

    /**
     * Command to generate weekly program and nutrition plan for trainees
     * @param \App\Services\ProgramService $programService
     * @return void
     */
    public function handle(ProgramService $programService)
    {
        try {
            $this->info('Starting generation of weekly programs and nutrition plans...');

            $count = $programService->generateWeeklyProgramAndNutritionPlan();

            if ($count > 0) {
                $this->info("Weekly programs and nutrition plans generated for {$count} users.");
                Log::info("Weekly programs generated for {$count} users.");
            } else {
                $this->info('No users needed a new weekly program today.');
                Log::info('No users needed a new weekly program.');
            }
        } catch (\Exception $e) {
            $this->error('Failed to generate weekly programs: ' . $e->getMessage());
            Log::error('Error generating weekly programs: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);
        }
    }
}
