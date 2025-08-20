import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../services/profileService';

export const useProfile = () => {
    return useQuery({
        queryKey: ['notes'],
        queryFn: getProfile,
        staleTime: 1000 * 60 * 1,        // poll x minutes
        refetchOnWindowFocus: true,    // refetch on window/tab focus
        refetchOnMount: true
    });
};