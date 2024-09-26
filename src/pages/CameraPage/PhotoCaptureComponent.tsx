import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

// Import images
import smileNoTeethImage from './images/smile_noteeth.png';
import neutralImage from './images/neutral.png';
import laughingImage from './images/smile_teeth.png';
import leftProfileImage from './images/lookleft.png';
import rightProfileImage from './images/lookright.png';

type Expression = 'smile_noteeth' | 'neutral' | 'laughing' | 'left-profile' | 'right-profile';

interface CapturedImage {
  src: string;
  expression: Expression;
  position: number;
}

const PHOTOS_PER_EXPRESSION = 5;
const EXPRESSIONS: Expression[] = ['smile_noteeth', 'neutral', 'laughing', 'left-profile', 'right-profile'];

const expressionImageMap: Record<Expression, string> = {
  'smile_noteeth': smileNoTeethImage,
  'neutral': neutralImage,
  'laughing': laughingImage,
  'left-profile': leftProfileImage,
  'right-profile': rightProfileImage,
};

const expressionInstructions: Record<Expression, string> = {
  'smile_noteeth': "Smile naturally without showing teeth",
  'neutral': "Keep a neutral expression",
  'laughing': "Laugh or show a big smile",
  'left-profile': "Turn your head to the right (showing your left side)",
  'right-profile': "Turn your head to the left (showing your right side)"
};

const expressionDisplayNames: Record<Expression, string> = {
  'smile_noteeth': "Smile (No Teeth)",
  'neutral': "Neutral",
  'laughing': "Laughing",
  'left-profile': "Left Profile",
  'right-profile': "Right Profile"
};

const PhotoCaptureComponent: React.FC = () => {
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([]);
  const [currentExpressionIndex, setCurrentExpressionIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const currentExpression = EXPRESSIONS[currentExpressionIndex];

  useEffect(() => {
    setImageError(null);
  }, [currentExpression]);

  const capture = useCallback(() => {
    if (capturedImages.length >= PHOTOS_PER_EXPRESSION) {
      alert("You've captured all photos for this expression!");
      return;
    }

    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImages(prev => [...prev, { 
        src: imageSrc, 
        expression: currentExpression, 
        position: prev.length + 1 
      }]);
    }
  }, [capturedImages.length, currentExpression]);

  // Mock upload function for testing purposes
  const handleMockUpload = async () => {
    if (capturedImages.length !== PHOTOS_PER_EXPRESSION) {
      alert(`Please capture exactly ${PHOTOS_PER_EXPRESSION} photos before uploading.`);
      return;
    }

    setIsUploading(true);
    // Simulate a delay to mimic network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert(`Photos for ${expressionDisplayNames[currentExpression]} expression uploaded successfully! (Mock)`);
    setCapturedImages([]);
    setCurrentExpressionIndex(prev => prev + 1);
    setIsUploading(false);
  };

  // Comment out the real upload function
  /*
  const handleUpload = async () => {
    if (capturedImages.length !== PHOTOS_PER_EXPRESSION) {
      alert(`Please capture exactly ${PHOTOS_PER_EXPRESSION} photos before uploading.`);
      return;
    }

    setIsUploading(true);
    try {
      const response = await fetch('/api/upload-photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(capturedImages),
      });

      if (response.ok) {
        alert(`Photos for ${expressionDisplayNames[currentExpression]} expression uploaded successfully!`);
        setCapturedImages([]);
        setCurrentExpressionIndex(prev => prev + 1);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading photos:', error);
      alert('Failed to upload photos. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  */

  const handleImageError = () => {
    setImageError(`Failed to load overlay image for ${expressionDisplayNames[currentExpression]}`);
    console.error(`Image load error for: ${currentExpression}.png`);
  };

  if (currentExpressionIndex >= EXPRESSIONS.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
        <h2 className="text-2xl font-bold mb-4 text-white">All expressions completed!</h2>
        <p className="text-lg text-white">Thank you for participating.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Capture {expressionDisplayNames[currentExpression]} - Photo {capturedImages.length} of {PHOTOS_PER_EXPRESSION}
      </h2>
      <p className="text-lg mb-4 text-white">{expressionInstructions[currentExpression]}</p>
      <div className="relative">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-lg shadow-lg scale-x-[-1]"
          mirrored={true}
        />
        <img
          src={expressionImageMap[currentExpression]}
          alt={`${expressionDisplayNames[currentExpression]} overlay`}
          className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none"
          onError={handleImageError}
        />
        {imageError && (
          <div className="absolute top-0 left-0 w-full bg-red-500 text-white p-2 text-sm">
            {imageError}
          </div>
        )}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={capture}
        disabled={capturedImages.length >= PHOTOS_PER_EXPRESSION}
        className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded-full flex items-center ${capturedImages.length >= PHOTOS_PER_EXPRESSION ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Camera className="mr-2" /> Capture Photo ({capturedImages.length} of {PHOTOS_PER_EXPRESSION})
      </motion.button>
      
      <div className="w-full max-w-4xl mt-8">
        <h3 className="text-xl font-bold mb-2 text-white">Captured Photos for {expressionDisplayNames[currentExpression]}</h3>
        <div className="grid grid-cols-4 gap-2">
          {capturedImages.map((img, index) => (
            <div key={index} className="relative">
              <img src={img.src} alt={`captured ${index}`} className="w-full h-24 object-cover rounded" />
              <span className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded">
                {img.position}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleMockUpload}  // Changed to use mock upload function
        disabled={isUploading || capturedImages.length !== PHOTOS_PER_EXPRESSION}
        className={`mt-4 bg-green-500 text-white px-4 py-2 rounded-full flex items-center ${(isUploading || capturedImages.length !== PHOTOS_PER_EXPRESSION) ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Upload className="mr-2" /> {isUploading ? 'Uploading...' : `Upload ${expressionDisplayNames[currentExpression]} Photos & Continue`}
      </motion.button>
    </div>
  );
};

export default PhotoCaptureComponent;