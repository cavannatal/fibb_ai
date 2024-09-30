import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import * as crypto from 'crypto';

// User pool configuration using environment variables for Amplify Gen2
const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID!,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID!,
};

const userPool = new CognitoUserPool(poolData);

// Function to calculate the SecretHash for Cognito requests
const calculateSecretHash = (username: string, clientId: string, clientSecret: string): string => {
  return crypto
    .createHmac('SHA256', clientSecret)
    .update(username + clientId)
    .digest('base64');
};

// Sign-in function
export const signIn = (username: string, password: string) => {
  return new Promise((resolve, reject) => {
    const authenticationData: any = {
      Username: username,
      Password: password,
    };

    // If client secret exists, add the SecretHash
    if (process.env.REACT_APP_COGNITO_CLIENT_SECRET) {
      authenticationData.SecretHash = calculateSecretHash(
        username,
        process.env.REACT_APP_COGNITO_CLIENT_ID!,
        process.env.REACT_APP_COGNITO_CLIENT_SECRET
      );
    }

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: resolve,
      onFailure: reject,
    });
  });
};

// Sign-up function
export const signUp = (username: string, password: string, email: string) => {
  return new Promise((resolve, reject) => {
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
    ];

    // Prepare client metadata, include SecretHash if necessary
    const clientMetadata: any = {};
    if (process.env.REACT_APP_COGNITO_CLIENT_SECRET) {
      clientMetadata.SecretHash = calculateSecretHash(
        username,
        process.env.REACT_APP_COGNITO_CLIENT_ID!,
        process.env.REACT_APP_COGNITO_CLIENT_SECRET
      );
    }

    userPool.signUp(username,password,attributeList,[],(err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
      clientMetadata // Pass the client metadata with SecretHash
    );
  });
};

export default {
  signIn,
  signUp,
};
