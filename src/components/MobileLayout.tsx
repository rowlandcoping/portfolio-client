import { Outlet } from '@tanstack/react-router';
import { useKeyboardNavStore } from '../stores/keyboardNavStore';
import MobileScrollWheel from './MobileScrollWheel';
import MobileBottom from './MobileBottom';
import TimeDate from './TimeDate';
import { useEffect, useState } from 'react';

const MobileLayout = () => {
    const activePage = useKeyboardNavStore((s) => s.activePage);
    const maxIndex = useKeyboardNavStore((s) => s.maxIndex);

    const [isLandscape, setIsLandscape] = useState(window.matchMedia("(orientation: landscape)").matches);

    useEffect(() => {
        const handleOrientationChange = () => {
            const isLandscapeMode = window.matchMedia("(orientation: landscape)").matches;
            const viewportHeight = window.innerHeight;

            setIsLandscape(isLandscapeMode && viewportHeight <= 550);
        };

        window.addEventListener('resize', handleOrientationChange);
        window.addEventListener('orientationchange', handleOrientationChange);

        return () => {
            window.removeEventListener('resize', handleOrientationChange);
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, []);

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
    
            let startCoord = 0;
    
            const onTouchStart = (e: TouchEvent) => {
                startCoord = isLandscape ? e.touches[0].clientX : e.touches[0].clientY;
            };
    
            const onTouchMove = (e: TouchEvent) => {
                const main = document.querySelector('main');
                if (!main) return;    
                const currentCoord = isLandscape ? e.touches[0].clientX : e.touches[0].clientY;
                const delta = startCoord - currentCoord;
                main.scrollTop -= delta;
                startCoord = currentCoord;
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
    }, [isLandscape]);


    return (
        <div className="mobile-container">            
            <div className="mobile-top-container" aria-hidden="true">
                <div className="mobile-frame mobile-top-left">

                </div>
                <div className="mobile-frame mobile-top">
                    <div className="mobile-power-light"></div>
                    <div className="mobile-logo"><em>{`[ ]RowlandBerry`}</em></div>
                </div>
                <div className="mobile-frame mobile-top-right">

                </div>                
            </div>            
            <div className="mobile-view-area">
                <div className="mobile-frame mobile-left" aria-hidden="true"></div>
                <div className="mobile-content-container">
                    <div className="mobile-pda-info">
                        <div className="time-date">
                            <TimeDate />
                        </div>
                        <div className="mobile-monitor" aria-hidden="true">
                            <div className="mobile-battery">
                                <img src="/battery.svg" alt="battery life indicator" />
                            </div>
                            <div>
                                <img src="/wifi.svg" alt="signal strength indicator" />
                            </div>
                        </div>
                    </div>
                    <Outlet />
                    {maxIndex > 0 &&(
                        <div className="mobile-page-info" aria-hidden="true">
                        
                            page { activePage + 1 } of { maxIndex + 1 }
                        
                        </div>
                    )}
                </div>
                <div className="mobile-frame mobile-right" aria-hidden="true">
                    <MobileScrollWheel isLandscape={isLandscape}/>
                </div>
            </div>       
                
            <MobileBottom />
            
            
        </div>
    )
}

export default MobileLayout