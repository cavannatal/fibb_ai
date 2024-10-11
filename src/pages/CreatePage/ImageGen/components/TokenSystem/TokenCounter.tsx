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

    const response = await fetch('https://60hgfwk3n1.execute-api.us-east-2.amazonaws.com/api/getUserSubscription', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (typeof data.totalGenerations === 'number' && typeof data.totalFibbs === 'number') {
      return { 
        genTokens: data.totalGenerations, 
        fibbs: data.totalFibbs 
      };
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error fetching token data:', error);
    throw error;
  }
}

export async function deductGenToken(): Promise<boolean> {
  try {
    const { accessToken } = (await fetchAuthSession()).tokens ?? {};
    if (!accessToken) {
      throw new Error('No access token available');
    }

    const { userId } = await getCurrentUser();

    const response = await fetch('https://60hgfwk3n1.execute-api.us-east-2.amazonaws.com/api/deductGenToken', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return data.success;
  } catch (error) {
    console.error('Error deducting GenToken:', error);
    return false;
  }
}