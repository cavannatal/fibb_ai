import { ResourcesConfig } from 'aws-amplify';

type ExtendedResourcesConfig = ResourcesConfig & {
  Auth: {
    Cognito: {
      hostedUI?: {
        domain: string;
        redirectSignIn: string;
        redirectSignOut: string;
      };
    };
  };
};

const awsExports: ExtendedResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.REACT_APP_USER_POOL_ID as string,
      userPoolClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID as string,
      signUpVerificationMethod: 'code',
      loginWith: {
        email: true,
        phone: true,
        username: false
      },
      hostedUI: {
        domain: process.env.REACT_APP_COGNITO_DOMAIN as string,
        redirectSignIn: process.env.REACT_APP_COGNITO_REDIRECT_URI as string,
        redirectSignOut: process.env.REACT_APP_COGNITO_REDIRECT_URI as string,
      },
    },
  },
};

export default awsExports;