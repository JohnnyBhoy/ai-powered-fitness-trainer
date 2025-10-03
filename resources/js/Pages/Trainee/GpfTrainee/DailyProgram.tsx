import React from "react";
import { motion } from "framer-motion";
import { Dumbbell, Zap, Activity, CheckCircle, LucideIcon } from "lucide-react";
import { Program } from "@/types/program";
import Authenticated from "@/Pages/Layouts/AuthenticatedLayout";
import { getOrdinal } from "@/utils/functions/helperFunctions";

const BRAND_COLOR = "#1CB4C7";

interface Step {
  title: string;
  description: string | string[];
  icon: LucideIcon;
  tip?: string;
}

interface DailyWorkoutProps {
  program: Program;
}

const DailyWorkout: React.FC<DailyWorkoutProps> = ({ program }) => {
  const workoutSteps: string[] = program.workout.map(s => s.trim()).filter(Boolean);
  const alignmentPoints: string[] = program.alignment?.split(",")?.map(p => p.trim()).filter(Boolean);

  const steps: Step[] = [
    { title: "Warm-Up 🔥", description: program.warm_up, icon: Zap, tip: "Get your body ready!" },
    { title: "Workout 💪", description: workoutSteps, icon: Dumbbell, tip: "Step by step, focus on form." },
    { title: "Cool Down 🧘", description: program.cool_down, icon: Activity, tip: "Stretch and relax." },
    { title: "Alignment ✅", description: alignmentPoints, icon: CheckCircle, tip: "Check your progress!" },
  ];

  return (
    <Authenticated>
      <div className="lg:max-w-6xl lg:mx-auto p-4 lg:mt-10 lg:p-6 bg-white shadow-2xl rounded-3xl border border-gray-200">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-[#1CB4C7] to-[#1CB4C7]/80 rounded-2xl p-6 text-white text-center shadow-md mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold">
            💪 Today is your {getOrdinal(program.day)} day!
          </h2>
          <p className="text-base sm:text-lg opacity-90 mt-2">
            Your goal today: <span className="font-semibold">{program.focus}</span>
          </p>
        </motion.div>

        {/* Stepper */}
        <div className="relative flex flex-col lg:flex-row lg:justify-between lg:items-start">
          {/* Progress line */}
          {/* Vertical line for mobile */}
          <div className="absolute left-8 top-16 bottom-4 w-1 bg-[#1CB4C7]/30 lg:hidden"></div>
          {/* Horizontal line for desktop */}
          <div className="absolute top-10 left-8 right-8 h-1 bg-[#1CB4C7]/30 hidden lg:block"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isWorkout = step.title.includes("Workout");
            const isAlignment = step.title.includes("Alignment");

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative z-10 flex-1 flex flex-col items-start lg:items-center text-left lg:text-center px-4 mb-10 lg:mb-0"
              >
                {/* Step icon */}
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#1CB4C7] text-white shadow-md mb-4 lg:mb-6">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title & Tip */}
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 lg:mb-4">
                  {step.title}
                </h3>
                {step.tip && (
                  <p className="text-gray-700 italic text-xs sm:text-sm mb-3">
                    {step.tip}
                  </p>
                )}

                {/* Workout steps with icons */}
                {isWorkout && Array.isArray(step.description) && (
                  <ol className="space-y-2 list-none w-full">
                    {step.description.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center space-x-2 p-2 rounded-lg bg-[#E0F7FA] text-sm"
                      >
                        <Dumbbell className="w-4 h-4 text-[#1CB4C7]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                )}

                {/* Alignment with icons */}
                {isAlignment && Array.isArray(step.description) && (
                  <ul className="space-y-2 w-full">
                    {step.description.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center space-x-2 p-2 rounded-lg bg-[#E0F7FA] text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-[#1CB4C7]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Warm-Up / Cool Down */}
                {!isWorkout && !isAlignment && typeof step.description === "string" && (
                  <p className="text-gray-700 text-sm">{step.description}</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </Authenticated>
  );
};

export default DailyWorkout;
