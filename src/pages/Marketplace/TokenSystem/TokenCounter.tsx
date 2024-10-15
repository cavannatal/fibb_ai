import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';

interface TokenData {
  genTokens: number;
  fibbs: number;
}

export async function fetchTokenData(): Promise<TokenData> {
  try {
    const { accessToken } = (await fetchAuthSession()).tokens ?? {};
    if (!accessToken) {
      throw new Error('No access token available');
    }

    const { userId } = await getCurrentUser();

    const readResponse = await fetch('https://60hgfwk3n1.execute-api.us-east-2.amazonaws.com/api/getUserSubscription', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!readResponse.ok) {
      throw new Error(`HTTP error! status: ${readResponse.status}`);
    }

    const data = await readResponse.json();
    
    if (typeof data.totalGenerations === 'number' && typeof data.totalFibbs === 'number') {
      return { 
        genTokens: data.totalGenerations, 
        fibbs: data.totalFibbs 
      };
    } else {
      throw new Error('Invalid readResponse format');
    }
  } catch (error) {
    console.error('Error fetching token data:', error);
    throw error;
  }
}

export async function deductGenToken(userId: string): Promise<boolean> {
  try {
    const { accessToken } = (await fetchAuthSession()).tokens ?? {};
    if (!accessToken) {
      throw new Error('No access token available');
    }

    const url = 'https://gvnuxy3n28.execute-api.us-east-2.amazonaws.com/default/tokenDeduct';

    const requestBody = JSON.stringify({ userId });

    const modResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: requestBody,
    });

    const responseBody = await modResponse.text();

    let data;
    try {
      data = JSON.parse(responseBody);
    } catch (e) {
      throw new Error(`Failed to parse response as JSON: ${responseBody}`);
    }

    if (data.error) {
      throw new Error(`Token deduction failed: ${data.error}`);
    }

    if (data.body && typeof data.body === 'string') {
      const parsedBody = JSON.parse(data.body);
      return parsedBody.message === 'Successfully deducted 1 from totalGenerations';
    }

    throw new Error('Unexpected response format');
  } catch (error) {
    throw error;
  }
}