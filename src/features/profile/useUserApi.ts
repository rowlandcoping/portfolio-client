import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../services/userService';

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        staleTime: 1000 * 60 * 30,        // poll every hour
        refetchOnWindowFocus: true,    // refetch on window/tab focus
        refetchOnMount: true
    });
};