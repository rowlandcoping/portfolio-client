import { useEffect } from 'react';
import { useAbout } from './useAboutApi';
import { useKeyboardNavStore } from '../../stores/keyboardNavStore';
import Overview from '../about/Overview';
import Links from '../about/Links';

const AboutPage = () => {

    const activePage = useKeyboardNavStore((s) => s.activePage);
    const setMaxIndex = useKeyboardNavStore.getState().setMaxIndex;
    const setActivePage = useKeyboardNavStore.getState().setActivePage;

    const {
        data: about,
        isError,
    } = useAbout();

    useEffect (() => {
        if (!about) return;
        //resets the active page to the first in the pages array
        setActivePage(0);
        //max index is the length of the pages array, sets this in the store for navigation purposes
        setMaxIndex(1);
    }, [about])
    
    if (!about) return <p>Loading About Page Data...</p>;
    if (isError) return <p>Error About Page Data...</p>;
    
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
                    page { activePage + 1 } of 2
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

export default AboutPage