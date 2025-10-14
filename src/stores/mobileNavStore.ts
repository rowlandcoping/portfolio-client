import { create } from 'zustand';

interface MobileNavState {
    lastFocused: HTMLElement | null
    setLastFocused: (el: HTMLElement | null) => void
    currentRoutePathname: string,
    setCurrentRoutePathname: (path: string) => void,
  
}

export const useMobileNavStore = create<MobileNavState>((set) => ({
    currentRoutePathname: '/',
    setCurrentRoutePathname: (el) => set({ currentRoutePathname: el }),
    lastFocused: null,
    setLastFocused: (el) => set({ lastFocused: el }),
}))