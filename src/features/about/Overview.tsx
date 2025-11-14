import type { AboutTypes } from '../../types/aboutTypes';
import { Fragment } from 'react';

type OverviewProps =  {
    overview?: AboutTypes['overview'];
    copyYear?: AboutTypes['copyYear'];
    copyName?: AboutTypes['copyName'];
    projectEcosystem: AboutTypes['projectEcosystem'];
}

const Overview = ({ overview, projectEcosystem, copyYear, copyName }: OverviewProps) => {

    return (
        <div className="content">
            <div className="details-container">                
                <p>
                    {overview}
                </p>
            </div>
            <h3>Technologies</h3>
            <div className="details-container">                
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
            <h3>Legal</h3>
            <div className="details-container">
                &#169; {copyYear} {copyName}
            </div>
        </div>
    )
}

export default Overview