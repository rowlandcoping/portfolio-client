import { useState, useEffect, useRef, useMemo } from 'react';
import type { ProjectTypes } from '../../types/projectTypes';
import { Link } from '@tanstack/react-router';
import { useKeyboardNavStore } from "../../stores/keyboardNavStore";
import { useProjects } from './useProjectsApi';
import useTitle from '../../hooks/useTitle';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';

const SearchProjects = () => {

    useTitle(`Search for a Project`);

    const [search, setSearch] = useState('');
    const [filteredProjects, setFilteredProjects] = useState<ProjectTypes[]>([]);
    const [totalPages, setTotalPages] = useState(0);

    const server = import.meta.env.VITE_SERVER_URL;
    const searchInputRef = useRef<HTMLInputElement>(null);

    const focusedIndex = useKeyboardNavStore((s) => s.focusedIndex);
    const setLinkCount = useKeyboardNavStore((s) => s.setLinkCount);
    const setFocusedIndex = useKeyboardNavStore((s) => s.setFocusedIndex);
    const setMaxIndex = useKeyboardNavStore.getState().setMaxIndex;
    const setActivePage = useKeyboardNavStore.getState().setActivePage;
    const activePage = useKeyboardNavStore((s) => s.activePage);
    const itemsPerPage = useKeyboardNavStore((s) => s.itemsPerPage);
    const enabled = useKeyboardNavStore((s) => s.enabled);

    const { 
        data: projects, 
        isError, 
        isLoading
    } = useProjects();

    // Focus search input on mount (page 0)
    useEffect(() => {
        setFocusedIndex(0);
        searchInputRef.current?.focus({ preventScroll: true });
    }, []);

    // Update filtered projects when search changes
    useEffect(() => {
        if (!projects) return;
        const results = search
            ? projects.filter((p) =>
                  p.name.toLowerCase().includes(search.toLowerCase())
              )
            : [];
        setFilteredProjects(results);
    }, [search, projects]);

    // Pagination recalculation when filteredProjects change
    useEffect(() => {
        if (!projects || isError) {
            setMaxIndex(0);
        } else {
            const total = Math.ceil(filteredProjects.length / itemsPerPage);
            setTotalPages(total);
            setActivePage(0);
            setMaxIndex(total - 1);
        }
    }, [filteredProjects, itemsPerPage, projects, isError]);

    // Slice results for the current page
    const currentPageProjects = useMemo(() => {
        const start = activePage * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredProjects.slice(start, end);
    }, [filteredProjects, activePage, itemsPerPage]);

    // Reset and refocus whenever page changes
    useEffect(() => {
        const selector =
            activePage === 0
                ? 'input, a' // include search box
                : 'a'; // only links on other pages
        const pageLinks = Array.from(
            document.querySelectorAll<HTMLInputElement | HTMLAnchorElement>(selector)
        );

        setFocusedIndex(0);
        setLinkCount(pageLinks.length - 1);

        const first = pageLinks[0];
        first?.focus({ preventScroll: true });
    }, [activePage, currentPageProjects]);

    // Focus handling for keyboard nav
    useEffect(() => {
        const selector =
            activePage === 0
                ? 'input, a'
                : 'a';
        const pageLinks = Array.from(
            document.querySelectorAll<HTMLInputElement | HTMLAnchorElement>(selector)
        );
        const current = pageLinks[focusedIndex];
        current?.focus({ preventScroll: true });
    }, [focusedIndex, activePage, currentPageProjects]);

    
    if (isLoading) return <Loading />;
    if (isError) return <Error />;
    if (!projects) return <NotFound />;

    return (
        <main aria-describedby={enabled ? 'navigation-instructions' : undefined}>
            {enabled &&(
                <>
                    <p className="sr-only" id="navigation-instructions">
                        {totalPages > 1 &&(
                        `Use the left and right arrow keys to move between pages.`
                        )}
                        Press Escape to return to projects page.
                    </p>
                    <p className="sr-only" id="search-navigation-instructions">
                        Use up and down arrow keys to navigate from the search bar through the search results.
                        Press Enter on a link to select a project to view.
                        Press Escape to return to projects page.
                    </p>
                    <p className="sr-only" id="links-navigation-instructions">
                        Use up and down arrow keys to cycle between projects.
                        Press Enter to select a project.
                        Press Escape to return to projects page.
                    </p>
                </>
            )}
            <div className="content">
                { (filteredProjects.length === 0) 
                    ? <h1>Search for a Project</h1>
                    : <h1>
                            Search Results (showing
                            {currentPageProjects.length === 1
                                ? ` ${activePage * itemsPerPage + 1} of ${filteredProjects.length}`
                                : ` ${activePage * itemsPerPage + 1}-${activePage * itemsPerPage + currentPageProjects.length} of ${filteredProjects.length}`
                            })
                        </h1>
                }
                {activePage === 0 && (
                    <nav 
                        aria-label="Project search results with search box"
                        aria-describedby={enabled ? "search-navigation-instructions" : undefined}
                    >
                        <div className="search-form-container">
                            <form className="search-form" onSubmit={(e) => e.preventDefault()}>
                                <label className="sr-only" htmlFor="search">Search Here</label>
                                <input
                                    id="search"
                                    ref={searchInputRef}
                                    type="text"
                                    role="searchbox"
                                    className={focusedIndex === 0 ? 'input-focus' : ''}
                                    placeholder="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </form>
                        </div>
                        <span className="sr-only" aria-live="polite">
                            {filteredProjects.length > 0
                                ? `${currentPageProjects.length} projects shown`
                                : 'No projects found'}
                        </span>
                        {currentPageProjects.map((project, i) => {
                            // offset index by 1 if we're on page 0 (because input takes index 0)
                            const adjustedIndex = activePage === 0 ? i + 1 : i;                            
                            return (                                
                                <div className="profile-links" key={project.id}>
                                    <Link
                                        to={`/projects/${project.id}`}
                                        className={focusedIndex === adjustedIndex ? 'focussed' : ''}
                                    >
                                        <h3>
                                            <img
                                                src={
                                                    enabled
                                                        ? `${server + project.imageGrn}`
                                                        : `${server + project.imageGry}`
                                                }
                                                alt={project.imageAlt}
                                                className="project-image-thumb"
                                            />
                                            <span className="link-text">{project.name}</span>
                                        </h3>
                                    </Link>
                                </div>
                            )
                        })}
                    </nav>
                )}                

                {activePage > 0 && currentPageProjects.length > 0 && (
                    <nav 
                        aria-label="Project search results without search box"
                        aria-describedby={enabled ? "links-navigation-instructions" : undefined}
                    >                        
                        {currentPageProjects.map((project, i) => {

                            // offset index by 1 if we're on page 0 (because input takes index 0)
                            const adjustedIndex = activePage === 0 ? i + 1 : i;
                            return (
                                <div className="profile-links" key={project.id}>
                                    <Link
                                        to={`/projects/${project.id}`}
                                        className={focusedIndex === adjustedIndex ? 'focussed' : ''}
                                    >
                                        <h3>
                                            <img
                                                src={
                                                    enabled
                                                        ? `${server + project.imageGrn}`
                                                        : `${server + project.imageGry}`
                                                }
                                                alt={project.imageAlt}
                                                className="project-image-thumb"
                                            />
                                            <span className="link-text">{project.name}</span>
                                        </h3>
                                    </Link>
                                </div>
                            );
                        })}
                    </nav>
                )}
            </div>
            <div>
                {totalPages > 1 && (
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
                        {filteredProjects.length > 0 && (
                            <>
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
                            </>
                        )}
                    </div>
                    {totalPages > 1 && (
                        <div className="control-box control-right">
                            {activePage > 0 && (
                                <div>
                                    back<br />
                                    &larr;
                                </div>
                            )}
                            {activePage < totalPages - 1 && (
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
    );
};

export default SearchProjects;
