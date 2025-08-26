import { GpfTraineeProps } from "@/types/gpf";
import { useState } from "react";

type ProgramDay = {
  title: string;
  description: string;
  exercises: string[];
};

type Program = {
  [day: number]: ProgramDay;
};

const sampleProgram: Program = {
  1: {
    title: "Upper Body Strength",
    description: "Focus on building upper body strength.",
    exercises: [
      "Push-ups - 3 sets of 15",
      "Dumbbell Bench Press - 3 sets of 10",
      "Pull-ups - 3 sets of 8",
      "Plank - 3 sets of 60 seconds",
    ],
  },
  2: {
    title: "Lower Body Blast",
    description: "Leg and glute strengthening exercises.",
    exercises: [
      "Squats - 3 sets of 12",
      "Lunges - 3 sets of 10 each leg",
      "Deadlifts - 3 sets of 8",
      "Calf Raises - 3 sets of 20",
    ],
  },
  3: {
    title: "Cardio & Core",
    description: "Improve stamina and strengthen your core.",
    exercises: [
      "Jump Rope - 5 minutes",
      "Mountain Climbers - 3 sets of 30 seconds",
      "Bicycle Crunches - 3 sets of 20",
      "Russian Twists - 3 sets of 15",
    ],
  },
  4: {
    title: "Active Recovery",
    description: "Stretching and mobility exercises.",
    exercises: [
      "Yoga Flow - 15 minutes",
      "Foam Rolling - 10 minutes",
      "Walking - 20 minutes",
    ],
  },
  5: {
    title: "Full Body Strength",
    description: "Engage all muscle groups for balanced growth.",
    exercises: [
      "Burpees - 3 sets of 10",
      "Kettlebell Swings - 3 sets of 12",
      "Pull-ups - 3 sets of 8",
      "Plank Shoulder Taps - 3 sets of 20",
    ],
  },
  6: {
    title: "HIIT Session",
    description: "High-intensity training for fat burn and stamina.",
    exercises: [
      "Sprint Intervals - 30 seconds x 8",
      "Jump Squats - 3 sets of 15",
      "Push-up to Shoulder Tap - 3 sets of 12",
      "High Knees - 3 sets of 40 seconds",
    ],
  },
  7: {
    title: "Rest & Recovery",
    description: "Light activity and full recovery day.",
    exercises: [
      "Light stretching - 10 minutes",
      "Leisure walk - 15 minutes",
      "Hydration and meal prep",
    ],
  },
};

export default function Program({ data }: { data: GpfTraineeProps }) {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const program = sampleProgram[selectedDay];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="p-4 bg-blue-600 text-white text-center font-bold text-lg shadow">
        7-Day Training Program
      </div>

      {/* Day Selector */}
      <div className="flex justify-around p-2 bg-white shadow">
        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-3 py-2 rounded-full text-sm font-medium transition ${selectedDay === day
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            Day {day}
          </button>
        ))}
      </div>

      {/* Program Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            {program.title}
          </h2>
          <p className="text-gray-600 mb-4">{program.description}</p>
          <ul className="space-y-2">
            {program.exercises.map((exercise, idx) => (
              <li
                key={idx}
                className="flex items-center p-2 bg-gray-100 rounded-lg"
              >
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs mr-2">
                  {idx + 1}
                </span>
                <span>{exercise}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
