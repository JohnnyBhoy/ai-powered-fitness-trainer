import { motion } from 'framer-motion';

type FreeTrialTraineesCountByDays = Record<string, number>;

const TraineesCountPerDay = ({ freeTrialTraineesCountByDays }: { freeTrialTraineesCountByDays: FreeTrialTraineesCountByDays }) => {
    return (
        <motion.div
            className="
    grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8
    bg-transparent dark:bg-gray-900 dark:text-gray-100
    transition-colors duration-500
  "
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: {
                    transition: { staggerChildren: 0.12 },
                },
            }}
        >
            {Object.entries(freeTrialTraineesCountByDays).map(([day, count]) => (
                <motion.div
                    key={day}
                    variants={{
                        hidden: { opacity: 0, y: 20, scale: 0.95 },
                        visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                    whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300 } }}
                    className="
        bg-gradient-to-br from-torq to-blue-600 
        dark:from-gray-800 dark:to-gray-700 
        rounded-2xl shadow-lg hover:shadow-xl
        flex flex-col items-center justify-center 
        py-4 px-2 text-white dark:text-gray-100
        transition-all duration-300 transform
        border border-transparent dark:border-gray-700
      "
                >
                    <p className="text-sm font-medium uppercase tracking-wide text-white/90 dark:text-gray-300">
                        {day.toUpperCase().replace("_", " ")}
                    </p>
                    <p className="text-4xl font-extrabold mt-1 text-white dark:text-blue-400">
                        {count}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-white/80 dark:text-gray-400">
                        Trainees
                    </p>
                </motion.div>
            ))}
        </motion.div>

    )
}

export default TraineesCountPerDay