import { useEffect, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getUser } from '../services/userService';
import { getProfile } from '../services/profileService';
import { getProjects } from '../services/projectService';
import { getProjectTypes } from '../services/projectTypeService';
import { getEcoTypes } from '../services/ecoTypeService';
import { getTechTypes } from '../services/techTypeService';

type PrefetchProps = {
  children: ReactNode;
}

const Prefetch = ({children}: PrefetchProps) => {
    const queryClient = useQueryClient();
    useEffect(() => {
        queryClient.prefetchQuery({
            queryKey: ['project-types'],
            queryFn: getProjectTypes,
            staleTime: 1000 * 60 * 30,
        });
        queryClient.prefetchQuery({
            queryKey: ['ecosystem-types'],
            queryFn: getEcoTypes,
            staleTime: 1000 * 60 * 30,
        });
        queryClient.prefetchQuery({
            queryKey: ['tech-types'],
            queryFn: getTechTypes,
            staleTime: 1000 * 60 * 30,
        });
        queryClient.prefetchQuery({
            queryKey: ['user'],
            queryFn: getUser,
            staleTime: 1000 * 60 * 30,
        });
        queryClient.prefetchQuery({
            queryKey: ['profile'],
            queryFn: getProfile,
            staleTime: 1000 * 60 * 30,
        });
        queryClient.prefetchQuery({
            queryKey: ['projects'],
            queryFn: getProjects,
            staleTime: 1000 * 60 * 30,
        });
    }, []);
    
    return <>{children}</>
}

export default Prefetch