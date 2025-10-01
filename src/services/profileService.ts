import type { ProfileTypes } from '../types/profileTypes';

const BASE_URL = import.meta.env.VITE_SERVER_URL + '/personal/provider';

export const getProfile = async (): Promise<ProfileTypes> => {
    const response = await fetch(BASE_URL, {
        headers: {
            'x-user-uuid': import.meta.env.VITE_USER_UUID,
        },       
    })
    const data = await response.json();
    return data;
}