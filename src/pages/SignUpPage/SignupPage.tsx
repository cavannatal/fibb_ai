// SignupPage.tsx
import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';

const SignupPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <Authenticator initialState="signUp">
          {({ user }) => (
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Welcome, {user?.username}!
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                You have successfully signed up and logged in.
              </p>
            </div>
          )}
        </Authenticator>
      </div>
    </div>
  );
};

export default SignupPage;