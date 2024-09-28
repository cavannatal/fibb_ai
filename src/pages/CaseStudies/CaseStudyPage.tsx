import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

import img2 from './images/img2.png';
import img3 from './images/img3.png';
import img4 from './images/img4.png';
import img5 from './images/img5.png';
import img6 from './images/img6.png';
import img8 from './images/img8.png';

interface ProductPhoto {
  src: string;
  alt: string;
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

const ProductPhotoCard: React.FC<ProductPhoto & { onClick: () => void }> = ({ src, alt, onClick }) => (
  <div className="rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300" onClick={onClick}>
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-64 object-cover object-center"
    />
  </div>
);

const Modal: React.FC<{ src: string; alt: string; onClose: () => void }> = ({ src, alt, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    onClick={onClose}
  >
    <div className="max-w-4xl max-h-[90vh] overflow-auto">
      <img 
        src={src} 
        alt={alt} 
        className="max-w-full max-h-full object-contain object-center"
      />
    </div>
  </motion.div>
);

const CaseStudyPage: React.FC = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<ProductPhoto | null>(null);

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const productPhotos: ProductPhoto[] = [
    { src: img8, alt: "Consumer product photo 1" },
    { src: img2, alt: "Consumer product photo 2" },
    { src: img3, alt: "Consumer product photo 3" },
    { src: img4, alt: "Consumer product photo 4" },
    { src: img5, alt: "Consumer product photo 5" },
    { src: img6, alt: "Consumer product photo 6" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800" style={{ fontFamily: 'Nunito, sans-serif' }}>
      <header className="h-[48vh] flex flex-col items-center justify-center text-center px-4">
        <AnimatedSection>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-[#084248]">
            Case Studies
          </h1>
        </AnimatedSection>
        
        <AnimatedSection>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-8">
            Discover how our product is transforming user experiences.
          </p>
        </AnimatedSection>
        
        <AnimatedSection>
          <div className="flex space-x-4">
            <button
              className="px-9 py-4 bg-[#084248] text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105"
              onClick={scrollToGallery}
            >
              Consumer Uses
            </button>
            <Link to="/business-case-study">
              <button className="px-9 py-4 bg-[#084248] text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105">
                Business Uses
              </button>
            </Link>
          </div>
        </AnimatedSection>
      </header>

      <section className="py-12 px-4">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-8 text-center text-[#084248]">
            Authentic Generation: Unparalleled Quality for Any Use
          </h2>
        </AnimatedSection>
        <AnimatedSection>
          <div className="max-w-4xl mx-auto bg-gray-100 rounded-2xl p-8 shadow-lg">
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <span className="text-[#084248] mr-2">•</span>
                <span><strong>Photorealistic Accuracy:</strong> Our AI generates images indistinguishable from high-quality photographs, perfect for professional presentations and marketing materials.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#084248] mr-2">•</span>
                <span><strong>Customizable Styles:</strong> Easily adjust lighting, textures, and atmospheres to match specific brand aesthetics or creative visions.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#084248] mr-2">•</span>
                <span><strong>Rapid Generation:</strong> Create high-quality, complex images in seconds, dramatically reducing production time and costs.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#084248] mr-2">•</span>
                <span><strong>Scalable Resolution:</strong> Generate images from thumbnail sizes to ultra-high resolution prints without losing quality.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#084248] mr-2">•</span>
                <span><strong>Consistent Quality:</strong> Maintain a high standard of realism across multiple generations, ensuring cohesive visual narratives.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#084248] mr-2">•</span>
                <span><strong>Ethical Considerations:</strong> Built-in safeguards ensure responsible image generation, adhering to ethical guidelines and copyright considerations.</span>
              </li>
            </ul>
            <div className="mt-8 text-center">
              <button
                onClick={scrollToGallery}
                className="px-9 py-4 bg-[#084248] text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105"
              >
                View Gallery
              </button>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section ref={galleryRef} className="py-16 px-4">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-8 text-center text-[#084248]">Consumer Photo Gallery</h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productPhotos.map((photo, index) => (
                <ProductPhotoCard 
                  key={index} 
                  {...photo} 
                  onClick={() => setSelectedPhoto(photo)}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      <AnimatePresence>
        {selectedPhoto && (
          <Modal 
            src={selectedPhoto.src} 
            alt={selectedPhoto.alt} 
            onClose={() => setSelectedPhoto(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CaseStudyPage;