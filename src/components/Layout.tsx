import { Outlet } from '@tanstack/react-router';
import ScreenBottom from './ScreenBottom';

const Layout = () => {
    return (
        <div className="screen-container">
            <div className="screen-top-container" aria-hidden="true">
                <div className="desktop-frame top-frame screen-top-left"></div>
                <div className="desktop-frame top-frame screen-top" aria-hidden="true"></div>
                <div className="desktop-frame top-frame screen-top-right"></div>
            </div>
            <div className="view-area">
                <div className="desktop-frame screen-left" aria-hidden="true"></div>
                    <Outlet />
                <div className="desktop-frame screen-right" aria-hidden="true"></div>
            </div>
            <ScreenBottom />
        </div>
    )
}

export default Layout