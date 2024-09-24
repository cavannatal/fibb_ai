import React, { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CameraPage: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
        setCapturedImage(imageDataUrl);
        console.log('Image captured. Ready to send to server or Google Drive.');
      }
    }
  };

  useEffect(() => {
    openCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, );

  const renderGrid = () => {
    const gridSize = 5;
    const cells = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      cells.push(
        <div key={i} className="border border-white opacity-50" style={{ width: `${100 / gridSize}%`, height: `${100 / gridSize}%` }} />
      );
    }
    return cells;
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-4 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Camera Grid</h2>
        <div className="relative w-full aspect-square mb-4">
          {stream ? (
            <>
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <div className="absolute top-0 left-0 w-full h-full grid grid-cols-5 grid-rows-5">
                {renderGrid()}
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Camera size={48} />
            </div>
          )}
        </div>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={captureImage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Capture Image
          </button>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
        {capturedImage && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            <h3 className="font-bold">Image Captured</h3>
            <p>Image ready to be sent to server or Google Drive.</p>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" width="1280" height="720" />
      </div>
    </div>
  );
};

export default CameraPage;