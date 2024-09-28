import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Product Placement Images
import pp1 from '../bus_images/productplacement/pp_nike2.jpg';
import pp2 from '../bus_images/productplacement/pp_bar.png';
import pp3 from '../bus_images/productplacement/pp_bc.png';
import pp4 from '../bus_images/productplacement/pp_mc1.png';
import pp5 from '../bus_images/productplacement/pp_nike.png';
import pp6 from '../bus_images/productplacement/pp_northface.png';

interface ProductPlacementSectionProps {
  title: string;
  description: string;
  fullDescription: string;
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
    <section className="py-16 px-4">
      <AnimatedSection>
        <h2 className="text-3xl font-bold mb-8 text-center text-[#084248]">{title}</h2>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <PhotoCard
                key={index}
                src={image}
                alt={`Gallery ${index + 1}`}
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

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
    </section>
  );
};

const ProductPlacementSection: React.FC<ProductPlacementSectionProps> = ({ 
  title, 
  description, 
  fullDescription 
}) => {
  const galleryImages = [pp1, pp2, pp3, pp4, pp5, pp6];

  return (
    <section className="py-16 px-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
      <AnimatedSection>
        <h2 className="text-3xl font-bold mb-8 text-center text-[#084248]">
          {title}
        </h2>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-lg">
          <p className="text-lg mb-4 text-gray-600">{description}</p>
          <p className="text-lg mb-6 text-gray-600">{fullDescription}</p>
          
          <div className="bg-gray-100 rounded-2xl p-6 mb-6">
            <h3 className="text-2xl font-bold mb-4 flex items-center text-[#084248]">
              <TrendingUp className="mr-2 text-[#084248]" size={24} />
              How Product Placement Works with Our Solution
            </h3>
            <p className="text-lg mb-4 text-gray-600">
              Our innovative product placement solution seamlessly integrates your brand into various media contexts, making it easy to incorporate your product in any situation. Here's how it works:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg text-gray-600">
              <li>Our state-of-the-art model will seamlessly integrate your product in any scene you want</li>
              <li>Dynamic product rendering ensures natural integration into content</li>
              <li>Customizable placement strategies tailored to your brand's unique needs</li>
            </ul>
          </div>
        </div>
      </AnimatedSection>
      <PhotoGallery images={galleryImages} title="Product Placement Gallery" />
    </section>
  );
};

export default ProductPlacementSection;