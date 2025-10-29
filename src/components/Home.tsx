import { Link } from '@tanstack/react-router';
import { useEffect } from "react";
import { useKeyboardNavStore } from "../stores/keyboardNavStore";
import { useUser } from '../features/profile/useUserApi';
import useTitle from '../hooks/useTitle';
import Error from '../components/Error';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';

const Home = () => {

    const focusedIndex = useKeyboardNavStore((s) => s.focusedIndex);
    const setLinkCount = useKeyboardNavStore((s) => s.setLinkCount);
    const setFocusedIndex = useKeyboardNavStore((s) => s.setFocusedIndex);

    const {
        data: user,
        isError,
        isLoading
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

    useTitle(user ? `Portfolio - ${user.name}` : 'Portfolio');
    
    if (isLoading) return <Loading />
    if (isError) return <Error />;
    if (!user) return <NotFound />;    

    return (
        <main>
            <div className="content">
                <h1>{user.name}'s Portfolio</h1>
                <nav aria-describedby="navigation-instructions">
                    <p className="sr-only" id="navigation-instructions">
                        Use up and down arrow keys to cycle between links.
                        Press Enter to select a link.
                    </p>               
                    <Link 
                        to="/profile"
                        className={focusedIndex === 0 ? 'focussed' : ''}
                    >
                        <h3>View Profile</h3>
                    </Link>
                    <Link 
                        to="/projects"
                        className={focusedIndex === 1 ? 'focussed' : ''}
                    >
                        <h3>Explore Projects</h3>
                    </Link>
                    <Link 
                        to="/profile/contact"
                        className={focusedIndex === 2 ? 'focussed' : ''}
                    >
                        <h3>Contact {user.name}</h3>
                    </Link>
                    <Link 
                        to="/about"
                        className={focusedIndex === 3 ? 'focussed' : ''}
                    >
                        <h3>About This Site</h3>
                    </Link>
                </nav>
            </div>
            <div className="control-container" aria-hidden="true">
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