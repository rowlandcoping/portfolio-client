import type { ProjectTypes } from '../../types/projectTypes';

type ProjectProps = Pick<ProjectTypes, 'overview' | 'imageGrn' | 'imageAlt' | 'dateMvp' | 'dateProd'>;

const Overview = ( {overview, imageGrn, imageAlt, dateMvp, dateProd}:ProjectProps ) => {

    function formatDate(dateInput: string | Date): string {
        const date = new Date(dateInput);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }    
    
    return (
        <div className = "project-overview">
            <div className="project-text">

                {overview}

            </div>
            <div className="project-image-container">
                <img 
                    src = {`http://localhost:3500${imageGrn}` }
                    alt = {imageAlt}
                    className="project-image"
                />
                {dateMvp && (
                    <>
                    <br />MVP: {formatDate(dateMvp)}
                    </>
                )}
                {dateProd && (
                    <>
                        <br />Production: {formatDate(dateProd)}
                    </>
                )}

            </div>
        </div>
    )
}

export default Overview