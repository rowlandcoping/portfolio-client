import type { EcoTypes } from '../types/ecoTypes';

const BASE_URL = import.meta.env.MODE === 'production' 
    ? 'https://TBC' 
    : 'http://localhost:3500/tech/ecosystems';

export const getEcosystems = async (): Promise<EcoTypes[]> => {
    const response = await fetch(BASE_URL)
    const data = await response.json();
    return data;
}