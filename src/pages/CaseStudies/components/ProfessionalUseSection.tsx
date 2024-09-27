import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

interface ProfessionalUseSectionProps {
  title: string;
  description: string;
  fullDescription: string;
  userProfiles: UserProfile[];
}

interface UserProfile {
  name: string;
  description: string;
  mainImage: string;
  galleryImages: string[];
}

const AnimatedSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    {children}
  </motion.div>
);

interface PhotoCardProps {
  src: string;
  alt: string;
  onClick: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ src, alt, onClick }) => (
  <motion.div
    className="aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
    />
  </motion.div>
);

const PhotoGallery: React.FC<{ images: string[], title: string }> = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  const goToPrevious = () => setSelectedImage(prev => (prev !== null && prev > 0) ? prev - 1 : images.length - 1);
  const goToNext = () => setSelectedImage(prev => (prev !== null && prev < images.length - 1) ? prev + 1 : 0);

  return (
    <div className="py-8">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <PhotoCard
            key={index}
            src={image}
            alt={`Gallery ${index + 1}`}
            onClick={() => openLightbox(index)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-5xl max-h-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={images[selectedImage]} 
                alt="Full size" 
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" 
              />
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200"
                onClick={closeLightbox}
              >
                <X size={32} />
              </button>
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200"
                onClick={goToPrevious}
              >
                <ChevronLeft size={48} />
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200"
                onClick={goToNext}
              >
                <ChevronRight size={48} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const UserProfileSection: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-600 rounded-lg p-6 mb-6">
      <div 
        className="flex justify-between items-center cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-2xl font-bold">{profile.name}</h3>
        {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg my-4">{profile.description}</p>
            <div className="w-64 h-86 mx-auto overflow-hidden rounded-lg mb-4">
              <img 
                src={profile.mainImage} 
                alt={`${profile.name}'s main`} 
                className="w-full h-full object-cover"
              />
            </div>
            <PhotoGallery images={profile.galleryImages} title={`${profile.name}'s Authentically Artificial Gallery`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProfessionalUseSection: React.FC<ProfessionalUseSectionProps> = ({ 
  title, 
  description, 
  fullDescription,
  userProfiles
}) => {
  return (
    <section className="py-16 px-4 bg-gray-800">
      <AnimatedSection>
        <h2 className="text-3xl font-bold mb-8 text-center">
          {title}
        </h2>
        <div className="max-w-4xl mx-auto bg-gray-700 rounded-lg p-6 shadow-lg">
          <p className="text-lg mb-4">{description}</p>
          <p className="text-lg mb-6">{fullDescription}</p>
          
          

          {userProfiles.map((profile, index) => (
            <UserProfileSection key={index} profile={profile} />
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
};

export default ProfessionalUseSection;