import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactElement;
  user?: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/signup" replace />;
  }
  return children;
};

export default ProtectedRoute;