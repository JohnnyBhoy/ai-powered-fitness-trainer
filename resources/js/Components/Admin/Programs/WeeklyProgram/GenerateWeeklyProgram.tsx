import { useProgramStore } from '@/stores/useProgramStore';
import { useTraineeStore } from '@/stores/useTraineeStore';
import axios from 'axios';
import { Loader, Sparkles } from 'lucide-react'
import { useState } from 'react';
import { toast } from 'sonner';

function GenerateWeeklyProgram({ userId }: { userId: number }) {
    const GENERATE_WEEKLY_PROGRAM_URL = import.meta.env.VITE_GENERATE_WEEKLY_PROGRAM as string;
    const [loading, setLoading] = useState<boolean>(false);
    const { setWeeklyPrograms } = useProgramStore();

    // Global state
    const { setShowProgram } = useTraineeStore();


    // Create Weekly Program
    const generateWeeklyProgram = async (): Promise<void> => {
        if (!userId) {
            toast.error("User ID is missing.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(GENERATE_WEEKLY_PROGRAM_URL, {
                user_id: userId,
            });

            const data = response?.data;

            if (response.status === 200 && data?.success) {
                toast.success(data?.message || "Weekly program generated successfully!");
                setWeeklyPrograms(data?.program);
            } else {
                toast.warning(data?.message || "Something went wrong while generating the program.");
            }
        } catch (error: any) {
            console.error("Generate program error:", error);

            if (error.response?.status === 422) {
                toast.error("Invalid input data. Please check and try again.");
            } else if (error.response?.status === 403) {
                toast.error("You don't have permission to perform this action.");
            } else {
                toast.error("Failed to generate program. Please try again later.");
            }
        } finally {
            setLoading(false);
            setShowProgram(false);
        }
    };


    return (
        <div className="mt-[10rem]">
            <h3 className="dark:text-gray-400 text-center p-3 text-md font-bold m">No program created for this trainee.</h3>
            <div className="flex place-items-center justify-center gap-2">
                <button
                    onClick={generateWeeklyProgram}
                    className="flex gap-2 bg-torq hover:bg-blue-300 dark:bg-gray-800 text-white dark:text-gray-200 py-2 px-4 rounded border shadow">
                    {loading ? <Loader className='animate-spin' /> : <Sparkles />}
                    {loading ? 'Generating weekly program...' : 'Generate Weekly Program'}
                </button>
            </div>
        </div>
    )
}

export default GenerateWeeklyProgram