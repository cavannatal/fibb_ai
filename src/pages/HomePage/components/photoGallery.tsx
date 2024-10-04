import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { getCurrentUser } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { list, getUrl } from 'aws-amplify/storage';
import awsExports from '../../../aws-exports';
import { getAllFilesInFolder } from '../../../utils/s3Get';

Amplify.configure(awsExports);

interface Photo {
  key: string;
  url: string;
}

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [s3Contents, setS3Contents] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        console.log("Starting fetchPhotos...");
        
        // Get current authenticated user
        const { userId: sub } = await getCurrentUser();
        console.log("User sub:", sub);

        const s3Path = `users/${sub}/gallery/`;
        const s3getResult = await getAllFilesInFolder('s3-user-photos',s3Path)
        
        console.log(s3getResult)
        console.log("S3 path:", s3Path);

      
        // List objects in S3
        const s3List = await list({
          prefix: `s3-user-photos/${s3Path}`,
          options: {
            accessLevel: 'private'
          }
        });

        console.log("S3 List Result:", JSON.stringify(s3List, null, 2));

        // Print out the contents of the S3 path
        const contents = s3List.items.map(item => item.key);
        setS3Contents(contents);
        console.log("S3 Contents:", contents);

        if (s3List.items.length === 0) {
          console.log("No items found in S3");
          setPhotos([]);
          return;
        }

        const photoPromises = s3List.items.map(async (item) => {
          try {
            const { url } = await getUrl({
              key: item.key,
              options: {
                accessLevel: 'private',
                validateObjectExistence: true
              }
            });
            return { key: item.key, url: url.toString() };
          } catch (error) {
            console.error(`Error getting URL for ${item.key}:`, error);
            return null;
          }
        });
        
        const photoList = (await Promise.all(photoPromises)).filter(Boolean) as Photo[];
        setPhotos(photoList);
        console.log("Photos fetched successfully:", photoList.length);
      } catch (err) {
        console.error("Error in fetchPhotos:", err);
        if (err instanceof Error) {
          console.error("Error name:", err.name);
          console.error("Error message:", err.message);
          console.error("Error stack:", err.stack);
        }
        setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [navigate]);


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
          <h2 className="text-2xl font-bold mb-2">No Images Found</h2>
          <p className="text-gray-600 mb-6">
            {error ? `An error occurred: ${error}` : "Start capturing moments and see your gallery come to life!"}
          </p>
          <button 
            onClick={() => navigate('/get-started')}
            className="bg-[#084248] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-[#0a565d]"
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