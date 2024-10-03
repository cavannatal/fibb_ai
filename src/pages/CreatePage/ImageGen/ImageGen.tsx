import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import * as fal from "@fal-ai/serverless-client";

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

// Interface for the FAL API response
interface FalImageResult {
  images?: { url: string }[];
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
  const [optimizedPrompt, setOptimizedPrompt] = useState<string | null>(null);
  const [policyBreak, setPolicyBreak] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  
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

  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setErrorOpen(null);
    setErrorFal(null);
    setGeneratedImage(null);
    setPolicyBreak(null);

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
      // Policy compliance check
      const policyResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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

      if (!policyResponse.ok) {
        throw new Error(`OpenAI API error: ${policyResponse.status}`);
      }

      const policyData = await policyResponse.json();
      const policyCheck = policyData.choices[0].message.content.trim();

      if (policyCheck === "NO") {
        setPolicyBreak("This prompt does not comply with Fibb.ai Use Policy.");
        setIsLoading(false);
        return; // Stop the workflow here
      }

      // If policy check passes, continue with prompt optimization and image generation
      const optimizationResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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

      if (!optimizationResponse.ok) {
        throw new Error(`OpenAI API error: ${optimizationResponse.status}`);
      }

      const optimizationData = await optimizationResponse.json();
      const optimizedPrompt = optimizationData.choices[0].message.content;
      setOptimizedPrompt(optimizedPrompt);

      // FAL image generation
      if (!apiKeyFal) {
        setErrorFal('Fal API key not available');
        setIsLoading(false);
        return;
      }
    
      fal.config({
        credentials: apiKeyFal
      });
    
      const userId = await getCurrentUser();
      const sub = userId;
    
      const result = await fal.subscribe("fal-ai/flux-pro", {
        input: {
          prompt: optimizedPrompt,
          image_size: { width: 1024, height: 1024 },
          path: "LORAFOLDERPLACEHOLDER",
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
      console.error('Error in workflow:', error);
      setErrorFal('Error in workflow: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentTimeStamp = () => {
    return new Date().toISOString().replace(/[-:]/g, "").split('.')[0] + "Z";
  };

  const handleUpload = async (): Promise<void> => {
    if (!generatedImage) {
      setUploadStatus('No image to upload');
      return;
    }

    try {
      const { userId } = await getCurrentUser();
      const sub = userId;

      const timestamp = getCurrentTimeStamp();
      const fileName = `users/${sub}/gallery/${timestamp}.jpg`;

      // Fetch the image data
      const response = await fetch(generatedImage);
      const blob = await response.blob();

      // Request the presigned URL
      const presignedUrlResponse = await fetch('https://rn3fz2qkeatimhczxdtivhxne40lnkhr.lambda-url.us-east-2.on.aws/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: fileName,
          fileType: blob.type,
        }),
      });

      if (!presignedUrlResponse.ok) {
        throw new Error(`Failed to get presigned URL for ${fileName}`);
      }

      const { uploadUrl } = await presignedUrlResponse.json();

      // Upload to S3
      const s3UploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: blob,
        headers: {
          'Content-Type': blob.type,
        },
      });

      if (!s3UploadResponse.ok) {
        throw new Error(`Failed to upload ${fileName}`);
      }

      setUploadStatus('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus(`Upload failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  };


  return (
    <div className="form-container">
      <h1>Image Generator</h1>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" disabled={isLoading || !apiKeyOpen || !apiKeyFal}>
          {isLoading ? 'Generating...' : 'Generate Image'}
        </button>
      </form>

      {policyBreak && (
        <div className="error policy-break">
          <h3>Policy Violation:</h3>
          <p>{policyBreak}</p>
        </div>
      )}

      {errorOpen && (
        <div className="error">
          <h3>OpenAI Error:</h3>
          <pre>{errorOpen}</pre>
        </div>
      )}

      {errorFal && (
        <div className="error">
          <h3>FAL Error:</h3>
          <pre>{errorFal}</pre>
        </div>
      )}

      {generatedImage && (
        <div className="generated-image">
          <h3>Generated Image:</h3>
          <img 
            src={generatedImage} 
            alt="Generated image" 
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} 
          />
          <button onClick={handleUpload} disabled={!generatedImage}>
            Save
          </button>
          {uploadStatus && <p>{uploadStatus}</p>}
        </div>
      )}
    </div>
  );
};

export default ImageGen;