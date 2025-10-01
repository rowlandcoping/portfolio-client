import type { TechTypes } from '../types/techTypes';

const BASE_URL = import.meta.env.VITE_SERVER_URL + '/tech/';

export const getTech = async (): Promise<TechTypes[]> => {
    const response = await fetch(BASE_URL)
    const data = await response.json();
    return data;
}