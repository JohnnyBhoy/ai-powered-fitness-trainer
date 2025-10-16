import MtTextInput from '@/Components/MtTextInput';
import { useTrainerStore } from '@/stores/useTrainerStore';
import { useForm } from '@inertiajs/react'
import { Button } from '@material-tailwind/react';
import { Loader } from 'lucide-react';
import React, { useEffect } from 'react'
import { toast } from 'sonner';

export default function EditTrainerForm() {
    const UPDATE_TRAINER_URL = import.meta.env.VITE_UPDATE_USER as string;
    // Global states
    const { setIsEdit, isEdit, trainerData, reload, setReload } = useTrainerStore();

    // Data to be submitted
    const { data, setData, put, processing, errors, reset } = useForm({
        first_name: trainerData?.first_name ?? "",
        last_name: trainerData?.last_name ?? "",
        user_name: trainerData?.user_name ?? "",
    });

    // Submit trainer
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Data validation
        for (const [key, value] of Object.entries(data)) {
            if (value == "") {
                return toast.error(`${key} is required.`);
                break;
            }
        }

        try {
            put(`${UPDATE_TRAINER_URL}/${trainerData?.id}`, {
                onSuccess: () => {
                    toast.success("Trainer account updated successfully!");
                    setReload(!reload);
                    setIsEdit(false);
                },
                onError: (errors) => {
                    // Option 1: Loop all validation messages
                    Object.values(errors).forEach((message) => toast.error(message as string));
                },
            });
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        setData('first_name', trainerData?.first_name ?? "");
        setData('last_name', trainerData?.last_name ?? "");
        setData('user_name', trainerData?.user_name ?? "");
    }, [trainerData]);

    console.log(trainerData);

    return (
        <form
            onSubmit={handleSubmit}
            className={`${!isEdit && 'hidden'} max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md space-y-4 mt-10`}
        >
            <h2 className="text-2xl font-semibold text-center mb-4 dark:text-gray-300">
                Edit Trainer
            </h2>

            <div className="grid grid-cols-2 gap-3">
                {/* First Name */}
                <MtTextInput
                    name="first_name"
                    data={data.first_name}
                    type="text"
                    onChange={(e: any) => setData("first_name", e.target.value)}
                />
                {errors.first_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
                )}

                {/* Last Name */}
                <MtTextInput
                    name="last_name"
                    data={data.last_name}
                    type="text"
                    onChange={(e: any) => setData("last_name", e.target.value)}
                />
                {errors.last_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
                )}
            </div>

            {/* Username */}
            <MtTextInput
                name="user_name"
                data={data.user_name}
                type="text"
                onChange={(e: any) => setData("user_name", e.target.value)}
            />
            {errors.user_name && (
                <p className="text-red-500 text-xs mt-1">{errors.user_name}</p>
            )}

            {/* Email */}
            <MtTextInput
                name="email"
                data={trainerData?.email}
                type="email"
                onChange={() => []}
            />

            {/* Password */}
            <MtTextInput
                name="password"
                data="***********"
                type="password"
                onChange={() => { }}
            />

            <div className="lg:grid grid-cols-2 gap-6">
                <Button
                    type="button"
                    onClick={() => setIsEdit(false)}
                    className="w-full mt-4 bg-torq dark:bg-gray-700 dark:hover:bg-gray-900 hover:bg-blue-700 text-white"
                >
                    Close
                </Button>

                <Button
                    type="submit"
                    disabled={processing}
                    className="w-full mt-4 bg-torq dark:bg-gray-700 dark:hover:bg-gray-900 hover:bg-blue-700 text-white flex place-items-center gap-2 justify-center"
                >
                    {processing ? <><Loader className='animate-spin' /> Saving...</> : "Update Trainer"}
                </Button>
            </div>
        </form>
    )
}
