import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Category = {
  name: string;
  description: string;
  images: string[];
};

const initialCategories: Category[] = [
  { name: "Smiling", description: "3 smiling photos", images: [] },
  { name: "Laughing", description: "3 laughing front photos", images: [] },
  { name: "Hands", description: "3 photos of hands", images: [] },
  { name: "Profile", description: "3 profile photos", images: [] },
  { name: "Full Body", description: "3 full body photos", images: [] },
];

const CameraPage: React.FC = () => {
  const [mode, setMode] = useState<'upload' | 'capture'>('upload');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const openCamera = useCallback(async () => {
    try {
      const constraints = {
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
      setCameraError(null);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraError('Failed to access the camera. Please ensure you have given permission and your camera is not in use by another application.');
    }
  }, []);

  const closeCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current && categories[activeCategory].images.length < 3) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        updateCategoryImages(activeCategory, imageDataUrl);
      }
    }
  }, [activeCategory, categories]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && categories[activeCategory].images.length < 3) {
      Array.from(files).slice(0, 3 - categories[activeCategory].images.length).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          updateCategoryImages(activeCategory, e.target?.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const updateCategoryImages = (categoryIndex: number, newImage: string) => {
    setCategories(prev => prev.map((category, index) => 
      index === categoryIndex
        ? { ...category, images: [...category.images, newImage].slice(0, 3) }
        : category
    ));
  };

  const removeImage = (categoryIndex: number, imageIndex: number) => {
    setCategories(prev => prev.map((category, index) => 
      index === categoryIndex
        ? { ...category, images: category.images.filter((_, i) => i !== imageIndex) }
        : category
    ));
  };

  useEffect(() => {
    if (mode === 'capture') {
      openCamera();
    } else {
      closeCamera();
    }
    return closeCamera;
  }, [mode, openCamera, closeCamera]);

  const totalImages = categories.reduce((sum, category) => sum + category.images.length, 0);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-4 rounded-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Categorized 15 Photo Grid</h2>
        <div className="flex justify-center space-x-4 mb-4">
          <button 
            onClick={() => setMode('upload')}
            className={`px-4 py-2 rounded transition-colors ${mode === 'upload' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Upload Photos
          </button>
          <button 
            onClick={() => setMode('capture')}
            className={`px-4 py-2 rounded transition-colors ${mode === 'capture' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Take Photos
          </button>
        </div>
        {cameraError && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {cameraError}
          </div>
        )}
        <div className="mb-4">
          {categories.map((category, categoryIndex) => (
            <div key={category.name} className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{category.name} - {category.description}</h3>
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="relative aspect-square bg-gray-200 flex items-center justify-center">
                    {category.images[index] ? (
                      <>
                        <img src={category.images[index]} alt={`${category.name} ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeImage(categoryIndex, index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : categoryIndex === activeCategory && index === category.images.length ? (
                      mode === 'capture' && stream ? (
                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                      ) : (
                        <div 
                          className="w-full h-full flex items-center justify-center cursor-pointer"
                          onClick={() => {
                            setActiveCategory(categoryIndex);
                            mode === 'upload' ? fileInputRef.current?.click() : captureImage();
                          }}
                        >
                          {mode === 'upload' ? <Upload size={24} /> : <Camera size={24} />}
                        </div>
                      )
                    ) : (
                      <span className="text-gray-400">{index + 1}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-4">
          {categories[activeCategory].images.length < 3 && (
            <button 
              onClick={() => mode === 'upload' ? fileInputRef.current?.click() : captureImage()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {mode === 'upload' ? 'Select Files' : 'Capture Image'} ({totalImages}/15)
            </button>
          )}
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
        {totalImages === 15 && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            <h3 className="font-bold">All Images Captured</h3>
            <p>15 images across all categories are ready to be sent to server or Google Drive.</p>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          multiple
          onChange={handleFileUpload}
        />
        <canvas ref={canvasRef} className="hidden" width="1280" height="720" />
      </div>
    </div>
  );
};

export default CameraPage;