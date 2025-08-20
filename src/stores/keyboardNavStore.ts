import { create } from 'zustand';
import type { RefObject } from 'react';

export type NavElement = {
    id: string;
    ref: RefObject<HTMLAnchorElement | null>; // match the hook
};

type KeyboardNavState = {
  enabled: boolean;
  elements: NavElement[];
  focusedIndex: number;
  previousPage: string;
  activePage: number;
  setActivePage: (index: number) => void;
  maxIndex: number;
  setMaxIndex: (index: number) => void;
  incrementPage: () => void;
  decrementPage: () => void;
  register: (el: NavElement) => void;
  unregister: (id: string) => void;
  setEnabled: (enabled: boolean) => void;
  setPreviousPage: (previousPage: string) => void;
  next: () => void;
  prev: () => void;
};

export const useKeyboardNavStore = create<KeyboardNavState>((set) => ({
    enabled: true,
    elements: [],
    focusedIndex: 0,
    activePage: 0,
    maxIndex: 0,
    previousPage: '/',
    register: (el) => set((state) => ({ elements: [...state.elements, el] })),
    unregister: (id) =>
        set((state) => ({ elements: state.elements.filter((e) => e.id !== id) })),
    setEnabled: (enabled) => set({ enabled }),
    setPreviousPage: (previousPage) => set({ previousPage }),
    setActivePage: (activePage) => set({ activePage }),
    setMaxIndex: (maxIndex) => set({ maxIndex }),
    next: () =>
        set((state) => {
            if (!state.enabled || state.elements.length === 0) return {};
            const nextIndex = (state.focusedIndex + 1) % state.elements.length;
            state.elements[nextIndex].ref.current?.focus();
            return { focusedIndex: nextIndex };
    }),
    prev: () =>
        set((state) => {
        if (!state.enabled || state.elements.length === 0) return {};
        const prevIndex =
            (state.focusedIndex - 1 + state.elements.length) % state.elements.length;
        state.elements[prevIndex].ref.current?.focus();
        return { focusedIndex: prevIndex };
    }),
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