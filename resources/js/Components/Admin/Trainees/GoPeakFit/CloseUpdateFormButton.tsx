import { useTraineeStore } from '@/stores/useTraineeStore';
import { X } from 'lucide-react';

export default function CloseUpdateFormButton() {
    //Global state of update trainee
    const { setUpdateTrainee } = useTraineeStore();

    return (
        <button
            className='bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-900 text-white font-semibold py-1 px-3 rounded  flex place-items-center gap-1'
            onClick={() => setUpdateTrainee(false)}
        >
            <X size={18}/> Close
        </button>
    )
}
