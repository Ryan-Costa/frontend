import { useAuth } from "@/context/auth-provider/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom"


const Layout = () => {
    const { email } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!email) {
            navigate("/entrar");
        }
    }, [email, navigate]);

    if (!email) {
        return null;
    }

    return <Outlet />;
}

export default Layout;