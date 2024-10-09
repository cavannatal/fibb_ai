import React, { useState, useCallback, DragEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Amplify } from 'aws-amplify';
import { getCurrentUser } from 'aws-amplify/auth';
import { getCurrentTimeStamp } from '../../utils';
import awsconfig from '../../aws-exports';

import neu_front from './images/solo_shots/neutral_confident_front.png';
import neu_right from './images/solo_shots/neutral_confident_right.png';
import neu_left from './images/solo_shots/neutral_confident_left.png';
import smirk_front from './images/solo_shots/smirk_closed_front.png';
import smirk_left from './images/solo_shots/smirk_closed_left.png';
import smirk_right from './images/solo_shots/smirk_closed_right.png';
import smile_front from './images/solo_shots/smile_laugh_front.png';
import smile_left from './images/solo_shots/smile_laugh_left.png';
import smile_right from './images/solo_shots/smile_laugh_right.png';

import full_body from './images/body_shots/full.png';
import turned_sideways from './images/body_shots/turned_sideways.png';
import turned_around from './images/body_shots/turned_around.png';
import full_body_crossed from './images/body_shots/full_body_crossed.png';
import sitting_down from './images/body_shots/sitting_down.png';
import sitting_turned from './images/body_shots/sitting_turned.png';


Amplify.configure(awsconfig);

interface Card {
  title: string;
  image: string;
}

const cards: Card[] = [
  { title: "Neutral Front", image: neu_front },
  { title: "Neutral Right", image: neu_right },
  { title: "Neutral Left", image: neu_left },
  { title: "Smirk Front", image: smirk_front },
  { title: "Smirk Left", image: smirk_left },
  { title: "Smirk Right", image: smirk_right },
  { title: "Smile Front", image: smile_front },
  { title: "Smile Left", image: smile_left },
  { title: "Smile Right", image: smile_right },

  { title: "Full Body", image: full_body },
  { title: "Turned Sideways", image: turned_sideways },
  { title: "Turned Around", image: turned_around },
  { title: "Full Body, Arms Crossed", image: full_body_crossed },
  { title: "Sitting Down", image: sitting_down },
  { title: "Sitting Turned", image: sitting_turned },


];

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const checkIsMobile = () => {
        const mobile = window.matchMedia("(max-width: 768px)").matches;
        setIsMobile(mobile);
      };
  
      checkIsMobile();
      window.addEventListener('resize', checkIsMobile);
  
      return () => window.removeEventListener('resize', checkIsMobile);
    }, []);
  
    return isMobile;
  };
  
  const PhotoGallery: React.FC = () => {
    const [userPhotos, setUserPhotos] = useState<{ [key: string]: string }>({});
    const [dragOver, setDragOver] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const isMobile = useIsMobile();
  
    const handleFileUpload = useCallback((file: File, title: string) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhotos(prev => ({
          ...prev,
          [title]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }, []);
  
    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, title: string) => {
      const file = event.target.files?.[0];
      if (file) {
        handleFileUpload(file, title);
      }
    }, [handleFileUpload]);
  
    const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>, title: string) => {
      event.preventDefault();
      setDragOver(title);
    }, []);
  
    const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(null);
    }, []);
  
    const handleDrop = useCallback((event: DragEvent<HTMLDivElement>, title: string) => {
      event.preventDefault();
      setDragOver(null);
      const file = event.dataTransfer.files[0];
      if (file) {
        handleFileUpload(file, title);
      }
    }, [handleFileUpload]);
  
    const handleRemove = useCallback((title: string) => {
      setUserPhotos(prev => {
        const newPhotos = { ...prev };
        delete newPhotos[title];
        return newPhotos;
      });
    }, []);
  
    const isAllPhotosUploaded = useCallback(() => {
      return cards.every(card => userPhotos[card.title]);
    }, [userPhotos]);
  
    const handleUpload = useCallback(async () => {
      if (!isAllPhotosUploaded()) {
        alert('Please upload all required photos before submitting.');
        return;
      }
  
      setIsUploading(true);
  
      try {
        const { userId } = await getCurrentUser();
        const startingTimestamp = getCurrentTimeStamp();
  
        const uploadPromises = cards.map(async (card) => {
          const photoData = userPhotos[card.title];
          const fileName = `users/${userId}/photos/${startingTimestamp}/${card.title}.jpg`;
          
          // Convert base64 to blob
          const response = await fetch(photoData);
          const blob = await response.blob();
  
          // Get presigned URL
          const presignedUrlResponse = await fetch('https://rn3fz2qkeatimhczxdtivhxne40lnkhr.lambda-url.us-east-2.on.aws/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileName, fileType: blob.type }),
          });
  
          if (!presignedUrlResponse.ok) {
            throw new Error(`Failed to get presigned URL for ${fileName}`);
          }
  
          const { uploadUrl } = await presignedUrlResponse.json();
  
          // Upload to S3
          const s3UploadResponse = await fetch(uploadUrl, {
            method: 'PUT',
            body: blob,
            headers: { 'Content-Type': blob.type },
          });
  
          if (!s3UploadResponse.ok) {
            throw new Error(`Failed to upload ${fileName}`);
          }
  
          return fileName;
        });
  
        const results = await Promise.all(uploadPromises);
        console.log('All photos uploaded:', results);
        alert('All photos have been uploaded successfully!');
        
        // Here you would typically navigate to a completion page
        window.location.href = '/completion';
      } catch (error) {
        console.error('Error uploading photos:', error);
        alert('Failed to upload photos. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }, [userPhotos, isAllPhotosUploaded]);
  
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#093f48] to-[#004948] text-white">
        <main className="flex flex-col items-center flex-grow p-4 sm:p-6 pb-16 sm:pb-6">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-16 mt-8 sm:mt-16 text-center"
            style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
          >
            Your <span className="text-[#cbf59a]">fibb</span> Guided Process
          </h1>
          
          <p className="text-center text-lg mb-8 sm:mb-16 max-w-2xl">
          Embark on your personalized fibb journey! Upload your photos below to kickstart your transformative experience. For Full Body shots, please use your camera app for now — we're currently developing an iOS app to enhance this process. Let's begin your fibb adventure!
        </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl mb-8 sm:mb-16">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-[#144a53] rounded-lg overflow-hidden "
              >
                <h3 className="text-xl font-bold p-4 bg-[#0c3942]" style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>
                  {card.title}
                </h3>
                <div className="p-4 flex flex-col space-y-4">
                  <div className="w-full h-64 flex items-center justify-center bg-[#0c3942] rounded-lg overflow-hidden">
                    <img 
                      src={card.image} 
                      alt={card.title} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div 
                    className="w-full h-64 bg-[#0c3942] rounded-lg flex items-center justify-center relative overflow-hidden"
                    onDragOver={(e) => handleDragOver(e, card.title)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, card.title)}
                  >
                    {userPhotos[card.title] ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img 
                          src={userPhotos[card.title]} 
                          alt={`User ${card.title}`} 
                          className="max-w-full max-h-full object-contain"
                        />
                        <button
                          onClick={() => handleRemove(card.title)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors duration-300"
                          aria-label="Remove photo"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <label 
                        htmlFor={`photo-upload-${index}`} 
                        className={`cursor-pointer flex flex-col items-center justify-center w-full h-full ${dragOver === card.title ? 'bg-[#1c5a64]' : ''}`}
                      >
                        <svg className="h-12 w-12 text-gray-400 mb-2" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-sm text-gray-300">Click to upload or drag and drop</p>
                      </label>
                    )}
                  </div>
                  <input
                    id={`photo-upload-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, card.title)}
                    className="hidden"
                  />
                  {isMobile && (
                    <input
                      id={`camera-upload-${index}`}
                      type="file"
                      accept="image/*"
                      capture="user"
                      onChange={(e) => handleFileChange(e, card.title)}
                      className="hidden"
                    />
                  )}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => document.getElementById(`photo-upload-${index}`)?.click()}
                      className="flex-1 bg-[#f79302] text-black font-bold py-2 px-4 rounded-lg text-sm hover:bg-[#f79600] transition-all duration-300"
                      style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                    >
                      Choose File
                    </button>
                    {isMobile && (
                      <button
                        onClick={() => document.getElementById(`camera-upload-${index}`)?.click()}
                        className="flex-1 bg-[#cbf59a] text-black font-bold py-2 px-4 rounded-lg text-sm hover:bg-[#b8e089] transition-all duration-300"
                        style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                      >
                        Take Selfie
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleUpload}
            disabled={!isAllPhotosUploaded() || isUploading}
            className={`mt-8 px-8 py-3 text-lg font-bold rounded-lg transition-all duration-300 ${
              isAllPhotosUploaded() && !isUploading
                ? 'bg-[#cbf59a] text-black hover:bg-[#b8e089]'
                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
            }`}
            style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
          >
            {isUploading ? 'Uploading...' : 'Upload All Photos'}
          </button>
        </main>
      </div>
    );
  };
  
  export default PhotoGallery;