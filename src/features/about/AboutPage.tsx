import { useEffect } from 'react';
import { useAbout } from './useAboutApi';
import { useKeyboardNavStore } from '../../stores/keyboardNavStore';
import useTitle from '../../hooks/useTitle';
import Overview from '../about/Overview';
import Links from '../about/Links';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';

const AboutPage = () => {

    useTitle('About This Site');

    const activePage = useKeyboardNavStore((s) => s.activePage);
    const setMaxIndex = useKeyboardNavStore.getState().setMaxIndex;
    const setActivePage = useKeyboardNavStore.getState().setActivePage;
    const enabled = useKeyboardNavStore((s) => s.enabled);

    const {
        data: about,
        isError,
        isLoading
    } = useAbout();

    useEffect (() => {
        if (!about) return;
        //resets the active page to the first in the pages array
        setActivePage(0);
        //max index is the length of the pages array, sets this in the store for navigation purposes
        setMaxIndex(1);
    }, [about])
    
    if (isLoading) return <Loading />;
    if (isError) return <Error />;
    if (!about) return <NotFound />
    
    const pages = [
        {
            title: `Site Details`,
            content: (
                <Overview
                    overview={about.overview}
                    copyYear={about.copyYear}
                    copyName={about.copyName}
                    projectEcosystem={about.projectEcosystem}        
                />
            )
        },
        {
            title: `Related Links`,
            content: (
                <Links 
                    clientRepo={about.clientRepo}
                    serverRepo={about.serverRepo} 
                />
            )
        }
    ];   

    return (
        <main aria-describedby={enabled ? 'navigation-instructions' : undefined}>
            {enabled &&(
                <>
                    <p className="sr-only" id="navigation-instructions">
                        Use the left and right arrow keys to move between pages.
                        Press Escape to return to the homepage.
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
                    page { activePage + 1 } of 2
                </div>
                <span className="sr-only" aria-live="polite">
                    You are on page {activePage + 1} of 2
                </span>
                <div className="control-container" aria-hidden="true">
                    <div className="control-box">
                        <div>
                            exit<br />
                            <kbd>Esc</kbd>
                        </div>
                        {activePage === 1 && (<>                        
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

export default AboutPage