import { useState, useEffect, useCallback } from 'react';
import React from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});

const TOKEN_EXPIRATION_TIME = 1 * 60 * 1000; // 1 minutes in milliseconds

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const tokenExpirationTime = localStorage.getItem('tokenExpirationTime');
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        const expirationTime = new Date().getTime() + TOKEN_EXPIRATION_TIME;
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpirationTime', expirationTime.toString());
    };

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpirationTime');
    }, []);

    useEffect(() => {
        if (tokenExpirationTime) {
            const remainingTime = +tokenExpirationTime - new Date().getTime();
            if (remainingTime <= 0) {
                logoutHandler();
            } else {
                const timer = setTimeout(logoutHandler, remainingTime);
                return () => clearTimeout(timer);
            }
        }
    }, [tokenExpirationTime, logoutHandler]);

    useEffect(() => {
        const checkTokenExpiration = () => {
            const expirationTime = localStorage.getItem('tokenExpirationTime');
            if (!expirationTime || +expirationTime < new Date().getTime()) {
                logoutHandler();
            }
        };

        window.addEventListener('load', checkTokenExpiration);
        window.addEventListener('focus', checkTokenExpiration);

        return () => {
            window.removeEventListener('load', checkTokenExpiration);
            window.removeEventListener('focus', checkTokenExpiration);
        };
    }, [logoutHandler]);

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

// Export both AuthContext and AuthContextProvider
export default AuthContext;
