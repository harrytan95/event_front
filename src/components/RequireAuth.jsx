import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RequireAuth = () => {
    const { auth } = useAuth();
    // console.log(auth);
    const location = useLocation();
    // console.log('requireauth: ' , auth?.login );
    return (
        auth?.login 
            ? <Outlet />
            : <Navigate to="/signin" state={{ from: location }} replace />
    );
}

export default RequireAuth;