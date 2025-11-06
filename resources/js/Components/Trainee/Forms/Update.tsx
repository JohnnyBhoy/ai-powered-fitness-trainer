import PageBreadcrumb from "@/common/PageBreadCrumb";
import { useGpfStore } from "@/stores/useGpfStore";
import { useTraineeStore } from "@/stores/useTraineeStore";
import { GpfTraineeProps } from "@/types/gpf";
import { ArrowLeft } from "lucide-react";
import TraineeAddressCard from "../TraineeProfile/TraineeAddressCard";
import TraineeGoalCard from "../TraineeProfile/TraineeGoalCard";
import TraineeInfoCard from "../TraineeProfile/TraineeInfoCard";
import TraineeMetaCard from "../TraineeProfile/TraineeMetaCard";
import Nutrition from "./Nutrition";
import Program from "./Program";
import Prompt from "./Prompt";

export default function Update() {
    // Global states
    const { traineeData, showProgram, showNutrition, showPrompt, showAnalytics } = useTraineeStore();

    // Hide this update and show trainees lists table
    const { setUpdateTrainee } = useTraineeStore();
    const { setShowAddTraineeForm } = useGpfStore();
    const handleShowTraineeTable = () => {
        setUpdateTrainee(false);
        setShowAddTraineeForm(false);
    }


    const isOpenProgram = () => {
        return showProgram && !showNutrition && !showPrompt;
    }

    return (
        <>
            <PageBreadcrumb pageTitle="Trainee Profile" />
            <div className={`${showProgram || showNutrition || showPrompt || showAnalytics ? 'hidden' : ''} 
            rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6`}>
                <div className="flex justify-between">
                    <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                        {traineeData?.first_name} {traineeData?.last_name} Profile
                    </h3>
                    <button className="dark:text-white/90 flex place-items-center gap-1" onClick={handleShowTraineeTable}>
                        <ArrowLeft />back
                    </button>
                </div>

                <div className="space-y-6">
                    <TraineeMetaCard />
                    <TraineeInfoCard />
                    <TraineeAddressCard />
                    <TraineeGoalCard />
                </div>
            </div>

            <Analytics trainee={traineeData} />

            {isOpenProgram() && <Program data={traineeData} />}


            <Nutrition data={traineeData} />

            {showPrompt && <Prompt data={traineeData} />}
        </>
    );
}

const Analytics = ({ trainee }: { trainee: GpfTraineeProps | null }) => {
    const { showAnalytics, setShowAnalytics } = useTraineeStore();

    return <div className={`${showAnalytics ? "" : "hidden"} gap-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6`}>
        <div className="flex justify-between dark:text-white/90">
            <h3>Analytics</h3>
            <button onClick={() => setShowAnalytics(false)} className="flex place-items-center mb-5 gap-1">
                <ArrowLeft />back
            </button>
        </div>
        <div className="grid grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-200 p-6 dark:text-white/90">
                <h1>{trainee?.first_name} Progress</h1>
                program charts overview
            </div>

            <div className="rounded-2xl border border-gray-200 p-6 dark:text-white/90">
                <h1>Weekly Progress</h1>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6 dark:text-white/90">
                Monthly Progress
            </div>

            <div className="rounded-2xl border border-gray-200 p-6 dark:text-white/90">
                Statistics
            </div>
        </div>

    </div>
}