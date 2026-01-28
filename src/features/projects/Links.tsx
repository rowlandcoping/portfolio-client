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
    const enabled = useKeyboardNavStore((s) => s.enabled);
    
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

    const links = [
        {
            to: url,
            name: `Visit ${name}`
        },
        repo && {
            to: repo,
            name: 'Open Github Repository'
        },
        {
            to: `/projects/contact/${id}`,
            name: `${name} Feedback`
        }
    ].filter((link): link is { to: string; name: string } => Boolean(link));

    return (
        <nav aria-describedby={enabled ? "links-navigation-instructions" : undefined}>
            {links.map((link, index) => (
            <Link
                key={index}
                to={link.to}
                className={focusedIndex === index ? 'focussed' : ''}
            >
                <h3>{link.name}</h3>
            </Link>
            ))}
        </nav>
    );
}

export default Links