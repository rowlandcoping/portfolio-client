import type { EcoTypeTypes } from '../types/ecoTypeTypes';

const BASE_URL = import.meta.env.VITE_SERVER_URL + '/tech/ecotypes';

export const getEcoTypes = async (): Promise<EcoTypeTypes[]> => {
    const response = await fetch(BASE_URL)
    const data = await response.json();
    return data;
}