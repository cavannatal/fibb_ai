import { JWT } from 'aws-amplify/auth';
import { Buffer } from 'buffer';

const BFL_API_URL = 'https://4k7yl1uook.execute-api.us-east-2.amazonaws.com/default/BflAIKey';

interface BflImageResult {
    images?: { url: string }[];
  }

export const fetchBflApiKey = async (accessToken: JWT): Promise<string> => {
  const response = await fetch(BFL_API_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken.toString()}`,
      'Content-Type': 'application/json'
    }
  });

  const responseData = await response.json();

  if (responseData.statusCode !== 200) {
    throw new Error(`Server responded with status: ${responseData.statusCode}`);
  }

  const bodyContent = JSON.parse(responseData.body);
  const apiKey = bodyContent.apiKey;

  if (!apiKey) {
    throw new Error("Invalid response format: missing apiKey");
  }

  return apiKey;
};

export const generateImageWithBFL = async (
  apiKey: string,
  prompt: string
): Promise<string> => {
  const response = await fetch('https://api.bfl.ml/v1/flux-pro-1.1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-key': apiKey
    },
    body: JSON.stringify({
      prompt: prompt,
      width: 1440,
      height: 1440,
      prompt_upsampling: true,
      seed: null,
      safety_tolerance: 6
    })
  });

  if (!response.ok) {
    throw new Error(`BFL API error: ${response.status}`);
  }

  const data = await response.json();
  return await pollBFLResult(apiKey, data.id);
};

const pollBFLResult = async (apiKey: string, taskId: string): Promise<string> => {
  while (true) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds

    const response = await fetch(`https://api.bfl.ml/v1/get_result?id=${taskId}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'x-key': apiKey
      }
    });

    if (!response.ok) {
      throw new Error(`BFL API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'Ready') {
      const uniqueUrl = `${data.result.sample}?t=${new Date().getTime()}`;
      return uniqueUrl;
    } else if (data.status === 'Error') {
      throw new Error('BFL task failed');
    }
  }
};