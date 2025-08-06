import { useQuery } from '@tanstack/react-query';
import { getProfiles } from '../../services/profileService';
import type { ProfileTypes } from '../../types/profileTypes';

export const useNotes = () => {
    return useQuery<ProfileTypes[]>({
        queryKey: ['notes'],
        queryFn: getProfiles,
        refetchInterval: 15000,        // poll every 15 seconds
        refetchOnWindowFocus: true,    // refetch on window/tab focus
        refetchOnMount: true
    });
};