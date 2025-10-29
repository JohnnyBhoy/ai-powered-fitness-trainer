import { create } from 'zustand';
import { GpfTraineeProps } from '@/types/gpf';

interface PageInfo {
    from: number;
    to: number;
    total: number;
    currentPage: number;
    lastPage: number;
}

interface TraineeStore {
    strictnessLevel: number;
    perPage: number;
    pageNumber: number;
    traineeData: GpfTraineeProps | null;
    traineeDataArray: GpfTraineeProps[];
    filter: string;
    loading: boolean;
    sortByAsc: boolean;
    updateTrainee: boolean;
    page: PageInfo;
    showProgram: boolean;
    showNutrition: boolean;
    showPrompt: boolean;

    // Actions
    setStrictnessLevel: (level: number) => void;
    setPerPage: (perPage: number) => void;
    setPageNumber: (num: number) => void;
    setTraineeData: (data: GpfTraineeProps) => void;
    setTraineeDataArray: (data: GpfTraineeProps[]) => void;
    setFilter: (filter: string) => void;
    setLoading: (loading: boolean) => void;
    setSortByAsc: (value: boolean) => void;
    setUpdateTrainee: (updateTrainee: boolean) => void;
    setPage: (page: Partial<PageInfo>) => void;
    resetStore: () => void;
    setShowProgram: (showProgram: boolean) => void;
    setShowNutrition: (showNutrition: boolean) => void;
    setShowPrompt: (showPrompt: boolean) => void;
}

export const useTraineeStore = create<TraineeStore>((set) => ({
    strictnessLevel: 0,
    perPage: 10,
    pageNumber: 1,
    traineeData: null,
    traineeDataArray: [],
    filter: '',
    loading: false,
    sortByAsc: false,
    updateTrainee: false,
    showProgram: false,
    showNutrition: false,
    showPrompt: false,
    page: {
        from: 1,
        to: 10,
        total: 10,
        currentPage: 1,
        lastPage: 1,
    },

    // Actions
    setStrictnessLevel: (level) => set({ strictnessLevel: level }),
    setPerPage: (perPage) => set({ perPage }),
    setPageNumber: (num) => set({ pageNumber: num }),
    setTraineeData: (data) => set({ traineeData: data }),
    setTraineeDataArray: (data) => set({ traineeDataArray: data }),
    setFilter: (filter) => set({ filter }),
    setLoading: (loading) => set({ loading }),
    setSortByAsc: (value) => set({ sortByAsc: value }),
    setUpdateTrainee: (value) => set({ updateTrainee: value }),
    setPage: (page) =>
        set((state) => ({
            page: { ...state.page, ...page },
        })),
    resetStore: () =>
        set({
            strictnessLevel: 0,
            perPage: 10,
            pageNumber: 1,
            traineeData: null,
            traineeDataArray: [],
            filter: '',
            loading: false,
            sortByAsc: false,
            page: {
                from: 1,
                to: 10,
                total: 10,
                currentPage: 1,
                lastPage: 1,
            },
        }),
    setShowProgram: (showProgram) => set({ showProgram }),
    setShowNutrition: (showNutrition) => set({ showNutrition }),
    setShowPrompt: (showPrompt) => set({ showPrompt }),
}));
