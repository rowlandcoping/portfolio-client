import type { AboutTypes } from '../../types/aboutTypes';


type DetailProps = Pick<AboutTypes, 'overview'>;

const AboutDetail = ({ overview }: DetailProps) => {
    return (
        <p>
            {overview}
        </p>
    )
}

export default AboutDetail