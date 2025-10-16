import { useTrainerStore } from '@/stores/useTrainerStore';
import { ChevronDown, Plus, Search } from 'lucide-react';

function TrainerTableTop() {
    // Global state
    const { trainerDataArray, setPerPage, page, setFilter, filter, setShowAddTrainerForm, setIsEdit } = useTrainerStore();

    // Show Add Trainer Form
    const handleShowAddTrainerForm = () => {
        setShowAddTrainerForm(true);
        setIsEdit(false);
    }

    return (
        <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
                <span className="text-gray-500 dark:text-gray-400">
                    Show
                </span>
                <div className="relative z-20 bg-transparent">
                    <select className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" onChange={(e: any) => setPerPage(e.target.value)}>

                        {[trainerDataArray?.length, 10, 50, page.total]?.map((item, i) => (
                            <option
                                key={i}
                                value={item}
                                className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                            >
                                {item}
                            </option>
                        ))}

                    </select>
                    <span className="absolute z-30 text-gray-500 -translate-y-1/2 right-2 top-1/2 dark:text-gray-400">
                        <ChevronDown size={16} />
                    </span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">
                    {" "}
                    entries{" "}
                </span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative">
                    <button className="absolute text-gray-500 -translate-y-1/2 left-4 top-1/2 dark:text-gray-400">
                        <Search size={16} />
                    </button>
                    <input
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        x-model="search"
                        placeholder="Search..."
                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
                        type="text"
                    />
                </div>
                <button
                    className="inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-3 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300 "
                    onClick={handleShowAddTrainerForm}>
                    <Plus size={16} />
                    Add Trainer
                </button>
            </div>
        </div>
    )
}

export default TrainerTableTop