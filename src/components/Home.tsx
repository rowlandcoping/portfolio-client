import { Link } from '@tanstack/react-router';
import { useEffect } from "react";
import { useKeyboardNavStore } from "../stores/keyboardNavStore";
import { useUser } from '../features/profile/useUserApi';

const Home = () => {

    const focusedIndex = useKeyboardNavStore((s) => s.focusedIndex);
    const setLinkCount = useKeyboardNavStore((s) => s.setLinkCount);
    const setFocusedIndex = useKeyboardNavStore((s) => s.setFocusedIndex);

    const {
        data: user,
        isError,
    } = useUser();

    useEffect(() => {
        if (!user) return;
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
        setFocusedIndex(0);
        setLinkCount(pageLinks.length-1);
        requestAnimationFrame(() => {
            pageLinks[0].focus({ preventScroll: true });
        });
    }, [user]);

    useEffect(() => {
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
        const current = pageLinks[focusedIndex % pageLinks.length];            
        if (current) current.focus({ preventScroll: true });
    }, [focusedIndex])
    
    if (!user) return <p>Loading user data...</p>;
    if (isError) return <p>Error loading user data...</p>;

    return (
        <main>
            <div className="content">
                <h1>{user.name}'s Portfolio</h1>
            
                <Link 
                    to="/profile"
                    className={focusedIndex === 0 ? 'focussed' : ''}
                >
                    <h2>View Profile</h2>
                </Link>
                <Link 
                    to="/projects"
                    className={focusedIndex === 1 ? 'focussed' : ''}
                >
                    <h2>Explore Projects</h2>
                </Link>
                <Link 
                    to="/profile/contact"
                    className={focusedIndex === 2 ? 'focussed' : ''}
                >
                    <h2>Contact {user.name}</h2>
                </Link>
                <Link 
                    to="/about"
                    className={focusedIndex === 3 ? 'focussed' : ''}
                >
                    <h2>About This Site</h2>
                </Link>
            </div>
            <div className="control-container">
                <div className="control-box">
                    <div>
                        next<br />
                        &darr;                    
                    </div>
                    <div>
                        prev<br />
                        &uarr;                   
                    </div>
                    <div>
                        slct<br />
                        &crarr;
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home