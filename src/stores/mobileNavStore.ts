import { create } from 'zustand';

interface MobileNavState {
  lastFocused: HTMLElement | null
  setLastFocused: (el: HTMLElement | null) => void
  
}

export const useMobileNavStore = create<MobileNavState>((set) => ({
    lastFocused: null,
    setLastFocused: (el) => set({ lastFocused: el }),
}))