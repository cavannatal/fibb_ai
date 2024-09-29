import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import AWS from 'aws-sdk';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import PhotoCard from './PhotoCard';
import S3FinalImageUpload from './s3FinalImageUpload';

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

function GalleryComponent({ scrollPosition }: { scrollPosition: any }) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      // TODO: Replace 'cesarFillMeInAWSData' with our actual S3 bucket name
      const params = {
        Bucket: 'cesarFillMeInAWSData',
        // TODO: Consider adding MaxKeys to limit the number of results
        // MaxKeys: 100
      };

      const data = await s3.listObjectsV2(params).promise();
      
      const photoList = await Promise.all(data.Contents!.map(async (object) => {
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
      setLoading(false);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setLoading(false);
      // TODO: Implement user-friendly error handling
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <S3FinalImageUpload onPhotoUploaded={fetchPhotos} />
      <Grid container spacing={2}>
        {photos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
            <PhotoCard photo={photo} scrollPosition={scrollPosition} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

const Gallery = trackWindowScroll(GalleryComponent);

export default Gallery;

// TODO: Implement pagination or infinite scrolling for large collections
// TODO: Add search and filtering options
// TODO: Implement error boundary to catch and display errors gracefully
