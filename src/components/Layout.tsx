import { Outlet } from '@tanstack/react-router';
import ScreenBottom from './ScreenBottom';

const Layout = () => {
    return (
        <div className="screen-container">
            <div className="screen-top" aria-hidden="true"></div>
            <div className="view-area">
                <div className="screen-left" aria-hidden="true"></div>
                    <Outlet />
                <div className="screen-right" aria-hidden="true"></div>
            </div>
            <ScreenBottom />
        </div>
    )
}

export default Layout