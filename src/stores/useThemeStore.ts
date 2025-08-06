import { create } from 'zustand';
import type { ThemeTypes } from '../types/themeStore';

export const useAuthStore = create<ThemeTypes>((set) => ({
    theme: "green",
    setTheme: (val: string) => set({ theme: val }),
}));