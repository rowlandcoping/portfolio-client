import { Outlet } from '@tanstack/react-router';
import { useKeyboardNavStore } from '../stores/keyboardNavStore';
import MobileScrollWheel from './MobileScrollWheel';
import MobileBottom from './MobileBottom';
import TimeDate from './TimeDate';
import { useEffect } from 'react';

const MobileLayout = () => {
    const activePage = useKeyboardNavStore((s) => s.activePage);
    const maxIndex = useKeyboardNavStore((s) => s.maxIndex);

    useEffect(() => {
        let isMounted = true;

        const waitForElements = () => {
            const main = document.querySelector('main');     
            const wheel = document.querySelector('.scroll-wheel');
            if (!wheel || !main){
                // Retry after a short delay if elements aren't ready
                if (isMounted) setTimeout(waitForElements, 50);
                return;
            }
            main.offsetHeight;
    
            let startY = 0;
    
            const onTouchStart = (e: TouchEvent) => {
                startY = e.touches[0].clientY;
            };
    
            const onTouchMove = (e: TouchEvent) => {
                const main = document.querySelector('main');
                if (!main) return;    
                const currentY = e.touches[0].clientY;
                const deltaY = startY - currentY;
                main.scrollTop -= deltaY;
                startY = currentY;
                e.preventDefault();                    
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
        };

        const cleanup = waitForElements();

        return () => {
            isMounted = false;
            if (cleanup) cleanup();    
        };
    }, []);


    return (
        <div className="mobile-container">            
            <div className="mobile-top-container">
                <div className="mobile-frame mobile-top-left">

                </div>
                <div className="mobile-frame mobile-top">
                    <div className="mobile-power-light"></div>
                    <div className="mobile-logo"><em>{`[ ]RowlandBerry`}</em></div>
                    <div className="mobile-button"></div>
                </div>
                <div className="mobile-frame mobile-top-right">

                </div>                
            </div>            
            <div className="mobile-view-area">
                <div className="mobile-frame mobile-left"></div>
                <div className="mobile-content-container">
                    <div className="mobile-pda-info">
                        <div className="time-date">
                            <TimeDate />
                        </div>
                        <div className="mobile-monitor">
                            <div className="mobile-battery">
                                <img src="battery.svg" alt="battery life indicator" />
                            </div>
                            <div>
                                <img src="wifi.svg" alt="signal strength indicator" />
                            </div>
                        </div>
                    </div>
                    <Outlet />
                    {maxIndex > 0 &&(
                        <div className="mobile-page-info">
                        
                            page { activePage + 1 } of { maxIndex + 1 }
                        
                        </div>
                    )}
                </div>
                <div className="mobile-frame mobile-right">
                    <MobileScrollWheel />
                </div>
            </div>       
                
            <MobileBottom />
            
            
        </div>
    )
}

export default MobileLayout