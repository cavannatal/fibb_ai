import React, { useContext, useState } from 'react';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { CognitoContext } from '../auth/CognitoProviderWithNavigate'; 

const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID!,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID!,
};

const userPool = new CognitoUserPool(poolData);

const CognitoAuthComponent: React.FC = () => {
  const { isAuthenticated } = useContext(CognitoContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSignIn = () => {
    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: function (result) {
        console.log('User logged in:', result);
        // Handle successful login
      },
      onFailure: function (err) {
        console.error('Login failed:', err);
      },
    });
  };

  const handleLogout = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
      console.log('User logged out');
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <h2>You are logged in</h2>
          <button onClick={handleLogout}>Log out</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignIn}>Sign In</button>
        </>
      )}
    </div>
  );
};

export default CognitoAuthComponent;
