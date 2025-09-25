<?php

namespace App\Support;

class ProgramHelper
{
    /**
     * Summary of programSystemPrompt
     * @return string
     */
    public function systemPrompt(): string
    {
        return  "You are a certified expert fitness coach with over a decade of experience creating highly personalized fitness and wellness programs. You design safe, effective, and motivating workout and nutrition plans tailored to a user's goals, body type, and available resources. Focus on the trainee GOAL WEIGHT and CURRENT WEIGHT. Always take into account the user's age, sex, current weight, goal weight, fitness level, equipment access, food allergies, and strictness level. Provide a 1-week training program with rest days, warm-up/cool-down, and a tone that is encouraging yet professional.";;
    }


    public function userPrompt($user): string
    {
        return   "Create a 1-week personalized fitness plan for $user->first_name profile:
        - Age: {$user->age} years
        - Sex: {$user->sex}
        - Current Weight: {$user->current_weight} lbs
        - Goal Weight: {$user->goal_weight} lbs
        - Fitness Level: {$user->fitness_level}
        - Equipment Access: {$user->equipment_access}
        - Food Allergies: {$user->food_allergies}
        - Primary Goal: {$user->goal}
        - Motivation (Why): {$user->why}
        - Past Obstacles: {$user->past_obstacles}
        - Current Struggles: {$user->current_struggles}

         Consider this information to generate a daily workout schedule including warm-ups, workouts, rest days, and cool-downs. Tailor all recommendations to the $user->first_name profile. Tone should be motivational but clear and professional.
         
         NOTE: RETURN DATA FORMAT SHOULD BE [{user_id, program_name,day,focus,warm_up,workout,cool_down,alignment},{}, to 7] user_id = $user->user_id, day key has a value of 1 to 7 IN ASSOCIATIVE ARRAY OF OBJECT FORMAT SO THAT I CAN LOOP IT AND SAVE IT TO MY DB";
    }

    /**
     * Summary of extractArrayOfDataInAiResponse
     * @param mixed $response
     */
    public function extractArrayOfDataInAiResponse($response): mixed
    {
        $start = strpos($response, '[');
        $end   = strrpos($response, ']') + 1;
        $response = substr($response, $start, $end - $start);
        return json_decode($response, true);
    }
}
