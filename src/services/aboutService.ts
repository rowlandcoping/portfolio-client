import type { AboutTypes } from '../types/aboutTypes';

const BASE_URL = import.meta.env.VITE_SERVER_URL + '/personal/about/provider';

export const getAbout = async (): Promise<AboutTypes> => {
    const response = await fetch(BASE_URL, {
        headers: {
            'x-user-uuid': import.meta.env.VITE_USER_UUID,
        },       
    })
    const data = await response.json();
    return data;
}