import { Navigate, useNavigate } from "react-router-dom";
import { useStore } from "../../stores/store";

export const PrivateRoute = ({ children, redirectBack }: any) => {
    const { userStore } = useStore();
    const { isLoggedIn } = userStore;
    const navigate = useNavigate();
    if (!isLoggedIn) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};