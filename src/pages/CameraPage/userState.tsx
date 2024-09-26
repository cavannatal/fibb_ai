import React, { useState, useEffect } from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled = false, children, variant = 'primary' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-md font-semibold ${
      variant === 'primary'
        ? 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300'
        : 'bg-white text-blue-500 border border-blue-500 hover:bg-blue-50'
    } disabled:cursor-not-allowed transition-colors`}
  >
    {children}
  </button>
);

interface ProgressProps {
  value: number;
}

const Progress: React.FC<ProgressProps> = ({ value }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div
      className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

interface AlertProps {
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ children }) => (
  <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
    {children}
  </div>
);

interface Photo {
  id: number;
  url: string;
}

const PhotoUploadTracker: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const savedPhotos = JSON.parse(localStorage.getItem('photoUploadProgress') || '[]') as Photo[];
    setPhotos(savedPhotos);
    setProgress((savedPhotos.length / 10) * 100);
  }, []);

  useEffect(() => {
    localStorage.setItem('photoUploadProgress', JSON.stringify(photos));
    setProgress((photos.length / 10) * 100);
  }, [photos]);

  const handlePhotoCapture = () => {
    const newPhoto: Photo = { id: Date.now(), url: `/api/placeholder/150/150` };
    setPhotos([...photos, newPhoto]);
  };

  const handleReset = () => {
    setPhotos([]);
    localStorage.removeItem('photoUploadProgress');
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800">Photo Upload Progress</h1>
      <Progress value={progress} />
      <p className="text-center text-lg font-semibold text-gray-600">{photos.length} of 10 photos uploaded</p>
      
      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo) => (
          <img key={photo.id} src={photo.url} alt="Uploaded photo" className="w-full h-auto rounded-md shadow-md" />
        ))}
        {[...Array(10 - photos.length)].map((_, index) => (
          <div key={index} className="w-full pt-[100%] bg-gray-200 rounded-md" />
        ))}
      </div>
      
      <div className="flex space-x-4">
        <Button 
          onClick={handlePhotoCapture} 
          disabled={photos.length >= 10}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          Capture Photo
        </Button>
        
        <Button 
          onClick={handleReset} 
          variant="outline"
        >
          Reset Progress
        </Button>
      </div>
      
      {photos.length === 10 && (
        <Alert>
          <h3 className="font-bold">All photos uploaded!</h3>
          <p>You've successfully uploaded all 10 photos.</p>
        </Alert>
      )}
    </div>
  );
};

export default PhotoUploadTracker;