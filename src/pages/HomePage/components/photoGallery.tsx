import React, { useState, useEffect, useCallback } from 'react';
import { Grid, CircularProgress, Typography, IconButton, Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { S3 } from 'aws-sdk';
import { getCurrentUser } from 'aws-amplify/auth';
import { Link } from 'react-router-dom';

// Environment variables
const BUCKET_NAME = process.env.REACT_APP_S3_BUCKET_NAME || '';
const REGION = process.env.REACT_APP_AWS_REGION || '';

// S3 instance
const s3 = new S3({ region: REGION });

// Types
interface Photo {
  id: string;
  url: string;
  lastModified: Date;
}

function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const { username } = await getCurrentUser();
      setUserId(username);
    } catch (error) {
      console.error('Error fetching current user:', error);
      // setError('Unable to authenticate user. Please try logging in again.');
    }
  }, []);

  const fetchPhotos = useCallback(async () => {
    if (!userId) return;

    try {
      const params = { Bucket: BUCKET_NAME, Prefix: `${userId}/` };
      const data = await s3.listObjectsV2(params).promise();
      
      if (!data.Contents || data.Contents.length === 0) {
        setPhotos([]);
        setLoading(false);
        return;
      }

      const photoList = await Promise.all(data.Contents.map(async (object) => {
        const url = await s3.getSignedUrlPromise('getObject', {
          Bucket: BUCKET_NAME,
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
  }, [userId]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  useEffect(() => {
    if (userId) {
      fetchPhotos();
    }
  }, [userId, fetchPhotos]);

  const deletePhoto = async (photoId: string) => {
    try {
      await s3.deleteObject({ Bucket: BUCKET_NAME, Key: photoId }).promise();
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

  const shareToInstagramStories = (photoUrl: string) => {
    const instagramUrl = `instagram-stories://share?source_application=your_app_id`;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `${instagramUrl}&background_image=${encodeURIComponent(photoUrl)}`;
      setTimeout(() => {
        window.location.href = 'https://www.instagram.com';
      }, 2000);
    } else {
      window.open('https://www.instagram.com', '_blank');
    }
  };

  if (error) return <Typography color="error">{error}</Typography>;

  if (photos.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
        textAlign="center"
        px={3}
      >
        <PhotoLibraryIcon style={{ fontSize: 80, color: '#9e9e9e', marginBottom: 16 }} />
        <Typography variant="h4" gutterBottom>
          Sign in to view your Gallery.
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" paragraph>
          Sign up to start building your collection.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/signup"
          style={{ marginTop: 16 }}
        >
          Sign Up Now
        </Button>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {photos.map((photo) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
          <div style={{ position: 'relative' }}>
            <img
              src={photo.url}
              alt={`Id ${photo.id}`}
              style={{ width: '100%', height: 200, objectFit: 'cover' }}
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
            <IconButton
              style={{
                position: 'absolute',
                top: 5,
                right: 85,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
              }}
              onClick={() => shareToInstagramStories(photo.url)}
              aria-label="share to Instagram Stories"
            >
              <InstagramIcon />
            </IconButton>
          </div>
        </Grid>
      ))}
    </Grid>
  );
}

export default PhotoGallery;


// DEVELOPER NOTE: Consider adding undo functionality for deleted photos??
// DEVELOPER NOTE: For iPhone users,we provide instructions on how to save the downloaded image to their photo album
// DEVELOPER NOTE: Ensure that the Instagram sharing feature is thoroughly tested on various devices and browsers... 
// TODO: Implement pagination or infinite scrolling for large collections
// TODO: Add search and filtering options
// TODO: Implement error boundary to catch and display errors gracefully
// DEVELOPER NOTE: For AWS accessibility, ensure that all buttons are properly labeled and can be accessed via keyboard navigation
