
import { Link } from '@tanstack/react-router';
import { useEffect, type CSSProperties } from "react";
import { useKeyboardNavStore } from "../../stores/keyboardNavStore";
import { useProjects } from './useProjectsApi';

const AllProjects = () => {

    const focusedIndex = useKeyboardNavStore((s) => s.focusedIndex);
    const setLinkCount = useKeyboardNavStore((s) => s.setLinkCount);
    const setFocusedIndex = useKeyboardNavStore((s) => s.setFocusedIndex);
    const setPreviousPage = useKeyboardNavStore((s) => s.setPreviousPage);

    const {
        data: projects,
        isError,
    } = useProjects();

    useEffect(() => {
        if (!projects) return;
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
        setPreviousPage('/projects');
        setFocusedIndex(0);
        setLinkCount(pageLinks.length-1);
        pageLinks[0].focus();
    }, [projects]);

    useEffect(() => {
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
        const current = pageLinks[focusedIndex % pageLinks.length];            
        if (current) current.focus();
    }, [focusedIndex]);

    if (isError || !projects) return <p>Error loading project data...</p>;

    return (
        <main>
            <div className="content">
                <h1>Select a Project to View</h1>
                {projects.map((project, i) => (
                    <div className = "profile-links" key={project.id}>
                        <Link 
                            to={`/projects/${project.id}`}
                            className={focusedIndex === i ? 'focussed' : ''}
                        >                                                
                            <h2>
                                <span
                                    className="image-container"
                                    style={{ '--image-url': `url(http://localhost:3500${project.imageGrn})` } as CSSProperties}
                                >
                                </span>
                                <span className="link-text">{project.name}</span>
                            </h2>
                        
                        </Link>
                    </div>
                ))}
                
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

export default AllProjects