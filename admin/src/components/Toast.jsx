/**
 * @file Toast.jsx
 * @description Auto-dismissing toast notification (success / error / info).
 *
 * Renders in the bottom-right corner using DaisyUI's `toast` utility.
 * The notification disappears after `duration` ms (default 3 000).
 *
 * @param {{ message: string, type?: string, onClose: Function, duration?: number }} props
 */

import { useEffect } from 'react';

const Toast = ({ message, type = "success", onClose, duration = 3000 }) => {
    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    return (
        <div className="toast toast-end toast-bottom z-50">
            <div className={`alert alert-${type} shadow-lg`}>
                <span>{message}</span>
            </div>
        </div>
    );
};

export default Toast;
