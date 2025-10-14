import { useEffect } from 'react';
import { useKeyboardNavStore } from '../stores/keyboardNavStore';
import { useMobileNavStore } from '../stores/mobileNavStore';
import { useNavigate } from '@tanstack/react-router';

export default function KeyboardNavProvider({ children }: { children: React.ReactNode }) {

    const enabled = useKeyboardNavStore(state => state.enabled);

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
        if(enabled) return
        const main = document.querySelector('main');
        if (main) main.scrollTop = 0;
    }, [useMobileNavStore((s) => s.currentRoutePathname), useKeyboardNavStore((s) => s.activePage)]);

    useEffect(() => {
        if (enabled) return;
        const main = document.querySelector('main'); 

        const wheel = document.querySelector('.scroll-wheel');
        if (!wheel || !main) return;

        let startY = 0;

        const onTouchStart = (e: TouchEvent) => {
            startY = e.touches[0].clientY;
        };

        const onTouchMove = (e: TouchEvent) => {
            const main = document.querySelector('main');
            if (!main) return;

            const currentY = e.touches[0].clientY;
            const deltaY = startY - currentY;

            // Only prevent native scroll / pull-to-refresh when touching the wheel
            if (e.target instanceof HTMLElement && e.target.closest('.scroll-wheel')) {
                main.scrollTop -= deltaY;
                startY = currentY;
                e.preventDefault(); // ✅ prevent pull-to-refresh
            }
        };

        const handleTouch = (e: TouchEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('.scroll-wheel') || target.closest('.mobile-bottom button')) return;
            e.preventDefault();
            e.stopPropagation();
        };

        wheel.addEventListener('touchstart', onTouchStart as EventListener, { passive: true });
        wheel.addEventListener('touchmove', onTouchMove as EventListener, { passive: false });

        window.addEventListener('touchstart', handleTouch, { passive: false });
        window.addEventListener('touchmove', handleTouch, { passive: false });
        window.addEventListener('touchend', handleTouch, { passive: false });

        return () => {
            wheel.removeEventListener('touchstart', onTouchStart as EventListener);
            wheel.removeEventListener('touchmove', onTouchMove as EventListener);

            window.removeEventListener('touchstart', handleTouch);
            window.removeEventListener('touchmove', handleTouch);
            window.removeEventListener('touchend', handleTouch);
        };
    }, [enabled]);


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {

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
                    console.log('[Escape] pressed');
                    const target = useKeyboardNavStore.getState().popPage();
                    console.log('[Escape] target:', target);
                    const last = window.location.pathname
                    useKeyboardNavStore.getState().setReturnPage(last)
                    if (target) {
                        console.log('[Escape] navigating to:', target);
                        navigate({ to: target });
                    };
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [enabled]);    

    return <>{children}</>;
}