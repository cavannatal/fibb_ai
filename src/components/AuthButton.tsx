import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthButton = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  if (isAuthenticated) {
    return (
      <div>
        <p>Welcome, {user?.name}!</p>
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
          Log Out
        </button>
      </div>
    );
  }

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default AuthButton;