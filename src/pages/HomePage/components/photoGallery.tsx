import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { getCurrentUser } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { list, getUrl } from 'aws-amplify/storage';
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
    console.log("AWS Exports:", JSON.stringify(awsExports, null, 2));
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      setError(null);

      const { userId: sub } = await getCurrentUser();
      console.log("Cognito Identity ID:", sub);
      const galleryresult = await getGalleryImages(sub)
      console.log("adfasdsad")
      console.log({galleryresult})

      // Test with both the user-specific path and the root path
      const paths = [`users/${sub}/gallery/`, ''];

      for (const s3Path of paths) {
        console.log(`Fetching photos from path: ${s3Path}`);

        try {
          const s3List = await list({
            prefix: s3Path,
            options: {
              accessLevel: 'private'
            }
          });

          console.log(`Full S3 list result for ${s3Path}:`, JSON.stringify(s3List, null, 2));
          console.log(`S3 list items for ${s3Path}:`, s3List.items);
          console.log(`S3 list items length for ${s3Path}:`, s3List.items.length);

          if (s3List.items.length > 0) {
            const photoList = await Promise.all(
              s3List.items.map(async (item) => {
                try {
                  const { url } = await getUrl({
                    key: item.key,
                    options: {
                      accessLevel: 'private',
                      validateObjectExistence: true,
                      expiresIn: 3600 // URL will be valid for 1 hour
                    }
                  });
                  console.log(`Generated URL for ${item.key}:`, url);
                  return { key: item.key, url: url.toString() };
                } catch (error) {
                  console.error(`Error getting URL for ${item.key}:`, error);
                  return null;
                }
              })
            );

            const filteredPhotos = photoList.filter((photo): photo is Photo => photo !== null);
            console.log("Filtered photos:", filteredPhotos);
            setPhotos(filteredPhotos);
            return; // Exit the loop if we found photos
          } else {
            console.log(`No items found in S3 list for path: ${s3Path}`);
          }
        } catch (listError) {
          console.error(`Error listing S3 objects for path ${s3Path}:`, listError);
          if (listError instanceof Error) {
            console.error("Error name:", listError.name);
            console.error("Error message:", listError.message);
            console.error("Error stack:", listError.stack);
          }
        }
      }

      // If we've reached this point, no photos were found in any path
      setPhotos([]);
    } catch (err) {
      console.error("Error in fetchPhotos:", err);
      if (err instanceof Error) {
        console.error("Error name:", err.name);
        console.error("Error message:", err.message);
        console.error("Error stack:", err.stack);
      }
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