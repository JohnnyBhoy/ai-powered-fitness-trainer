import { create } from "zustand";

interface DashboardData {
  totalTrainees: number;
  totalTrainers: number;
  monthlyTrainees: Record<string, number>;
  monthlyUsers: number[];
  usersPercentageComparedLastMonth: number;
  gopeakfitTraineesPercentageComparedLastMonth: number;
  nonGopeakfitTraineesPercentageComparedLastMonth: number;
  trainersPercentageComparedLastMonth: number;
  traineesPerStates: any[];
  recentTrainees: any[];
  monthlyGpfTrainees: Record<string, number>;
  monthlyNonGpfTrainees: Record<string, number>;
}

interface DashboardStore {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  isExpanded: boolean;
  fetchDashboardData: () => Promise<void>;
  setIsExpanded: (isExpanded: boolean) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  data: null,
  loading: false,
  error: null,
  isExpanded: false,

  fetchDashboardData: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/admin/get-data");
      if (!res.ok) throw new Error("Failed to fetch dashboard data");

      const data = await res.json();
      set({ data, loading: false });
    } catch (err: any) {
      console.error("Dashboard fetch error:", err);
      set({ error: err.message || "Unknown error", loading: false });
    }
  },
  setIsExpanded: (isExpanded: boolean) => set({ isExpanded: isExpanded }),
}));