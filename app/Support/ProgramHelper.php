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
    return  "You are an expert fitness coach.
Create safe, effective, and motivational 7-day workout programs.
Always tailor to the trainee’s profile (age, sex, current/goal weight, fitness level, equipment, allergies, goal).
Include warm_up, workout, cool_down, and alignment.
Output: exactly 7 JSON objects (days 1–7).
Return only valid JSON, nothing else.";
  }


  public function userPrompt($user): string
  {
    return   <<<PROMPT
Profile:
- Name: {$user->first_name}
- Age: {$user->age}
- Sex: {$user->sex}
- Current: {$user->current_weight} lbs
- Goal: {$user->goal_weight} lbs
- Level: {$user->fitness_level}
- Equipment: {$user->equipment_access}
- Allergies: {$user->food_allergies}
- Goal: {$user->goal}
- Why: {$user->why}
- Obstacles: {$user->past_obstacles}
- Struggles: {$user->current_struggles}

Task:
Generate a 7-day plan for {$user->first_name}.
Each day = object with keys:
`user_id === {$user->userId}`, `program_name`, `day`, `focus`, `warm_up`, `workout`, `cool_down`, `alignment`.

Example format (repeat for day 1–7):
[
  {
    "user_id": {$user->userId},
    "program_name": "...",
    "day": 1,
    "focus": "...",
    "warm_up": "...",
    "workout": "...",
    "cool_down": "...",
    "alignment": "..."
  }
]
PROMPT;
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
