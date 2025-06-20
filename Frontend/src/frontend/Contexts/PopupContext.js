import React, { createContext, useContext, useState } from 'react';
import Popup from '../JS/Popup';

const PopupContext = createContext();
export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [onConfirm, setOnConfirm] = useState(() => () => {});
    const [buttons, setButtons] = useState({ showOk: true, showCancel: true });

    const showPopup = (msg, confirmFn, options) => {
        setMessage(msg);
        setOnConfirm(() => confirmFn);
        setVisible(true);
        setButtons({
            showOk: options.showOk ?? true,
            showCancel: options.showCancel ?? true
        });
    };

    const hidePopup = () => {
        setVisible(false);
        setMessage('');
        setOnConfirm(() => () => {});
    };

    return (
        <PopupContext.Provider value={{ showPopup }}>
            {children}
            {visible && (
                <Popup
                    message={message}
                    onConfirm={() => {
                        onConfirm();
                        hidePopup();
                    }}
                    onCancel={hidePopup}
                    showOk={buttons.showOk}
                    showCancel={buttons.showCancel}
                />
            )}
        </PopupContext.Provider>
    );
};
