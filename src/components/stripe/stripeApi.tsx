// src/api/stripeApi.ts
import { post } from '@aws-amplify/api-rest';

export const createAccountLink = async (accountId: string) => {
  try {
    const response = await post({
      apiName: 'stripeApi',
      path: '/create-account-link',
      options: {
        body: { account: accountId },
      },
    });

    if (!response) {
      throw new Error('No response body');
    }

    return response;
  } catch (error) {
    throw new Error(`Failed to create account link: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const createAccount = async () => {
  try {
    const response = await post({
      apiName: 'stripeApi',
      path: '/create-account',
    });

    if (!response) {
      throw new Error('No response body');
    }

    return response;
  } catch (error) {
    throw new Error(`Failed to create account: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};