import { useNutritionStore } from "@/stores/useNutritionStore"

export default function Update() {
    // Global states from nutrition store
    const { showUpdatePlan, activePlan } = useNutritionStore();

    console.log('active plan : ', activePlan);

    return (
        <div className={`${showUpdatePlan ? '' : 'hidden'}`}>
            <div className="flex justify-between dark:text-white/90">
                <h1>Program Name : Halthy Fit</h1>
                <h6>Week number : {activePlan?.week_number ?? 1}</h6>
            </div>
            <h3>{activePlan?.nutrition_plan}</h3>
        </div >
    )
}
