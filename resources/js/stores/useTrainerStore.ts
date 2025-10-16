import { TrainersProps } from '@/types/gpf';
import { create } from 'zustand';

export type TrainerProps = {
    id: number;
    first_name: string;
    last_name: string;
    user_name: string;
    email: string;
    email_verified_at: string | null;
    is_active: number;
    is_promo: number;
    role: number;
    trainer_id: number | null;
    created_at: string;
    updated_at: string;
    trainees: any | null;
};

// Define pagination type
interface PageInfo {
    from: number;
    to: number;
    total: number;
    currentPage: number;
    lastPage: number;
}

// Define the store shape
interface TrainerStore {
    perPage: number;
    pageNumber: number;
    open: boolean;
    refetchData: boolean;
    trainerData: TrainersProps | null;
    trainerDataArray: TrainersProps[];
    filter: string;
    page: PageInfo;
    showAddTrainerForm: boolean;
    sortByAsc: boolean;
    isEdit: boolean,
    reload: boolean,

    // Setters
    setPerPage: (perPage: number) => void;
    setPageNumber: (pageNumber: number) => void;
    setOpen: (open: boolean) => void;
    setRefetchData: (refetchData: boolean) => void;
    setTrainerData: (trainer: TrainersProps | null) => void;
    setTrainerDataArray: (trainers: TrainersProps[]) => void;
    setFilter: (filter: string) => void;
    setPage: (page: Partial<PageInfo>) => void;
    resetStore: () => void;
    setShowAddTrainerForm: (showAddTraineeForm: boolean) => void;
    setSortByAsc: (sortByAsc: boolean) => void;
    setIsEdit: (isEdit: boolean) => void;
    setReload: (reload: boolean) => void;
}

export const useTrainerStore = create<TrainerStore>((set) => ({
    perPage: 10,
    pageNumber: 1,
    open: false,
    refetchData: false,
    trainerData: null,
    trainerDataArray: [],
    filter: '',
    page: {
        from: 1,
        to: 10,
        total: 10,
        currentPage: 1,
        lastPage: 1,
    },
    showAddTrainerForm: false,
    sortByAsc: false,
    isEdit: false,
    reload: false,

    setPerPage: (perPage) => set({ perPage }),
    setPageNumber: (pageNumber) => set({ pageNumber }),
    setOpen: (open) => set({ open }),
    setRefetchData: (refetchData) => set({ refetchData }),
    setTrainerData: (trainer) => set({ trainerData: trainer }),
    setTrainerDataArray: (trainers) => set({ trainerDataArray: trainers }),
    setFilter: (filter) => set({ filter }),
    setPage: (page) => set((state) => ({ page: { ...state.page, ...page } })),
    resetStore: () =>
        set({
            perPage: 10,
            pageNumber: 1,
            open: false,
            trainerData: null,
            trainerDataArray: [],
            filter: '',
            page: {
                from: 1,
                to: 10,
                total: 10,
                currentPage: 1,
                lastPage: 1,
            },
        }),
    setShowAddTrainerForm: (showAddTrainerForm) => set({ showAddTrainerForm }),
    setSortByAsc: (sortByAsc) => set({ sortByAsc }),
    setIsEdit: (isEdit) => set({ isEdit }),
    setReload: (reload) => set({ reload }),
}));
