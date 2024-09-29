import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID!,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID!,
};

const userPool = new CognitoUserPool(poolData);

const calculateSecretHash = (username: string, clientId: string, clientSecret: string) => {
  const crypto = require('crypto');
  return crypto.createHmac('SHA256', clientSecret)
    .update(username + clientId)
    .digest('base64');
};

export const signIn = (username: string, password: string) => {
  return new Promise((resolve, reject) => {
    const authenticationData: any = {
      Username: username,
      Password: password,
    };

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
      Pool: userPool
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: resolve,
      onFailure: reject,
    });
  });
};

export const signUp = (username: string, password: string, email: string) => {
  return new Promise((resolve, reject) => {
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
    ];

    const signUpParams: any = {};
    if (process.env.REACT_APP_COGNITO_CLIENT_SECRET) {
      signUpParams.SecretHash = calculateSecretHash(
        username,
        process.env.REACT_APP_COGNITO_CLIENT_ID!,
        process.env.REACT_APP_COGNITO_CLIENT_SECRET
      );
    }

    userPool.signUp(username, password, attributeList, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    }, signUpParams);
  });
};

export default {
  signIn,
  signUp,
};