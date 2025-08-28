import type { ProfileTypes } from '../../types/profileTypes';
import { Link } from '@tanstack/react-router';
import { useEffect } from "react";
import { useKeyboardNavStore } from "../../stores/keyboardNavStore";

type LinksProps = Pick<ProfileTypes, 'links'>;

const Links = ({ links }: LinksProps) => {

    const focusedIndex = useKeyboardNavStore((s) => s.focusedIndex);
    const setLinkCount = useKeyboardNavStore((s) => s.setLinkCount);
    const setFocusedIndex = useKeyboardNavStore((s) => s.setFocusedIndex);
    const activePage = useKeyboardNavStore((s) => s.activePage);

    useEffect(() => {
        if (!links || activePage !== 2) return;
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
        setFocusedIndex(0);
        setLinkCount(pageLinks.length-1);
        pageLinks[0].focus();
    }, [links, activePage]);

    useEffect(() => {
        if (activePage !== 2) return;
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
        const current = pageLinks[focusedIndex % pageLinks.length];            
        if (current) current.focus();
    }, [focusedIndex, activePage]);

    return (
        <>
            {links.map((link, i) => (
                <div className = "profile-links" key={link.id}>
                    <Link 
                        to={link.url}
                        className={focusedIndex === i ? 'focussed' : ''}
                    >                                                
                        <h2>
                            <img src={`http://localhost:3500${link.logoGrn}`} alt={link.logoAlt} />
                            <span className="link-text">{link.name}</span>
                        </h2>
                    
                    </Link>
                </div>
            ))}
        </>
    )
}

export default Links