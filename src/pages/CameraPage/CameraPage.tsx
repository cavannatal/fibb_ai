import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CameraPage: React.FC = () => {
  const [mode, setMode] = useState<'upload' | 'capture'>('upload');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg');
        setImages(prev => [...prev, imageDataUrl].slice(0, 15));
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImages(prev => [...prev, e.target?.result as string].slice(0, 15));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (mode === 'capture') {
      openCamera();
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mode]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-4 rounded-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">15 Photo Grid</h2>
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
        <div className="grid grid-cols-5 gap-2 mb-4">
          {[...Array(15)].map((_, index) => (
            <div key={index} className="relative aspect-square bg-gray-200 flex items-center justify-center">
              {images[index] ? (
                <>
                  <img src={images[index]} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : index === images.length ? (
                mode === 'capture' && stream ? (
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center cursor-pointer"
                    onClick={() => mode === 'upload' ? fileInputRef.current?.click() : captureImage()}
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
        <div className="flex justify-center space-x-4">
          {mode === 'capture' && images.length < 15 && (
            <button 
              onClick={captureImage}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Capture Image ({images.length}/15)
            </button>
          )}
          {mode === 'upload' && images.length < 15 && (
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Select Files ({images.length}/15)
            </button>
          )}
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
        {images.length === 15 && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            <h3 className="font-bold">All Images Captured</h3>
            <p>15 images are ready to be sent to server or Google Drive.</p>
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