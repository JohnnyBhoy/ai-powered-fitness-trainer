import WeeklyPrograms from '@/Components/Trainee/Forms/Program/WeeklyProgram';
import { useProgramStore, useTrialProgramStore } from '@/stores/useProgramStore';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader, PenBoxIcon, Save, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';


const TrialPrograms = () => {
    const { update, setUpdate } = useProgramStore();
    const { trialPrograms, setTrialPrograms } = useTrialProgramStore();
    const [loading, setLoading] = useState(false);

    // 🔘 Triggered when the “Save” button is clicked
    const handleUpdate = async () => {
        try {
            setLoading(true);

            const res = await axios.put("/api/admin/update-trial-programs", { trialPrograms });

            // You can destructure too:
            const { success, message, newTrialProgram } = res.data;

            if (success) {
                setTrialPrograms(newTrialProgram);
                toast.success(`✅ ${message}`);
            } else {
                toast.error(`❌ ${message}`);
            }
        } catch (error) {
            toast.error("❌ Failed to update trial programs.");
        } finally {
            setLoading(false);
            setUpdate(!update);
        }
    };

    return (
        <motion.div
            className="space-y-6 transition-colors duration-500 dark:bg-gray-900"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: {
                    transition: { staggerChildren: 0.15 },
                },
            }}
        >
            <div className="flex justify-between">
                <h3 className='font-bold text-lg text-gray-700 dark:text-gray-400'>5-Day Trial Program</h3>
                <div className="flex gap-2 place-items-center">
                    {update ? <X onClick={() => setUpdate(!update)} className='dark:text-gray-400' /> : null}

                    <button
                        onClick={() => update ? handleUpdate() : setUpdate(!update)}
                        className='bg-gray-700 hover:bg-gray-800 rounded text-white py-2 px-3 flex gap-2 text-sm'
                    >
                        {loading ? <Loader size={20} className='animate-spin' />
                            : update ? <Save size={20} />
                                : <PenBoxIcon size={20} />
                        }
                        {loading ? 'Saving...'
                            : update ? 'Save'
                                : 'Update'}
                    </button>
                </div>
            </div>

            <WeeklyPrograms />

        </motion.div>

    )
}

export default TrialPrograms