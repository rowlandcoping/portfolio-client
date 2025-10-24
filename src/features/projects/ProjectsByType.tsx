
import { Link, useParams } from '@tanstack/react-router';
import { projectsByTypeRoute } from '../../app/router';
import { useEffect, useMemo, useState } from "react";
import { useKeyboardNavStore } from "../../stores/keyboardNavStore";
import { useProjects } from './useProjectsApi';
import { useProjectTypes } from './useProjectTypesApi';
import useTitle from '../../hooks/useTitle';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';

const ProjectsByType = () => {

    useTitle(`Find a Project`);

    const { id } = useParams({from: projectsByTypeRoute.id})
    const server = import.meta.env.VITE_SERVER_URL
    const focusedIndex = useKeyboardNavStore((s) => s.focusedIndex);
    const setLinkCount = useKeyboardNavStore((s) => s.setLinkCount);
    const setFocusedIndex = useKeyboardNavStore((s) => s.setFocusedIndex);
    const setMaxIndex = useKeyboardNavStore.getState().setMaxIndex;
    const setActivePage = useKeyboardNavStore.getState().setActivePage;
    const activePage = useKeyboardNavStore((s) => s.activePage);
    const itemsPerPage = useKeyboardNavStore((s) => s.itemsPerPage);
    const enabled = useKeyboardNavStore((s) => s.enabled);

    const [totalPages, setTotalPages] = useState(0);

    const {
        data: projects,
        isError,
        isLoading: isLoadingProjects
    } = useProjects();

    const {
        data: projectTypes,
        isError: isTypesError,
        isLoading: isLoadingTypes
    } = useProjectTypes();    

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
    }, [filteredProjects, activePage]);

    useEffect(() => {
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
        const current = pageLinks[focusedIndex % pageLinks.length];            
        if (current) current.focus({ preventScroll: true });
    }, [focusedIndex, activePage]);

    useEffect (() => {
        if (!filteredProjects) return
        const total = Math.ceil(filteredProjects.length / itemsPerPage);
        setTotalPages(total);   
        setActivePage(0);
        setMaxIndex(total-1);
    }, [])

    const selectedType = projectTypes?.find(t => (t.id === Number(id)));
    useTitle(selectedType ? `Select a Project - ${selectedType.name}` : 'Select a Project');

    if (isLoadingTypes || isLoadingProjects) return <Loading />;
    if (isError || isTypesError) return <Error />;
    if (!projects || !projectTypes) return <NotFound />    

    const pages = [];

    for (let i = 0; i < filteredProjects.length; i += itemsPerPage) {
        const slice = filteredProjects.slice(i, i + itemsPerPage);
        pages.push({
            title: `${
                filteredProjects.length > itemsPerPage
                    ? `${selectedType ? `${selectedType.name} Projects` : 'Projects'} (${itemsPerPage > 1 
                        ? `${i + 1}-${i + slice.length} of ${filteredProjects.length}`
                        : `${i + 1} of ${filteredProjects.length}`
                    })`
                    : selectedType ? `${selectedType.name} Projects` : 'Projects'
                }`,
            content: (
            <nav aria-describedby="links-navigation-instructions">
                {slice.map((project, j) => (
                <div className="profile-links" key={project.id}>
                    <Link
                    to={`/projects/${project.id}`}
                    className={focusedIndex === j ? 'focussed' : ''}
                    >
                    <h3>
                        <img
                            src = { enabled
                                ? `${server+project.imageGrn}`
                                : `${server+project.imageGry}`   
                            }
                            alt={project.imageAlt}
                            className="project-image-thumb"
                        />
                        <span className="link-text">{project.name}</span>
                    </h3>
                    </Link>
                </div>
                ))}
            </nav>
            )
        });
    }

    return (
        <main aria-describedby={enabled ? 'navigation-instructions' : undefined}>
            {enabled &&(
                <>
                    <p className="sr-only" id="navigation-instructions">
                        {totalPages > 1 &&(
                        `Use the left and right arrow keys to move between pages.`
                        )}
                        Press Escape to return to project types page.
                    </p>
                    <p className="sr-only" id="links-navigation-instructions">
                        Use up and down arrow keys to cycle between projects.
                        Press Enter to select a project.
                        Press Escape to return to project types page.
                    </p>
                </>
            )}
            <div className="content">
                {pages.map((page, index) => (
                    <section
                        key={index}
                        className={index === activePage ? 'selected' : 'hidden'}
                        aria-hidden={index !== activePage}
                        aria-labelledby={`section-title-${index}`}
                    >
                        <h2 
                            id={`section-title-${index}`}
                            className="section-headline"
                        >
                            {page.title}
                        </h2>
                        {page.content}
                    </section>
                ))}
            </div>
            <div>
                { totalPages > 1 &&(
                    <>
                        <div className="current-page" aria-hidden="true">
                            Page {activePage + 1} of {totalPages}
                        </div>
                        <span className="sr-only" aria-live="polite">
                            You are on page {activePage + 1} of {totalPages}
                        </span>
                    </>
                )}
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
                    { totalPages > 1 &&(
                    <div className="control-box control-right">
                        {activePage > 0 && (
                        <div>
                            back<br />
                            &larr;                    
                        </div>
                        )}
                        {activePage < pages.length - 1 && (
                        <div>
                            fwrd<br />
                            &rarr;                   
                        </div>
                        )}
                    </div>
                    )}
                </div>
            </div>
        </main>
    )
}

export default ProjectsByType