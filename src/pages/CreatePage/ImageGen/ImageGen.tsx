import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import * as fal from "@fal-ai/serverless-client";
import { motion } from 'framer-motion';
import fibbLogo from '../../../components/images/FibbLogoWhite.svg';

// Define types for form state options
type Environment = 'urban' | 'nature' | 'space' | 'underwater' | 'fantasy' | 'sci-fi' | 'indoors' | 'outdoors' | 'custom';
type Detail = 'cinematic' | 'epic' | 'intimate';
type Lighting = 'natural' | 'golden-hour' | 'artificial' | 'low-light' | 'neon-glow';
type Camera = 'wide-angle' | 'telephoto' | 'portrait' | 'macro';
type ColorScheme = 'vibrant' | 'muted' | 'monochrome' | 'warm-tones' | 'cool-tones' | 'pastel';

// Interface for the form state
interface FormState {
  selectedLora: string;
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
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [loraFiles, setLoraFiles] = useState<string[]>([]);

  
  const [formState, setFormState] = useState<FormState>({
    selectedLora: '',
    subject: '',
    environment: 'urban',
    details: [],
    lighting: 'natural',
    camera: 'wide-angle',
    colorScheme: 'vibrant',
  });

  async function getLoraFiles(sub: string): Promise<string[]> {
    const apiUrl = 'https://44stvp2e79.execute-api.us-east-2.amazonaws.com/api/getLoraFiles';
  
    console.log('Fetching Lora files for sub:', sub);
  
    const requestData = { sub };
    console.log('Request data:', requestData);
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)  // Make sure this line is present
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
      }
  
      const data = await response.json();
      console.log('Received data:', data);
  
      const files = Array.isArray(data) ? data : [];
      console.log('Parsed files:', files);
  
      return files;
    } catch (error) {
      console.error('Error fetching Lora files:', error);
      return [];
    }
  }

  useEffect(() => {
    const fetchLoraFiles = async () => {
      try {
        const { userId } = await getCurrentUser();
        console.log('Fetching Lora files for user:', userId);
        const files = await getLoraFiles(userId);
        console.log('Fetched Lora files:', files);
        setLoraFiles(files);
        if (files.length === 0) {
          console.log('No Lora files found for this user');
          // You might want to set some state here to display a message to the user
        }
      } catch (error) {
        console.error('Error fetching Lora files:', error);
        setLoraFiles([]);
      }
    };
  
    fetchLoraFiles();
  }, []);

  useEffect(() => {
    console.log('loraFiles state updated:', loraFiles);
  }, [loraFiles]);

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
    
      const result = await fal.subscribe("fal-ai/flux-pro/v1.1", {
        input: {
          prompt: optimizedPrompt,
          image_size: { width: 1080, height: 1920 },
          path: formState.selectedLora,
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
    if (!generatedImage || isSaved) {
      setUploadStatus('Image already saved or no image to upload');
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
      setIsSaved(true);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus(`Upload failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#093f48] to-[#004948] text-white">
      <header className="flex justify-center p-4">
        <img src={fibbLogo} alt="fibb.ai" className="h-8 sm:h-12 mt-4 sm:mt-6 mb-2 sm:mb-4" />
      </header>
      <main className="flex flex-col items-center flex-grow p-4 sm:p-6 pb-16 sm:pb-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-16 mt-8 sm:mt-16 text-center"
          style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
        >
          Create Your <span className="text-[#cbf59a]">Image</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-3xl bg-[#144a53] p-6 sm:p-8 rounded-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
            <label htmlFor="selectedLora" className="block text-lg font-semibold mb-2">Select Lora:</label>
              <select
                id="selectedLora"
                name="selectedLora"
                value={formState.selectedLora}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#285a62] text-white"
              >
                {loraFiles.length > 0 ? (
                  <>
                    <option value="">Select a Lora file</option>
                    {loraFiles.map((file, index) => (
                      <option key={index} value={file}>{file}</option>
                    ))}
                  </>
                ) : (
                  <option value="">No Fibbs available</option>
              )}
            </select>
        </div>

            <div>
              <label htmlFor="subject" className="block text-lg font-semibold mb-2">Subject/Scenario:</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                placeholder="e.g. A futuristic city at night"
                required
                className="w-full p-3 rounded-lg bg-[#285a62] text-white placeholder-gray-300"
              />
            </div>

            <div>
              <label htmlFor="environment" className="block text-lg font-semibold mb-2">Environment/Situation:</label>
              <select
                id="environment"
                name="environment"
                value={formState.environment}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#285a62] text-white"
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
            </div>

            <fieldset className="space-y-2">
              <legend className="text-lg font-semibold mb-2">Details/Mood/Composition:</legend>
              <div className="flex flex-wrap gap-4">
                {(['cinematic', 'epic', 'intimate'] as const).map(detail => (
                  <label key={detail} className="flex items-center">
                    <input
                      type="checkbox"
                      value={detail}
                      checked={formState.details.includes(detail)}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    <span>{detail.charAt(0).toUpperCase() + detail.slice(1)}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="lighting" className="block text-lg font-semibold mb-2">Lighting:</label>
              <select
                id="lighting"
                name="lighting"
                value={formState.lighting}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#285a62] text-white"
              >
                <option value="natural">Natural</option>
                <option value="golden-hour">Golden Hour</option>
                <option value="artificial">Artificial</option>
                <option value="low-light">Low Light</option>
                <option value="neon-glow">Neon Glow</option>
              </select>
            </div>

            <div>
              <label htmlFor="camera" className="block text-lg font-semibold mb-2">Camera/Lens Setup:</label>
              <select
                id="camera"
                name="camera"
                value={formState.camera}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#285a62] text-white"
              >
                <option value="wide-angle">Wide-angle</option>
                <option value="telephoto">Telephoto</option>
                <option value="portrait">Portrait</option>
                <option value="macro">Macro</option>
              </select>
            </div>

            <div>
              <label htmlFor="colorScheme" className="block text-lg font-semibold mb-2">Color Scheme:</label>
              <select
                id="colorScheme"
                name="colorScheme"
                value={formState.colorScheme}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#285a62] text-white"
              >
                <option value="vibrant">Vibrant</option>
                <option value="muted">Muted</option>
                <option value="monochrome">Monochrome</option>
                <option value="warm-tones">Warm Tones</option>
                <option value="cool-tones">Cool Tones</option>
                <option value="pastel">Pastel</option>
              </select>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading || !apiKeyOpen || !apiKeyFal}
              className="w-full bg-[#f79302] text-black font-bold py-3 px-8 rounded-lg text-xl hover:bg-[#f79600] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? 'Generating...' : 'Generate Image'}
            </motion.button>
          </form>
        </motion.div>

        {policyBreak && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-600 text-white rounded-lg"
          >
            <h3 className="font-bold">Policy Violation:</h3>
            <p>{policyBreak}</p>
          </motion.div>
        )}

        {errorOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-600 text-white rounded-lg"
          >
            <h3 className="font-bold">OpenAI Error:</h3>
            <p>{errorOpen}</p>
          </motion.div>
        )}

        {errorFal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-600 text-white rounded-lg"
          >
            <h3 className="font-bold">FAL Error:</h3>
            <p>{errorFal}</p>
          </motion.div>
        )}

        {generatedImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 w-full max-w-3xl flex flex-col items-center"
            >
              <h3 className="text-2xl font-bold mb-4">Generated Image:</h3>
              <img 
                src={generatedImage} 
                alt="Generated" 
                className="w-full rounded-lg shadow-lg mb-4" 
              />
              <div className="flex flex-col items-center">
                <motion.button
                  onClick={handleUpload}
                  disabled={!generatedImage || isSaved}
                  className="mt-4 bg-[#f79302] text-black font-bold py-2 px-6 rounded-lg text-lg hover:bg-[#f79600] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSaved ? 'Saved' : 'Save'}
                </motion.button>
                {uploadStatus && <p className="mt-2 text-center">{uploadStatus}</p>}
              </div>
            </motion.div>
          )}
      </main>
    </div>
  );
};

export default ImageGen;