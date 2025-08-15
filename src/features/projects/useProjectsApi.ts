import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../../services/projectService';

export const useProjects = () => {
    return useQuery({
        queryKey: ['notes'],
        queryFn: getProjects,
        staleTime: 1000 * 60 * 30,        // poll every hour
        refetchOnWindowFocus: true,    // refetch on window/tab focus
        refetchOnMount: true
    });
};