import React from "react";
import PersonalInfo from "./Create/PersonalInfo";
import Address from "./Create/Address";
import { useForm } from "@inertiajs/react";
import { TraineeFormData } from "@/types/gpf";
import { toast } from "sonner";

const Create: React.FC = () => {
    // Form Data
    const { data, setData, post, processing, errors, reset } = useForm<TraineeFormData>({
        first_name: '',
        last_name: '',
        email: '',
        user_name: '',
        password: '',
        role: 3,
        is_promo: 0,
        trainer_id: undefined,
        city: '',
        state: '',
        phone_number: '',
        age: '',
        sex: '',
        current_weight: '',
        goal_weight: '',
        fitness_level: '',
        equipment_access: '',
        food_allergies: '',
        strictness_level: 1,
    });

    // Create trainee
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
            post('/admin/trainee/store', {
                onSuccess: () => {
                    reset();
                    toast.success('Trainee created successfully.');
                },
                onError: (error: any) => toast.error(error?.message)
            });
        } catch (error) {
            toast.error('Unable to save trainee, please try again.')
        }
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6">
                        <PersonalInfo
                            data={data}
                            setData={setData}
                            errors={errors}
                        />
                        <Address
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create
