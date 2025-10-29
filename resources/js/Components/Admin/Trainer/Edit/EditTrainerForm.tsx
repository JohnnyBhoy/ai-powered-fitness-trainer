import FormTitle from '@/Components/Form/FormTitle';
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
            className={`${!isEdit && 'hidden'} mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md space-y-4`}
        >
            <FormTitle title="Trainer Update Form" action={() => setIsEdit(false)} />

            <div className="grid grid-cols-2 gap-24">
                {/* First Name */}
                <MtTextInput
                    name="first_name"
                    data={data.first_name}
                    type="text"
                    onChange={(e: any) => setData("first_name", e.target.value)} error={undefined} />
                {errors.first_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
                )}

                {/* Last Name */}
                <MtTextInput
                    name="last_name"
                    data={data.last_name}
                    type="text"
                    onChange={(e: any) => setData("last_name", e.target.value)} error={undefined} />
                {errors.last_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
                )}
            </div>

            {/* Username */}
            <MtTextInput
                name="user_name"
                data={data.user_name}
                type="text"
                onChange={(e: any) => setData("user_name", e.target.value)} error={undefined} />
            {errors.user_name && (
                <p className="text-red-500 text-xs mt-1">{errors.user_name}</p>
            )}

            {/* Email */}
            <MtTextInput
                name="email"
                data={trainerData?.email}
                type="email"
                onChange={() => []} error={undefined} />

            {/* Password */}
            <MtTextInput
                name="password"
                data="***********"
                type="password"
                onChange={() => { }} error={undefined} />

            <div className="flex justify-end">
                <div className="lg:grid grid-cols-2 gap-6">
                    <Button
                        type="button"
                        onClick={() => setIsEdit(false)}
                        className="w-full mt-4 bg-gray-100 border dark:bg-gray-700 dark:hover:bg-gray-900 hover:bg-gray-300 dark:text-white text-black"
                    >
                        Close
                    </Button>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full mt-4 bg-black dark:bg-gray-700 dark:hover:bg-gray-900 hover:bg-gray-800 text-white flex place-items-center gap-2 justify-center"
                    >
                        {processing ? <><Loader className='animate-spin' /> Saving...</> : "Update Trainer"}
                    </Button>
                </div>
            </div>

        </form>
    )
}
