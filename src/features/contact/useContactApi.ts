import { useMutation } from '@tanstack/react-query';
import { postContact } from '../../services/contactService';
import type { ContactTypes } from '../../types/contactTypes';

export const usePostContact = () =>
    useMutation<ContactTypes[], Error, ContactTypes>({
        mutationFn: postContact,
        onSuccess: () => console.log('Contact submitted successfully!'),
        onError: (error: any) => console.error('Failed to submit contact:', error),
    });