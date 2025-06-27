import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [showRedirect, setShowRedirect] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.info("Silakan login terlebih dahulu");
      const timeout = setTimeout(() => {
        setShowRedirect(true);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [token]);

  if (!token && showRedirect) {
    const redirectTo = location.state?.from || location.pathname;
    return <Navigate to={`/login?redirect=${redirectTo}`} replace />;
  }

  if (!token) return null;

  return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;
