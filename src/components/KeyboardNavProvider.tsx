import { useEffect } from 'react';
import { useKeyboardNavStore } from '../stores/keyboardNavStore';
import { useNavigate } from '@tanstack/react-router';

export default function KeyboardNavProvider({ children }: { children: React.ReactNode }) {

    const enabled = useKeyboardNavStore.getState().enabled;

    const navigate = useNavigate();    

    // Block mouse events
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
            if (!enabled) return;

            // Disable Tab
            if (e.key === 'Tab') {
                e.preventDefault();
                return;
            }
            const state = useKeyboardNavStore.getState();

            
            switch (e.key) {
                case 'ArrowDown':
                    state.next();
                    e.preventDefault();
                    break;
                case 'ArrowUp':
                    state.prev();
                    e.preventDefault();
                    break;
                 case 'ArrowRight':                    
                    state.incrementPage();
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                    state.decrementPage();
                    e.preventDefault();
                    break;                
                case 'Enter':
                    const active = document.activeElement;
                    if (active instanceof HTMLAnchorElement) {
                        const href = active.href;
                        if (href) {
                            if (href.startsWith(window.location.origin)) {
                                //sets Previous Page
                                const pathname = window.location.pathname
                                useKeyboardNavStore.getState().pushPage(pathname)
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
                    const target = useKeyboardNavStore.getState().popPage();
                    const last = window.location.pathname
                    useKeyboardNavStore.getState().setReturnPage(last)
                    if (target) navigate({ to: target });
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);    

    return <>{children}</>;
}