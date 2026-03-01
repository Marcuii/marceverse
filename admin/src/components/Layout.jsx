/**
 * @file Layout.jsx
 * @description Shell layout wrapping all authenticated admin pages.
 *
 * Uses DaisyUI's responsive drawer pattern:
 *  - Sidebar is always visible on `lg+` screens
 *  - On mobile, a hamburger button toggles the sidebar overlay
 *  - Child routes render into the `<Outlet />` slot
 */

import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { MdMenu } from 'react-icons/md';

const Layout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col bg-base-100 min-h-screen">
                {/* Mobile Header with Toggle */}
                <div className="w-full navbar bg-base-300 lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button">
                            <MdMenu size={24} />
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 text-xl font-bold">MarceVerse Admin</div>
                </div>
                
                {/* Main Page Content */}
                <div className="p-4 md:p-8">
                    <Outlet />
                </div>
            </div> 
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                <Sidebar />
            </div>
        </div>
    );
};

export default Layout;
