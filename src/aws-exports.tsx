import { ResourcesConfig } from 'aws-amplify';

const awsExports: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.REACT_APP_USER_POOL_ID as string,
      userPoolClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID as string,
      signUpVerificationMethod: 'code', // or 'link'
      loginWith: {
        email: true,
        phone: false,
        username: false
      },
    },
  },
};

export default awsExports;