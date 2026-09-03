import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ allowedRole }) {

    const accessToken = localStorage.getItem("access");
    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    // Not logged in
    if (!accessToken || !user) {
        return <Navigate to="/" replace />;
    }

    // Wrong role
    if (user.role !== allowedRole) {
        if (user.role === "SELLER") {
            return <Navigate to="/dashboard" replace />;
        }

        if (user.role === "CUSTOMER") {
            return <Navigate to="/shop" replace />;
        }

        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;