import { create } from 'zustand';

type KeyboardNavState = {
  enabled: boolean;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  linkCount: number;
  setLinkCount: (count: number) => void;
  previousPage: string;
  activePage: number;
  setActivePage: (index: number) => void;
  maxIndex: number;
  setMaxIndex: (index: number) => void;
  incrementPage: () => void;
  decrementPage: () => void;
  setEnabled: (enabled: boolean) => void;
  setPreviousPage: (previousPage: string) => void;
  next: () => void;
  prev: () => void;
};

export const useKeyboardNavStore = create<KeyboardNavState>((set, get) => ({
    enabled: true,
    focusedIndex: 0,
    setFocusedIndex: (focusedIndex) => set({ focusedIndex }),
    linkCount: 0,         // new
    setLinkCount: (linkCount) => set({ linkCount }),   
    activePage: 0,
    maxIndex: 0,
    previousPage: '/',
    setEnabled: (enabled) => set({ enabled }),
    setPreviousPage: (previousPage) => set({ previousPage }),
    setActivePage: (activePage) => set({ activePage }),
    setMaxIndex: (maxIndex) => set({ maxIndex }),
    next: () => {
        const state = get();
        console.log(state.linkCount);
        if (!state.enabled) return;
        const nextIndex = (state.focusedIndex + 1) % (state.linkCount + 1);
        set({ focusedIndex: nextIndex });
    },
    prev: () => {
        const state = get();
        if (!state.enabled) return;
        const prevIndex = (state.focusedIndex - 1 + (state.linkCount + 1)) % (state.linkCount + 1);
        set({ focusedIndex: prevIndex });
    },
    incrementPage: () =>
        //setActivePage(Math.min(activePage + 1, maxIndex));
        //NB in zustand we use set to update state if we're calling function in the store
        set((state) => ({
            activePage: Math.min(state.activePage + 1, state.maxIndex),
        })),
    decrementPage: () => 
        set((state) => ({
            activePage: Math.max(state.activePage - 1, 0),
        })),    
}));