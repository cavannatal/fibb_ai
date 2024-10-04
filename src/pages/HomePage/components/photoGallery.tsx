import React, { useState, useEffect } from 'react';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { list, getUrl } from 'aws-amplify/storage';
import { Amplify } from 'aws-amplify';
import awsExports from '../../../aws-exports';

Amplify.configure(awsExports);

interface Photo {
  key: string;
  url: string;
}

interface S3ListItem {
  key: string;
}

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          throw new Error("User is not authenticated");
        }

        const session = await fetchAuthSession();
        if (!session.tokens) {
          throw new Error("No valid session tokens");
        }

        const sub = session.tokens.accessToken.payload.sub;
        if (!sub) {
          throw new Error("Unable to retrieve user sub");
        }

        console.log("User sub:", sub);

        const s3Path = `users/${sub}/gallery/`;
        
        const s3List = await list({
          prefix: s3Path,
          options: {
            accessLevel: 'private'
          }
        });

        console.log("S3 List Result:", s3List);

        const photoPromises = s3List.items.map(async (item: S3ListItem) => {
          const { url } = await getUrl({
            key: item.key,
            options: {
              accessLevel: 'private',
              validateObjectExistence: true
            }
          });
          return { key: item.key, url: url.toString() };
        });
        
        const photoList = await Promise.all(photoPromises);
        setPhotos(photoList);
      } catch (err) {
        console.error("Error fetching photos:", err);
        setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
        
        if (err instanceof Error && err.message.includes("authenticated")) {
          window.location.href = `https://${awsExports.Auth.Cognito.hostedUI?.domain}/login?client_id=${awsExports.Auth.Cognito.userPoolClientId}&response_type=code&scope=email+openid+profile&redirect_uri=${encodeURIComponent(awsExports.Auth.Cognito.hostedUI?.redirectSignIn || '')}`;
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [navigate]);

  
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