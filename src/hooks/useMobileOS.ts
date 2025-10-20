import { useState, useEffect } from 'react';

export function useMobileOS() {
    const [os, setOS] = useState<'ios' | 'android' | 'other'>('other');

    useEffect(() => {
        const ua = navigator.userAgent;
        if (/iPhone|iPad|iPod/i.test(ua)) setOS('ios');
        else if (/Android/i.test(ua)) setOS('android');
        else setOS('other');
    }, []);

    return os;
}