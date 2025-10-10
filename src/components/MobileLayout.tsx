import { Outlet } from '@tanstack/react-router';
import { useRef, useState, useEffect } from 'react';
import MobileScrollWheel from './MobileScrollWheel';
import MobileBottom from './MobileBottom';
import { useMobileNavStore } from '../stores/mobileNavStore';

const MobileLayout = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);
    const [canScroll, setCanScroll] = useState(false);
    const [disableTransition, setDisableTransition] = useState(false);

    const contentHeight = useMobileNavStore((s) => s.contentHeight);
    console.log(`content - initial render ${contentHeight}`)

    const handleScroll = (delta: number) => {
        if (!scrollRef.current || !canScroll) return;
        const wrapperHeight = scrollRef.current.parentElement?.clientHeight ?? 0;
        const maxScroll = -(contentHeight - wrapperHeight);
        console.log(`content: ${contentHeight}`)
        console.log(`wrapper: ${wrapperHeight}`)
        const step = 100 * delta; // base px per swipe
        setOffset((o) => Math.max(Math.min(o - step, 0), maxScroll));
    };

    
    
    useEffect(() => {
        if (!scrollRef.current) return;
        const wrapperHeight = scrollRef.current.parentElement?.clientHeight ?? 0;
        setCanScroll(contentHeight > wrapperHeight);
        setDisableTransition(true);
        setOffset(0);
        requestAnimationFrame(() => setDisableTransition(false));
    }, [contentHeight]);


    return (
        <div className="mobile-container">
            <div className="mobile-top"></div>
            <div className="mobile-view-area">
                <div className="mobile-left"></div>
                    <div className="scrollable-content-wrapper">
                        <div
                            ref={scrollRef}
                            className="scrollable-content"
                            style={{ 
                                transform: `translateY(${offset}px)`,
                                transition: disableTransition ? 'none' : 'transform 0.3s ease'
                            }}
                        >
                            <Outlet />
                        </div>
                    </div>
                <div className="mobile-right">
                    <MobileScrollWheel onScroll={handleScroll} />
                </div>
            </div>
            <MobileBottom />
        </div>
    )
}

export default MobileLayout