import { Navigate, useLocation } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";
import type { JSX } from "react";

// 로그인 안 된 경우 구글로그인으로
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuthUser();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
