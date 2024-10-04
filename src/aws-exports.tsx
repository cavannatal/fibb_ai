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
      userPoolId: process.env.REACT_APP_USER_POOL_ID as string,
      userPoolClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID as string,
      identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID as string,
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
  Storage: {
    S3: {
      bucket: process.env.REACT_APP_S3_BUCKET as string,
      region: process.env.REACT_APP_AWS_REGION as string,
    },
  },
};

console.log('AWS Exports:', awsExports);

export default awsExports;