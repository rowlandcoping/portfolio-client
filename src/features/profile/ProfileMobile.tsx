import type { ProfileTypes, Skill } from '../../types/profileTypes';
import type { UserTypes } from '../../types/userTypes';
import type { EcoTypes } from '../../types/ecoTypes';
import type { EcoTypeTypes } from '../../types/ecoTypeTypes';
import { useEcosystems } from './useEcosystemApi';
import { useEcoTypes } from './useEcoTypeApi';
import { Link } from '@tanstack/react-router';
import { useEffect, Fragment } from "react";
import { useKeyboardNavStore } from "../../stores/keyboardNavStore";

import { useMobileNavStore } from '../../stores/mobileNavStore';

interface ProfileMobileProps {
  profile: ProfileTypes;
  name: UserTypes['name'];
} 


const ProfileMobile = ({profile, name}: ProfileMobileProps) => {
    const server = import.meta.env.VITE_SERVER_URL;

    const enabled = useKeyboardNavStore((s) => s.enabled);       
    
    const setContentHeight = useMobileNavStore((s) => s.setContentHeight);

    const focusedIndex = useKeyboardNavStore((s) => s.focusedIndex);
    const setLinkCount = useKeyboardNavStore((s) => s.setLinkCount);
    const setFocusedIndex = useKeyboardNavStore((s) => s.setFocusedIndex);

    const {
        data: ecosystems,
        isError: isEcosystemError,
    } = useEcosystems();
    
    const {
        data: ecoTypes,
        isError: isEcoTypeError,
    } = useEcoTypes();

    if (isEcosystemError || isEcoTypeError || !ecosystems || !ecoTypes) return <p>Error loading profile data...</p>;

    const ecosystemMap = Object.fromEntries(
            //effectively creates an object of objects sorted by id, passing an id and an object, ie:
            /*  {
                    1: { id: 1, name: "Postgres", type: "database" },
                    2: { id: 2, name: "React", type: "framework" },
                    3: { id: 3, name: "TypeScript", type: "language" }
                }
            */
            ecosystems.map((ecosystem: EcoTypes) => [ecosystem.id, ecosystem])
        );
    
        const typeMap = Object.fromEntries(
            ecoTypes.map((ecotype: EcoTypeTypes) => [ecotype.id, ecotype.name])
        );
    
        const databases: Skill[] = [];
        const languages: Skill[] = [];
        const others: Skill[] = [];
    
        for (const skill of profile.skills) {
            //pulls object relating to the passed index from array
            const eco = ecosystemMap[skill.ecoId];
            if (!eco) return <p>Error loading profile data...</p>; // skip if no ecosystem match
    
            const typeName = typeMap[eco.typeId];
    
            if (typeName === "database") {
                databases.push(skill);
            } else if (typeName === "language") {
                languages.push(skill);
            } else {
                others.push(skill);
            }
        }


    useEffect(() => {
        if (!profile.links) return;
        const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a'));
        setFocusedIndex(0);
        setLinkCount(pageLinks.length-1);
        pageLinks[0].focus();
    }, [profile]);

    useEffect(() => {
        if (enabled) return;
            //NB requestAnimationFrame waits for everything to be rendered
        
        const scrollable = document.querySelector('.scrollable-content') as HTMLDivElement;
        if (scrollable) setContentHeight(scrollable.scrollHeight);
        
    }, [enabled]);

    

    return (
        <div>
            <h1>Profile - {name}</h1>
            <div className = "project-overview"> 
                <h2>About</h2>           
                
                <img 
                    src = {server+profile.imageGrn}
                    alt = {profile.imageAlt}
                />
                <div>
                    <h3>
                        NAME: {name}
                    </h3>
                    <h3>
                        STAR: {profile.starSign}
                    </h3>                    
                    <h3>
                        FAV: {profile.favColor}
                    </h3>
                            
                </div>             
                
                <div className="project-text">

                    {profile.description}

                </div>
            </div>
            <div>
                <h2>About</h2> 
            {others.length > 0 && (<>
            
                        <h3>Frameworks and Platforms</h3>
                        <div className="skills-wrapper">
                            {others.map(s => (
                            <p key={s.id}>
                                {s.name} <kbd>({s.tech.map(t => t.name).join(', ')})</kbd>
                            </p>
                            ))}
                        </div>
            
                        </>)}
                        {languages.length > 0 && (<>
                        
                        <h3>Languages</h3>
                        <div className="skills-wrapper">
                            <p>
                                {languages.map((s, i) => (<Fragment key={s.id}>                    
                                    {s.name} <kbd>({s.tech.map(t => t.name).join(', ')})</kbd>
                                    {i < languages.length - 1 ? ', ' : ''}                    
                                </Fragment>))}
                            </p>
                        </div>
                        
                        </>)}
                        
                        {databases.length > 0 && (<>
            
                        <h2>Databases</h2>
                        <div className="skills-wrapper">
                            <p>
                                {databases.map((s, i) => (<Fragment key={s.id}>                    
                                    {s.name} <kbd>({s.tech.map(t => t.name).join(', ')})</kbd>
                                    {i < databases.length - 1 ? ', ' : ''}                    
                                </Fragment>))}
                            </p>
                        </div>
            
                        </>)}
            </div>
            {profile.links.map((link, i) => (
                <div className = "profile-links" key={link.id}>
                    <Link 
                        to={link.url}
                        className={focusedIndex === i ? 'focussed' : ''}
                    >                                                
                        <h2>
                            <img src={server+link.logoGrn} alt={link.logoAlt} />
                            <span className="link-text">{link.name}</span>
                        </h2>
                    
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default ProfileMobile