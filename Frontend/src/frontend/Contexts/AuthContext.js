import React, {createContext, useContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export default function AuthProvider({children}){
    const [UserToken, setUserToken] = useState(localStorage.getItem('userId'));

    useEffect(() => {
        if (UserToken) {
            localStorage.setItem('userId', UserToken);
        } else {
            localStorage.removeItem('userId');
        }
    }, [UserToken]);

    return (
        <AuthContext.Provider value={{UserToken, setUserToken}}>
            {children}
        </AuthContext.Provider>
    );
}
