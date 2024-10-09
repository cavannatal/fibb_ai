import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, Upload, RotateCw, X, Info, Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Amplify } from 'aws-amplify';
import { getCurrentUser } from 'aws-amplify/auth';
import { getCurrentTimeStamp } from '../../utils';
import { useLocation } from 'react-router-dom';
import awsconfig from '../../aws-exports';

import neu_front from './images/solo_shots/neutral_confident_front.png';
import neu_right from './images/solo_shots/neutral_confident_right.png';
import neu_left from './images/solo_shots/neutral_confident_left.png';
import smirk_front from './images/solo_shots/smirk_closed_front.png';
import smirk_left from './images/solo_shots/smirk_closed_left.png';
import smirk_right from './images/solo_shots/smirk_closed_right.png';
import smile_front from './images/solo_shots/smile_laugh_front.png';
import smile_left from './images/solo_shots/smile_laugh_front.png';
import smile_right from './images/solo_shots/smile_laugh_front.png';

Amplify.configure(awsconfig);

interface Card {
  title: string;
  image: string;
}

const PhotoCaptureComponent: React.FC = () => {
  const { state } = useLocation();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [isMirrored, setIsMirrored] = useState(true);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showTemplateCard, setShowTemplateCard] = useState(true);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const webcamRef = useRef<Webcam>(null);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const cards: Card[] = [
    { title: "Neutral Front", image: neu_front },
    { title: "Neutral Right", image: neu_right },
    { title: "Neutral Left", image: neu_left },
    { title: "Smirk Front", image: smirk_front },
    { title: "Smirk Left", image: smirk_left },
    { title: "Smirk Right", image: smirk_right },
    { title: "Smile Front", image: smile_front },
    { title: "Smile Left", image: smile_left },
    { title: "Smile Right", image: smile_right },
  ];

  const initializeCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: facingMode,
          width: { ideal: 4096 },
          height: { ideal: 2160 }
        } 
      });
      stream.getTracks().forEach(track => track.stop());
      setIsCameraReady(true);
    } catch (error) {
      console.error('Error initializing camera:', error);
      alert('Failed to initialize camera. Please check your camera permissions and try again.');
    }
  }, [facingMode]);

  useEffect(() => {
    initializeCamera();
  }, [initializeCamera]);

  const videoConstraints = {
    facingMode: facingMode,
    width: { ideal: 4096 },
    height: { ideal: 2160 },
    aspectRatio: isMobile ? 4 / 3 : 16 / 9,
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    }
  }, []);

  const removePhoto = () => setCapturedImage(null);

  const handleUpload = async () => {
    if (!capturedImage) {
      alert("Please capture a photo before uploading.");
      return;
    }
  
    setIsUploading(true);
  
    try {
      const { userId } = await getCurrentUser();
      const timestamp = getCurrentTimeStamp();
      const fileName = `users/${userId}/photos/${state.startingTimestamp}/${timestamp}.jpg`;
      const response = await fetch(capturedImage);
      const blob = await response.blob();
  
      const presignedUrlResponse = await fetch('https://rn3fz2qkeatimhczxdtivhxne40lnkhr.lambda-url.us-east-2.on.aws/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, fileType: blob.type }),
      });
  
      if (!presignedUrlResponse.ok) {
        throw new Error(`Failed to get presigned URL for ${fileName}`);
      }
  
      const { uploadUrl } = await presignedUrlResponse.json();
  
      const s3UploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: blob,
        headers: { 'Content-Type': blob.type },
      });
  
      if (!s3UploadResponse.ok) {
        throw new Error(`Failed to upload ${fileName}`);
      }
  
      setCapturedImage(null);
      setCurrentCardIndex(prevIndex => (prevIndex + 1) % cards.length);
      setShowTemplateCard(true);
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload photo. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const flipCamera = useCallback(() => {
    setFacingMode(prevMode => {
      const newMode = prevMode === 'user' ? 'environment' : 'user';
      setIsMirrored(newMode === 'user');
      return newMode;
    });
  }, []);

  const startTimer = () => {
    setIsTimerActive(true);
    setCountdown(5);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isTimerActive && countdown === 0) {
      capture();
      setIsTimerActive(false);
    }
    return () => clearTimeout(timer);
  }, [isTimerActive, countdown, capture]);

  const TemplateCard: React.FC<{ card: Card; onClose: () => void }> = ({ card, onClose }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <img 
          src={card.image} 
          alt={card.title} 
          className="w-full h-96 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-bold mb-4 text-[#084248]">{card.title}</h2>
        <p className="text-gray-600 mb-6">
          For the best results, please try your best to match the template above.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-[#084248] text-white px-6 py-3 rounded-2xl transition-all duration-300 hover:bg-[#0a5761]"
        >
          Start Capturing
        </button>
      </div>
    </motion.div>
  );

  const CameraButton: React.FC<{
    onClick: () => void;
    icon: React.ElementType;
    label: string;
  }> = ({ onClick, icon: Icon, label }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="bg-[#084248] text-white p-3 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#0a5761]"
      title={label}
    >
      <Icon size={24} />
    </motion.button>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
      <AnimatePresence>
        {showTemplateCard && (
          <TemplateCard 
            card={cards[currentCardIndex]} 
            onClose={() => setShowTemplateCard(false)} 
          />
        )}
      </AnimatePresence>

      {!showTemplateCard && (
        <>
          <div className="flex items-center justify-center w-full mb-4">
            <h2 className="text-2xl font-bold text-[#084248] mr-2">
              {cards[currentCardIndex].title}
            </h2>
            <button
              onClick={() => setShowTemplateCard(true)}
              className="text-[#084248] hover:text-[#0a5761] transition-colors duration-300 flex items-center justify-center"
            >
              <Info size={24} />
            </button>
          </div>
          <div className={`relative ${isMobile ? 'w-full' : ''}`}>
            {!capturedImage && isCameraReady ? (
              <>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  className={`rounded-lg shadow-lg ${isMirrored ? 'scale-x-[-1]' : ''}`}
                  mirrored={isMirrored}
                  style={{
                    width: '100%',
                    height: isMobile ? 'auto' : '480px',
                    aspectRatio: isMobile ? '3 / 4' : '16 / 9',
                  }}
                />
                {isTimerActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-9xl font-bold">
                    {countdown}
                  </div>
                )}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                  <CameraButton onClick={capture} icon={Camera} label="Capture" />
                  <CameraButton onClick={startTimer} icon={Timer} label="Timer" />
                  {isMobile && <CameraButton onClick={flipCamera} icon={RotateCw} label="Flip" />}
                </div>
              </>
            ) : capturedImage ? (
              <>
                <img 
                  src={capturedImage} 
                  alt="captured" 
                  className="rounded-lg shadow-lg w-full"
                  style={{
                    height: isMobile ? 'auto' : '480px',
                    aspectRatio: isMobile ? '3 / 4' : '16 / 9',
                    objectFit: 'cover',
                  }}
                />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                  <CameraButton onClick={removePhoto} icon={X} label="Remove" />
                  <CameraButton 
                    onClick={handleUpload} 
                    icon={Upload} 
                    label={isUploading ? "Uploading..." : "Upload"} 
                  />
                </div>
              </>
            ) : (
              <div 
                className="flex items-center justify-center bg-gray-200 rounded-lg"
                style={{
                  width: '100%',
                  height: isMobile ? '0' : '480px',
                  aspectRatio: isMobile ? '3 / 4' : '16 / 9',
                }}
              >
                <p>Initializing camera...</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PhotoCaptureComponent;