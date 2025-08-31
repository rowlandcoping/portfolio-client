import type { ProjectEcosystem, Feature, Issue } from '../../types/projectTypes';
import { Fragment } from 'react';

type DetailProps = {
    projectEcosystem: ProjectEcosystem[];
    features: Feature[];
    issues: Issue[];
}

const Details = ({ features, issues, projectEcosystem }:DetailProps) => {
    console.log(projectEcosystem)
    return (
        <>
        <div className="skills-wrapper">
            <h2>Technologies</h2>
            <div className="details-container">
                {projectEcosystem.map((s,i) => (
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
            </div>
        </div>
        <div className="fissues-wrapper">
            <h2>Features</h2>
            <div className="details-container">                
                    {features.map(s => (
                    <p key={s.id}>
                        - {s.description}
                    </p>            
                ))}
            </div>
            <h2>Issues</h2>
            <div className="details-container">                            
                {issues.map(s => (
                <p key={s.id}>
                    - {s.description}
                </p>
                ))}
            </div>
        </div>
        </>
    )
}

export default Details