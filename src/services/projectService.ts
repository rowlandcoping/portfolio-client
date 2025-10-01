import type { ProjectTypes } from '../types/projectTypes';

const BASE_URL = import.meta.env.VITE_SERVER_URL + '/projects/provider';

export const getProjects = async (): Promise<ProjectTypes[]> => {
    const response = await fetch(BASE_URL, {
        headers: {
            'x-user-uuid': import.meta.env.VITE_USER_UUID,
        },       
    })
    const data = await response.json();
    return data;
}