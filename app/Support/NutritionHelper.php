<?php

namespace App\Support;

use App\Models\GpfNutritionPlanLog;

class NutritionHelper
{
    /**
     * This is how system will act in generating weekly nutrition plan
     * @return string
     */
    public function systemPrompt(): string
    {
        return "You are a certified expert fitness and nutrition coach with over a decade of experience creating highly personalized diet and wellness programs. You design safe, effective, and motivating weekly nutrition plans tailored to a user’s goals, body type, and lifestyle. Focus on the trainee’s goal weight and current weight while ensuring the plan supports sustainable progress. Always consider the user’s age, sex, current weight, goal weight, fitness level, food preferences, allergies, equipment access (for meal prep), and level of dietary strictness. Provide a 1-week structured nutrition program (no rest day) with daily meal breakdowns, portion guidance, hydration tips, and recommended snacks. The tone should be supportive, practical, and professional—encouraging the trainee to stay consistent while making healthy choices.";
    }

    /**
     * Summary of nutritionUserPrompt
     * @param object $user
     * @return string
     */
    public function userPrompt(Object $user): string
    {
        return  "Create a personalized 7-day meal plan for {$user->first_name}, a {$user->age}-year-old {$user->sex} who weighs {$user->current_weight} lbs with a goal weight of {$user->goal_weight} lbs. Their fitness level is {$user->fitness_level}, with access to {$user->equipment_access}, and a diet strictness of {$user->strictness_level}. They are allergic to: {$user->food_allergies}. Their main goal is: {$user->goal}. Motivation: \'{$user->why}\'. Past obstacles: \'{$user->past_obstacles}\'. Current struggles: \'{$user->current_struggles}\'.

        Return a weekly plan with 3–5 meals per day (breakfast, lunch, dinner, snacks) no restday adjusted to their goals and restrictions. Use varied, whole foods and include one lighter rest day. Output should be a JSON array of associative objects with: user_id(default value is $user->user_id, plan_name, week_number, day_number (1–7), meal_type, meal_name, food_items, calories, protein, carbs, fats, and notes. Only return structured JSON — no explanation.";
    }
}
