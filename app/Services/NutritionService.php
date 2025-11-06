<?php

namespace App\Services;

use App\Repositories\NutritionRepository;
use Illuminate\Database\Eloquent\Collection;

class NutritionService
{
    protected $nutritionRepository;
    protected $aiService;
    protected $nutritionLogService;

    public function __construct(
        NutritionRepository $nutritionRepository,
        AiService $aiService,
        NutritionLogService $nutritionLogService
    ) {
        $this->nutritionRepository = $nutritionRepository;
        $this->aiService = $aiService;
        $this->nutritionLogService = $nutritionLogService;
    }

    /**
     * Summary of getAll
     * @return array
     */
    public function getAll(): array
    {
        return $this->nutritionRepository->getAll();
    }

    /**
     * Summary of create
     * @param mixed $user
     * @return null
     */
    public function create($user)
    {
        $systemPrompt = $this->nutritionSystemPrompt();
        $userPrompt   = $this->nutritionUserPrompt($user);

        $weekNumber = $this->nutritionLogService->getWeekNumber($user->userId);

        $maxRetries = 3;
        $attempt    = 0;
        $plans      = [];

        // Keep fetching unless it will give 28 objects (needed to create a nutrition plan)
        while ($attempt < $maxRetries) {
            $response = $this->aiService->get($systemPrompt, $userPrompt);

            // Extract json response to array
            $plans = $this->aiService->extractArrayOfDataInAiResponse($response);

            // Break loop if we got exactly 28 objects
            if (is_array($plans) && count($plans) === 28) {
                break;
            }

            $attempt++;
        }

        // Save logs (keep AI response)
        $this->nutritionLogService->create($user->userId, $weekNumber, $response);

        // Save only if valid
        if (is_array($plans) && count($plans) === 28) {
            // Remove the old weekly nutrition plan from DB
            $hasExistingNutritionPlan = $this->find($user->userId);

            if ($hasExistingNutritionPlan) {
                $this->delete($user->userId);
            }

            return $this->nutritionRepository->create($plans);
        } else {
            // Optional: log failure if retries exhausted
            \Log::warning("Nutrition plan generation failed for user {$user->userId}. Attempts: $attempt");
        }

        return null;
    }

    /**
     * Get weekly nutrition plan using
     * @param int $userId
     * @return \App\Models\GpfNutritionPlan|null
     */
    public function find(int $userId)
    {
        return $this->nutritionRepository->find($userId);
    }

    /**
     * Remove weekly nutrition plan by the given user id
     * @param mixed $userId
     * @return bool|null
     */
    public function delete($userId)
    {
        return $this->nutritionRepository->delete($userId);
    }

    /**
     * This is how system will act in generating weekly nutrition plan
     * @return string
     */
    public function nutritionSystemPrompt(): string
    {
        return "You are a certified expert fitness and nutrition coach with over a decade of experience creating personalized diet and wellness programs. You design weekly nutrition plans tailored to a user’s profile. Always consider the user’s details (age, sex, current weight, goal weight, fitness level, food preferences, allergies, equipment access, and dietary strictness). Provide a 1-week structured nutrition program with no rest days, including daily meal breakdowns, portion guidance, hydration tips, and recommended snacks. Return exactly 28 objects (7 days × 4 meals) in one JSON array. Do not stop until all 28 are included and maxtoken is 4096";
    }

    /**
     * Summary of nutritionUserPrompt
     * @param object $user
     * @return string
     */
    public function nutritionUserPrompt(Object $user): string
    {
        return   "Create a structured 7-day meal plan in JSON format for $user->first_name, a $user->age-year-old male who weighs $user->current_weight lbs with a goal weight of $user->goal_weight lbs. Their fitness level is $user->fitness_level, with access to a basic kitchen, and a diet strictness of $user->strictness_level. They are allergic to: $user->food_allergies. Their main goal is: $user->goal. Motivation: $user->why. Past obstacles: $user->past_obstacles. Current struggles: $user->current_struggles. Generate all 7 days (1–7) with 3–5 meals per day (breakfast, lunch, dinner, snacks), adjusted to their needs. Include one lighter day for digestion recovery. Return the output as a single JSON array of associative objects with the following keys: user_id === $user->userId, plan_name, week_number, day_number (1–7), meal_type, meal_name, food_items, calories, protein, carbs, fats, notes (portion guidance, hydration tips, motivational reminders). Only return valid JSON — no explanations, no markdown, no extra text.";
    }

    /**
     * Summary of getDailyPlan
     * @param int $userId
     * @param int $day
     * @return \Illuminate\Database\Eloquent\Collection<int, \App\Models\GpfNutritionPlan>
     */
    public function getDailyPlan(int $userId, int $day): Collection
    {
        return $this->nutritionRepository->getDailyPlan($userId, $day);
    }
}
