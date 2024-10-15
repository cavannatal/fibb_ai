import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import { motion } from 'framer-motion';
import fibbLogo from '../../../components/images/FibbLogoWhite.svg';
import { fetchFalApiKey } from './components/falAIComponent';
import { fetchBflApiKey } from './components/bflAIComponent'; 
import { generateImageWithFAL } from './components/falAIComponent';
import { generateImageWithBFL } from './components/bflAIComponent';
import { deductGenToken, fetchTokenData } from '../../Marketplace/TokenSystem/TokenCounter';
import { error } from 'console';

interface FormState {
  selectedStyle: 'Enhanced' | 'Research';
  selectedLora: string;
  subject: string;
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
  const [loraFiles, setLoraFiles] = useState<LoraFile[]>([]);
  const [selectedLoraUrl, setSelectedLoraUrl] = useState<string>('');
  const [genTokens, setGenTokens] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const [formState, setFormState] = useState<FormState>({
    selectedStyle: 'Enhanced',
    selectedLora: '',
    subject: '',
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
        setLoraFiles(files);
      } catch (error) {
        console.error('Error fetching Lora files:', error);
        setLoraFiles([]);
      }
    };
  
    fetchLoraFiles();
  }, []);

  useEffect(() => {
    const getTokenData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTokenData();
        setGenTokens(data.genTokens);
        setError(null);
      } catch (err) {
        setError('Failed to fetch token data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getTokenData();
  }, []);


  const getCurrentTimeStamp = () => {
    return new Date().toISOString().replace(/[-:]/g, "").split('.')[0] + "Z";
  };

  async function getLoraFiles(sub: string): Promise<LoraFile[]> {
    const apiUrl = 'https://44stvp2e79.execute-api.us-east-2.amazonaws.com/api/getLoraFiles';
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sub }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
      }
  
      const data = await response.json();
      if (data.body.files && data.body.files.length > 0) {
        setSelectedLoraUrl(data.body.files[0].presignedUrl);
      }
  
      return data.body.files || [];
    } catch (error) {
      console.error('Error fetching Lora files:', error);
      return [];
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value, type } = e.target;
    
    if (name === 'selectedStyle') {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value as "Enhanced" | "Research",
        selectedLora: value === 'Research' ? '' : prevState.selectedLora
      }));
    } else if (name === 'selectedLora' && formState.selectedStyle !== 'Research') {
      const selectedFile = loraFiles.find(file => file.key === value);
      if (selectedFile) {
        setSelectedLoraUrl(selectedFile.presignedUrl);
      }
      setFormState(prevState => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name !== 'selectedLora') {
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
  
    if (genTokens <= 0) {
      setErrorFal('No GenTokens available for image generation.');
      setIsLoading(false);
      return;
    }
  
    try {
      const { userId } = await getCurrentUser();
      
      // Attempt to deduct a GenToken
      try {
        const deductionSuccessful = await deductGenToken(userId);
        if (!deductionSuccessful) {
          throw new Error('Token deduction failed');
        }
      } catch (deductionError) {
        console.error('Error during token deduction:', deductionError);
        setErrorFal(`Failed to deduct token: ${deductionError instanceof Error ? deductionError.message : String(deductionError)}`);
        setIsLoading(false);
        return;
      }
  
      // If deduction was successful, update the local state
      setGenTokens(prevTokens => prevTokens - 1);
  
      // Generate image based on selected style
      let generatedImageUrl: string;
      if (formState.selectedStyle === 'Enhanced') {
        if (!apiKeyFal) throw new Error('FIBB_ENHANCED key not available');
        generatedImageUrl = await generateImageWithFAL(apiKeyFal, formState.subject, selectedLoraUrl);
      } else {
        if (!apiKeyBfl) throw new Error('FIBB_RESEARCH key not available');
        generatedImageUrl = await generateImageWithBFL(apiKeyBfl, formState.subject);
      }
  
      setGeneratedImage(generatedImageUrl);
    } catch (error) {
      console.error('Detailed error in image generation:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setErrorFal(`Error in image generation: ${errorMessage}`);
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
  useEffect(() => {
    setFormState((prevState) => {
      const newStyle = prevState.selectedStyle === 'Research' ? 'Research' : 'Enhanced';
      return {
        ...prevState,
        selectedStyle: newStyle
      };
    });
  }, [formState.selectedStyle]);
 

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
          Bring your <span className="text-[#cbf59a]">fibb</span> to life.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-3xl bg-[#144a53] p-6 sm:p-8 rounded-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-16">
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
                <label className="block text-xl font-semibold mb-2"
                style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                >Choose your style:</label>
              </div>
              <div className="w-full sm:w-2/3 space-y-4">
                <label className="flex items-start space-x-2">
                  <input
                    type="radio"
                    name="selectedStyle"
                    value="fibb Enhanced"
                    checked={formState.selectedStyle === 'Enhanced'}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <div>
                    <span className="font-semibold text-lg"
                    style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                    >fibb Enhanced</span>
                    <p className="text-md text-teal-300"
                    style={{ fontFamily: '"Font1", sans-serif' }}
                    >
                      This model is trained on an extensive dataset of photorealistic images and produces
                      hyper-accurate visuals with lifelike details. Ideal for portraits, product visuals, or any
                      project that requires a true-to-life representation.
                    </p>
                  </div>
                </label>
                <label className="flex items-start space-x-2">
                  <input
                    type="radio"
                    name="selectedStyle"
                    value="Research"
                    checked={formState.selectedStyle === 'Research'}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <div>
                    <span className="font-semibold text-lg"
                    style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                    >fibb Research</span>
                    <p className="text-md text-teal-300"
                    style={{ fontFamily: '"Font1", sans-serif' }}
                    >
                      (in beta from the fibb Innovation Lab)
                      This model excels at following detailed text prompts with exceptional accuracy for
                      creative and experimental projects. Ideal for highly stylized art, imaginative concepts,
                      or text-to-image generation.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="w-full mb-2">
                <label htmlFor="selectedLora" className="block text-xl font-semibold"
                style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                >Choose your fibb:</label>
              </div>
              <div className="w-full sm:w-64 text-lg"
              style={{ fontFamily: '"Font1", sans-serif' }}
              >
                <select
                  id="selectedLora"
                  name="selectedLora"
                  value={formState.selectedLora}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg bg-[#285a62] text-white ${formState.selectedStyle === 'Research' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <option value="">Select a fibb</option>
                  <option value="Generate without a fibb">Generate without a fibb</option>
                  {loraFiles.map((file, index) => (
                      <option key={index} value={file.key}>{file.key.split('/').pop()}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-2/3 sm:pr-4">
                <label htmlFor="subject" className="block text-xl font-semibold mb-2"
                style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                >What do you want to see?</label>
                <div className="block sm:hidden mb-4">
                  <h4 className="font-semibold mb-2"
                  style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                  >Tips for prompting:</h4>
                  <ul className="list-disc list-inside text-md text-white"
                  style={{ fontFamily: '"Font1", sans-serif' }}
                  >
                    <li>Longer and more detailed prompts will generate better results.</li>
                    <li>When using a fibb, refer to yourself as he or she for more accurate results.</li>
                  </ul>
                </div>
                <textarea
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  style={{ fontFamily: '"Font1", sans-serif' }}
                  placeholder="Example prompt: He stands on a dimly lit balcony in the middle of New York City. He leans against the railing as the breeze blows. The city skyline glows in the distance, and the warm, golden light from the apartment behind him casts a soft glow on his profile. He gazes out thoughtfully, lost in the moment while the world below hums with quiet energy."
                  required
                  className="w-full p-2 rounded bg-[#285a62] text-white placeholder-gray-400 resize-none"
                  rows={6}
                />
              </div>
              <div className="hidden sm:block w-1/3 pl-4">
                <h4 className="font-semibold mb-2"
                style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                >Tips for prompting:</h4>
                <ul className="list-disc list-inside text-md text-white"
                style={{ fontFamily: '"Font1", sans-serif' }}
                >
                  <li>Longer and more detailed prompts will generate better results.</li>
                  <li>When using a fibb, refer to yourself as he or she for more accurate results.</li>
                </ul>
              </div>
            </div>
            <div className="token-display mb-4">
              <h3 className="text-xl font-bold mb-2">Your Token Balance</h3>
              <div>GenTokens: {genTokens}</div>
            </div>  
            <motion.button
              type="submit"
              disabled={isLoading || (!apiKeyFal && !apiKeyBfl) || genTokens <= 0}
              className="w-full bg-[#f79302] text-black font-bold py-3 px-8 rounded-lg text-xl hover:bg-[#f79600] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? 'CREATING...' : 'CREATE'}
            </motion.button>
          </form>
        </motion.div>

        {(errorFal || errorBfl) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-600 text-white rounded-lg"
          >
            <h3 className="font-bold">{errorFal ? 'FIBB_RESEARCH Error:' : 'FIBB_ENHANCED Error:'}</h3>
            <p>{errorFal || errorBfl}</p>
          </motion.div>
        )}

        {generatedImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 w-full max-w-3xl flex flex-col items-center"
          >
            <img 
              src={generatedImage} 
              alt="Generated" 
              className="w-full rounded-lg shadow-lg mb-4" 
            />
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
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default ImageGen;