import { GpfTraineeProps } from '@/types/gpf';
import { getStrictnessLevel } from '@/utils/functions/helperFunctions';
import {
  Card
} from "@material-tailwind/react";

import { Copy } from "lucide-react";
import { useState } from 'react';

interface UserProfile {
  first_name: string;
  age: number;
  sex: string;
  current_weight: number;
  goal_weight: number;
  fitness_level: string;
  equipment_access: string;
  food_allergies: string;
  goal: string;
  why: string;
  past_obstacles: string;
  current_struggles: string;
  strictness_level: string;
}


const Prompt = ({ data }: { data: GpfTraineeProps }) => {
  const [copied, setCopied] = useState(false);

  // Example user profile (this would usually come from API)
  const user: UserProfile = {
    first_name: data?.first_name,
    age: data?.age,
    sex: data?.sex,
    current_weight: data.current_weight,
    goal_weight: data.goal_weight,
    fitness_level: data.fitness_level,
    equipment_access: data.equipment_access,
    food_allergies: data.food_allergies,
    goal: data.goal,
    why: data.why,
    past_obstacles: data.past_obstacles,
    current_struggles: data.current_struggles,
    strictness_level: getStrictnessLevel(data.strictness_level),
  };

  const prompt = `
You are a strict but empathetic expert fitness and nutrition coach. 
Your mission is to help ${user.first_name} reach their health goals with safe, personalized, and realistic advice.

User Profile:
- Age: ${user.age} years
- Sex: ${user.sex}
- Current Weight: ${user.current_weight} lbs
- Goal Weight: ${user.goal_weight} lbs
- Fitness Level: ${user.fitness_level}
- Equipment Access: ${user.equipment_access}
- Food Allergies: ${user.food_allergies}
- Primary Goal: ${user.goal}
- Motivation (Why): ${user.why}
- Past Obstacles: ${user.past_obstacles}
- Current Struggles: ${user.current_struggles}
- Strictness Level: ${user.strictness_level}

Instructions:
1. Personalize the workout and nutrition advice for ${user.first_name}.
2. Stay supportive, realistic, and practical.
3. Use ${user.equipment_access} equipment for workouts.
4. Avoid foods that cause allergies.
5. Provide ways to overcome struggles and past obstacles.
6. Emphasize sustainability and consistency over intensity.
7. Respond in a conversational, coach-like tone.
8. Keep responses concise and text-message-friendly (under 300 characters when possible).
9. Use a ${user.strictness_level} strictness level kind of approach for their training plan.

Always prioritize safety, and never suggest dangerous practices.
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      color="white"
      className="p-6 mt-3 bg-white dark:bg-gray-900 border dark:border-gray-800 transition-colors duration-300"
      shadow={false}
    >
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white transition-colors duration-300">
          GoPeakFit 3x Daily Update Prompt Preview
        </h1>

        <div className="bg-gray-100 dark:bg-white/[0.05] rounded-xl shadow-md p-4 relative transition-colors duration-300">
          <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800 dark:text-gray-200 transition-colors duration-300">
            {prompt}
          </pre>

          <button
            onClick={copyToClipboard}
            className="absolute top-4 right-4 flex items-center gap-2 bg-gradient-to-r from-teal-400 to-cyan-500 dark:from-cyan-600 dark:to-blue-700 text-white px-3 py-1 rounded-lg shadow hover:opacity-90 transition-all duration-300"
          >
            <Copy className="w-4 h-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </Card>


  )
}

export default Prompt