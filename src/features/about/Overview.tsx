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
            <h2>Technologies</h2>
            <div className="details-container">                
                <p>
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
                </p>
            </div>
            <h2>Legal</h2>
            <div className="details-container">
                &#169; {copyYear} {copyName}
            </div>
        </div>
    )
}

export default Overview