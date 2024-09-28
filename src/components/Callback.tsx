import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import userPool from './CognitoService'; // Import the userPool from the service

const Callback: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          console.error('Error fetching session:', err); // Log the error if session fails
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(session.isValid()); // Check if the session is valid
        }
        setIsLoading(false); // Set loading state to false after session check
      });
    } else {
      setIsLoading(false); // No user found, set loading to false
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading spinner while checking authentication
  }

  if (isAuthenticated) {
    return <Navigate to="/" />; // Redirect to the home page if authenticated
  }

  return <div>Redirecting...</div>; // Handle fallback when not authenticated
};

export default Callback;
