import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

// Define your user pool data
const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID!, // AWS Cognito User Pool ID
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID! // AWS Cognito App Client ID
};

const userPool = new CognitoUserPool(poolData);

interface CognitoProviderWithNavigateProps {
  children: React.ReactNode;
}

const CognitoProviderWithNavigate: React.FC<CognitoProviderWithNavigateProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  useEffect(() => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.getSession((err: any, session: any) => {
        if (err) {
          console.error(err);
        } else {
          setIsAuthenticated(session.isValid());
        }
      });
    }
  }, []);

  return (
    <CognitoContext.Provider value={{ isAuthenticated, handleRedirectCallback }}>
      {children}
    </CognitoContext.Provider>
  );
};

// Export context to be used in other components
export const CognitoContext = React.createContext({
  isAuthenticated: false,
  handleRedirectCallback: (appState: any) => {}
});

export default CognitoProviderWithNavigate;
