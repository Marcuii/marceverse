/**
 * @file Sidebar.jsx
 * @description Navigation sidebar with theme switching and logout.
 *
 * Features:
 *  - Active route highlighting using `useLocation()`
 *  - Light / dark theme toggle persisted to localStorage
 *  - Links to all admin entity sections
 */

import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { IoMdColorPalette, IoMdLogOut } from "react-icons/io";
import { useAuth } from '../context/AuthContext';

const themes = ["light", "dark"];

const Sidebar = () => {
    const location = useLocation();
    const { logout } = useAuth();

    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const changeTheme = (newTheme) => {
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    };

    const isActive = (path) => location.pathname.startsWith(path) && (path === '/' ? location.pathname === '/' : true) ? 'active bg-primary text-white' : '';

    return (
        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content flex flex-col justify-between">
            <div>
                <h1 className="text-2xl font-bold mb-8 text-center text-primary">MarceVerse Admin</h1>
                <ul className="space-y-2">
                    <li><Link to="/" className={isActive('/')}>Dashboard</Link></li>
                    <li><Link to="/general" className={isActive('/general')}>General Info</Link></li>
                    <div className="divider my-2"></div>
                    <li><Link to="/projects" className={isActive('/projects')}>Projects</Link></li>
                    <li><Link to="/experience" className={isActive('/experience')}>Experience</Link></li>
                    <li><Link to="/education" className={isActive('/education')}>Education</Link></li>
                    <li><Link to="/certification" className={isActive('/certification')}>Certification</Link></li>
                    <li><Link to="/activity" className={isActive('/activity')}>Activity</Link></li>
                    <li><Link to="/competition" className={isActive('/competition')}>Competition</Link></li>
                </ul>
            </div>

            <div className="flex gap-2 w-full mt-4">
                <div className="dropdown dropdown-top flex-1">
                    <div tabIndex={0} role="button" className="btn btn-outline w-full flex justify-between items-center px-2">
                        <div className="flex items-center gap-2">
                            <IoMdColorPalette size={20} />
                            <span className="truncate">{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
                        </div>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 max-h-60 overflow-y-auto block mb-2">
                        {themes.map((t) => (
                            <li key={t}>
                                <button 
                                    className={`flex justify-between ${theme === t ? 'active' : ''}`}
                                    onClick={() => changeTheme(t)}
                                >
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                    <span className="flex gap-1">
                                        <span className="bg-primary w-2 h-4 rounded-xs" data-theme={t}></span>
                                        <span className="bg-secondary w-2 h-4 rounded-xs" data-theme={t}></span>
                                        <span className="bg-accent w-2 h-4 rounded-xs" data-theme={t}></span>
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <button onClick={logout} className="btn btn-outline btn-error" title="Logout">
                    <IoMdLogOut size={20} />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
