import { useAuth } from "./auth";
import { Navigate, useLocation } from "react-router-dom";

export const RequireUserAuth = ({children}) => {
    const location = useLocation();
    const auth = useAuth();

    if (!auth.user) {
        return <Navigate to='/login' state={{path: location.pathname}} />
    }

    return children;
}

export const RequireStaffAuth = ({children}) => {
    const auth = useAuth();

    if (!auth.employee) {
        return <Navigate to='/employee/login' />
    }

    return children;
}