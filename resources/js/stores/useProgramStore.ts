import { WeeklyProgram } from '@/types/weekly-program'
import { create } from 'zustand'

type ProgramStore = {
    update: boolean
    setUpdate: (update: boolean) => void
    weeklyPrograms: WeeklyProgram[]
    setWeeklyPrograms: (weeklyPrograms: WeeklyProgram[]) => void
}

export const useProgramStore = create<ProgramStore>((set) => ({
    update: false,
    setUpdate: (update: boolean) => set({ update: update }),
    weeklyPrograms: [],
    setWeeklyPrograms: (weeklyPrograms: WeeklyProgram[]) => set({ weeklyPrograms: weeklyPrograms }),
}))


type TrialProgramStore = {
    trialPrograms: WeeklyProgram[]
    setTrialPrograms: (trialPrograms: WeeklyProgram[]) => void
}

export const useTrialProgramStore = create<TrialProgramStore>((set) => ({
    trialPrograms: [],
    setTrialPrograms: (trialPrograms: WeeklyProgram[]) => set({ trialPrograms: trialPrograms }),
}))