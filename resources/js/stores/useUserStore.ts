import { create } from 'zustand'

type UserStore = {
  userId: number | null
  setUserId: (id: number) => void
}

export const useUserStore = create<UserStore>((set) => ({
  userId: null,
  setUserId: (id:number) => set({ userId: id }),
}))
