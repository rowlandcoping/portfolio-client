import type { TechTypeTypes } from '../types/techTypeTypes';

const BASE_URL = import.meta.env.VITE_SERVER_URL + '/tech/techtypes';


export const getTechTypes = async (): Promise<TechTypeTypes[]> => {
    const response = await fetch(BASE_URL)
    const data = await response.json();
    return data;
}