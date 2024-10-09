import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import { motion } from 'framer-motion';
import fibbLogo from '../../../components/images/FibbLogoWhite.svg';
import { fetchFalApiKey, generateImageWithFAL } from './components/falAIComponent';
import { fetchBflApiKey, generateImageWithBFL } from './components/bflAIComponent';

interface FormState {
  selectedLora: string;
  subject: string;
  generateWithoutFibb: boolean; 
  mode: 'Enhanced' | 'Research';
}

interface LoraFile {
  key: string;
  presignedUrl: string;
}

const ImageGen: React.FC = () => {
  const [apiKeyFal, setApiKeyFal] = useState<string | null>(null);
  const [apiKeyBfl, setApiKeyBfl] = useState<string | null>(null);
  const [errorFal, setErrorFal] = useState<string | null>(null);
  const [errorBfl, setErrorBfl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [loraFiles, setLoraFiles] = useState<string[]>([]);
  const [selectedLoraUrl, setSelectedLoraUrl] = useState<string>('');
  
  const [formState, setFormState] = useState<FormState>({
    selectedLora: '',
    subject: '',
    generateWithoutFibb: false,
    mode: 'Enhanced',
  });

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const { accessToken } = (await fetchAuthSession()).tokens ?? {};
        if (accessToken) {
          const falKey = await fetchFalApiKey(accessToken);
          setApiKeyFal(falKey);
          const bflKey = await fetchBflApiKey(accessToken);
          setApiKeyBfl(bflKey);
        }
      } catch (error) {
        console.error('Error fetching API keys:', error);
      }
    };

    fetchApiKeys();
  }, []);

  useEffect(() => {
    const fetchLoraFiles = async () => {
      try {
        const { username } = await getCurrentUser();
        const files = await getLoraFiles(username);
        console.log('Fetched Lora files:', files);
        setLoraFiles(files.map(file => file.key));
      } catch (error) {
        console.error('Error fetching Lora files:', error);
        setLoraFiles([]);
      }
    };
  
    fetchLoraFiles();
  }, []);

  const getCurrentTimeStamp = () => {
    return new Date().toISOString().replace(/[-:]/g, "").split('.')[0] + "Z";
  };

  async function getLoraFiles(sub: string): Promise<{ key: string; presignedUrl: string }[]> {
    const apiUrl = 'https://44stvp2e79.execute-api.us-east-2.amazonaws.com/api/getLoraFiles';
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sub }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
      }
  
      const data = await response.json();
      console.log('API Data:', data);
      setSelectedLoraUrl(data.body.files[0].presignedUrl);
  
      if (data && data.body && typeof data.body === 'object' && Array.isArray(data.body.files)) {
        return data.body.files.map((file: { key: string; presignedUrl: string }) => ({
          key: file.key,
          presignedUrl: file.presignedUrl,
        }));
      } else {
        console.error('Unexpected data format:', data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching Lora files:', error);
      return [];
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value, type } = e.target;
      
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormState(prevState => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setFormState(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setErrorBfl(null);
    setErrorFal(null);
    setGeneratedImage(null);
    setIsSaved(false);
    setUploadStatus(null);



    try {
      let imageUrl: string;
      if (formState.mode === 'Research') {
        if (!apiKeyBfl) throw new Error('BFL API key not available');
        console.log('Generating image with BFL');
        imageUrl = await generateImageWithBFL(apiKeyBfl, formState.subject);
        console.log('BFL image URL:', imageUrl);
      } else {
        if (!apiKeyFal) throw new Error('FAL API key not available');
        setSelectedLoraUrl(formState.selectedLora);
        console.log("Selected Lora URL:", selectedLoraUrl);
        imageUrl = await generateImageWithFAL(apiKeyFal, formState.subject, selectedLoraUrl);
 
      }
      
      // Remove the "?t=[taskID]" from the URL
      const cleanUrl = String(imageUrl).split('?')[0];
      console.log('Clean URL:', cleanUrl);
  
      setGeneratedImage(cleanUrl);
  
    } catch (error) {
      console.error('Detailed error in image generation:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (formState.generateWithoutFibb) {
        setErrorBfl(`Error in BFL workflow: ${errorMessage}`);
      } else {
        setErrorFal(`Error in FAL workflow: ${errorMessage}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (!generatedImage || isSaved) {
      console.log(generatedImage);
      setUploadStatus('Image already saved or no image to upload');
      return;
    }

    try {
      const { userId } = await getCurrentUser();
      const timestamp = getCurrentTimeStamp();
      const fileName = `users/${userId}/gallery/${timestamp}.jpg`;
      console.log(fileName);
      const imageResponse = await fetch(generatedImage);
      const imageBlob = await imageResponse.blob();
      console.log(imageBlob);
      const presignedUrlResponse = await fetch('https://rn3fz2qkeatimhczxdtivhxne40lnkhr.lambda-url.us-east-2.on.aws/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, fileType: imageBlob.type }),
      });

      if (!presignedUrlResponse.ok) {
        throw new Error(`Failed to get presigned URL for ${fileName}`);
      }

      const { uploadUrl } = await presignedUrlResponse.json();
      console.log(uploadUrl);
      const s3UploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: imageBlob,
        headers: { 'Content-Type': imageBlob.type },
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
              <label htmlFor="selectedLora" className="block text-lg font-semibold mb-2">Select your Fibb:</label>
              <select
                id="selectedLora"
                name="selectedLora"
                value={formState.selectedLora}
                onChange={handleChange}
                disabled={formState.generateWithoutFibb || formState.mode === 'Research'}
                className={`w-full p-3 rounded-lg bg-[#285a62] text-white ${formState.generateWithoutFibb || formState.mode === 'Research' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loraFiles.map((file, index) => (
                  <option key={index} value={file}>{file.split('/').pop()}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="mode" className="block text-lg font-semibold mb-2">Mode:</label>
              <select 
              id="mode"
              name="mode" 
              value={formState.mode} 
              onChange={handleChange}>
                <option value="Enhanced">Enhanced</option>
                <option value="Research">Research</option>
                className={`w-full p-3 rounded-lg bg-[#285a62] text-white`}
              </select>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="generateWithoutFibb"
                  checked={formState.generateWithoutFibb}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-[#f79302]"
                />
                <span className="text-lg">Generate without a Fibb</span>
              </label>
            </div>

            <div>
              <label htmlFor="subject" className="block text-lg font-semibold mb-2">Subject/Scenario:</label>
              <textarea
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                placeholder="e.g. A futuristic city at night"
                required
                className="w-full p-3 rounded-lg bg-[#285a62] text-white placeholder-gray-300 resize-none"
                rows={3}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading || (!apiKeyFal && !apiKeyBfl)}
              className="w-full bg-[#f79302] text-black font-bold py-3 px-8 rounded-lg text-xl hover:bg-[#f79600] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? 'Generating...' : `Generate Image with ${formState.mode === 'Research' ? 'BFL' : 'FAL'}`}
            </motion.button>
          </form>
        </motion.div>

        {(errorFal || errorBfl) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-600 text-white rounded-lg"
          >
            <h3 className="font-bold">{errorFal ? 'FAL Error:' : 'BFL Error:'}</h3>
            <p>{errorFal || errorBfl}</p>
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