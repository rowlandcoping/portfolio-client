import { create } from 'zustand';

interface MobileNavState {
  lastFocused: HTMLElement | null
  setLastFocused: (el: HTMLElement | null) => void
  contentHeight: number
  setContentHeight: (height: number) => void
}

export const useMobileNavStore = create<MobileNavState>((set) => ({
    lastFocused: null,
    setLastFocused: (el) => set({ lastFocused: el }),
    contentHeight: 0,
    setContentHeight: (height) => set({ contentHeight: height }),
}))