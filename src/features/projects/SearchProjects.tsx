import { useState, useEffect, useRef } from 'react';
import type { ProjectTypes } from '../../types/projectTypes';
import { Link } from '@tanstack/react-router';
import { useKeyboardNavStore } from "../../stores/keyboardNavStore";
import { useProjects } from './useProjectsApi';

const SearchProjects = () => {

    const [search, setSearch] = useState('');
    const [filteredProjects, setFilteredProjects] = useState<ProjectTypes[]>([]);
    const server = import.meta.env.VITE_SERVER_URL
    const searchInputRef = useRef<HTMLInputElement>(null);
    const focusedIndex = useKeyboardNavStore((s) => s.focusedIndex);
    const setLinkCount = useKeyboardNavStore((s) => s.setLinkCount);
    const setFocusedIndex = useKeyboardNavStore((s) => s.setFocusedIndex);

    const {
        data: projects,
        isError,
    } = useProjects();


    //reset initial values, focus page on search input
    useEffect(() => {
        setFocusedIndex(0);
        searchInputRef.current?.focus({ preventScroll: true });
    },[])


    //update search results when search changes
    useEffect(() => {
        if (projects && search) {
            const results = projects.filter(project =>
                project.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredProjects(results);
        } else {
            setFilteredProjects([]); // If no search term, clear results
        }
    }, [search, projects]);
    
    
    //update linkCount when search results change
    useEffect(() => {
        const pageLinks = Array.from(
        document.querySelectorAll<HTMLInputElement | HTMLAnchorElement>(
            'input, a'
        )
        );
        setLinkCount(pageLinks.length - 1); // 0 = input, 1..n = results
    }, [filteredProjects, setLinkCount]);

    // Focus the correct element whenever focusedIndex changes (via navigation)
    useEffect(() => {
            const pageLinks = Array.from(
                document.querySelectorAll<HTMLInputElement | HTMLAnchorElement>(
                    'input, a'
                )
            );
            const current = pageLinks[focusedIndex];
            current?.focus({ preventScroll: true });
    }, [focusedIndex]);

    if (isError || !projects) return <p>Error loading projects...</p>;

    return (
        <main>
            <div className="content">
                <h1>Search for a Project</h1>
                <div className="search-form-container">
                    <form className='search-form' onSubmit={(e) => e.preventDefault()}>
                        <label className="sr-only" htmlFor='search'>Search Here</label>
                        <input
                            id='search'
                            ref={searchInputRef}
                            type='text'
                            role='searchbox'
                            className={focusedIndex === 0 ? 'input-focus' : ''}
                            placeholder='search'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                // Only handle arrow keys here; other keys behave normally
                                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                                    e.preventDefault(); // prevent cursor movement
                                    // Delegate to your global keyboard nav
                                }
                            }}   
                        />
                    </form>
                </div>
                <div>
                {filteredProjects.map((project, i) => (
                    <div className = "profile-links" key={project.id}>
                        <Link 
                            to={`/projects/${project.id}`}
                            className={focusedIndex === i + 1 ? 'focussed' : ''}
                        >                                                
                            <h2 className="link-text">
                                <img 
                                    src = {server+project.imageGrn}
                                    alt = {project.imageAlt}
                                    className="project-image-thumb"
                                />
                                {project.name}
                            </h2>
                        
                        </Link>
                    </div>
                ))}
                </div>
            </div>
            <div className="control-container">
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
            </div>
        </main>
    )
}

export default SearchProjects