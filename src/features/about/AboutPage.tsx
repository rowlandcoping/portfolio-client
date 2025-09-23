import { useEffect, Fragment } from 'react';
import { useAbout } from './useAboutApi';
import { Link } from '@tanstack/react-router';
import { useKeyboardNavStore } from '../../stores/keyboardNavStore';





const AboutPage = () => {

    const setFocusedIndex = useKeyboardNavStore((s) => s.setFocusedIndex);

    const {
        data: about,
        isError,
    } = useAbout();

    useEffect(() => {
        if (!about) return;
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
        setFocusedIndex(0);
        pageLinks[0].focus();
    }, [about]);

    if (isError || !about) return <p>Error loading profile data...</p>;
    

    return (
        <main>
            <div className="content">
                <h1>About This Site</h1>
                <div className="details-container">                
                    <p>
                        {about.overview}
                    </p>
                </div>
                <h2>Technologies</h2>
                <div className="details-container">                
                    <p>
                        {about.projectEcosystem.map((s,i) => (
                            <Fragment key={s.ecosystem.id}>
                                {i > 0 && ', '}
                                {s.ecosystem.name}  
                                <kbd>
                                    {s.tech.length > 0 && (
                                    <> ({s.tech.map(t => t.name).join(', ')})</>
                                    )}
                                </kbd>
                            </Fragment>
                        ))}
                    </p>
                </div>
                <h2>Legal</h2>
                <div className="details-container">
                    &#169; {about.copyYear} {about.copyName}
                </div>  
                <h2>Links</h2>
                <div className="details-container">
                    <Link 
                        to={about.repo}
                        className='focussed'
                    >
                        <h2>View Repository</h2>
                    </Link>
                </div>              
            </div>
            
            <div className="control-container">
                <div className="control-box">
                    <div>
                        exit<br />
                        <kbd>Esc</kbd>
                    </div>
                    <div>
                        slct<br />
                        &crarr;
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AboutPage