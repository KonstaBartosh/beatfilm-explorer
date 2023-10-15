import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isUserLogin = localStorage.getItem('isUserLogin');

  return isUserLogin ? <>{children}</> : <Navigate to="/sign-in" replace />;
}