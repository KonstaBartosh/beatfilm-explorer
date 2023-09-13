import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, ...props }) {
	const isUserLogin = localStorage.getItem('isUserLogin');

	return isUserLogin  ? <Component {...props} /> : <Navigate to="/" replace />
}

export default ProtectedRoute;

