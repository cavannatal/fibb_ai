import React, { useState } from 'react';
import { CognitoUser, AuthenticationDetails, IAuthenticationCallback } from 'amazon-cognito-identity-js';
import userPool, { calculateSecretHash, CLIENT_ID } from './CognitoService';

const CognitoAuthComponent: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const secretHash = await calculateSecretHash(username);

      const authenticationData = {
        Username: username,
        Password: password,
        ValidationData: {
          SECRET_HASH: secretHash
        }
      };

      const authenticationDetails = new AuthenticationDetails(authenticationData);

      const userData = {
        Username: username,
        Pool: userPool
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');

      const authenticationCallback: IAuthenticationCallback = {
        onSuccess: (result) => {
          console.log('Authentication successful', result);
          setIsLoading(false);
          // Handle successful login (e.g., redirect or update state)
        },
        onFailure: (err) => {
          console.error('Authentication failed', err);
          setError(err.message || 'Authentication failed');
          setIsLoading(false);
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          console.log('New password required');
          setIsLoading(false);
          // Handle new password required scenario
        }
      };

      cognitoUser.authenticateUser(authenticationDetails, authenticationCallback);

    } catch (error) {
      console.error('Error during sign in:', error);
      setError('An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CognitoAuthComponent;