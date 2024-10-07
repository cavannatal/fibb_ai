import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Camera, Upload, RotateCw, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Amplify } from 'aws-amplify';
import { getCurrentUser } from 'aws-amplify/auth';
import { getCurrentTimeStamp } from '../../utils';
import awsconfig from '../../aws-exports';

import neu_front from './images/solo_shots/neutral_confident_front.png';
import neu_right from './images/solo_shots/neutral_confident_right.png';
import neu_left from './images/solo_shots/neutral_confident_left.png';
import smirk_front from './images/solo_shots/smirk_closed_front.png';
import smirk_left from './images/solo_shots/smirk_closed_left.png';
import smirk_right from './images/solo_shots/smirk_closed_right.png';
import smile_front from './images/solo_shots/smile_laugh_front.png';
import smile_left from './images/solo_shots/smile_laugh_left.png';
import smile_right from './images/solo_shots/smile_laugh_right.png';

Amplify.configure(awsconfig);

const PhotoCaptureComponent: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [isMirrored, setIsMirrored] = useState(true);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showTemplateCard, setShowTemplateCard] = useState(true);
  const webcamRef = useRef<Webcam>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  const initCameraWithQuality = useCallback(async () => {
    try {
      const standardConstraints: MediaTrackConstraints = {
        facingMode: facingMode,
        width: { ideal: 4096 },
        height: { ideal: 2160 },
      };

      const advancedConstraints: any = {
        focusMode: ['continuous', 'auto'],
      };

      const constraints: MediaStreamConstraints = {
        video: { ...standardConstraints, ...advancedConstraints }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (webcamRef.current && webcamRef.current.video) {
        webcamRef.current.video.srcObject = stream;
        videoRef.current = webcamRef.current.video;
      }

      const videoTrack = stream.getVideoTracks()[0];
      const capabilities = videoTrack.getCapabilities();
      const settings = videoTrack.getSettings();

      console.log('Current camera settings:', settings);
      console.log('Camera capabilities:', capabilities);

      if (capabilities.width && capabilities.height) {
        await videoTrack.applyConstraints({
          width: { ideal: capabilities.width.max },
          height: { ideal: capabilities.height.max }
        });
      }

      const imageQualityConstraints: { [key: string]: number } = {};
      
      if ('brightness' in capabilities) {
        imageQualityConstraints.brightness = (capabilities as any).brightness.max;
      }
      if ('contrast' in capabilities) {
        imageQualityConstraints.contrast = (capabilities as any).contrast.max;
      }
      if ('saturation' in capabilities) {
        imageQualityConstraints.saturation = (capabilities as any).saturation.max;
      }
      if ('sharpness' in capabilities) {
        imageQualityConstraints.sharpness = (capabilities as any).sharpness.max;
      }

      if (Object.keys(imageQualityConstraints).length > 0) {
        await videoTrack.applyConstraints({ advanced: [imageQualityConstraints] } as MediaTrackConstraints);
      }

      setIsCameraReady(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Failed to initialize camera. Please check your camera permissions and try again.');
    }
  }, [facingMode]);
  
  useEffect(() => {
    initCameraWithQuality();
  }, [initCameraWithQuality]);

  const videoConstraints: MediaTrackConstraints = {
    facingMode: facingMode,
    aspectRatio: isMobile ? 4 / 3 : 16 / 9,
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
      
      if (currentCardIndex === cards.length - 1) {
        // All photos have been taken, redirect to completion screen
        navigate('/completion');
      } else {
        // Move to the next card
        setCurrentCardIndex(prevIndex => prevIndex + 1);
        setShowTemplateCard(true);
      }
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
            ) : capturedImage ? (
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