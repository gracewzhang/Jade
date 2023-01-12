import create from 'zustand';
import { persist } from 'zustand/middleware';
import { StoreResults } from './types';

const useStore = create<StoreResults>()(
  persist(
    (set) => ({
      user: undefined,
      setUser: (user) => set({ user })
    }),
    { name: 'user-storage' }
  )
);

export default useStore;
