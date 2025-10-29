
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from "react";
import { useKeyboardNavStore } from "../../stores/keyboardNavStore";
import { useProjects } from './useProjectsApi';
import useTitle from '../../hooks/useTitle';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';

const AllProjects = () => {

    useTitle(`Find a Project - All Projects`);

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
        isLoading
    } = useProjects();

    useEffect(() => {
        if (!projects) return;
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.selected a'));
        setFocusedIndex(0);
        setLinkCount(pageLinks.length-1);
        if(pageLinks[0]) pageLinks[0].focus({ preventScroll: true });
    }, [projects, activePage]);

    useEffect(() => {
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.selected a'));
        const current = pageLinks[focusedIndex % pageLinks.length];            
        if (current) current.focus({ preventScroll: true });
    }, [focusedIndex, activePage]);

    useEffect (() => {
        if (!projects || isError) {
            setMaxIndex(0);
        } else {
            const total = Math.ceil(projects.length / itemsPerPage);
            setTotalPages(total);   
            setActivePage(0);
            setMaxIndex(total-1);
        }
    }, [projects, isError])


    if (isLoading) return <Loading />;
    if (isError) return <Error />;
    if (!projects) return <NotFound />

    const pages = [];

    for (let i = 0; i < projects.length; i += itemsPerPage) {
        const slice = projects.slice(i, i + itemsPerPage);
        pages.push({
            title: `${
                projects.length > itemsPerPage 
                    ? `All Projects (${ itemsPerPage > 1 
                        ? `${i + 1}-${i + slice.length} of ${projects.length})`
                        : `${i + 1} of ${projects.length})`}`
                    : `All Projects`}`,
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
                        Press Escape to return to the main projects page.
                    </p>
                    <p className="sr-only" id="links-navigation-instructions">
                        Use up and down arrow keys to cycle between links.
                        Press Enter to select a link.
                        Press Escape to return to the main projects page.
                    </p>
                </>
            )}
            <div>
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

export default AllProjects