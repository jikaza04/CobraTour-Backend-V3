import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";

const ProtectedRoute = () => {
    const [user, loading] = useAuthState(auth);

    if (loading) return <section className="flex flex-col w-full h-screen justify-center items-center"><div className="loader size-full"></div><p>Loading..</p></section>; // Show loading while checking auth

    return user ? <Outlet /> : <Navigate to="/adminLogin" replace />;
};

export default ProtectedRoute;
