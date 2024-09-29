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

const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID!,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID!,
};

const userPool = new CognitoUserPool(poolData);

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