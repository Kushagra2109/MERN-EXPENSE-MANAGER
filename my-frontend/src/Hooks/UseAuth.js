import { replace, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { Navigate } from "react-router";

const useAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const publicRoutes = ["/login", "/register", "/", "/forgotPassword"];

  useEffect(() => {
    const isPublic =
      publicRoutes.includes(location.pathname) ||
      location.pathname.startsWith("/resetpassword");

    if (token && isPublic) {
      navigate(-1);
    }

    if (!token && !isPublic) {
      navigate("/login", { replace: true });
    }
  }, [navigate, location, token]);
};

export default useAuth;
