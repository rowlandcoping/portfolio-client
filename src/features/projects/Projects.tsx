import { Link } from '@tanstack/react-router';
import { useEffect } from "react";
import { useKeyboardNavStore } from "../../stores/keyboardNavStore";

const Home = () => {

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
        <main>
            <div className="content">
                <h1>Explore Projects</h1>
            
                <Link 
                    to="/projects/all-projects"
                    className={focusedIndex === 0 ? 'focussed' : ''}
                >
                    <h2>View All Projects</h2>
                </Link>
                <Link 
                    to="/projects/project-categories"
                    className={focusedIndex === 1 ? 'focussed' : ''}
                >
                    <h2>Select Project by Category</h2>
                </Link>
                <Link 
                    to="/projects/search-projects"
                    className={focusedIndex === 2 ? 'focussed' : ''}
                >
                    <h2>Search For a Project</h2>

                </Link>
            </div>
            <div className="control-container">
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