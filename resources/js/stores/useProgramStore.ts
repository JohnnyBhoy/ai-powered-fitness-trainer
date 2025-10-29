import { WeeklyProgram } from '@/types/weekly-program'
import { DailyProgramData } from '@/utils/data/program'
import { create } from 'zustand'

type ProgramStore = {
    update: boolean
    setUpdate: (update: boolean) => void
    weeklyPrograms: WeeklyProgram[]
    dailyProgram: WeeklyProgram
    setWeeklyPrograms: (weeklyPrograms: WeeklyProgram[]) => void
    setDailyProgram: (dailyProgram: WeeklyProgram) => void
}

export const useProgramStore = create<ProgramStore>((set) => ({
    update: false,
    setUpdate: (update: boolean) => set({ update: update }),
    weeklyPrograms: [],
    dailyProgram: DailyProgramData,
    setWeeklyPrograms: (weeklyPrograms: WeeklyProgram[]) => set({ weeklyPrograms: weeklyPrograms }),
    setDailyProgram: (dailyProgram: WeeklyProgram) => set({ dailyProgram: dailyProgram }),
}))


type TrialProgramStore = {
    trialPrograms: WeeklyProgram[],
    editTrialByDay: boolean,
    setTrialPrograms: (trialPrograms: WeeklyProgram[]) => void,
    setEditTrialByDay: (editTrialByDay: boolean) => void,
}

export const useTrialProgramStore = create<TrialProgramStore>((set) => ({
    trialPrograms: [],
    editTrialByDay: false,
    setTrialPrograms: (trialPrograms: WeeklyProgram[]) => set({ trialPrograms: trialPrograms }),
    setEditTrialByDay: (editTrialByDay: boolean) => set({ editTrialByDay: editTrialByDay }),
}))