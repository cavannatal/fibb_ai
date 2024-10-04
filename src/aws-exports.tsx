import { ResourcesConfig } from 'aws-amplify';

type ExtendedResourcesConfig = ResourcesConfig & {
  Auth: {
    Cognito: {
      userPoolId: string;
      userPoolClientId: string;
      identityPoolId: string;
      signUpVerificationMethod: string;
      loginWith: {
        email: boolean;
        phone: boolean;
        username: boolean;
      };
      hostedUI?: {
        domain: string;
        redirectSignIn: string;
        redirectSignOut: string;
      };
    };
  };
  Storage: {
    S3: {
      bucket: string;
      region: string;
    };
  };
};

const awsExports: ExtendedResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.REACT_APP_USER_POOL_ID || '',
      userPoolClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID || '',
      identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID || '',
      signUpVerificationMethod: 'code',
      loginWith: {
        email: true,
        phone: true,
        username: false
      },
      hostedUI: {
        domain: process.env.REACT_APP_COGNITO_DOMAIN || '',
        redirectSignIn: process.env.REACT_APP_COGNITO_REDIRECT_URI || '',
        redirectSignOut: process.env.REACT_APP_COGNITO_REDIRECT_URI || '',
      },
    },
  },
  Storage: {
    S3: {
      bucket: process.env.REACT_APP_S3_BUCKET || '',
      region: process.env.REACT_APP_AWS_REGION || '',
    },
  },
};

console.log('AWS Exports:', awsExports);

export default awsExports;