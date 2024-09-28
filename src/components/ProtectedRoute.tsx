import React, { useContext } from 'react';
import { CognitoContext } from '../auth/CognitoProviderWithNavigate'; // Importing Cognito context
import { useNavigate } from 'react-router-dom'; // Use this to redirect

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useContext(CognitoContext); // Get authentication status from context
  const navigate = useNavigate();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    navigate('/login');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;