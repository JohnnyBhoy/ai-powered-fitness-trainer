import { create } from 'zustand'

type GpfStore = {
    refetchData: boolean
    showAddTraineeForm: boolean
    setRefetchData: (refetchData: boolean) => void
    setShowAddTraineeForm: (showAddTraineeForm: boolean) => void
}

export const useGpfStore = create<GpfStore>((set) => ({
    refetchData: false,
    showAddTraineeForm: false,
    setRefetchData: (refetchData: boolean) => set({ refetchData: refetchData }),
    setShowAddTraineeForm: (showAddTraineeForm: boolean) => set({ showAddTraineeForm: showAddTraineeForm }),
}))
