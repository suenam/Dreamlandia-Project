import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [staff, setStaff] = useState(null);

    const login = (user) => {
        setUser(user);
    }

    const staffLogin = (staff) => {
        setStaff(staff);
    }

    const logout = () => {
        setUser(null);
        setStaff(null);
    }

    return (
        <AuthContext.Provider value = {{ user, staff, login, staffLogin, logout}}> 
            {children}
        </AuthContext.Provider>
    ); 
}

export const useAuth = () => {
    return useContext(AuthContext);
}