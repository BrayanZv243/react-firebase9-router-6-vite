import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";

const RequireAuth = ({ children }) => {
    const { user } = useContext(UserContext);

    if (!user) return <Navigate to="/login" />;

    return children;
};

export default RequireAuth;
