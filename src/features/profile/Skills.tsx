
import type { ProfileTypes } from '../../types/profileTypes'

type SkillsProps = Pick<ProfileTypes, 'skills'>;

const Skills = ({ skills }: SkillsProps) => {
    return (
        <>
            <p>Skills</p>
        </>
    )
}

export default Skills