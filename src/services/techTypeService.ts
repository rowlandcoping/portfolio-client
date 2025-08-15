import type { TechTypeTypes } from '../types/techTypeTypes';

const BASE_URL = import.meta.env.MODE === 'production' 
    ? 'https://TBC' 
    : 'http://localhost:3500/tech/techtypes';

export const getTechTypes = async (): Promise<TechTypeTypes[]> => {
    const response = await fetch(BASE_URL)
    const data = await response.json();
    return data;
}