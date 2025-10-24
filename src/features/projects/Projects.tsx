import { Link } from '@tanstack/react-router';
import { useEffect } from "react";
import { useKeyboardNavStore } from "../../stores/keyboardNavStore";

const Home = () => {

    const focusedIndex = useKeyboardNavStore((s) => s.focusedIndex);
    const setLinkCount = useKeyboardNavStore((s) => s.setLinkCount);
    const setFocusedIndex = useKeyboardNavStore((s) => s.setFocusedIndex);
    const enabled = useKeyboardNavStore((s) => s.enabled);
    
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
        <main>
            <div className="content">
                <h1>Explore Projects</h1>
                <nav aria-describedby={enabled ? 'navigation-instructions' : undefined}>
                    {enabled &&(
                        <>
                            <p className="sr-only" id="navigation-instructions">
                                Use up and down arrow keys to cycle between links.
                                Press Enter to select a link.
                                Press Escape to return to the homepage.
                            </p>
                        </>
                    )}            
                    <Link 
                        to="/projects/all-projects"
                        className={focusedIndex === 0 ? 'focussed' : ''}
                    >
                        <h3>View All Projects</h3>
                    </Link>
                    <Link 
                        to="/projects/project-categories"
                        className={focusedIndex === 1 ? 'focussed' : ''}
                    >
                        <h3>Select Project by Category</h3>
                    </Link>
                    <Link 
                        to="/projects/search-projects"
                        className={focusedIndex === 2 ? 'focussed' : ''}
                    >
                        <h3>Search For a Project</h3>

                    </Link>
                </nav>
            </div>
            <div className="control-container" aria-hidden="true">
                <div className="control-box">
                    <div>
                        exit<br />
                        <kbd>Esc</kbd>
                    </div>
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