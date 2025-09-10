import { motion } from 'framer-motion';

type Programs = {
    programs: {
        id: number;
        day: number;
        focus: string;
        warm_up: string;
        workout: string[];
        cool_down: string;
        alignment: string;
    }[]
};

const TrialPrograms = ({ programs }: Programs) => {
    return (
        <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: {
                    transition: { staggerChildren: 0.15 },
                },
            }}
        >

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {programs.map((day: any) => (
                    <motion.div
                        key={day.id}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
                    >
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            Day {day.day}: {day.focus}
                        </h2>
                        <div className="text-sm text-gray-700 space-y-2">
                            <p>
                                <span className="font-semibold">Warm-Up:</span> {day.warm_up}
                            </p>
                            <div>
                                <span className="font-semibold">Workout:</span>
                                <ul className="list-disc list-inside ml-4 mt-1">
                                    {day.workout.map((exercise: any, index: number) => (
                                        <li key={index}>{exercise}</li>
                                    ))}
                                </ul>
                            </div>
                            <p>
                                <span className="font-semibold">Cool-Down:</span>{" "}
                                {day.cool_down}
                            </p>
                            <p className="italic text-gray-600">
                                {day.alignment || "No alignment provided."}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default TrialPrograms