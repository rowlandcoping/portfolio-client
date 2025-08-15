
import { useEffect } from 'react';
import { useKeyboardNavStore } from '../../stores/keyboardNavStore';

const Profile = () => {
    const store = useKeyboardNavStore();
    const { setPreviousPage } = store;


    useEffect(() => {
        setPreviousPage('/'); // or whatever fallback route
    }, []);


    return (
        <div>Hello Profile</div>
    )
}

export default Profile