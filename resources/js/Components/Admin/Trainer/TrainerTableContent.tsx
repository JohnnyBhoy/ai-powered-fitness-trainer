import { TrainerProps, useTrainerStore } from '@/stores/useTrainerStore';
import { formatDate } from '@/utils/functions/formatData';
import { ChevronsUpDown, Pencil, Trash2 } from 'lucide-react';

// Table Header
const TABLE_HEAD = [
    "Name",
    "No. Of Trainees",
    "Trainees",
    "Created Date",
    "Action",
];

type TrainerTableContentProps = {
    handleOpen: (e: TrainerProps) => void,
    handleRemoveTrainer: (e: number) => void,
}

export default function TrainerTableContent({ handleOpen, handleRemoveTrainer }: TrainerTableContentProps) {
    const { trainerDataArray, filter, sortByAsc, setSortByAsc } = useTrainerStore();

    return (
        <div className="max-w-full overflow-x-auto custom-scrollbar">
            <div>
                <table className="min-w-full  undefined">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, i) => (
                                <th
                                    key={i}
                                    className=" px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
                                    <div className="flex items-center justify-between cursor-pointer">
                                        <div className="gap-3">
                                            <span className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                                                {head}
                                            </span>
                                        </div>
                                        <button className="flex flex-col gap-0.5"
                                            onClick={() => setSortByAsc(!sortByAsc)} >
                                            <ChevronsUpDown className='dark:text-gray-700' size={18} />
                                        </button>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {trainerDataArray?.length == 0 ? (
                            <tr>
                                <td className='dark:text-white text-center p-10' colSpan={8}>No data found...</td>
                            </tr>
                        ) : trainerDataArray
                            ?.filter(trainer => trainer?.first_name?.toLowerCase()?.includes(filter?.toLowerCase())
                                || trainer?.last_name?.toLowerCase()?.includes(filter?.toLowerCase())
                            )
                            ?.sort((a: any, b: any) =>
                                sortByAsc
                                    ? a.last_name.localeCompare(b.last_name)
                                    : b.last_name.localeCompare(a.last_name)
                            )
                            ?.map((trainer, i) => (
                                <tr key={i}>
                                    <td className=" px-4 py-4 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap">
                                        <div className="flex gap-3">
                                            <div className="mt-1">
                                                <label className="flex items-center space-x-3 group cursor-pointer ">
                                                    <div className="relative w-5 h-5">
                                                        <input
                                                            className="w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60 
          "
                                                            type="checkbox"
                                                        />
                                                    </div>
                                                </label>
                                            </div>
                                            <div>
                                                <p className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                    {trainer?.last_name}, {trainer?.first_name}
                                                </p>
                                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                    {trainer?.email}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className=" px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                                        {trainer.trainees?.length ?? 0}
                                    </td>

                                    <td className=" px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                                        {trainer.trainees?.length ?? 'No trainees added'}
                                    </td>
                                    <td className=" px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                                        {formatDate(trainer?.created_at)}
                                    </td>
                                    <td className=" px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                                        <div className="flex items-center w-full gap-3">
                                            <button className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500">
                                                <Trash2 size={16} onClick={() => handleRemoveTrainer(trainer.id)} />
                                            </button>
                                            <button className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                                                <Pencil size={16} onClick={() => handleOpen(trainer)} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}
