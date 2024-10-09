import * as fal from "@fal-ai/serverless-client";
import { JWT } from 'aws-amplify/auth';

interface FalImageResult {
  images?: { url: string }[];
}

const FAL_API_URL = 'https://sdp7lcn7yf.execute-api.us-east-2.amazonaws.com/dev/FalAIKeyMin';

export const fetchFalApiKey = async (accessToken: JWT): Promise<string> => {
  const response = await fetch(FAL_API_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken.toString()}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Error fetching API key: ${response.status}`);
  }

  const responseText = await response.text();
  const data = JSON.parse(responseText);
  const parsedBody = JSON.parse(data.body);

  if (!parsedBody || typeof parsedBody !== 'object' || !('apiKey' in parsedBody)) {
    throw new Error("Invalid response format");
  }

  return parsedBody.apiKey;
};

export const generateImageWithFAL = async (
    apiKey: string,
    prompt: string,
    selectedLoraUrl: string
  ): Promise<string> => {
    fal.config({
      credentials: apiKey
    });

    let loras = selectedLoraUrl !== '' ? [{ path: selectedLoraUrl, scale: 1.0 }] : undefined;

    const result = await fal.subscribe('fal-ai/flux-lora', {
      input: {
        prompt: prompt,
        image_size: { width: 1920, height: 1080 },
        loras: loras,
        num_inference_steps: 50,
        guidance_scale: 0,
        num_images: 1,
        seed: Math.floor(Math.random() * 1000000), // Use an integer seed
        prompt_upscale: true,
        safety_tolerance: 5,
        enable_safety_checker: true,
        output_format: "jpeg",
        sync_mode: false,
      },
      
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === 'IN_PROGRESS') {
          console.log('Generation in progress...', update.logs);
        }
      },
    });
  
    const imageResult = result as FalImageResult;
  
    if (imageResult.images && imageResult.images.length > 0) {
      return imageResult.images[0].url;
    } else {
      throw new Error('No image was generated');
    }
  };