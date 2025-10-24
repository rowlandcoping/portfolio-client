import { useParams } from '@tanstack/react-router';
import { contactProjectRoute } from '../../app/router';
import ContactForm from '../contact/ContactForm';
import { useProjects } from './useProjectsApi';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';

const ProjectContact = () => {
    const { id } = useParams({from: contactProjectRoute.id})
    const projectId = Number(id)

    const {
        data: projects,
        isError,
        isLoading,
    } = useProjects();

    const project = projects?.find((p) => Number(p.id) === projectId);

    if (isLoading) return <Loading />;
    if (isError) return <Error />;
    if (!project) return <NotFound />;    
    
    return (
        <ContactForm 
            project = {project}
        />
    )
}

export default ProjectContact