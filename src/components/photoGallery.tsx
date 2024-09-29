import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Typography, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import AWS from 'aws-sdk';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Auth } from '@aws-amplify/auth';

// TODO: Replace 'cesarFillMeInAWSData' with our actual AWS region
// DEVELOPER NOTE: Ensure that the region matches our S3 bucket's region
AWS.config.update({
  region: 'cesarFillMeInAWSData',
});

const s3 = new AWS.S3();

interface Photo {
  id: string;
  url: string;
  lastModified: Date;
}

function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUserId(user.username);
      } catch (error) {
        console.error('Error fetching current user:', error);
        setError('Unable to authenticate user. Please try logging in again.');
      }
    }
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchPhotos();
    }
  }, [userId]);

  const fetchPhotos = async () => {
    if (!userId) return;

    try {
      // TODO: Replace 'cesarFillMeInAWSData' with our actual S3 bucket name
      const params = {
        Bucket: 'cesarFillMeInAWSData',
        Prefix: `${userId}/`,
      };

      const data = await s3.listObjectsV2(params).promise();
      
      if (!data.Contents || data.Contents.length === 0) {
        setPhotos([]);
        setLoading(false);
        return;
      }

      const photoList = await Promise.all(data.Contents.map(async (object) => {
        // TODO: Replace 'cesarFillMeInAWSData' with our actual S3 bucket name
        const url = await s3.getSignedUrlPromise('getObject', {
          Bucket: 'cesarFillMeInAWSData',
          Key: object.Key!,
          Expires: 3600, // URL expires in 1 hour
        });
        return {
          id: object.Key!,
          url: url,
          lastModified: object.LastModified!,
        };
      }));

      setPhotos(photoList);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setError('Failed to load photos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const deletePhoto = async (photoId: string) => {
    try {
      // TODO: Replace 'cesarFillMeInAWSData' with our actual S3 bucket name
      const deleteParams = {
        Bucket: 'cesarFillMeInAWSData',
        Key: photoId,
      };

      await s3.deleteObject(deleteParams).promise();
      
      setPhotos(prevPhotos => prevPhotos.filter(photo => photo.id !== photoId));
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Failed to delete photo. Please try again.');
    }
  };

  const downloadPhoto = async (photoId: string, photoUrl: string) => {
    try {
      const response = await fetch(photoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = photoId.split('/').pop() || 'photo.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading photo:', error);
      alert('Failed to download photo. Please try again.');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (photos.length === 0) {
    return <Typography>No photos found in your gallery.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {photos.map((photo) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
          <div style={{ position: 'relative' }}>
            <LazyLoadImage
              alt={photo.id}
              height={200}
              src={photo.url} 
              width="100%"
              effect="blur"
              style={{ objectFit: 'cover' }}
            />
            <IconButton
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
              }}
              onClick={() => deletePhoto(photo.id)}
              aria-label="delete photo"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              style={{
                position: 'absolute',
                top: 5,
                right: 45,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
              }}
              onClick={() => downloadPhoto(photo.id, photo.url)}
              aria-label="download photo"
            >
              <GetAppIcon />
            </IconButton>
          </div>
        </Grid>
      ))}
    </Grid>
  );
}

export default Gallery;

// DEVELOPER NOTE: Consider adding a confirmation dialog before deleting photos

// DEVELOPER NOTE: Implement proper error logging and monitoring for production environments

// DEVELOPER NOTE: Consider adding undo functionality for deleted photos

// DEVELOPER NOTE: For iPhone users, provide instructions on how to save the downloaded image to their photo album

// TODO: Implement pagination or infinite scrolling for large collections

// TODO: Add search and filtering options

// TODO: Implement error boundary to catch and display errors gracefully

// DEVELOPER NOTE: For accessibility, ensure that the delete and download buttons are properly labeled and can be accessed via keyboard navigation
