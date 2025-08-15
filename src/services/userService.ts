import type { UserTypes } from '../types/userTypes';

const BASE_URL = import.meta.env.MODE === 'production' 
    ? 'https://TBC' 
    : 'http://localhost:3500/users/provider';

export const getUser = async (): Promise<UserTypes> => {
    const response = await fetch(BASE_URL, {
        headers: {
            'x-user-uuid': import.meta.env.VITE_USER_UUID,
        },       
    })
    const data = await response.json();
    return data;
}