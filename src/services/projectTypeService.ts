import type { ProjectTypeTypes } from '../types/projectTypeTypes';

const BASE_URL = import.meta.env.VITE_SERVER_URL + '/projects/types';

export const getProjectTypes = async (): Promise<ProjectTypeTypes[]> => {
    const response = await fetch(BASE_URL)
    const data = await response.json();
    return data;
}