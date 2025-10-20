
import { Link } from '@tanstack/react-router';
import { useEffect, useMemo } from "react";
import { useKeyboardNavStore } from "../../stores/keyboardNavStore";
import { useProjectTypes } from './useProjectTypesApi';

import { useProjects } from './useProjectsApi';


const ProjectTypes = () => {

    const focusedIndex = useKeyboardNavStore((s) => s.focusedIndex);
    const setLinkCount = useKeyboardNavStore((s) => s.setLinkCount);
    const setFocusedIndex = useKeyboardNavStore((s) => s.setFocusedIndex);

    const {
        data: projectTypes,
        isError: isTypesError,
    } = useProjectTypes();

    const {
        data: projects,
        isError: isProjectsError,
    } = useProjects();

    //Applying use memo means the entire array will be built before it is updated, rather than updating it on every item added.
    //It means the on-render useEffect only fires once and the DOM will contain all necessary elements for navigation.
    const filteredCategories = useMemo(() => {
        if (!projectTypes || !projects) return [];
        return projectTypes.filter(category =>
            projects.some(project => project.typeId === category.id)
        );
    }, [projectTypes, projects]);   

    useEffect(() => {
        if (filteredCategories.length === 0) return;
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
        setFocusedIndex(0);
        setLinkCount(pageLinks.length-1);
        pageLinks[0].focus({ preventScroll: true });
    }, [filteredCategories]);

    useEffect(() => {
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
        const current = pageLinks[focusedIndex % pageLinks.length];            
        if (current) current.focus({ preventScroll: true });
    }, [focusedIndex]);

    if (!projects || !projectTypes) return <p>Loading Project Data...</p>;
    if (isTypesError || isProjectsError) return <p>Error Loading Project Data...</p>;
    
    return (
        <main>
            <div className="content">
                <h1>Select a Category</h1>
                {filteredCategories.map((category, i) => (
                    <div className = "profile-links" key={category.id}>
                        <Link 
                            to={`/projects/project-categories/${category.id}`}
                            className={focusedIndex === i ? 'focussed' : ''}
                        >                                                
                            <h2>
                                <span className="link-text">{category.name}</span>
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

export default ProjectTypes