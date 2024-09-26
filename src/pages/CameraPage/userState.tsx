import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const PhotoUploadTracker = () => {
  const [photos, setPhotos] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Load saved progress from localStorage when component mounts
    const savedPhotos = JSON.parse(localStorage.getItem('photoUploadProgress')) || [];
    setPhotos(savedPhotos);
    setProgress((savedPhotos.length / 10) * 100);
  }, []);

  useEffect(() => {
    // Save progress to localStorage whenever photos state changes
    localStorage.setItem('photoUploadProgress', JSON.stringify(photos));
    setProgress((photos.length / 10) * 100);
  }, [photos]);

  const handlePhotoCapture = () => {
    // Simulating photo capture
    const newPhoto = { id: Date.now(), url: `/api/placeholder/150/150` };
    setPhotos([...photos, newPhoto]);
  };

  const handleReset = () => {
    setPhotos([]);
    localStorage.removeItem('photoUploadProgress');
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Photo Upload Progress</h1>
      <Progress value={progress} className="w-full" />
      <p>{photos.length} of 10 photos uploaded</p>
      
      <div className="grid grid-cols-3 gap-2">
        {photos.map((photo) => (
          <img key={photo.id} src={photo.url} alt="Uploaded photo" className="w-full h-auto" />
        ))}
      </div>
      
      <Button onClick={handlePhotoCapture} disabled={photos.length >= 10}>
        <Camera className="mr-2 h-4 w-4" /> Capture Photo
      </Button>
      
      <Button onClick={handleReset} variant="outline">Reset Progress</Button>
      
      {photos.length === 10 && (
        <Alert>
          <AlertTitle>All photos uploaded!</AlertTitle>
          <AlertDescription>You've successfully uploaded all 10 photos.</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default PhotoUploadTracker;
