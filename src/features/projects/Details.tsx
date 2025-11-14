import type { ProjectEcosystem, Feature, Issue } from '../../types/projectTypes';
import { Fragment } from 'react';

type DetailProps = {
    projectEcosystem: ProjectEcosystem[];
    features: Feature[];
    issues: Issue[];
}

const Details = ({ features, issues, projectEcosystem }:DetailProps) => {
    return (
        <>
        <div className="technologies-wrapper">
            <h3>Technologies</h3>
            <div className="skills-wrapper">
                <p>
                    {projectEcosystem.map((s,i) => (
                    <Fragment key={s.ecosystem.id}>
                        {i > 0 && ', '}
                        {s.ecosystem.name}
                        {s.tech.length > 0 && (
                            <span className="skill-info">
                                &nbsp;({s.tech.map(t => t.name).join(', ')})   
                            </span>
                        )}
                    </Fragment>
                    ))}
                </p>
            </div>
        </div>
        <div className="fissues-wrapper">
            <h3>Features</h3>
            <div className="details-container">                
                {features.map(s => (
                    <p key={s.id}>
                        - {s.description}
                    </p>            
                ))}
            </div>
            <h3>Issues</h3>
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