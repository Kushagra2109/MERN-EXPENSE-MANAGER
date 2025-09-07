import { replace, useLocation , useNavigate } from "react-router";
import { useEffect } from "react";
import { Navigate } from "react-router";

const useAuth = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    
    
    useEffect(() => {
        const publicRoutes = ['/login' , '/register', '/'];

        if(token && publicRoutes.includes(location.pathname)){
            navigate(-1);
        }
        if
        (!token && !publicRoutes.includes(location.pathname)){
            navigate('/login') , {replace : true}
        }
    }, [navigate , location , token])

}

export default useAuth;