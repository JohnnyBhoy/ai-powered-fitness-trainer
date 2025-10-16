import { useGpfStore } from '@/stores/useGpfStore';
import { useTraineeStore } from '@/stores/useTraineeStore';
import { TABLE_HEAD } from '@/utils/data/TableHead';
import { formatCityAndState } from '@/utils/functions';
import { formatDate } from '@/utils/functions/formatData';
import { getStrictnessLevel } from '@/utils/functions/helperFunctions';
import { useForm } from '@inertiajs/react';
import { ChevronDown, ChevronsUpDown, Download, Pencil, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

function TraineeTable() {
    // Form data
    const { delete: destroy, processing } = useForm();

    // Global states
    const { refetchData, setRefetchData } = useGpfStore();
    const { traineeDataArray,
        setPerPage,
        page,
        filter,
        updateTrainee,
        setFilter,
        setSortByAsc,
        sortByAsc,
        setPageNumber,
        setTraineeData,
        setUpdateTrainee,
    } = useTraineeStore();


    // Open update trainee form
    const handleOpen = (trainee: any) => {
        setUpdateTrainee(true);
        setTraineeData(trainee);
    }

    // Delete trainee handler
    const handleRemoveTrainee = (id: number) => {
        if (!confirm('Are you sure you want to delete this trainee?')) return;

        try {
            destroy(route('users.destroy', id), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Trainee deleted successfully!');
                    setRefetchData(!refetchData);
                },
                onError: (errors) => {
                    toast.error('Failed to delete user.');
                    console.error(errors);
                },
                onFinish: () => {
                    console.log('Delete request finished');
                },
            });
        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('Something went wrong while deleting the user.');
        }
    }

    const filterTrainee = (trainee: any) => {
        return trainee?.first_name?.toLowerCase()?.includes(filter?.toLowerCase())
            || trainee?.last_name?.toLowerCase()?.includes(filter?.toLowerCase())
            || trainee?.city?.toLowerCase()?.includes(filter?.toLowerCase())
            || trainee?.state?.toLowerCase()?.includes(filter?.toLowerCase());
    }


    return (
        <div className="border-t border-gray-100 dark:border-gray-800">
            <div className="space-y-6">
                <div className="overflow-hidden bg-white  dark:bg-white/[0.03]">
                    <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-gray-500 dark:text-gray-400">
                                Show
                            </span>
                            <div className="relative z-20 bg-transparent">
                                <select className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" onChange={(e: any) => setPerPage(e.target.value)}>

                                    {[traineeDataArray?.length, 10, 50, page.total]?.map((item, i) => (
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
                            <button className="inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-3 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300 ">
                                Download
                                <Download size={16} />
                            </button>
                        </div>
                    </div>
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
                                                    <button className="flex flex-col gap-0.5" onClick={() => setSortByAsc(!sortByAsc)}>
                                                        <ChevronsUpDown size={18} className='dark:text-gray-700'
                                                        />
                                                    </button>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {traineeDataArray?.length == 0 ? (
                                        <tr>
                                            <td className='dark:text-white text-center p-10' colSpan={8}>No data found...</td>
                                        </tr>
                                    ) : traineeDataArray
                                        ?.filter(filterTrainee)
                                        ?.sort((a: any, b: any) =>
                                            sortByAsc
                                                ? a.last_name.localeCompare(b.last_name)
                                                : b.last_name.localeCompare(a.last_name)
                                        )
                                        ?.map((trainee, i) => (
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
                                                                {trainee?.last_name}, {trainee?.first_name}
                                                            </p>
                                                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                                {trainee?.email}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className=" px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap">
                                                    <span>
                                                        {formatCityAndState(trainee?.city, trainee?.state)}
                                                    </span>
                                                </td>
                                                <td className=" px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap">
                                                    <span>
                                                        {trainee?.goal}
                                                    </span>
                                                </td>
                                                <td className=" px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap">
                                                    <span>
                                                        {trainee?.current_weight} lbs
                                                    </span>
                                                </td>
                                                <td className=" px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap">
                                                    <span>
                                                        {trainee?.goal_weight} lbs
                                                    </span>
                                                </td>
                                                <td className=" px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500">
                                                        {getStrictnessLevel(trainee?.strictness_level)}
                                                    </span>
                                                </td>
                                                <td className=" px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                                                    {formatDate(trainee?.created_at)}
                                                </td>
                                                <td className=" px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap">
                                                    <ActionButton
                                                        handleOpen={() => handleOpen(trainee)}
                                                        handleRemoveTrainee={() => handleRemoveTrainee(trainee?.user_id)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
                        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                            <div className="pb-3 xl:pb-0">
                                <p className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
                                    Showing {page.from} to {page.to} of {page.total} entries
                                </p>
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
                                    onClick={() =>
                                        setPageNumber(page.currentPage == 1 ? 1 : page.currentPage - 1)
                                    }
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() =>
                                        setPageNumber(
                                            page.currentPage == page.lastPage
                                                ? page.currentPage
                                                : page.currentPage + 1
                                        )
                                    }
                                    className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TraineeTable

type ActionButtonProps = {
    handleRemoveTrainee: () => void,
    handleOpen: () => void,
}

const ActionButton = ({ handleRemoveTrainee, handleOpen }: ActionButtonProps) => {
    return (<div className="flex items-center w-full gap-3">
        <button className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500">
            <Trash2 size={16} onClick={handleRemoveTrainee} />
        </button>
        <button className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
            <Pencil size={16} onClick={handleOpen} />
        </button>
    </div>)
}