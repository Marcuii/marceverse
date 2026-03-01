/**
 * @file ConfirmModal.jsx
 * @description Reusable confirmation dialog built on the native `<dialog>` element.
 *
 * @param {{ isOpen: boolean, title: string, message: string, onConfirm: Function, onCancel: Function, confirmText?: string, cancelText?: string, type?: string }} props
 */

import { useEffect, useRef } from 'react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel", type = "error" }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            modalRef.current.showModal();
        } else {
            modalRef.current.close();
        }
    }, [isOpen]);

    return (
        <dialog ref={modalRef} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{message}</p>
                <div className="modal-action">
                    <button className="btn" onClick={onCancel}>{cancelText}</button>
                    <button className={`btn btn-${type}`} onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onCancel}>close</button>
            </form>
        </dialog>
    );
};

export default ConfirmModal;
