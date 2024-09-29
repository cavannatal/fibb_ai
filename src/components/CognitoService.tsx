import { CognitoUserPool } from 'amazon-cognito-identity-js';

export const USER_POOL_ID = process.env.REACT_APP_COGNITO_USER_POOL_ID!;
export const CLIENT_ID = process.env.REACT_APP_COGNITO_CLIENT_ID!;
export const CLIENT_SECRET = process.env.REACT_APP_COGNITO_CLIENT_SECRET!;

const poolData = {
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

export const calculateSecretHash = async (username: string): Promise<string> => {
  const message = username + CLIENT_ID;
  
  const encoder = new TextEncoder();
  const secretKey = encoder.encode(CLIENT_SECRET);
  const data = encoder.encode(message);

  const key = await window.crypto.subtle.importKey(
    'raw',
    secretKey,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await window.crypto.subtle.sign(
    'HMAC',
    key,
    data
  );

  const bytes = new Uint8Array(signature);
  const binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
  return btoa(binary);
};

export default userPool;