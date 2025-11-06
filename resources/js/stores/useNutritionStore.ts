import { Plan } from '@/types/weekly-nutrition'
import { create } from 'zustand'

type NutritionStore = {
    showUpdatePlan: boolean
    activePlan: Plan,
    setShowUpdatePlan: (showUpdatePlan: boolean) => void
    setActivePlan: (activePlan: Plan) => void
}

export const useNutritionStore = create<NutritionStore>((set) => ({
    showUpdatePlan: false,
    activePlan: {
        id: 0,
        user_id: 0,
        first_name: "",
        last_name: "",
        email: "",
        week_number: 1,
        nutrition_plan: "",
        created_at: "",
    },
    setShowUpdatePlan: (showUpdatePlan: boolean) => set({ showUpdatePlan: showUpdatePlan }),
    setActivePlan: (activePlan: Plan) => set({ activePlan: activePlan }),
}))
