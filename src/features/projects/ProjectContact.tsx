import { useParams } from '@tanstack/react-router';
import { contactProjectRoute } from '../../app/router';
import ContactForm from '../contact/ContactForm';

const ProjectContact = () => {
    const { id } = useParams({from: contactProjectRoute.id})
    const projectId = Number(id)    
    return (
        <ContactForm 
            projectId = {projectId}
        />
    )
}

export default ProjectContact