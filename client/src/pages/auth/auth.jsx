// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [staff, setStaff] = useState(null);

//     const login = (user) => {
//         setUser(user);
//     }

//     const staffLogin = (staff) => {
//         setStaff(staff);
//     }

//     const logout = () => {
//         setUser(null);
//         setStaff(null);
//     }

//     return (
//         <AuthContext.Provider value = {{ user, staff, login, staffLogin, logout}}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export const useAuth = () => {
//     return useContext(AuthContext);
// }

// auth.jsx
import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (user, token) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}