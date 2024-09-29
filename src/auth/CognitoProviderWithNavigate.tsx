import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

interface CognitoContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  handleRedirectCallback: (appState: any) => void;
}

export const CognitoContext = createContext<CognitoContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  handleRedirectCallback: () => {},
});

// Attempt to get configuration from different sources
const getUserPoolId = () => {
  return process.env.REACT_APP_COGNITO_USER_POOL_ID || 
         process.env.REACT_APP_USER_POOL_ID || 
         (window as any).REACT_APP_COGNITO_USER_POOL_ID;
};

const getClientId = () => {
  return process.env.REACT_APP_COGNITO_CLIENT_ID || 
         process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID || 
         (window as any).REACT_APP_COGNITO_CLIENT_ID;
};

const userPoolId = getUserPoolId();
const clientId = getClientId();

console.log('Cognito Configuration:');
console.log('UserPoolId:', userPoolId);
console.log('ClientId:', clientId);

if (!userPoolId || !clientId) {
  console.error('Missing Cognito configuration. Please check your environment variables or global configuration.');
  throw new Error('Cognito configuration is incomplete. Check your setup.');
}

const poolData = {
  UserPoolId: userPoolId,
  ClientId: clientId,
};

let userPool: CognitoUserPool;
try {
  userPool = new CognitoUserPool(poolData);
  console.log('Cognito User Pool initialized successfully');
} catch (error) {
  console.error('Error initializing Cognito User Pool:', error);
  throw error;
}

export const CognitoProviderWithNavigate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          console.error('Error fetching session:', err);
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(session.isValid());
        }
      });
    }
  }, []);

  const handleRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <CognitoContext.Provider value={{ isAuthenticated, setIsAuthenticated, handleRedirectCallback }}>
      {children}
    </CognitoContext.Provider>
  );
};