import { useEffect, useLayoutEffect } from 'react';
import { useKeyboardNavStore } from '../stores/keyboardNavStore';
import { useNavigate } from '@tanstack/react-router';

export default function KeyboardNavProvider({ children }: { children: React.ReactNode }) {

    const store = useKeyboardNavStore();
    const { enabled, elements, focusedIndex, next, prev, incrementPage, decrementPage } = store;

    const navigate = useNavigate();

    useEffect(() => {
    if (!enabled) return;

    const keepFocus = (e: FocusEvent) => {
        const active = elements[focusedIndex]?.ref.current;
        if (active && document.activeElement !== active) {
        active.focus();
        e.preventDefault();
        }
    };

    window.addEventListener('blur', keepFocus, true);
    return () => window.removeEventListener('blur', keepFocus, true);
    }, [enabled, elements, focusedIndex]);

    // 2️⃣ Block mouse events
    useEffect(() => {
        if (!enabled) return;

        const stopMouse = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
        };

        window.addEventListener('mousedown', stopMouse, true);
        window.addEventListener('mouseup', stopMouse, true);
        window.addEventListener('click', stopMouse, true);

        return () => {
            window.removeEventListener('mousedown', stopMouse, true);
            window.removeEventListener('mouseup', stopMouse, true);
            window.removeEventListener('click', stopMouse, true);
        };
    }, [enabled]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowDown':
                    next();
                    e.preventDefault();
                    break;
                case 'ArrowUp':
                    prev();
                    e.preventDefault();
                    break;
                 case 'ArrowRight':                    
                    incrementPage();
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                    decrementPage();
                    e.preventDefault();
                    break;                
                case 'Enter':
                    const active = document.activeElement;
                    if (active?.tagName === 'A') {
                        const href = (active as HTMLAnchorElement).href;
                        if (href) {
                            if (href.startsWith(window.location.origin)) {
                                // Internal link
                                navigate({ to: new URL(href).pathname });
                            } else {
                                // External link
                                window.open(href, '_blank');
                            }
                        }
                    }
                    break;
                case 'Escape':
                    const target = useKeyboardNavStore.getState().previousPage;
                    if (target) navigate({ to: target });
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [next, prev, incrementPage, decrementPage]);

    useLayoutEffect(() => {
        if (elements.length > 0) {
            elements[0].ref.current?.focus();
        }
    }, [elements]);

    

    return <>{children}</>;
}