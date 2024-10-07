import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, Upload, RotateCw, X } from 'lucide-react';
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

const PhotoCaptureComponent: React.FC = () => {
  const { state } = useLocation();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [isMirrored, setIsMirrored] = useState(true);
  const [is4KSupported, setIs4KSupported] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showTemplateCard, setShowTemplateCard] = useState(true);
  const webcamRef = useRef<Webcam>(null);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const cards = [
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

  useEffect(() => {
    checkCameraCapabilities();
    initializeCamera();
  }, []);

  const checkCameraCapabilities = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 3840 },
          height: { ideal: 2160 }
        }
      });
      const videoTrack = stream.getVideoTracks()[0];
      const capabilities = videoTrack.getCapabilities();
      
      const maxWidth = capabilities.width?.max;
      const maxHeight = capabilities.height?.max;

      setIs4KSupported(
        typeof maxWidth === 'number' &&
        typeof maxHeight === 'number' &&
        maxWidth >= 3840 &&
        maxHeight >= 2160
      );

      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Error checking camera capabilities:', error);
      setIs4KSupported(false);
    }
  };

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setIsCameraReady(true);
    } catch (error) {
      console.error('Error initializing camera:', error);
      alert('Failed to initialize camera. Please check your camera permissions and try again.');
    }
  };

  const videoConstraints = {
    width: isMobile ? (is4KSupported ? 1080 : 720) : (is4KSupported ? 3840 : 1920),
    height: isMobile ? (is4KSupported ? 1920 : 1280) : (is4KSupported ? 2160 : 1080),
    facingMode: facingMode,
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    }
  }, []);

  const removePhoto = () => {
    setCapturedImage(null);
  };

  const handleUpload = async () => {
    if (!capturedImage) {
      alert("Please capture a photo before uploading.");
      return;
    }
  
    setIsUploading(true);
  
    try {
      const { userId } = await getCurrentUser();
      const sub = userId;
  
      const timestamp = getCurrentTimeStamp();
      const fileName = `users/${sub}/photos/${state.startingTimestamp}/${timestamp}.jpg`;
      const response = await fetch(capturedImage);
      const blob = await response.blob();
  
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

  const flipCamera = () => {
    setFacingMode(prevMode => {
      const newMode = prevMode === 'user' ? 'environment' : 'user';
      setIsMirrored(newMode === 'user');
      return newMode;
    });
  };

  const TemplateCard = ({ card, onClose }: { card: { title: string; image: string }; onClose: () => void }) => (
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
          <h2 className="text-2xl font-bold mb-4 text-[#084248]">
            Capture Photo
          </h2>
          <p className="text-lg mb-4 text-gray-600">
            {is4KSupported ? "4K resolution supported" : "Standard HD resolution"}
          </p>
          <div className={`relative ${isMobile ? 'w-full max-w-sm' : ''}`}>
            {!capturedImage && isCameraReady ? (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className={`rounded-lg shadow-lg ${isMirrored ? 'scale-x-[-1]' : ''} ${isMobile ? 'w-full object-cover' : ''}`}
                mirrored={isMirrored}
                style={isMobile ? { height: '70vh', width: 'auto', maxWidth: '100%' } : {}}
              />
            ) : capturedImage ? (
              <img 
                src={capturedImage} 
                alt="captured" 
                className={`rounded-lg shadow-lg ${isMobile ? 'w-full object-cover' : ''}`} 
                style={isMobile ? { height: '70vh', width: 'auto', maxWidth: '100%' } : {}}
              />
            ) : (
              <div className="flex items-center justify-center bg-gray-200 rounded-lg" style={{height: isMobile ? '70vh' : '480px', width: isMobile ? '100%' : '640px'}}>
                <p>Initializing camera...</p>
              </div>
            )}
          </div>
          <div className="flex mt-4 space-x-4">
            {!capturedImage && isCameraReady ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={capture}
                  className="bg-[#084248] text-white px-6 py-3 rounded-2xl flex items-center transition-all duration-300 hover:bg-[#0a5761]"
                >
                  <Camera className="mr-2" /> Capture Photo
                </motion.button>
                {isMobile && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={flipCamera}
                    className="bg-[#084248] text-white px-6 py-3 rounded-2xl flex items-center transition-all duration-300 hover:bg-[#0a5761]"
                  >
                    <RotateCw className="mr-2" /> Flip Camera
                  </motion.button>
                )}
              </>
            ) : capturedImage ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={removePhoto}
                  className="bg-red-500 text-white px-6 py-3 rounded-2xl flex items-center transition-all duration-300 hover:bg-red-600"
                >
                  <X className="mr-2" /> Remove
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUpload}
                  disabled={isUploading}
                  className={`bg-[#084248] text-white px-6 py-3 rounded-2xl flex items-center transition-all duration-300 ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0a5761]'}`}
                >
                  <Upload className="mr-2" /> {isUploading ? 'Uploading...' : 'Upload Photo'}
                </motion.button>
              </>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default PhotoCaptureComponent;