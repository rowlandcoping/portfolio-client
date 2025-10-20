
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from "react";
import { useKeyboardNavStore } from "../../stores/keyboardNavStore";
import { useProjects } from './useProjectsApi';

const AllProjects = () => {

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
        if (!projects) return
        const total = Math.ceil(projects.length / itemsPerPage);
        setTotalPages(total);   
        setActivePage(0);
        setMaxIndex(total-1);
    }, [])

   
    if (!projects) return <p>Loading Project Data...</p>;
    if (isError) return <p>Error Loading Project Data...</p>;

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
            <div className="projects-page">
                {slice.map((project, j) => (
                <div className="profile-links" key={project.id}>
                    <Link
                    to={`/projects/${project.id}`}
                    className={focusedIndex === j ? 'focussed' : ''}
                    >
                    <h2>
                        <img
                            src = { enabled
                                ? `${server+project.imageGrn}`
                                : `${server+project.imageGry}`   
                            }
                            alt={project.imageAlt}
                            className="project-image-thumb"
                        />
                        <span className="link-text">{project.name}</span>
                    </h2>
                    </Link>
                </div>
                ))}
            </div>
            )
        });
    }

    return (
        <main>
            <div>
                {pages.map((page, index) => (
                    <div
                        key={index}
                        className={index === activePage ? 'selected' : 'hidden'}
                    >
                        <h1>{page.title}</h1>
                        {page.content}
                    </div>
                ))}
            </div>
            <div>
                { totalPages > 1 &&(
                <div className="current-page page-one selected">
                        page { activePage + 1 } of {pages.length}
                </div>
                )}
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