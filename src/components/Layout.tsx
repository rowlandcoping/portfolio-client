import { Outlet } from '@tanstack/react-router';
import ScreenBottom from './ScreenBottom';

const Layout = () => {
    return (
        <div className="screen-container">
            <div className="screen-top"></div>
            <div className="view-area">
                <div className="screen-left"></div>
                    <Outlet />
                <div className="screen-right"></div>
            </div>
            <ScreenBottom />
        </div>
    )
}

export default Layout