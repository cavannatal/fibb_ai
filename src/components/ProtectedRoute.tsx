import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;