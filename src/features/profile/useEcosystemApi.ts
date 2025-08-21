import { useQuery } from '@tanstack/react-query';
import { getEcosystems } from '../../services/ecosystemService';

export const useEcosystems = () => {
    return useQuery({
        queryKey: ['ecosystems'],
        queryFn: getEcosystems,
        staleTime: 1000 * 60 * 120,        // poll x minutes (last number)
        refetchOnWindowFocus: true,    // refetch on window/tab focus
        refetchOnMount: true
    });
};