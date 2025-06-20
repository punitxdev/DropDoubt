import React from 'react';
import '../css/popup.css';

export default function Popup({ message, onConfirm, onCancel, showOk, showCancel }) {
    const handleCardClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="popup-overlay" onClick={onCancel}>
            <div className="popup-card" onClick={handleCardClick} tabIndex={0}>
                <p className="popup-message">{message}</p>
                <div className="popup-buttons">
                    {showOk && <button className="popup-button ok" onClick={onConfirm}>OK</button>}
                    {showCancel && <button className="popup-button cancel" onClick={onCancel}>Cancel</button>}
                </div>
            </div>
        </div>
    );
}
