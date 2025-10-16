import { useTrainerStore } from '@/stores/useTrainerStore';
import TrainerTableContent from './TrainerTableContent';
import TrainerTableFooter from './TrainerTableFooter';
import TrainerTableTop from './TrainerTableTop';

type TrainerTableProps = {
    handleOpen: (e: any) => void,
    handleRemoveTrainer: (e: any) => void,
}

export default function TrainerTable({ handleOpen, handleRemoveTrainer }: TrainerTableProps) {
    // Global state
    const { showAddTrainerForm, isEdit } = useTrainerStore();

    return (
        <div className={`${(showAddTrainerForm || isEdit) && 'hidden'} border-t border-gray-100 dark:border-gray-800`}>
            <div className="space-y-6">
                <div className="overflow-hidden bg-white  dark:bg-white/[0.03]">
                    <TrainerTableTop />
                    <TrainerTableContent
                        handleOpen={handleOpen}
                        handleRemoveTrainer={handleRemoveTrainer}
                    />
                    <TrainerTableFooter />
                </div>
            </div>
        </div>
    )
}
