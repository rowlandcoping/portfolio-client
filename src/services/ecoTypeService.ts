import type { EcoTypeTypes } from '../types/ecoTypeTypes';

const BASE_URL = import.meta.env.MODE === 'production' 
    ? 'https://TBC' 
    : 'http://localhost:3500/tech/ecotypes';

export const getEcoTypes = async (): Promise<EcoTypeTypes[]> => {
    const response = await fetch(BASE_URL)
    const data = await response.json();
    return data;
}