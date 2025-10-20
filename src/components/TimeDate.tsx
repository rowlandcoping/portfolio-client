
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
            {now.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', hour12: true })}
            </div>
            <div className="mobile-date">
                {now.toLocaleDateString(undefined, { weekday: 'short' })},{" "}
                {now.toLocaleDateString(undefined, { month: 'short' })}{" "}
                {now.toLocaleDateString(undefined, { day: 'numeric' })}
            </div>
        </>
    );
};

export default TimeDate