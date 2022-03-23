import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ component: Component, ...args }) {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    // If authorized, return an outlet that will render child elements
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
