import React, { useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { post } from 'aws-amplify/api';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';

interface Photo {
  key: string;
  url: string;
}

interface ApiResponse {
  photos: Photo[];
}

// Type guard function
function isApiResponse(data: any): data is ApiResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'photos' in data &&
    Array.isArray(data.photos) &&
    data.photos.every((photo: any) => 
      typeof photo === 'object' &&
      photo !== null &&
      'key' in photo &&
      'url' in photo &&
      typeof photo.key === 'string' &&
      typeof photo.url === 'string'
    )
  );
}

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuthAndFetchPhotos = async () => {
      try {
        console.log("Initializing Auth...");
        await getCurrentUser();
        console.log("Auth initialized successfully");
        await fetchPhotos();
      } catch (err) {
        console.error("Error initializing Auth:", err);
        setError("Failed to initialize authentication. Please try signing in again.");
        setLoading(false);
      }
    };

    initializeAuthAndFetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      console.log("Starting to fetch photos...");
      
      const user = await getCurrentUser();
      console.log("Current user:", user);

      const postOperation = post({
        apiName: 'getGalleryPhotos', // Replace with your actual API name
        path: 'https://xdjzp63cti.execute-api.us-east-2.amazonaws.com/photos/dev', // Replace with your actual API path
        options: {
          body: { userId: user.userId } // Pass the userId to the Lambda if needed
        }
      });

      const response = await postOperation.response;
      console.log("API response:", response);

      if (response.body) {
        const responseData = await response.body.json();
        console.log("Parsed response data:", responseData);

        if (isApiResponse(responseData)) {
          if (responseData.photos.length > 0) {
            setPhotos(responseData.photos);
          } else {
            console.log("No photos found");
            setPhotos([]);
          }
        } else {
          console.error("Unexpected response format from API:", responseData);
          setError("Unexpected response format from server");
        }
      } else {
        console.error("No body in API response");
        setError("No data received from server");
      }
    } catch (err) {
      console.error("Error in fetchPhotos:", err);
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStartGenerating = () => {
    navigate('/get-started');
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
            key={photo.key} 
            src={photo.url} 
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
