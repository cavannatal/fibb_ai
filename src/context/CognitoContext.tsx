import React, { createContext, useState, useEffect } from 'react';
import userPool from '../components/CognitoService';

interface CognitoContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CognitoContext = createContext<CognitoContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const CognitoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(session.isValid());
        }
      });
    }
  }, []);

  return (
    <CognitoContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </CognitoContext.Provider>
  );
};