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

    if (isError || !project || isTypesError || !type) return <p>Error loading projects...</p>;

    

    const pages = [
        {
            title: `About ${project.name}`,
            content: (
                <Overview
                    name={type.name}
                    overview={project.overview}
                    imageGrn={project.imageGrn}
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
                <div className="current-page page-one selected">
                    page { activePage + 1 } of {pages.length}
                </div>
                <div className="control-container">
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