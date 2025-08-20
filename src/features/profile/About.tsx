
import type { ProfileTypes } from '../../types/profileTypes'

type AboutProps = Pick<ProfileTypes, 'description'>;

const About = ({ description }: AboutProps) => {
    return (
        <>
            <p>{ description }</p>
        </>
    )
}

export default About