import type { AboutTypes } from '../../types/aboutTypes';
import { Link } from '@tanstack/react-router';
import { useEffect } from "react";
import { useKeyboardNavStore } from "../../stores/keyboardNavStore";

type LinksProps =  {
    clientRepo?: AboutTypes['clientRepo'];
    serverRepo?: AboutTypes['serverRepo'];
}

const Links = ({ clientRepo, serverRepo }: LinksProps) => {

    const focusedIndex = useKeyboardNavStore((s) => s.focusedIndex);
    const setLinkCount = useKeyboardNavStore((s) => s.setLinkCount);
    const setFocusedIndex = useKeyboardNavStore((s) => s.setFocusedIndex);
    const activePage = useKeyboardNavStore((s) => s.activePage);

    useEffect(() => {
        if (activePage !== 1) return;
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
        setFocusedIndex(0);
        setLinkCount(pageLinks.length-1);
        pageLinks[0].focus({ preventScroll: true });
    }, [activePage]);

    useEffect(() => {
        if (activePage !== 1) return;
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
        const current = pageLinks[focusedIndex % pageLinks.length];            
        if (current) current.focus({ preventScroll: true });
    }, [focusedIndex, activePage]);

    return (
        <div className="details-container">
            <Link 
                to={clientRepo}
                className={focusedIndex === 0 ? 'focussed' : ''}
            >
                <h2>View Client Repository</h2>
            </Link>
            <Link 
                to={serverRepo}
                className={focusedIndex === 1 ? 'focussed' : ''}
            >
                <h2>View Server Repository</h2>
            </Link>
            <Link 
                to="/profile/contact"
                className={focusedIndex === 2 ? 'focussed' : ''}
            >
                <h2>Site Feedback</h2>
            </Link>
        </div>  
    )
}

export default Links