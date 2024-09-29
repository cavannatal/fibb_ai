import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import AWS from 'aws-sdk';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Auth } from '@aws-amplify/auth';

// TODO: Replace 'cesarFillMeInAWSData' with our actual AWS region
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
        Prefix: `${userId}/`, // This assumes each user has their own folder in the bucket
        // TODO: Consider adding MaxKeys to limit the number of results
        // MaxKeys: 100
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
          <LazyLoadImage
            alt={photo.id}
            height={200}
            src={photo.url} 
            width="100%"
            effect="blur"
            style={{ objectFit: 'cover' }}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default Gallery;

// TODO: Implement pagination or infinite scrolling for large collections
// TODO: Add search and filtering options
// TODO: Implement error boundary to catch and display errors gracefully
