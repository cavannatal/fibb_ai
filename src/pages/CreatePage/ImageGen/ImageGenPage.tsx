import React, { useState } from 'react';

interface FormState {
  subject: string;
  environment: string;
  details: string[];
  lighting: string;
  camera: string;
  colorScheme: string;
}

const ImageGen: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    subject: '',
    environment: 'urban',
    details: [],
    lighting: 'natural',
    camera: 'wide-angle',
    colorScheme: 'vibrant'
  });

  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormState(prevState => ({
      ...prevState,
      details: checked
        ? [...prevState.details, value]
        : prevState.details.filter(detail => detail !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { subject, environment, details, lighting, camera, colorScheme } = formState;
    const detailsStr = details.length > 0 ? details.join(', ') : 'High realism';
    const prompt = `
      Subject: ${subject}
      Environment: ${environment}
      Details/Mood: ${detailsStr}
      Lighting: ${lighting}
      Camera: ${camera}
      Color Scheme: ${colorScheme}
      Realism: High realism (chaos and stylization ignored)
    `;
    setGeneratedPrompt(prompt.trim());
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Create Your Image</h2>

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
          {['cinematic', 'epic', 'intimate'].map((detail) => (
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
          <option value="natural">Natural Light</option>
          <option value="golden-hour">Golden Hour</option>
          <option value="artificial">Artificial Light</option>
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

        <button type="submit">Generate Prompt</button>
      </form>

      {generatedPrompt && (
        <div className="generated-prompt">
          <h3>Generated Prompt</h3>
          <pre>{generatedPrompt}</pre>
        </div>
      )}
    </div>
  );
};

export default ImageGen;