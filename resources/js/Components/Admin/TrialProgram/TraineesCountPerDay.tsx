import { motion } from 'framer-motion';

type FreeTrialTraineesCountByDays = Record<string, number>;

const TraineesCountPerDay = ({ freeTrialTraineesCountByDays }: { freeTrialTraineesCountByDays: FreeTrialTraineesCountByDays }) => {
    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: {
                    transition: { staggerChildren: 0.15 },
                },
            }}
        >
            {Object.entries(freeTrialTraineesCountByDays).map(([day, count]) => (
                <motion.div
                    key={day}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl shadow-lg p-6 flex flex-col items-center"
                >
                    <p className="text-lg font-semibold">{day.toUpperCase()?.replace("_", " ")}</p>
                    <p className="text-4xl font-extrabold mt-2">{count}</p>
                    <p className="text-xs uppercase tracking-wide mt-1">Trainees</p>
                </motion.div>
            ))}
        </motion.div>
    )
}

export default TraineesCountPerDay