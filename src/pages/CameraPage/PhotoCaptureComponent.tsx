import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, Upload, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

type Expression = 'neutral' | 'happy' | 'laughing' | 'left-profile' | 'right-profile';

interface CapturedImage {
  src: string;
  expression: Expression;
  position: number;
}

const TOTAL_POSITIONS = 35;
const PHOTOS_PER_EXPRESSION = 7;
const EXPRESSIONS: Expression[] = ['neutral', 'happy', 'laughing', 'left-profile', 'right-profile'];

const PhotoCaptureComponent: React.FC = () => {
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([]);
  const [currentPosition, setCurrentPosition] = useState(1);
  const [currentExpression, setCurrentExpression] = useState<Expression>('neutral');
  const [isUploading, setIsUploading] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    const expressionIndex = Math.floor((currentPosition - 1) / PHOTOS_PER_EXPRESSION);
    setCurrentExpression(EXPRESSIONS[expressionIndex]);
  }, [currentPosition]);

  const capture = useCallback(() => {
    if (currentPosition > TOTAL_POSITIONS) {
      alert("You've reached the maximum number of photos!");
      return;
    }

    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImages(prev => [...prev, { src: imageSrc, expression: currentExpression, position: currentPosition }]);
      setCurrentPosition(prev => prev + 1);
    }
  }, [currentPosition, currentExpression]);

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      // API PHOTO LOCATION HEREEE!!!!!!!!!!!
      const response = await fetch('/api/upload-photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(capturedImages),
      });

      if (response.ok) {
        alert('Photos uploaded successfully!');
        setCapturedImages([]);
        setCurrentPosition(1);
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

  const renderFaceTemplate = () => {
    const commonClasses = "absolute opacity-50 border-4 border-yellow-300";
    switch (currentExpression) {
      case 'neutral':
        return (
          <>
            <div className={`${commonClasses} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-2/3 rounded-full`} />
            <div className={`${commonClasses} top-[70%] left-1/2 transform -translate-x-1/2 w-1/6 h-0 border-b-4`} />
          </>
        );
        case 'happy':
        return (
          <>
            <div className={`${commonClasses} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-2/3 rounded-full`} />
            <div className={`${commonClasses} top-[62%] left-1/2 transform -translate-x-1/2 w-1/5 h-[15%] rounded-[100%] border-b-4 border-t-0 border-l-0 border-r-0`} />
          </>
        );
      case 'laughing':
        return (
          <>
            <div className={`${commonClasses} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-2/3 rounded-full`} />
            <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2 w-[12%] h-[12%] bg-yellow-300 opacity-50 rounded-full" />
          </>
        );
      case 'left-profile':
        return (
          <>
            <div className={`${commonClasses} top-1/4 left-1/2 w-1/6 h-1/2 rounded-r-full border-r-4`} />
            <ArrowRight className="absolute top-1/2 left-1/3 transform -translate-y-1/2 w-12 h-12 text-yellow-300 opacity-70" />
          </>
        );
      case 'right-profile':
        return (
          <>
            <div className={`${commonClasses} top-1/4 right-1/2 w-1/6 h-1/2 rounded-l-full border-l-4`} />
            <ArrowLeft className="absolute top-1/2 right-1/3 transform -translate-y-1/2 w-12 h-12 text-yellow-300 opacity-70" />
          </>
        );
    }
  };

  const getExpressionInstructions = () => {
    const instructions = {
      'neutral': "Keep a neutral expression",
      'happy': "Smile naturally",
      'laughing': "Laugh or show a big smile",
      'left-profile': "Turn your head to the right (showing your left side)",
      'right-profile': "Turn your head to the left (showing your right side)"
    };
    return instructions[currentExpression];
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Capture {currentExpression.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} - Position {currentPosition} of {TOTAL_POSITIONS}
      </h2>
      <p className="text-lg mb-4 text-white">{getExpressionInstructions()}</p>
      <div className="relative">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-lg shadow-lg scale-x-[-1]"
          mirrored={true}
        />
        {renderFaceTemplate()}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={capture}
        disabled={currentPosition > TOTAL_POSITIONS}
        className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded-full flex items-center ${currentPosition > TOTAL_POSITIONS ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Camera className="mr-2" /> Capture Photo ({currentPosition} of {TOTAL_POSITIONS})
      </motion.button>
      
      <div className="w-full max-w-4xl mt-8">
        <h3 className="text-xl font-bold mb-2 text-white">Captured Photos</h3>
        <div className="grid grid-cols-5 gap-2">
          {capturedImages.map((img, index) => (
            <div key={index} className="relative">
              <img src={img.src} alt={`captured ${index}`} className="w-full h-24 object-cover rounded" />
              <span className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded">
                {img.expression} - {img.position}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {capturedImages.length > 0 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUpload}
          disabled={isUploading || capturedImages.length < TOTAL_POSITIONS}
          className={`mt-4 bg-green-500 text-white px-4 py-2 rounded-full flex items-center ${(isUploading || capturedImages.length < TOTAL_POSITIONS) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Upload className="mr-2" /> {isUploading ? 'Uploading...' : 'Upload All Photos'}
        </motion.button>
      )}
    </div>
  );
};

export default PhotoCaptureComponent;