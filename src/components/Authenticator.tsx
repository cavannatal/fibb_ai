import React from 'react';
import { Authenticator, useTheme, Image, View, Heading, Text, Button, useAuthenticator } from '@aws-amplify/ui-react';

const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          alt="Your Logo"
          src="https://your-logo-url.com/logo.png"
          height="100px"
        />
      </View>
    );
  },

  SignIn: {
    Header() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center">
          <Image
            alt="Your Logo"
            src="https://your-logo-url.com/logo.png"
            height="100px"
          />
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Sign in to your account
          </Heading>
        </View>
      );
    },
    Footer() {
      const { toForgotPassword } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toForgotPassword}
            size="small"
            variation="link"
          >
            Reset Password
          </Button>
          <Text>
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>
      );
    },
  },

  SignUp: {
    Header() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center">
          <Image
            alt="Your Logo"
            src="https://your-logo-url.com/logo.png"
            height="100px"
          />
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Create a new account
          </Heading>
        </View>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toSignIn}
            size="small"
            variation="link"
          >
            Back to Sign In
          </Button>
          <Text>
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>
      );
    },
  },
};

const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email',
    },
  },
  signUp: {
    password: {
      label: 'Password:',
      placeholder: 'Enter your Password:',
      isRequired: false,
      order: 2,
    },
    confirm_password: {
      label: 'Confirm Password:',
      order: 1,
    },
  },
};

interface CustomAuthenticatorProps {
  children: React.ReactNode;
}

const CustomAuthenticator: React.FC<CustomAuthenticatorProps> = ({ children }) => {
  return (
    <Authenticator formFields={formFields} components={components}>
      {children}
    </Authenticator>
  );
};

export default CustomAuthenticator;