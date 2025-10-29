import GoalsInformation from "@/Pages/Admin/Trainee/Forms/GoalsInformation";
import { useGpfStore } from "@/stores/useGpfStore";
import { useTraineeStore } from "@/stores/useTraineeStore";
import { router, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { toast } from "sonner";
import Address from "./Create/Address";
import PersonalInfo from "./Create/PersonalInfo";

const Create: React.FC = () => {
    // Global states
    const { setUpdateTrainee } = useTraineeStore();
    const { setShowAddTraineeForm } = useGpfStore();

    // Local state
    const [isNowSaving, setIsNowSaving] = useState<number>(1);

    // Form Data
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        user_name: "",
        email: "",
        password: "",
        role: 3,
        is_active: 1,
        is_promo: 0,
        city: "",
        state: "",
        age: 0,
        phone_number: "",
        sex: "",
        strictness_level: 1,
        current_weight: 0,
        goal_weight: 0,
        fitness_level: "",
        food_allergies: "",
        equipment_access: "",
        goal: "",
        why: "",
        past_obstacles: "",
        current_struggles: "",
    });

    const optionalInputs = ["is_promo"];

    // Create trainee
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Data validation
        for (const [key, value] of Object.entries(data)) {
            if (value == "" && !optionalInputs?.includes(key)) {
                return toast.error(`${key} is required.`);
                break;
            }
        }

        try {
            post('/admin/trainee/store', {
                onSuccess: () => {
                    reset();
                    toast.success('Trainee created successfully.');

                    setShowAddTraineeForm(false);
                    setUpdateTrainee(false);

                    router.visit('/admin/gpf-trainees');
                },
                onError: (error: any) => {
                    toast.error(Object.values(error));
                    console.log('errro:', error);
                }
            });
        } catch (error) {
            toast.error('Unable to save trainee, please try again.')
        }
    };

    return (
        <div className="rounded-2xl">
            <div className="">
                <form onSubmit={handleSubmit}>
                    <div className="flex w-full gap-6">
                        <div className="w-[30%]">
                            <PersonalInfo
                                data={data}
                                setData={setData}
                                errors={errors}
                            />
                        </div>
                        <div className="w-[70%]">
                            <div className="flex flex-col space-y-6">
                                <Address
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    processing={processing}
                                />
                                <GoalsInformation
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    processing={processing}
                                    isNowSaving={isNowSaving}
                                    setIsNowSaving={() => { }}
                                    onSubmit={() => { }}
                                />
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create
