import type { ProfileTypes } from '../types/profileTypes';

const BASE_URL = import.meta.env.MODE === 'production' 
    ? 'https://TBC' 
    : 'http://localhost:3500/personal';

export const getProfiles = async (): Promise<ProfileTypes[]> => {
    const response = await fetch(BASE_URL, {        
    })
    const data = await response.json();
    return data;
}