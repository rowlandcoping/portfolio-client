
import { useState, useEffect } from 'react';

const TimeDate = () => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>            
            <div className="mobile-time">
            {now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true })}
            </div>
            <div className="mobile-date">
                {now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}{" "}
            </div>
        </>
    );
};

export default TimeDate