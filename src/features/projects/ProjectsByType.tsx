
import { Link, useParams } from '@tanstack/react-router';
import { projectsByTypeRoute } from '../../app/router';
import { useEffect, useMemo } from "react";
import { useKeyboardNavStore } from "../../stores/keyboardNavStore";
import { useProjects } from './useProjectsApi';

const ProjectsByType = () => {

    const { id } = useParams({from: projectsByTypeRoute.id})
    const server = import.meta.env.VITE_SERVER_URL
    const focusedIndex = useKeyboardNavStore((s) => s.focusedIndex);
    const setLinkCount = useKeyboardNavStore((s) => s.setLinkCount);
    const setFocusedIndex = useKeyboardNavStore((s) => s.setFocusedIndex);

    const {
        data: projects,
        isError,
    } = useProjects();

    const filteredProjects = useMemo(() => {
        if (!projects) return [];
            return projects.filter(project =>
            (project.typeId === Number(id))
        );
    }, [projects]);

    useEffect(() => {
        if (filteredProjects.length === 0) return;
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
        setFocusedIndex(0);
        setLinkCount(pageLinks.length-1);
        pageLinks[0].focus({ preventScroll: true });
    }, [filteredProjects]);

    useEffect(() => {
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
        const current = pageLinks[focusedIndex % pageLinks.length];            
        if (current) current.focus({ preventScroll: true });
    }, [focusedIndex]);

    if (isError || !projects) return <p>Error loading project data...</p>;

    return (
        <main>
            <div className="content">
                <h1>Select a Project to View</h1>
                {filteredProjects.map((project, i) => (
                    <div className = "profile-links" key={project.id}>
                        <Link 
                            to={`/projects/${project.id}`}
                            className={focusedIndex === i ? 'focussed' : ''}
                        >                                                
                            <h2>
                                <img 
                                    src = {server+project.imageGrn}
                                    alt = {project.imageAlt}
                                    className="project-image-thumb"
                                />
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

export default ProjectsByType