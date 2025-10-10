import { WeeklyProgram } from "@/types/weekly-program";
import { motion } from "framer-motion";
import { useState } from "react";

const DailyWorkoutProgram = ({ weeklyProgram }: { weeklyProgram: WeeklyProgram[] }) => {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const program = weeklyProgram[selectedDay];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="overflow-hidden -xl border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]"
    >
      < div className="flex justify-around p-2 bg-white dark:bg-gray-800 shadow dark:border-none border -lg my-3" >
        {
          weeklyProgram.map((program: any, i: number) => (
            <button
              key={program?.id}
              onClick={() => setSelectedDay(i)}
              className={`px-3 py-2 -full text-sm font-medium transition 
          ${selectedDay === i
                  ? "bg-torq text-white shadow"
                  : "bg-gray-100 dark:bg-gray-700 text-whi dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
            >
              Day {i + 1}
            </button>
          ))
        }
      </div >

      {/* Program Content */}
      < div className="flex-1 overflow-y-auto mt-2 bg-gray-50 dark:bg-gray-900 transition-colors duration-300" >
        <div className="bg-white dark:bg-gray-800 -2xl shadow p-4 dark:border-none border">
          <div className="grid lg:grid-cols-2 grid-cols-1">
            <h2 className="font-semibold dark:text-teal-400 mb-2">
              Focus : <br />
              <small className="dark:text-gray-200"> {program.focus}</small>
            </h2>
            <h2 className="font-semibold dark:text-teal-400 mb-2">
              Alignment :  <br />
              <small className="dark:text-gray-200">{program.alignment}</small>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 grid-cols-1 mt-2">
            <h2 className="font-semibold dark:text-teal-400 mb-2">
              Warm-up : <br />
              <small className="dark:text-gray-200"> {program.warm_up}</small>
            </h2>
            <h2 className="font-semibold dark:text-teal-400 mb-2">
              Cool-down :  <br />
              <small className="dark:text-gray-200">{program.cool_down}</small>
            </h2>
          </div>


          <h3 className="dark:text-teal-400 mt-4 mb-2 font-semibold">Workout</h3>
          <ul className="space-y-2">
            {program.workout?.split(",")?.map((item: any, idx: number) => (
              <li
                key={idx}
                className="flex items-center p-2 bg-gray-100 dark:bg-gray-700 transition-colors duration-300"
              >
                <span className="w-6 h-6 flex items-center justify-center bg-torq text-white text-xs mr-2">
                  {idx + 1}
                </span>
                <span className="text-gray-800 dark:text-gray-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div >
    </motion.div>
  );
}

export default DailyWorkoutProgram;