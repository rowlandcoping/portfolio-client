import { useEffect } from 'react';
import { useProfile } from './useProfileApi';
import { useUser } from './useUserApi';
import { useKeyboardNavStore } from '../../stores/keyboardNavStore';
import About from './About';
import Skills from './Skills';
import Links from './Links';

const Profile = () => {

    const activePage = useKeyboardNavStore((s) => s.activePage);
    const setMaxIndex = useKeyboardNavStore.getState().setMaxIndex;
    const setActivePage = useKeyboardNavStore.getState().setActivePage;
    const enabled = useKeyboardNavStore((s) => s.enabled);

    const {
        data: profile,
        isError: isProfileError,
    } = useProfile();

    const {
        data: user,
        isError: isUserError,
    } = useUser();

    useEffect (() => {
        if (!profile || !user) return;
        //resets the active page to the first in the pages array
        setActivePage(0);
        //max index is the length of the pages array, sets this in the store for navigation purposes
        setMaxIndex(2);
    }, [profile, user])
    
    if (!profile || !user) return <p>Loading Profile Data...</p>;
    if (isProfileError || isUserError) return <p>Error Loading Profile Data...</p>;

    const pages = [
        {
            title: `About ${user.name}`,
            content: (
                <About
                    name={user.name}
                    description={profile.description}
                    imageGrn={profile.imageGrn}
                    imageGry={profile.imageGry} 
                    imageAlt={profile.imageAlt}
                    jobTitle={profile.jobTitle}
                    
                />
            )
        },
        {
            title: `${user.name}'s Skills`,
            content: (
                <Skills skills={profile.skills} />
            )
        },
        {
            title: `${user.name}'s Links`,
            content: (
                <Links links={profile.links} />
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
                    page { activePage + 1 } of 3
                </div>
                <span className="sr-only" aria-live="polite">
                    You are on page {activePage + 1} of 3
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

export default Profile