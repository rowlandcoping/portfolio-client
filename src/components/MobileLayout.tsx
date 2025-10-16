import { Outlet } from '@tanstack/react-router';
import { useKeyboardNavStore } from '../stores/keyboardNavStore';
import MobileScrollWheel from './MobileScrollWheel';
import MobileBottom from './MobileBottom';
import TimeDate from './TimeDate';

const MobileLayout = () => {
    const activePage = useKeyboardNavStore((s) => s.activePage);
    const maxIndex = useKeyboardNavStore((s) => s.maxIndex);

    return (
        <div className="mobile-container">            
            <div className="mobile-top-container">
                <div className="mobile-frame mobile-top-left">

                </div>
                <div className="mobile-frame mobile-top">
                    <div className="mobile-power-light"></div>
                    <div className="mobile-logo"><em>{`[ ]RowlandBerry`}</em></div>
                    <div className="mobile-button"></div>
                </div>
                <div className="mobile-frame mobile-top-right">

                </div>                
            </div>            
            <div className="mobile-view-area">
                <div className="mobile-frame mobile-left"></div>
                <div className="mobile-content-container">
                    <div className="mobile-pda-info">
                        <div className="time-date">
                            <TimeDate />
                        </div>
                        <div className="mobile-monitor">
                            <div className="mobile-battery">
                                <img src="battery.svg" alt="battery life indicator" />
                            </div>
                            <div>
                                <img src="wifi.svg" alt="signal strength indicator" />
                            </div>
                        </div>
                    </div>
                    <Outlet />
                    {maxIndex > 0 &&(
                        <div className="mobile-page-info">
                        
                            page { activePage + 1 } of { maxIndex + 1 }
                        
                        </div>
                    )}
                </div>
                <div className="mobile-frame mobile-right">
                    <MobileScrollWheel />
                </div>
            </div>       
                
            <MobileBottom />
            
            
        </div>
    )
}

export default MobileLayout