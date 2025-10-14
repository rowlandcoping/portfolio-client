import type {  ProjectTypes } from '../../types/projectTypes';
import type { KeyboardNavState } from '../../stores/keyboardNavStore';
import { useKeyboardNavStore } from "../../stores/keyboardNavStore";
import { useEffect } from 'react';
import { Link } from '@tanstack/react-router';

type LinksProps = Pick<ProjectTypes, 'id' | 'name' | 'url' | 'repo'>  & {
  activePage: KeyboardNavState['activePage'];
};

const Links = ({ id, name, url, repo, activePage }:LinksProps) => {

    //try passing activePage as a prop instead
    
    const focusedIndex = useKeyboardNavStore((s) => s.focusedIndex);
    const setLinkCount = useKeyboardNavStore((s) => s.setLinkCount);
    const setFocusedIndex = useKeyboardNavStore((s) => s.setFocusedIndex);
    
    useEffect(() => {
        if (activePage === 2) {
            const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
            setFocusedIndex(0);
            setLinkCount(pageLinks.length-1);
            pageLinks[0].focus({ preventScroll: true });
        }
    }, [activePage]);

    useEffect(() => {
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
        const current = pageLinks[focusedIndex % pageLinks.length];            
        if (current) current.focus({ preventScroll: true });
    }, [focusedIndex])
       
    return (
        <>
            <Link 
                to={url}
                className={focusedIndex === 0 ? 'focussed' : ''}
            >
                <h2>Visit {name}</h2>
            </Link>
            <Link 
                to={repo}
                className={focusedIndex === 1 ? 'focussed' : ''}
            >
                <h2>Open Github Repo</h2>
            </Link>
            <Link 
                to={`/projects/contact/${id}`}
                className={focusedIndex === 2 ? 'focussed' : ''}
            >
                <h2>{ name } Feedback</h2>

            </Link>
        </>
    )
}

export default Links