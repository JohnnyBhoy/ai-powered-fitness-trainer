import { useGpfStore } from '@/stores/useGpfStore'
import { useTraineeStore } from '@/stores/useTraineeStore'
import { TABLE_HEAD } from '@/utils/data/TableHead'
import { formatCityAndState } from '@/utils/functions'
import { getStrictnessLevel } from '@/utils/functions/helperFunctions'
import { useForm } from '@inertiajs/react'
import { ChevronsUpDown } from 'lucide-react'
import { toast } from 'sonner'
import ActionButton from './Create/ActionButton'

export default function Table() {
    // Form data
    const { delete: destroy } = useForm();
    const { refetchData, setRefetchData } = useGpfStore();

    // Global states
    const { traineeDataArray,
        filter,
        setSortByAsc,
        sortByAsc,
        setTraineeData,
        setUpdateTrainee,
    } = useTraineeStore();

    // Delete trainee handler
    const handleRemoveTrainee = (id: number) => {
        if (!confirm('Are you sure you want to delete this trainee?')) return;

        try {
            destroy(route('users.destroy', id), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Trainee has been removed!');
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


    // Open update trainee form
    const handleOpen = (trainee: any) => {
        setUpdateTrainee(true);
        setTraineeData(trainee);
    }


    return (
        <table className="min-w-full  undefined">
            <thead>
                <tr>
                    {TABLE_HEAD.map((head, i) => (
                        <th
                            key={i}
                            className=" px-4 py-3 bg-black text-gray-300 border border-gray-100 dark:border-white/[0.03]">
                            <div className="flex items-center justify-between cursor-pointer">
                                <div className="gap-3">
                                    <span className="font-medium text-gray-300 text-theme-xs dark:text-gray-400">
                                        {head}
                                    </span>
                                </div>
                                <button className="flex flex-col gap-0.5" onClick={() => setSortByAsc(!sortByAsc)}>
                                    <ChevronsUpDown size={12} className='dark:text-gray-700'
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
                                    {trainee?.goal?.substring(0, 30) ?? "Not Specify"}...
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
                                <ActionButton
                                    handleOpen={() => handleOpen(trainee)}
                                    handleRemoveTrainee={() => handleRemoveTrainee(trainee?.user_id)}
                                />
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}
