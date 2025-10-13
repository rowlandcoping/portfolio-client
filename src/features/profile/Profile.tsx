import { useEffect } from 'react';
import { useProfile } from './useProfileApi';
import { useUser } from './useUserApi';
import { useKeyboardNavStore } from '../../stores/keyboardNavStore';
import { useMobileNavStore } from '../../stores/mobileNavStore';
import About from './About';
import Skills from './Skills';
import Links from './Links';



const Profile = () => {

    const enabled = useKeyboardNavStore((s) => s.enabled);
    const activePage = useKeyboardNavStore((s) => s.activePage);
    const setMaxIndex = useKeyboardNavStore.getState().setMaxIndex;
    const setActivePage = useKeyboardNavStore.getState().setActivePage;
    const setContentHeight = useMobileNavStore((s) => s.setContentHeight);

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

    
    useEffect(() => {
        if (enabled || !profile || !user) return;
            //NB requestAnimationFrame waits for everything to be rendered
        requestAnimationFrame(() => {
            const scrollable = document.querySelector('.scrollable-content') as HTMLDivElement;
            if (scrollable) {
                setContentHeight(scrollable.scrollHeight);
            }
        })
    }, [enabled, profile, user, activePage]);
    
    if (isProfileError || isUserError || !profile || !user) return <p>Error loading profile data...</p>;
    
    const pages = [
        {
            title: `About ${user.name}`,
            content: (
                <About
                    name={user.name}
                    description={profile.description}
                    imageGrn={profile.imageGrn}
                    imageAlt={profile.imageAlt}
                    starSign={profile.starSign}
                    favColor={profile.favColor} 
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
                            page { activePage + 1 } of 3
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

export default Profile