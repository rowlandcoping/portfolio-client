import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../../services/projectService';

export const useProjects = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: getProjects,
        staleTime: 1000 * 60 * 1,        // poll every hour
        refetchOnWindowFocus: true,    // refetch on window/tab focus
        refetchOnMount: true
    });
};