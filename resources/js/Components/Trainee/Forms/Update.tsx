import BiometricsInformation from "@/Pages/Admin/Trainee/Forms/BiometricsInformation";
import GoalsInformation from "@/Pages/Admin/Trainee/Forms/GoalsInformation";
import PersonalInformation from "@/Pages/Admin/Trainee/Forms/PersonalInformation";
import { useGpfStore } from "@/stores/useGpfStore";
import { useTraineeStore } from "@/stores/useTraineeStore";
import { useForm } from "@inertiajs/react";
import { Edit2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Nutrition from "./Nutrition";
import Program from "./Program";
import Prompt from "./Prompt";

export default function Update() {
    // Global states
    const { traineeData, showProgram, showNutrition, showPrompt } = useTraineeStore();
    const { setRefetchData, refetchData } = useGpfStore();

    // Constants
    const UPDATE_USER_URL = import.meta.env.VITE_UPDATE_USER as string;
    const UPDATE_BIOMETRIC_URL = import.meta.env.VITE_UPDATE_BIOMETRICS;
    const UPDATE_GOALS_URL = import.meta.env.VITE_UPDATE_GOALS as string;

    // Local state
    const [isNowSaving, setIsNowSaving] = useState<number>(1);

    // Form data
    const { data, setData, put, processing, errors } = useForm({
        user_id: traineeData?.user_id ?? 0,
        first_name: traineeData?.first_name ?? "",
        last_name: traineeData?.last_name ?? "",
        user_name: traineeData?.user_name ?? "",
        email: traineeData?.email ?? "",
        role: traineeData?.role ?? "",
        is_active: traineeData?.is_active ?? "",
        is_promo: traineeData?.is_promo ?? "",
        trainer_id: traineeData?.trainer_id ?? "",
        email_verified_at: traineeData?.email_verified_at ?? "",
        created_at: traineeData?.created_at ?? "",
        city: traineeData?.city ?? "",
        state: traineeData?.state ?? "",
        age: traineeData?.age ?? "",
        phone_number: traineeData?.phone_number ?? "",
        sex: traineeData?.sex ?? "",
        strictness_level: traineeData?.strictness_level ?? "",
        current_weight: traineeData?.current_weight ?? "",
        goal_weight: traineeData?.goal_weight ?? "",
        fitness_level: traineeData?.fitness_level ?? "",
        food_allergies: traineeData?.food_allergies ?? "",
        equipment_access: traineeData?.equipment_access ?? "",
        goal: traineeData?.goal ?? "",
        why: traineeData?.why ?? "",
        past_obstacles: traineeData?.past_obstacles ?? "",
        current_struggles: traineeData?.current_struggles ?? "",
    });

    // Update account info
    const handleUpdateAccountInformation = (e: React.FormEvent) => {
        e.preventDefault();

        put(`${UPDATE_USER_URL}/${traineeData?.user_id}`, {
            onSuccess: () => {
                toast.success("Trainee account updated successfully!");
                setRefetchData(!refetchData);
            },
            onError: (errors) => {
                Object.values(errors).forEach((message) => toast.error(message as string));
            },
        });
    };

    // Update Biometrics
    const handleUpdateBiometrics = (e: React.FormEvent) => {
        e.preventDefault();

        put(`${UPDATE_BIOMETRIC_URL}/${traineeData?.user_id}`, {
            onSuccess: () => {
                toast.success("User biometrics updated successfully!");
                setRefetchData(!refetchData);
            },
            onError: (errors) =>
                Object.values(errors).forEach((message) =>
                    toast.error(message as string)
                ),
        });
    };

    // Update trainee goal handler
    const handleUpdateGoals = (e: React.FormEvent) => {
        e.preventDefault();

        put(`${UPDATE_GOALS_URL}/${traineeData?.user_id}`, {
            onSuccess: () => {
                toast.success("Trainee goals updated successfully!");
                setRefetchData(!refetchData);
            },
            onError: (errors) => {
                Object.values(errors).forEach((message) => toast.error(message as string));
            },
        });
    };

    return (
        <div className="dark:bg-gray-900">
            {showProgram && <Program data={traineeData} />}

            {showNutrition && <Nutrition data={traineeData} />}

            {showPrompt && <Prompt data={traineeData} />}

            {/*<Goals data={traineeData} /> */}

            <div className={`${showProgram || showNutrition || showPrompt ? 'hidden' : ''} flex gap-7`}>
                <PersonalInformation
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleUpdateAccountInformation}
                    isNowSaving={isNowSaving}
                    setIsNowSaving={() => setIsNowSaving(1)}
                />
                <div className="w-full space-y-7">
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-7 ">
                        <WeeklyWorkoutPlan />
                        <WeeklyNutritionPlan />
                        <Prompts />
                    </div>

                    <BiometricsInformation
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={handleUpdateBiometrics}
                        isNowSaving={isNowSaving}
                        setIsNowSaving={() => setIsNowSaving(2)}
                    />
                    <GoalsInformation
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={handleUpdateGoals}
                        isNowSaving={isNowSaving}
                        setIsNowSaving={() => setIsNowSaving(3)}
                    />
                </div>
            </div>
        </div>
    );
}

const WeeklyWorkoutPlan = () => {
    const { setShowProgram, setShowNutrition, setShowPrompt } = useTraineeStore();

    const handleShowProgram = () => {
        setShowProgram(true);
        setShowNutrition(false);
        setShowPrompt(false);
    }

    return <button
        className="dark:text-white/90 dark:bg-white/[0.03] p-2 border dark:border-gray-700 border-gray-300 shadow flex justify-between"
        onClick={handleShowProgram}>
        Workout Program
        <Edit2 size={20} />
    </button>
}


const WeeklyNutritionPlan = () => {
    const { setShowNutrition, setShowProgram, setShowPrompt } = useTraineeStore();

    const handleShowNutrition = () => {
        setShowProgram(false);
        setShowNutrition(true);
        setShowPrompt(false);
    }

    return <button className="dark:text-white/90 dark:bg-white/[0.03] p-2 border dark:border-gray-700  border-gray-300 shadow  flex justify-between"
        onClick={handleShowNutrition}
    >
        Nutrition Plan
        <Edit2 size={20} />
    </button>
}

const Prompts = () => {
    const { setShowNutrition, setShowProgram, setShowPrompt } = useTraineeStore();

    const handleShowNutrition = () => {
        setShowProgram(false);
        setShowNutrition(false);
        setShowPrompt(true);
    }

    return <button className="dark:text-white/90 dark:bg-white/[0.03] p-2 border dark:border-gray-700  border-gray-300 shadow  flex justify-between"
        onClick={handleShowNutrition}>
        Prompt
        <Edit2 size={20} />
    </button>
}