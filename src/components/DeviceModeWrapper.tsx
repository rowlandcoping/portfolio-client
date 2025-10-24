import { useEffect, useState } from 'react';
import { useKeyboardNavStore } from '../stores/keyboardNavStore';
import DesktopLayout from '../components/Layout'; // existing Layout
import MobileLayout from '../components/MobileLayout';

function detectMobile() {
    
    const isMobileUA = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return isMobileUA && isTouchCapable;
    
    return true
}

export default function DeviceModeWrapper() {
    const setEnabled = useKeyboardNavStore(state => state.setEnabled);
    const [mode, setMode] = useState<'desktop' | 'mobile'>('desktop');

    useEffect(() => {
        const desktopMode = !detectMobile();
        setEnabled(desktopMode); // desktop = keyboard enabled, mobile = false
        setMode(desktopMode ? 'desktop' : 'mobile');
    }, [setEnabled]);

    useEffect(() => { 
        document.body.classList.toggle('desktop', mode === 'desktop'); 
        document.body.classList.toggle('mobile', mode === 'mobile'); // Cleanup when component unmounts 
        return () => { 
            document.body.classList.remove('desktop', 'mobile'); 
        }; 
    }, [mode]);

    return mode === 'desktop' ? <DesktopLayout /> : <MobileLayout />;
}