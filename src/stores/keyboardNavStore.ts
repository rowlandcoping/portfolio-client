import { create } from 'zustand';

export type KeyboardNavState = {
    enabled: boolean;
    focusedIndex: number;
    setFocusedIndex: (index: number) => void;
    linkCount: number;
    setLinkCount: (count: number) => void;
    returnPage: string;
    setReturnPage: (last: string) => void;
    previousPages: string[];
    pushPage: (path: string) => void
    popPage: () => string | undefined
    activePage: number;
    setActivePage: (index: number) => void;
    maxIndex: number;
    setMaxIndex: (index: number) => void;
    itemsPerPage: number;
    incrementPage: () => void;
    decrementPage: () => void;
    setEnabled: (enabled: boolean) => void;
    next: () => void;
    prev: () => void;
};

export const useKeyboardNavStore = create<KeyboardNavState>((set, get) => ({
    enabled: true,
    itemsPerPage: 5,
    focusedIndex: 0,
    setFocusedIndex: (focusedIndex) => set({ focusedIndex }),
    linkCount: 0,       // new
    setLinkCount: (linkCount) => set({ linkCount }),   
    activePage: 0,
    maxIndex: 0,
    returnPage: '',
    previousPages: ['/'],
    setEnabled: (enabled) => set({ enabled }),
    setActivePage: (activePage) => set({ activePage }),
    setReturnPage: (returnPage) => set({ returnPage }),
    setMaxIndex: (maxIndex) => set({ maxIndex }),
    next: () => {
        const state = get();
        const nextIndex = (state.focusedIndex + 1) % (state.linkCount + 1);
        set({ focusedIndex: nextIndex });
    },
    prev: () => {
        const state = get();
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
    pushPage: (path) =>
        set((state) => ({
            previousPages: [...state.previousPages, path],
        })),

    popPage: () => {
        let last: string | undefined
        set((state) => {
            last = state.previousPages[state.previousPages.length - 1]
            return { previousPages: state.previousPages.slice(0, -1) }
        })
        return last
    },    
}));