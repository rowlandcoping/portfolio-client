
import type { ProfileTypes } from '../../types/profileTypes';
import type { UserTypes } from '../../types/userTypes';


type AboutProps = Pick<ProfileTypes, 'description' | 'imageGrn' | 'imageAlt' | 'starSign' | 'favColor'> &
Pick<UserTypes, 'name'>;

const About = ({ name, description, imageGrn, imageAlt, starSign, favColor }: AboutProps) => {
    const server = import.meta.env.VITE_SERVER_URL

    return (
        <div className = "project-overview">           
            <div className="project-image-container">
                <img 
                    src = {server+imageGrn}
                    alt = {imageAlt}
                    className="project-image"
                />
                <div className="">
                    <h2>
                        NAME: {name}
                    </h2> 
                    <h2>
                        STAR SIGN: {starSign}
                    </h2>                    
                    <h2>
                        FAV COLOR: {favColor}
                    </h2>                    
                </div>
            </div>
            <div className="project-text">

                {description}

            </div>
        </div>
    )
}

export default About