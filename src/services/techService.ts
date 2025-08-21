import type { TechTypes } from '../types/techTypes';

const BASE_URL = import.meta.env.MODE === 'production' 
    ? 'https://TBC' 
    : 'http://localhost:3500/tech/';

export const getTech = async (): Promise<TechTypes[]> => {
    const response = await fetch(BASE_URL)
    const data = await response.json();
    return data;
}