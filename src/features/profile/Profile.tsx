
import { useEffect } from 'react';
import { useProfile } from './useProfileApi';
import { useUser } from './useUserApi';
import { useKeyboardNavStore } from '../../stores/keyboardNavStore';
import About from './About';
import Skills from './Skills';
import Links from './Links';

const Profile = () => {

    const activePage = useKeyboardNavStore((s) => s.activePage);
    const setActivePage= useKeyboardNavStore((s) => s.setActivePage);
    const setMaxIndex = useKeyboardNavStore((s) => s.setMaxIndex);

    const {
        data: profile,
        isError: isProfileError,
    } = useProfile();

    const {
        data: user,
        isError: isUserError,
    } = useUser();

    if (isProfileError || isUserError || !profile || !user) return <p>Error loading profile data...</p>;
    
    const pages = [
        {
            title: `About ${user.name}`,
            content: (
                <About description={profile.description} />
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

    useEffect(() => {
        setActivePage(0);
        setMaxIndex(pages.length - 1);
    }, []);

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