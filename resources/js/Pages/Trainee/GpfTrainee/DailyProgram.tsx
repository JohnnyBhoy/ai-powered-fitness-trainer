import React from "react";
import { motion } from "framer-motion";
import { Dumbbell, Flame, Zap, Activity, CheckCircle } from "lucide-react";
import { Program } from "@/types/program";
import Authenticated from "@/Pages/Layouts/AuthenticatedLayout";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const DailyWorkout: React.FC<{ program: Program }> = ({ program }) => {
  return (
    <Authenticated>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="lg:max-w-6xl lg:mx-auto lg:p-0 p-3 lg:mt-14 bg-white shadow-xl lg:rounded-2xl overflow-hidden border border-gray-200"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r lg:rounded-none rounded-lg  from-blue-500 to-indigo-600 p-6 text-white"
        >
          <h2 className="text-2xl font-bold">{program.program_name}</h2>
          <p className="text-sm opacity-90">Day {program.day}</p>
        </motion.div>

        <div className="p-6 grid lg:grid-cols-2 grid-grid-cols-1">
          <div className="space-y-6">
            {/* Focus */}
            <motion.div variants={fadeInUp} className="flex items-start space-x-3">
              <Flame className="text-red-500 w-6 h-6 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Focus</h3>
                <p className="text-gray-600">{program.focus}</p>
              </div>
            </motion.div>

            {/* Warm-Up */}
            <motion.div variants={fadeInUp} className="flex items-start space-x-3">
              <Zap className="text-yellow-500 w-6 h-6 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Warm-Up</h3>
                <p className="text-gray-600">{program.warm_up}</p>
              </div>
            </motion.div>

            {/* Workout */}
            <motion.div variants={fadeInUp} className="flex items-start space-x-3">
              <Dumbbell className="text-green-600 w-6 h-6 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Workout</h3>
                <ul className="list-none pl-0 mt-2 space-y-2 text-gray-600">
                  {program.workout.map((exercise, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg shadow-sm border border-gray-100"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{exercise}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>


          <div className="space-y-10 mt-3 lg:mt-0">
            {/* Cool Down */}
            <motion.div variants={fadeInUp} className="flex items-start space-y-3">
              <Activity className="text-blue-500 w-6 h-6 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Cool Down</h3>
                <p className="text-gray-600">{program.cool_down}</p>
              </div>
            </motion.div>

            {/* Alignment / Progress */}
            <motion.div
              variants={fadeInUp}
              className="bg-indigo-50 p-4 rounded-lg border border-indigo-200"
            >
              <h3 className="font-semibold text-indigo-700 mb-3">Your Progress Today</h3>
              <ul className="space-y-2">
                {program.alignment
                  .split(/[.;]+/) // split alignment string into points
                  .map((point, index) => point.trim())
                  .filter((point) => point.length > 0)
                  .map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                      className="flex items-center space-x-2"
                    >
                      <CheckCircle className="w-5 h-5 text-indigo-600" />
                      <span className="text-indigo-700 text-sm">{point}</span>
                    </motion.li>
                  ))}
              </ul>
            </motion.div>

          </div>

        </div>
      </motion.div>
    </Authenticated>
  );
};

export default DailyWorkout;
