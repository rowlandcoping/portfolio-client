import { useQuery } from '@tanstack/react-query';
import { getProjectTypes } from '../../services/projectTypeService';

export const useProjectTypes = () => {
    return useQuery({
        queryKey: ['project-types'],
        queryFn: getProjectTypes,
        staleTime: 1000 * 60 * 120,        // poll every hour
        refetchOnWindowFocus: true,    // refetch on window/tab focus
        refetchOnMount: true
    });
};