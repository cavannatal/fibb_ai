import React, { useState, useEffect } from 'react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import { Button, View, Text, Heading, useTheme, CheckboxField } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../../aws-exports';
Amplify.configure(awsExports);

const SignupPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [consentChecked, setConsentChecked] = useState(false);
  const { tokens } = useTheme();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      setUser(null);
    }
  }

  const handleAuthRedirect = () => {
    if (!consentChecked) {
      alert("Please check the consent box before proceeding.");
      return;
    }

    const authConfig = awsExports.Auth?.Cognito;
    const userPoolClientId = authConfig?.userPoolClientId;
    const domain = authConfig?.hostedUI?.domain;
    const redirectSignIn = authConfig?.hostedUI?.redirectSignIn;

    if (userPoolClientId && domain && redirectSignIn) {
      const hostedUiUrl = `https://${domain}/login?client_id=${userPoolClientId}&response_type=code&scope=email+openid+profile&redirect_uri=${redirectSignIn}`;
      window.location.href = hostedUiUrl;
    } else {
      console.error('Missing Cognito configuration');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {user ? (
          <View textAlign="center">
            <Heading level={2} padding={tokens.space.medium}>
              Welcome, {user.attributes.email || user.username}!
            </Heading>
            <Text padding={tokens.space.medium}>
              You are successfully logged in.
            </Text>
            <Button onClick={handleSignOut} variation="primary">Sign out</Button>
          </View>
        ) : (
          <View textAlign="center">
            <Heading level={2} padding={tokens.space.medium}>
              Welcome to Our App
            </Heading>
            <Text padding={tokens.space.medium}>
              To sign up or sign in, you'll be redirected to our secure login page.
              You'll need to provide your email and phone number during sign-up.
            </Text>
            <CheckboxField
              label="I consent to receiving text messages and email notifications from Fibb.ai for account verification"
              name="consent"
              value="yes"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
            />
            <Button onClick={handleAuthRedirect} variation="primary" disabled={!consentChecked}>
              Sign Up / Sign In
            </Button>
          </View>
        )}
      </div>
    </div>
  );
};

export default SignupPage;