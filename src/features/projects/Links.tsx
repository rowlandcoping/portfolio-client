import type {  ProjectTypes } from '../../types/projectTypes';
import { useKeyboardNavStore } from "../../stores/keyboardNavStore";
import { useEffect } from 'react';
import { Link } from '@tanstack/react-router';

type LinksProps = Pick<ProjectTypes, 'id' | 'name' | 'url' | 'repo'>;

const Links = ({ id, name, url, repo }:LinksProps) => {

    const focusedIndex = useKeyboardNavStore((s) => s.focusedIndex);
    const setLinkCount = useKeyboardNavStore((s) => s.setLinkCount);
    const setFocusedIndex = useKeyboardNavStore((s) => s.setFocusedIndex);

    
    useEffect(() => {
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
        setFocusedIndex(0);
        setLinkCount(pageLinks.length-1);
        pageLinks[0].focus();
    }, []);

    useEffect(() => {
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
        const current = pageLinks[focusedIndex % pageLinks.length];            
        if (current) current.focus();
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
                to={`/contact/${id}`}
                className={focusedIndex === 2 ? 'focussed' : ''}
            >
                <h2>{ name } Feedback</h2>

            </Link>
        </>
    )
}

export default Links