import { useKeyboardNavStore } from '../stores/keyboardNavStore';
import { useMobileNavStore } from '../stores/mobileNavStore';
import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useMobileOS } from '../hooks/useMobileOS';

const MobileBottom = () => {
    const os = useMobileOS();
    const navigate = useNavigate();  

    const setLastFocused = useMobileNavStore((s) => s.setLastFocused);
    const setFocusWithButtons = useMobileNavStore((s) => s.setFocusWithButtons);

    const setMaxIndex = useKeyboardNavStore((s) => s.setMaxIndex);

    const handleUp = () => {
        setFocusWithButtons(true)
        useKeyboardNavStore.getState().prev();
    }
    const handleDown = () => {
        setFocusWithButtons(true)
        useKeyboardNavStore.getState().next();
    }
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
        setMaxIndex(0);
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
            if (href.startsWith(window.location.origin)) {
                // sets Previous Page
                const pathname = window.location.pathname;
                if (currentPath == targetPath) return
                useKeyboardNavStore.getState().pushPage(pathname);
                useMobileNavStore.getState().setCurrentRoutePathname(window.location.pathname);
                //also reset maxIndex so page counter works
                setMaxIndex(0);
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
        <div className="mobile-bottom-container">
            <div className="mobile-frame mobile-bottom-left" aria-hidden="true"></div>
            <div className="mobile-frame mobile-bottom">
                <nav className="mobile-buttons-container" aria-label="Navigation buttons">
                    <div className="back-button">
                        <button 
                            className="ignore-focus-change" 
                            onClick={handleBack}
                            aria-label="Escape button — takes you back to the previous page"
                        >
                            <div className="portrait-button-wrapper">
                                <img 
                                    src={os === 'ios' ? "/backButton.png" : "/backButton.svg"}
                                    className="button-large button-press" 
                                    alt="Back Button"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="landscape-button-wrapper hidden">
                                <img 
                                    src={os === 'ios' ? "/backButtonLand.png" : "/backButtonLand.svg"}
                                    className="button-large-landscape button-press" 
                                    alt="Back Button"
                                    aria-hidden="true"
                                />
                            </div>
                        </button>
                    </div>
                    <div className="direction-pad">
                        <div className="pad-section">
                            <div className="pad-button"></div>
                            <div className="up-button pad-button">
                                <button 
                                    onClick={handleUp}
                                    aria-label="Up button — cycles through links or form inputs"
                                >
                                    <img 
                                        src={os === 'ios' ? '/arrow2.png' : '/arrow2.svg'} 
                                        className="arrow arrow-up button-press" 
                                        alt="Up Arrow"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                            <div className="pad-button"></div>
                        </div>
                        <div className="pad-section">
                            <div className="left-button pad-button">
                                <button 
                                    className="ignore-focus-change" 
                                    onClick={handleLeft}
                                    aria-label="Left button — goes back a page"
                                >
                                    <img 
                                        src={os === 'ios' ? '/arrow2.png' : '/arrow2.svg'} 
                                        className="arrow arrow-left button-press" 
                                        alt="Left Arrow"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                            <div className="pad-button"></div>

                            <div className="right-button pad-button">
                                <button 
                                    className="ignore-focus-change" 
                                    onClick={handleRight}
                                    aria-label="Right button — goes forward a page"
                                >
                                    <img 
                                        src={os === 'ios' ? '/arrow2.png' : '/arrow2.svg'} 
                                        className="arrow arrow-right button-press" 
                                        alt="Right Arrow"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>

                        </div>
                        <div className="pad-section">
                            <div className="pad-button"></div>
                            <div className="down-button pad-button">
                                <button
                                    aria-label="Down button — cycles through links or form inputs"
                                    onClick={handleDown}
                                >
                                    <img 
                                        src={os === 'ios' ? '/arrow2.png' : '/arrow2.svg'} 
                                        className="arrow arrow-down button-press" 
                                        alt="Down Arrow"
                                        aria-hidden="true"
                                    />
                                </button>
                            <div className="pad-button"></div>
                        </div>                            
                    </div>                        
                    </div>
                    <div className="return-button">
                        <button 
                            className="ignore-focus-change" 
                            onClick={handleSelect}
                            aria-label="Enter button — selects focussed link or activates a submit button"
                        >
                            <div className="portrait-button-wrapper">
                                <img 
                                    src={os === 'ios' ? '/selectButton.png' : "/selectButton.svg"} 
                                    className="button-large button-press" 
                                    alt="Select Button"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="landscape-button-wrapper hidden">
                                <img 
                                    src={os === 'ios' ? '/selectButtonLand.png' : "/selectButtonLand.svg"} 
                                    className="button-large-landscape button-press" 
                                    alt="Select Button"
                                    aria-hidden="true"
                                />
                            </div>
                        </button>
                    </div>
                </nav>               
            </div>
            <div className="mobile-frame mobile-bottom-right" aria-hidden="true"></div>
        </div>
    )
}

export default MobileBottom