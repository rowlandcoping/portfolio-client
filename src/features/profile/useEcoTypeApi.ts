import { useQuery } from '@tanstack/react-query';
import { getEcoTypes } from '../../services/ecoTypeService';

export const useEcoTypes = () => {
    return useQuery({
        queryKey: ['ecosystem-types'],
        queryFn: getEcoTypes,
        staleTime: 1000 * 60 * 120,        // poll x minutes (last number)
        refetchOnWindowFocus: true,    // refetch on window/tab focus
        refetchOnMount: true
    });
};