import { Outlet } from '@tanstack/react-router';
import MobileScrollWheel from './MobileScrollWheel';
import MobileBottom from './MobileBottom';

const MobileLayout = () => {

    return (
        <div className="mobile-container">            
            <div className="mobile-top"></div>
            
                <div className="mobile-view-area">
                    <div className="mobile-left"></div>
                    <Outlet />
                    <div className="mobile-right">
                        <MobileScrollWheel />
                    </div>
                </div>       
                
            <MobileBottom />
            
            
        </div>
    )
}

export default MobileLayout