import type { ProjectTypeTypes } from '../types/projectTypeTypes';

const BASE_URL = import.meta.env.MODE === 'production' 
    ? 'https://TBC' 
    : 'http://localhost:3500/projects/types';

export const getProjectTypes = async (): Promise<ProjectTypeTypes[]> => {
    const response = await fetch(BASE_URL)
    const data = await response.json();
    return data;
}