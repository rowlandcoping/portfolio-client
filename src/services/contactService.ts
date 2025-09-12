import type { ContactTypes } from '../types/contactTypes';

const BASE_URL = import.meta.env.MODE === 'production' 
    ? 'https://TBC' 
    : 'http://localhost:3500/personal/contacts';

export const postContact = async (payload: ContactTypes): Promise<ContactTypes[]> => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-user-uuid': import.meta.env.VITE_USER_UUID,
        },
        body: JSON.stringify(payload),    
    })
    if (!response.ok) {
        throw new Error(`Failed to post contact: ${response.statusText}`);
    }

    return response.json();
}