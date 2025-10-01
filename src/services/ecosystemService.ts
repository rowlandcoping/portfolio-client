import type { EcoTypes } from '../types/ecoTypes';

const BASE_URL = import.meta.env.VITE_SERVER_URL + '/tech/ecosystems';

export const getEcosystems = async (): Promise<EcoTypes[]> => {
    const response = await fetch(BASE_URL)
    const data = await response.json();
    return data;
}