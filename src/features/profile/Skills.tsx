import { Fragment } from 'react';
import type { ProfileTypes } from '../../types/profileTypes';
import type { EcoTypes } from '../../types/ecoTypes';
import type { EcoTypeTypes } from '../../types/ecoTypeTypes';
import type { Skill } from '../../types/profileTypes';
import { useEcosystems } from './useEcosystemApi';
import { useEcoTypes } from './useEcoTypeApi';


type SkillsProps = Pick<ProfileTypes, 'skills'>;

const Skills = ({ skills }: SkillsProps) => {

    const {
        data: ecosystems,
        isError: isEcosystemError,
    } = useEcosystems();
    
    const {
        data: ecoTypes,
        isError: isEcoTypeError,
    } = useEcoTypes();

    if (!ecosystems || !ecoTypes) return <p>Loading Profile Data...</p>;
    if (isEcosystemError || isEcoTypeError) return <p>Error Loading Profile Data...</p>;

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

    for (const skill of skills) {
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

    return (
        <>
            {others.length > 0 && (<>

            <h2>Frameworks and Platforms</h2>
            <div className="skills-wrapper">
                {others.map(s => (
                <p key={s.id}>
                    {s.name} <kbd>({s.tech.map(t => t.name).join(', ')})</kbd>
                </p>
                ))}
            </div>

            </>)}
            {languages.length > 0 && (<>
            
            <h2>Languages</h2>
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
        </>
    )
}

export default Skills