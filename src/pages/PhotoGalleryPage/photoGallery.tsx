import React, { useState, useEffect, useCallback } from 'react';
import { Amplify } from 'aws-amplify';
import { getCurrentUser } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { Camera, RefreshCw, XCircle, ChevronLeft, ChevronRight, Download, Share2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import awsExports from '../../aws-exports';
import { getGalleryImages } from '../../utils/s3Get';

Amplify.configure(awsExports);

interface Photo {
  key: string;
  url: string;
}

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const navigate = useNavigate();

  const fetchPhotos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { userId: sub } = await getCurrentUser();
      const galleryResult = await getGalleryImages(sub);
      setPhotos(galleryResult?.files || []);
    } catch (err) {
      console.error("Error in fetchPhotos:", err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const handleDownload = useCallback((photo: Photo) => {
    console.log('Starting download for:', photo.url);

    fetch(photo.url, { mode: 'cors' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = photo.key.split('/').pop() || 'photo.jpg';
        
        console.log('Created download link:', link.href);
        
        if ('download' in link) {
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          console.log('Download initiated');
        } else {
          window.open(url, '_blank');
          console.log('Opened in new tab (fallback)');
        }
        
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error downloading image:', error);
        alert(`Failed to download image: ${error.message}`);
      });
  }, []);

  const handleShare = useCallback((photo: Photo) => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this photo!',
        text: 'I found this amazing photo in my gallery.',
        url: photo.url,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      alert('Web Share API is not supported in your browser. You can copy the image URL to share.');
    }
  }, []);

  const handleDelete = useCallback((photo: Photo) => {
    console.log('Delete functionality not implemented yet', photo);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error || photos.length === 0) {
    return (
      <EmptyGallery
        error={error}
        onStartGenerating={() => navigate('/get-started')}
        onRefresh={fetchPhotos}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-start pt-4 px-2 sm:pt-8 sm:px-4 bg-[#F5F5F5]">
      <div className="container mx-auto">
        <Header onRefresh={fetchPhotos} />
        <PhotoGrid 
          photos={photos} 
          onPhotoClick={setSelectedPhoto} 
          onDownload={handleDownload} 
          onShare={handleShare} 
          onDelete={handleDelete} 
        />
        <EnlargedPhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onPrev={() => {
            const index = photos.findIndex(p => p.key === selectedPhoto?.key);
            setSelectedPhoto(photos[(index - 1 + photos.length) % photos.length]);
          }}
          onNext={() => {
            const index = photos.findIndex(p => p.key === selectedPhoto?.key);
            setSelectedPhoto(photos[(index + 1) % photos.length]);
          }}
          onDownload={handleDownload}
          onShare={handleShare}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

const Header: React.FC<{ onRefresh: () => void }> = ({ onRefresh }) => (
  <div className="flex flex-col items-center mb-6 sm:mb-12">
    <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl font-bold mb-4 text-center text-[#084248]"
          style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
        >
          Your Gallery
        </motion.h1>
    <IconButton onClick={onRefresh} icon={<RefreshCw size={20} />} />
  </div>
);

const PhotoGrid: React.FC<{ 
  photos: Photo[]; 
  onPhotoClick: (photo: Photo) => void; 
  onDownload: (photo: Photo) => void;
  onShare: (photo: Photo) => void;
  onDelete: (photo: Photo) => void;
}> = ({ photos, onPhotoClick, onDownload, onShare, onDelete }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
  >
    {photos.map((photo) => (
      <PhotoCard
        key={photo.key}
        photo={photo}
        onClick={() => onPhotoClick(photo)}
        onDownload={() => onDownload(photo)}
        onShare={() => onShare(photo)}
        onDelete={() => onDelete(photo)}
      />
    ))}
  </motion.div>
);

const PhotoCard: React.FC<{
  photo: Photo;
  onClick: () => void;
  onDownload: () => void;
  onShare: () => void;
  onDelete: () => void;
}> = ({ photo, onClick, onDownload, onShare, onDelete }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden"
  >
    <div 
      className="aspect-square overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <img
        src={photo.url}
        alt={`Gallery item ${photo.key}`}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex justify-center space-x-2 p-2 bg-white">
      <IconButton onClick={(e) => { e.stopPropagation(); onDownload(); }} icon={<Download size={16} />} />
      <IconButton onClick={(e) => { e.stopPropagation(); onShare(); }} icon={<Share2 size={16} />} />
      <IconButton onClick={(e) => { e.stopPropagation(); onDelete(); }} icon={<Trash2 size={16} />} />
    </div>
  </motion.div>
);

const EnlargedPhotoModal: React.FC<{
  photo: Photo | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onDownload: (photo: Photo) => void;
  onShare: (photo: Photo) => void;
  onDelete: (photo: Photo) => void;
}> = ({ photo, onClose, onPrev, onNext, onDownload, onShare, onDelete }) => {
  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50"
        onClick={onClose}
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="absolute top-4 right-4 text-white">
            <XCircle size={24} />
          </button>
          <button onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 text-white">
            <ChevronLeft size={48} />
          </button>
          <button onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 text-white">
            <ChevronRight size={48} />
          </button>
          <motion.img
            key={photo.key}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            src={photo.url}
            alt={`Gallery item ${photo.key}`}
            className="max-h-[80vh] max-w-full object-contain"
          />
          <div className="mt-4 flex space-x-4">
            <IconButton onClick={() => onDownload(photo)} icon={<Download size={20} />} className="bg-white text-black" />
            <IconButton onClick={() => onShare(photo)} icon={<Share2 size={20} />} className="bg-white text-black" />
            <IconButton onClick={() => onDelete(photo)} icon={<Trash2 size={20} />} className="bg-white text-black" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center h-screen">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="w-16 h-16 border-t-4 border-[#F79302] border-solid rounded-full"
    />
  </div>
);

const EmptyGallery: React.FC<{
  error: string | null;
  onStartGenerating: () => void;
  onRefresh: () => void;
}> = ({ error, onStartGenerating, onRefresh }) => (
  <div className="flex flex-col items-center justify-center h-screen bg-[#Ffffff] px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center max-w-md w-full"
    >
      <Camera className="mx-auto mb-4 text-gray-400" size={64} />
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-black" style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>No Images Found</h2>
      <p className="text-base sm:text-lg mb-6 text-gray-700" style={{ fontFamily: '"Font1", sans-serif' }}>
        {error
          ? "An error occurred while fetching your photos. Please try again."
          : "Start capturing moments and see your gallery come to life!"}
      </p>
      <div className="space-y-4">
        <Button onClick={onStartGenerating} className="w-full bg-[#F79302] text-black">
          Start Generating
        </Button>
        {error && (
          <Button onClick={onRefresh} className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300">
            Try Again
          </Button>
        )}
      </div>
    </motion.div>
  </div>
);

const Button: React.FC<{
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: React.ReactNode;
}> = ({ onClick, className = '', children }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center justify-center px-4 py-2 bg-[#F79302] text-black rounded-full transition-all duration-300 ${className}`}
    style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
  >
    {children}
  </motion.button>
);

const IconButton: React.FC<{
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  icon: React.ReactNode;
}> = ({ onClick, className = '', icon }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className={`p-2 rounded-full bg-[#F79302] text-black transition-all duration-300 ${className}`}
  >
    {icon}
  </motion.button>
);

export default PhotoGallery;