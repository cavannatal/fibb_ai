import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import * as fal from "@fal-ai/serverless-client";
import { getCurrentUser } from 'aws-amplify/auth';


// Define types for form state options
type Environment = 'urban' | 'nature' | 'space' | 'underwater' | 'fantasy' | 'sci-fi' | 'indoors' | 'outdoors' | 'custom';
type Detail = 'cinematic' | 'epic' | 'intimate';
type Lighting = 'natural' | 'golden-hour' | 'artificial' | 'low-light' | 'neon-glow';
type Camera = 'wide-angle' | 'telephoto' | 'portrait' | 'macro';
type ColorScheme = 'vibrant' | 'muted' | 'monochrome' | 'warm-tones' | 'cool-tones' | 'pastel';

// Interface for the form state
interface FormState {
  subject: string;
  environment: Environment;
  details: Detail[];
  lighting: Lighting;
  camera: Camera;
  colorScheme: ColorScheme;
}

interface FalImage {
  url: string;
}

interface FalImageResult {
  images?: { url: string }[];
}

// Define the expected shape of the API response
interface ApiResponse {
  apiKeyOpen: string;
  apiKeyFal: string;
}

const OPEN_API_URL = 'https://65bira43y2.execute-api.us-east-2.amazonaws.com/dev/OpenAIKeyMin';
const FAL_API_URL = 'https://sdp7lcn7yf.execute-api.us-east-2.amazonaws.com/dev/FalAIKeyMin';

const ImageGen: React.FC = () => {
  const [apiKeyOpen, setApiKeyOpen] = useState<string | null>(null);
  const [apiKeyFal, setApiKeyFal] = useState<string | null>(null);
  const [errorOpen, setErrorOpen] = useState<string | null>(null);
  const [errorFal, setErrorFal] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [optimizedPrompt, setoptimizedPrompt] = useState<string | null>(null);
  const [policyBreak, setpolicyBreak] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const [formState, setFormState] = useState<FormState>({
    subject: '',
    environment: 'urban',
    details: [],
    lighting: 'natural',
    camera: 'wide-angle',
    colorScheme: 'vibrant',
  });

  useEffect(() => {
    const fetchApiKeyOpen = async () => {
      try {
        const { accessToken } = (await fetchAuthSession()).tokens ?? {};

        const response = await fetch(OPEN_API_URL, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching API key: ${response.status}`);
        }

        const responseText = await response.text();
        const data = JSON.parse(responseText);

        // Parse the body separately since it's a stringified JSON
        const parsedBody = JSON.parse(data.body);

        if (!parsedBody || typeof parsedBody !== 'object' || !('apiKey' in parsedBody)) {
          throw new Error("Invalid response format");
        }

        setApiKeyOpen(parsedBody.apiKey);
      } catch (error) {
        setErrorOpen(`Failed to fetch API key: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    fetchApiKeyOpen();
  }, []);

  useEffect(() => {
    const fetchApiKeyFal = async () => {
      try {
        const { accessToken } = (await fetchAuthSession()).tokens ?? {};

        const response = await fetch(FAL_API_URL, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching API key: ${response.status}`);
        }

        const responseText = await response.text();
        const data = JSON.parse(responseText);

        // Parse the body separately since it's a stringified JSON
        const parsedBody = JSON.parse(data.body);

        if (!parsedBody || typeof parsedBody !== 'object' || !('apiKey' in parsedBody)) {
          throw new Error("Invalid response format");
        }

        setApiKeyFal(parsedBody.apiKey);
      } catch (error) {
        setErrorFal(`Failed to fetch API key: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    fetchApiKeyFal();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = e.target;
    const detail = value as Detail;
    setFormState(prevState => ({
      ...prevState,
      details: checked
        ? [...prevState.details, detail]
        : prevState.details.filter(d => d !== detail),
    }));
  };

  const handleSubmitOpen = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setErrorOpen(null);
    setErrorFal(null);
    setGeneratedImage(null)

    const { subject, environment, details, lighting, camera, colorScheme } = formState;
    const detailsStr = details.length > 0 ? details.join(', ') : 'High realism';
    const prompt = `
      Subject: ${subject}
      Environment: ${environment}
      Details/Mood: ${detailsStr}
      Lighting: ${lighting}
      Camera: ${camera}
      Color Scheme: ${colorScheme}
    `;

    if (!apiKeyOpen) {
      setErrorOpen('OpenAI API key not available');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKeyOpen}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a cybersecurity and ethics expert for an image generation engine. You will assess every prompt I give you and assess if there is anything that could pose as a threat to our business or end user. You will also assess every prompt to make sure it does not depict any content that would be deemed unethical, NSFW, or anything that violates OpenAI policy. You will respond ONLY with a YES or NO. No analysis or summary is needed. Make sure every answer you give ends with the word YES or NO. If you cannot assist, just say the word NO'},
            { role: 'user', content: prompt }
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      setGeneratedPrompt(data.choices[0].message.content);
      console.log(generatedPrompt)

      if (generatedPrompt === "NO") {
        const errorText = "This prompt does not comply with Fibb.ai Use Policy.";
        setpolicyBreak(errorText);

      } else {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKeyOpen}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: 'You are an expert image generation prompt engineer. Your job is to grab the users prompt and generate a newly optimized prompt that focuses on hyper realism. You will ONLY provide a prompt. Do not specify platform or give any commentary. You are ONLY to provide the prompt' },
              { role: 'user', content: prompt }
            ]
          })
        });
  
        if (!response.ok) {
          const errorOpenAI = await response.text();
          throw new Error(`OpenAI API error: ${response.status} ${errorOpenAI}`);
        }
  
        const data = await response.json();
        setoptimizedPrompt(data.choices[0].message.content);
        console.log(optimizedPrompt)
      }

    } catch (error) {
      setErrorOpen(`Failed to generate improved prompt: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }

    if (!apiKeyFal) {
      setErrorFal('Fal API key not available');
      setIsLoading(false);
      return;
    }
    
    try {
      fal.config({
        credentials: apiKeyFal
      });
    
      const userId = await getCurrentUser();
      const sub = userId; // Assuming getCurrentUser returns an object with userId
    
      const result = await fal.subscribe("fal-ai/flux-lora", {
        input: {
          prompt: optimizedPrompt,
          image_size: { width: 1024, height: 1024 },
          path: "LORAFOLDERPLACEHOLDER", // Replace this with the actual path if needed
          num_inference_steps: 50,
          guidance_scale: 3.5,
          num_images: 1,
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
        setGeneratedImage(imageResult.images[0].url);
        console.log('Final generated image URL:', imageResult.images[0].url);
      } else {
        setErrorFal('No image was generated');
      }
    } catch (error) {
      console.error('Error in image generation:', error);
      setErrorFal('Error generating image: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsLoading(false);
    }
  };
  


  return (
    <div className="form-container">
      <h1>Image Generator</h1>
      <form onSubmit={handleSubmitOpen}>
        <label htmlFor="subject">Subject/Scenario:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formState.subject}
          onChange={handleChange}
          placeholder="e.g. A futuristic city at night"
          required
        />

        <label htmlFor="environment">Environment/Situation:</label>
        <select
          id="environment"
          name="environment"
          value={formState.environment}
          onChange={handleChange}
        >
          <option value="urban">Urban</option>
          <option value="nature">Nature</option>
          <option value="space">Space</option>
          <option value="underwater">Underwater</option>
          <option value="fantasy">Fantasy</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="indoors">Indoors</option>
          <option value="outdoors">Outdoors</option>
          <option value="custom">Custom</option>
        </select>

        <fieldset>
          <legend>Details/Mood/Composition:</legend>
          {(['cinematic', 'epic', 'intimate'] as const).map(detail => (
            <label key={detail}>
              <input
                type="checkbox"
                value={detail}
                checked={formState.details.includes(detail)}
                onChange={handleCheckboxChange}
              />
              {detail.charAt(0).toUpperCase() + detail.slice(1)}
            </label>
          ))}
        </fieldset>

        <label htmlFor="lighting">Lighting:</label>
        <select
          id="lighting"
          name="lighting"
          value={formState.lighting}
          onChange={handleChange}
        >
          <option value="natural">Natural</option>
          <option value="golden-hour">Golden Hour</option>
          <option value="artificial">Artificial</option>
          <option value="low-light">Low Light</option>
          <option value="neon-glow">Neon Glow</option>
        </select>

        <label htmlFor="camera">Camera/Lens Setup:</label>
        <select
          id="camera"
          name="camera"
          value={formState.camera}
          onChange={handleChange}
        >
          <option value="wide-angle">Wide-angle</option>
          <option value="telephoto">Telephoto</option>
          <option value="portrait">Portrait</option>
          <option value="macro">Macro</option>
        </select>

        <label htmlFor="colorScheme">Color Scheme:</label>
        <select
          id="colorScheme"
          name="colorScheme"
          value={formState.colorScheme}
          onChange={handleChange}
        >
          <option value="vibrant">Vibrant</option>
          <option value="muted">Muted</option>
          <option value="monochrome">Monochrome</option>
          <option value="warm-tones">Warm Tones</option>
          <option value="cool-tones">Cool Tones</option>
          <option value="pastel">Pastel</option>
        </select>

        <button type="submit" disabled={isLoading || !apiKeyOpen}>
          {isLoading ? 'Generating...' : 'Generate Image'}
        </button>
      </form>

      {errorOpen && (
        <div className="error">
          <h3>Error:</h3>
          <pre>{errorOpen}</pre>
        </div>
      )}

      {generatedPrompt && (
        <div className="improved-prompt">
           {generatedPrompt === "NO" ? (
             <p className="error-text">{policyBreak || "This prompt does not comply with Fibb.ai Use Policy."}</p>
          ) : (
            <pre>{optimizedPrompt}</pre>
        )}
          <div style={{ margin: '20px 0' }}>
              {generatedImage ? (
              <img 
                src={generatedImage} 
                alt="Generated image" 
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} 
              />
          ) : (
              <p>Generating Image.</p>
      )}
          </div>
        </div>
      )}
      <button type="submit" disabled={isLoading || !apiKeyFal}>
          {'Save'}
        </button>

        {errorFal && (
        <div className="error">
          <h3>Error:</h3>
          <pre>{errorOpen}</pre>
        </div>
      )}
    </div>
  );
};

export default ImageGen;

