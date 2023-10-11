import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
	isLoggedIn: boolean;
}

function ProtectedRoute({ children, isLoggedIn }: ProtectedRouteProps) {
  // const isUserLogin = localStorage.getItem('isUserLogin');

  return isLoggedIn ? <>{children}</> : <Navigate to="/sign-in" replace />;
}

export default ProtectedRoute;