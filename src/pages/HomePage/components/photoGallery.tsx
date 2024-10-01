import React, { useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { list, getUrl } from 'aws-amplify/storage';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        console.log("Starting to fetch photos...");
        
        const { userId: sub } = await getCurrentUser();
        console.log("Current user sub:", sub);

        const userAttributes = await fetchUserAttributes();
        console.log("User attributes:", userAttributes);

        const result = await list({
          prefix: `users/${sub}/photos/`,
          options: {
            accessLevel: 'private'
          }
        });
        console.log("S3 list result:", result);

        const photoUrls = await Promise.all(
          result.items.map(async (item) => {
            const { url } = await getUrl({ 
              key: item.key,
              options: {
                accessLevel: 'private'
              }
            });
            return url.toString();
          })
        );
        console.log("Fetched photo URLs:", photoUrls);

        setPhotos(photoUrls);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching photos:", err);
        setError(`${err instanceof Error ? err.message : String(err)}`);
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const handleStartGenerating = () => {
    navigate('/cam');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error || photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <Camera className="mx-auto mb-4 text-gray-400" size={64} />
          <h2 className="text-2xl font-bold mb-2">No Images Generated Yet</h2>
          <p className="text-gray-600 mb-6">
            {error ? `An error occurred: ${error}` : "Start capturing moments and see your gallery come to life!"}
          </p>
          <button 
            onClick={handleStartGenerating}
            className="bg-[#084248] text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Start Generating
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Photo Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <img 
            key={index} 
            src={photo} 
            alt={`User ${index + 1}`} 
            className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
// DEVELOPER NOTE: Consider adding undo functionality for deleted photos??
// DEVELOPER NOTE: For iPhone users,we provide instructions on how to save the downloaded image to their photo album
// DEVELOPER NOTE: Ensure that the Instagram sharing feature is thoroughly tested on various devices and browsers... 
// TODO: Implement pagination or infinite scrolling for large collections
// TODO: Add search and filtering options
// TODO: Implement error boundary to catch and display errors gracefully
// DEVELOPER NOTE: For AWS accessibility, ensure that all buttons are properly labeled and can be accessed via keyboard navigation
