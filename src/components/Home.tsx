import { Link } from '@tanstack/react-router';
import { useKeyboardNav } from '../hooks/useKeyboardNav';
import { useUser } from '../features/profile/useUserApi';

const Home = () => {

    const profileRef = useKeyboardNav();
    const projectsRef = useKeyboardNav();
    const contactRef = useKeyboardNav();    

    const {
        data: user,
        isError,
    } = useUser();

    if (isError || !user) return <p>Error loading user data...</p>;

    return (
        <main>
            <div className="content">
                <h1>Welcome to {user.name}'s Portfolio</h1>
            
                <Link to="/profile" ref={profileRef}>
                    <h2>View Profile</h2>
                </Link>
                <Link to="/projects" ref={projectsRef}>
                    <h2>Explore Projects</h2>
                </Link>
                <Link to="/contact" ref={contactRef}>
                    <h2>Contact {user.name}</h2>

                </Link>
            </div>
            <div className="control-box">
                <div>
                    next<br />
                    &darr;                    
                </div>
                <div>
                    prev<br />
                    &uarr;                   
                </div>
                <div>
                    slct<br />
                    &crarr;
                </div>
            </div>
        </main>
    )
}

export default Home