import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { getCurrentUser } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import awsExports from '../../../aws-exports';
import { getGalleryImages } from '../../../utils/s3Get';

// Configure Amplify
Amplify.configure(awsExports);

interface Photo {
  key: string;
  url: string;
}

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      setError(null);

      const { userId: sub } = await getCurrentUser();
      console.log("Cognito Identity ID:", sub);
      
      const galleryResult = await getGalleryImages(sub);
      console.log("Gallery Result:", galleryResult);

      if (galleryResult && galleryResult.files) {
        setPhotos(galleryResult.files);
      } else {
        setPhotos([]);
      }
    } catch (err) {
      console.error("Error in fetchPhotos:", err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || photos.length === 0) {
    return <EmptyGallery error={error} onStartGenerating={() => navigate('/get-started')} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Photo Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <img 
            key={photo.key} 
            src={photo.url} 
            alt={`Gallery item ${photo.key}`} 
            className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition duration-300"
          />
        ))}
      </div>
    </div>
  );
};

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

interface EmptyGalleryProps {
  error: string | null;
  onStartGenerating: () => void;
}

const EmptyGallery: React.FC<EmptyGalleryProps> = ({ error, onStartGenerating }) => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <Camera className="mx-auto mb-4 text-gray-400" size={64} />
      <h2 className="text-2xl font-bold mb-2">No Images Found</h2>
      <p className="text-gray-600 mb-6">
        {error ? `An error occurred: ${error}` : "Start capturing moments and see your gallery come to life!"}
      </p>
      <button 
        onClick={onStartGenerating}
        className="bg-[#084248] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-[#0a565d]"
      >
        Start Generating
      </button>
    </div>
  </div>
);

export default PhotoGallery;