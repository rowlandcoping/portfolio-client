import { useQuery } from '@tanstack/react-query';
import { getAbout } from '../../services/aboutService';

export const useAbout = () => {
    return useQuery({
        queryKey: ['about'],
        queryFn: getAbout,
        staleTime: 1000 * 60 * 1,        // poll every hour
        refetchOnWindowFocus: true,    // refetch on window/tab focus
        refetchOnMount: true
    });
};