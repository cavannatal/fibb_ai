import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, X, RefreshCcw } from 'lucide-react';

const CameraGrid: React.FC = () => {
  const [images, setImages] = useState<(string | null)[]>(Array(15).fill(null));
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };
    startCamera();
  }, []);

  const captureImage = (index: number | null = null) => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 320, 240);
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg');
        if (index !== null) {
          const newImages = [...images];
          newImages[index] = imageDataUrl;
          setImages(newImages);
        } else {
          const emptyIndex = images.findIndex(img => img === null);
          if (emptyIndex !== -1) {
            const newImages = [...images];
            newImages[emptyIndex] = imageDataUrl;
            setImages(newImages);
          }
        }
        setSelectedImage(null);
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-600"
        style={{ fontFamily: 'Nunito, sans-serif' }}
      >
        Camera Grid Capture
      </motion.h1>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg shadow-lg" />
          <canvas ref={canvasRef} width={320} height={240} className="hidden" />
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-blue-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          onClick={() => captureImage(selectedImage)}
        >
          <Camera className="mr-2" />
          {selectedImage !== null ? 'Replace Image' : 'Capture Image'}
        </motion.button>

        <div className="grid grid-cols-5 gap-4 mt-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`aspect-square bg-gray-800 rounded-lg overflow-hidden shadow-md relative ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedImage(index)}
            >
              {image ? (
                <>
                  <img src={image} alt={`Captured ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    className="absolute top-2 right-2 bg-red-500 p-1 rounded-full hover:bg-red-600 transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  {index + 1}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CameraGrid;