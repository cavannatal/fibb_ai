import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';

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

// Define the expected shape of the API response
interface ApiResponse {
  apiKey: string;
}

const API_URL = 'https://65bira43y2.execute-api.us-east-2.amazonaws.com/dev/OpenAIKeyMin';

const ImageGen: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);

  const [formState, setFormState] = useState<FormState>({
    subject: '',
    environment: 'urban',
    details: [],
    lighting: 'natural',
    camera: 'wide-angle',
    colorScheme: 'vibrant',
  });

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const { accessToken } = (await fetchAuthSession()).tokens ?? {};

        const response = await fetch(API_URL, {
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

        setApiKey(parsedBody.apiKey);
      } catch (error) {
        setError(`Failed to fetch API key: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    fetchApiKey();
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
    setError(null);

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

    if (!apiKey) {
      setError('OpenAI API key not available');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are an expert prompt engineer.' },
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
    } catch (error) {
      setError(`Failed to generate improved prompt: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
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

        <button type="submit" disabled={isLoading || !apiKey}>
          {isLoading ? 'Generating...' : 'Generate Improved Prompt'}
        </button>
      </form>

      {error && (
        <div className="error">
          <h3>Error:</h3>
          <pre>{error}</pre>
        </div>
      )}

      {generatedPrompt && (
        <div className="generated-prompt">
          <h3>Generated Improved Prompt:</h3>
          <pre>{generatedPrompt}</pre>
        </div>
      )}
    </div>
  );
};

export default ImageGen;
