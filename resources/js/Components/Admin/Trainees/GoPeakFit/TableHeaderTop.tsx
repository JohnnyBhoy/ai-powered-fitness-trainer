import { useGpfStore } from '@/stores/useGpfStore';
import { useTraineeStore } from '@/stores/useTraineeStore';
import { Loader, Plus } from 'lucide-react';

export default function TableHeaderTop() {
    // Global states
    const { showAddTraineeForm, setShowAddTraineeForm } = useGpfStore();
    const { loading, setUpdateTrainee } = useTraineeStore();

    // Show create form
    const handleAddTrainee = () => {
        setShowAddTraineeForm(true);
    }

    return (
        <div className="px-6 py-5 flex justify-between">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                GoPeakFit Trainees
            </h3>

            {/**Loading and create trainee form */}
            {loading ? (
                <div className="flex gap-3 place-items-center dark:text-white">
                    <span className='animate-pulse'>Loading trainees...</span>
                    <Loader className='dark:text-white animate-spin' />
                </div>
            ) : <button
                className='border dark:border-gray-600 dark:text-gray-400 dark:bg-gray-800 py-1 px-2 rounded flex place-items-center gap-2'
                onClick={handleAddTrainee}
            >
                <Plus />
                Add Trainee
            </button>}

        </div>
    )
}
