
import type { ProfileTypes } from '../../types/profileTypes';
import type { UserTypes } from '../../types/userTypes';
import { useKeyboardNavStore } from '../../stores/keyboardNavStore';


type AboutProps = Pick<ProfileTypes, 'description' | 'imageGrn' | 'imageGry' | 'imageAlt' | 'jobTitle'> &
Pick<UserTypes, 'name'>;

const About = ({ name, description, imageGrn, imageGry, imageAlt, jobTitle }: AboutProps) => {
    const server = import.meta.env.VITE_SERVER_URL;
    const enabled = useKeyboardNavStore((s) => s.enabled);

    return (
        <div className = "project-overview">           
            <div className="project-image-container">                
                <img 
                    src = { enabled
                        ? `${server+imageGrn}`
                        : `${server+imageGry}`   
                    }
                    alt = {imageAlt}
                    className="project-image"
                />
                <div className="">
                    <h2>
                        NAME: {name}
                    </h2> 
                    <h2>
                        TITLE: {jobTitle}
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