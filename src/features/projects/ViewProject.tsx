import { useParams } from '@tanstack/react-router';
import { viewProjectRoute } from '../../app/router';
import { useEffect } from "react";
import { useKeyboardNavStore } from "../../stores/keyboardNavStore";
import { useProjects } from './useProjectsApi';
import { useProjectTypes } from './useProjectTypesApi';
import Overview from './Overview';
import Details from './Details';
import Links from './Links';



const ViewProject = () => {

    const { id } = useParams({from: viewProjectRoute.id});
    const setMaxIndex = useKeyboardNavStore.getState().setMaxIndex;
    const setActivePage = useKeyboardNavStore.getState().setActivePage;
    const enabled = useKeyboardNavStore((s) => s.enabled);

    const activePage = useKeyboardNavStore((s) => s.activePage);
    const returnPage = useKeyboardNavStore((s) => s.returnPage);

    const {
        data: projects,
        isError,
    } = useProjects();

    const {
        data: projectTypes,
        isError: isTypesError,
    } = useProjectTypes();

    const project = projects?.find((p) => Number(p.id) === Number(id));
    const type = projectTypes?.find((type) => Number(type.id) === project?.typeId);
    const page = returnPage.split("/")[2];
    
    useEffect (() => {
        //resets the active page to the first in the pages array
        //also returns user to the page they were on if they return from specific routes
        if (page === "contact") {
            setActivePage(2);
        } else {
            setActivePage(0);
        }
        //max index is the length of the pages array, sets this in the store for navigation purposes
        setMaxIndex(2);
    }, [])

    if (!project || !type) return <p>Loading Project Data...</p>;
    if (isError || isTypesError) return <p>Error Loading Project Data...</p>;
    
    
    const pages = [
        {
            title: `About ${project.name}`,
            content: (
                <Overview
                    name={type.name}
                    overview={project.overview}
                    imageGrn={project.imageGrn}
                    imageGry={project.imageGry}
                    imageAlt={project.imageAlt}
                    dateMvp={project.dateMvp}
                    dateProd={project.dateProd}               
                />
            )
        },
        {
            title: `${project.name} Details`,
            content: (
                <Details 
                    features={project.features}
                    issues={project.issues}
                    projectEcosystem={project.projectEcosystem}
                />
            )
        },
        {
            title: `${project.name} Links`,
            content: (
                <Links
                    activePage={activePage}
                    id={project.id}
                    name={project.name}
                    url={project.url}
                    repo={project.repo}
                />
            )
        },
    ];

    return (
        <main aria-describedby={enabled ? 'navigation-instructions' : undefined}>
            {enabled &&(
                <>
                    <p className="sr-only" id="navigation-instructions">
                        Use the left and right arrow keys to move between pages.
                        Press Escape to return to the previous page.
                    </p>
                    <p className="sr-only" id="links-navigation-instructions">
                        Use up and down arrow keys to cycle between links.
                        Press Enter to select a link.
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
                <div className="current-page" aria-hidden="true">
                    page { activePage + 1 } of {pages.length}
                </div>
                <span className="sr-only" aria-live="polite">
                    You are on page {activePage + 1} of {pages.length}
                </span>
                <div className="control-container" aria-hidden="true">
                    <div className="control-box">
                        <div>
                            exit<br />
                            <kbd>Esc</kbd>
                        </div>
                        {activePage === 2 && (<>                        
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
                        </>)}
                    </div>
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
                </div>
            </div>


        </main>
    )
}

export default ViewProject