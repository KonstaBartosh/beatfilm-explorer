import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isUserLogin = localStorage.getItem('isUserLogin');

  return isUserLogin ? <>{children}</> : <Navigate to="/sign-in" replace />;
}

export default ProtectedRoute;