import type { ProjectEcosystem } from '../../types/projectTypes';
import { Fragment } from 'react';

type techProps = {
    projectEcosystem: ProjectEcosystem []
}

const AboutTech = ({projectEcosystem}: techProps) => {
  return (
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
  )
}

export default AboutTech