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
     * Create weekly nutrition plan
     * @param mixed $user
     * @return array|null
     */
    public function create($user): null
    {
        $systemPrompt = $this->nutritionSystemPrompt();
        $userPrompt = $this->nutritionUserPrompt($user);

        $response = $this->aiService->get($systemPrompt, $userPrompt);

        $weekNumber = $this->nutritionLogService->getWeekNumber($user->user_id);
        $this->nutritionLogService->create($user->user_id, $weekNumber, $response);

        // Extract json response to array (iterable create program by day)
        $plans = $this->aiService->extractArrayOfDataInAiResponse($response);

        if ($weekNumber > 1) {
            $this->delete($user->user_id);
        }

        if (is_array($plans)) {
            foreach ($plans as $plan) {
                $this->nutritionRepository->create($plan);
            }
        }

        return null;
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
        return   "Create a structured 7-day meal plan in JSON format for $user->first_name, a $user->age-year-old male who weighs $user->current_weight lbs with a goal weight of $user->goal_weight lbs. Their fitness level is $user->fitness_level, with access to a basic kitchen, and a diet strictness of $user->strictness_level. They are allergic to: $user->food_allergies. Their main goal is: $user->goal. Motivation: $user->why. Past obstacles: $user->past_obstacles. Current struggles: $user->current_struggles. Generate all 7 days (1–7) with 3–5 meals per day (breakfast, lunch, dinner, snacks), adjusted to their needs. Include one lighter day for digestion recovery. Return the output as a single JSON array of associative objects with the following keys: user_id (default: 1), plan_name, week_number, day_number (1–7), meal_type, meal_name, food_items, calories, protein, carbs, fats, notes (portion guidance, hydration tips, motivational reminders). Only return valid JSON — no explanations, no markdown, no extra text.";
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
