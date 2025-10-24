import type { ProfileTypes } from '../../types/profileTypes';
import { Link } from '@tanstack/react-router';
import { useEffect } from "react";
import { useKeyboardNavStore } from "../../stores/keyboardNavStore";

type LinksProps = Pick<ProfileTypes, 'links'>;

const Links = ({ links }: LinksProps) => {

    const server = import.meta.env.VITE_SERVER_URL
    const focusedIndex = useKeyboardNavStore((s) => s.focusedIndex);
    const setLinkCount = useKeyboardNavStore((s) => s.setLinkCount);
    const setFocusedIndex = useKeyboardNavStore((s) => s.setFocusedIndex);
    const activePage = useKeyboardNavStore((s) => s.activePage);
    const enabled = useKeyboardNavStore((s) => s.enabled);

    useEffect(() => {
        if (!links || activePage !== 2) return;
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
        setFocusedIndex(0);
        setLinkCount(pageLinks.length-1);
        pageLinks[0].focus({ preventScroll: true });
    }, [links, activePage]);

    useEffect(() => {
        if (activePage !== 2) return;
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
        const current = pageLinks[focusedIndex % pageLinks.length];            
        if (current) current.focus({ preventScroll: true });
    }, [focusedIndex, activePage]);

    return (
        <nav aria-describedby={enabled ? "links-navigation-instructions": undefined}>
            {links.map((link, i) => (
                <div className="profile-links" key={link.id}>
                    <Link 
                        to={link.url}
                        className={focusedIndex === i ? 'focussed' : ''}
                    >                                                
                        <h3>
                            <img src = { enabled
                                        ? `${server+link.logoGrn}`
                                        : `${server+link.logoGry}`   
                                    } 
                                alt={link.logoAlt} 
                                className="project-image-thumb"
                            />
                            <span className="link-text">{link.name}</span>
                        </h3>
                    </Link>
                </div>
            ))}
        </nav>
    )
}

export default Links