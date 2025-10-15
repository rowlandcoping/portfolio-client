import { useKeyboardNavStore } from '../stores/keyboardNavStore';
import { useMobileNavStore } from '../stores/mobileNavStore';
import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

const MobileBottom = () => {

    const navigate = useNavigate();    
    const setLastFocused = useMobileNavStore((s) => s.setLastFocused);

    const handleUp = () => useKeyboardNavStore.getState().prev();
    const handleDown = () => useKeyboardNavStore.getState().next();
    const handleLeft = () => useKeyboardNavStore.getState().decrementPage();
    const handleRight = () => useKeyboardNavStore.getState().incrementPage();
    const handleBack = () => {
        const escEvent = new KeyboardEvent('keydown', {
            key: 'Escape',
            code: 'Escape',
            bubbles: true,
            cancelable: true,
        });    
        window.dispatchEvent(escEvent);
        useMobileNavStore.getState().setCurrentRoutePathname(window.location.pathname);
    };

    // Capture the currently focused element before the button itself steals focus
    

    const handleSelect = () => {
        const lastFocused = useMobileNavStore.getState().lastFocused;
        if (!lastFocused) return;

        if (lastFocused instanceof HTMLButtonElement && lastFocused.type === 'submit') {
            const enterEvent = new KeyboardEvent('keydown', {
                key: 'Enter',
                code: 'Enter',
                bubbles: true,
                cancelable: true,
            });
            lastFocused.dispatchEvent(enterEvent);
            return;
        }


        if (lastFocused instanceof HTMLAnchorElement) {
            const href = lastFocused.href;
            if (!href) return;
            const currentPath = window.location.pathname;
            const targetPath = href.startsWith(window.location.origin)
                ? new URL(href).pathname
                : null;
            console.log(href)
            console.log(targetPath)
            if (href.startsWith(window.location.origin)) {
                // sets Previous Page
                const pathname = window.location.pathname;
                if (currentPath == targetPath) return
                useKeyboardNavStore.getState().pushPage(pathname);
                useMobileNavStore.getState().setCurrentRoutePathname(window.location.pathname);
                // Internal link
                navigate({ to: new URL(href).pathname });
            } else {
                // External link
                window.open(href, '_blank');
            }
        }
    }

    useEffect(() => {
        const focusable = Array.from(
            document.querySelectorAll<HTMLElement>('input, button, textarea, a')
        )
        if (focusable.length > 0) {
            const first = focusable[0]
            setLastFocused(first)
        }
    }, [setLastFocused])

    useEffect(() => {
        const handleFocusChange = (e: FocusEvent) => {
            const target = e.target as HTMLElement
            if (!target || 
                target.classList.contains('ignore-focus-change') || // optional: for buttons like left/right/back/select
                !(target.tagName === 'BUTTON' || target.tagName === 'A')
            ) return;
            setLastFocused(target);
        }
        window.addEventListener('focusin', handleFocusChange)
        return () => window.removeEventListener('focusin', handleFocusChange)
    }, [setLastFocused])

    

    return (
        <div className="mobile-bottom">
            <div className="back-button">
                <button className="ignore-focus-change" onClick={handleBack}>
                    <img src="backButton.svg" className="button-large button-press" alt="Back Button"></img>
                </button>
            </div>
            <div className="direction-pad">
                <div className="pad-section">
                    <div className="pad-button"></div>
                    <div className="up-button pad-button">
                        <button onClick={handleUp}>
                            <img src="arrow2.svg" className="arrow arrow-up button-press" alt="Up Arrow"></img>
                        </button>
                    </div>
                    <div className="pad-button"></div>
                </div>
                <div className="pad-section">
                    <div className="left-button pad-button">
                        <button className="ignore-focus-change" onClick={handleLeft}>
                            <img src="arrow2.svg" className="arrow arrow-left button-press" alt="Left Arrow"></img>
                        </button>
                    </div>
                    <div className="pad-button"></div>

                    <div className="right-button pad-button">
                        <button className="ignore-focus-change" onClick={handleRight}>
                            <img src="arrow2.svg" className="arrow arrow-right button-press" alt="Right Arrow"></img>
                        </button>
                    </div>

                </div>
                <div className="pad-section">
                    <div className="pad-button"></div>
                    <div className="down-button pad-button">
                    <button onClick={handleDown}>
                        <img src="arrow2.svg" className="arrow arrow-down button-press" alt="Down Arrow"></img>
                    </button>
                    <div className="pad-button"></div>
                </div>
                    
                </div>
                
            </div>
            <div className="return-button">
                <div>
                    <button className = "ignore-focus-change" onClick={handleSelect}>
                        <img src="selectButton.svg" className="button-large button-press" alt="Select Button"></img>
                    </button>
                </div>
            </div>

            
        </div>
    )
}

export default MobileBottom