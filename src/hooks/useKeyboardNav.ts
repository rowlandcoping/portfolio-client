import { useEffect, useRef } from 'react';
import { useKeyboardNavStore, type NavElement } from '../stores/keyboardNavStore';
import { nanoid } from 'nanoid';

export function useKeyboardNav() {
    const id = useRef(nanoid());
    
    const ref = useRef<NavElement['ref']['current']>(null);
    const register = useKeyboardNavStore((s) => s.register);
    const unregister = useKeyboardNavStore((s) => s.unregister);

    useEffect(() => {
        register({ id: id.current, ref });
        return () => unregister(id.current);
    }, [register, unregister]);

    return ref;
}