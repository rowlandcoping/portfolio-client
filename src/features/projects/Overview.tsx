import type { ProjectTypes } from '../../types/projectTypes';
import type { ProjectTypeTypes } from '../../types/projectTypeTypes';

type ProjectProps = Pick<ProjectTypes, 'overview' | 'imageGrn' | 'imageAlt' | 'dateMvp' | 'dateProd'> &
Pick<ProjectTypeTypes, 'name'>;

const Overview = ( {name, overview, imageGrn, imageAlt, dateMvp, dateProd}:ProjectProps ) => {    
    function formatDate(dateInput: string | Date): string {
        const date = new Date(dateInput);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }    
    
    return (
        <div className = "project-overview">            
            <div className="project-image-container">
                <img 
                    src = {`http://localhost:3500${imageGrn}` }
                    alt = {imageAlt}
                    className="project-image"
                />
                <div className="">
                    <h2>
                        TYPE: {name}
                    </h2> 
                    <h2>
                        MVP: {formatDate(dateMvp)}
                    </h2>                    
                    <h2>
                        PROD: {dateProd ? (
                            <>{formatDate(dateProd)}</>
                        ): (
                            <>
                                TBC
                            </>
                        )}
                    </h2>                    
                </div>
            </div>
            <div className="project-text">

                {overview}

            </div>
        </div>
    )
}

export default Overview