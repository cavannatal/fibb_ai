import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';

const PhotoCaptureComponent = () => {
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const [currentPosition, setCurrentPosition] = useState(1);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImages((prev) => [...prev, imageSrc]);
      if (capturedImages.length + 1 >= 5) {
        // Move to next position after 5 photos
        setCurrentPosition((prev) => prev + 1);
        setCapturedImages([]);
      }
    }
  }, [capturedImages]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <h2 className="text-2xl font-bold mb-4">Capture Photos - Position {currentPosition}</h2>
      <div className="relative">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-lg shadow-lg"
        />
        {/* 3x3 Grid Overlay */}
        <div className="absolute top-0 left-0 w-full h-full grid grid-cols-3 grid-rows-3 pointer-events-none">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="border border-white opacity-50" />
          ))}
        </div>
        {/* Happy Face Template */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border-4 border-yellow-300 rounded-full opacity-50" />
        <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 w-1/4 h-1/4 border-b-4 border-yellow-300 rounded-full opacity-50" />
      </div>
      <p className="mt-4 mb-2">Photos taken: {capturedImages.length} / 5</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={capture}
        className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center"
      >
        <Camera className="mr-2" /> Capture Photo
      </motion.button>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {capturedImages.map((img, index) => (
          <img key={index} src={img} alt={`captured ${index}`} className="w-16 h-16 object-cover rounded" />
        ))}
      </div>
    </div>
  );
};

export default PhotoCaptureComponent;