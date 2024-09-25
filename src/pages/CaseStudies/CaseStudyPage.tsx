import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import images from the local 'images' folder
const img8 = require('./images/img8.PNG');
const img2 = require('./images/img2.PNG');
const img3 = require('./images/img3.PNG');
const img4 = require('./images/img4.PNG');
const img5 = require('./images/img5.PNG');
const img6 = require('./images/img6.PNG');



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
  <div className="rounded-lg overflow-hidden shadow-lg cursor-pointer" onClick={onClick}>
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-64 object-cover object-center" // Added object-center
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
        className="max-w-full max-h-full object-contain object-center" // Added object-center
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
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <AnimatedSection>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-600">
            Case Studies
          </h1>
        </AnimatedSection>
        
        <AnimatedSection>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-8">
            Discover how our product is transforming user experiences.
          </p>
        </AnimatedSection>
        
        <AnimatedSection>
          <div className="flex space-x-4">
            <button
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-blue-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              onClick={scrollToGallery}
            >
              Consumer Uses
            </button>
            <Link to="/business-case-study">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-purple-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105">
                Business Uses
              </button>
            </Link>
          </div>
        </AnimatedSection>
      </header>

      <section className="py-16 px-4">
  <AnimatedSection>
    <h2 className="text-3xl font-bold mb-8 text-center">
      Authentic Generation: Unparalleled Quality for Any Use
    </h2>
  </AnimatedSection>
  <AnimatedSection>
    <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-8 shadow-lg">
      <ul className="space-y-4 text-lg">
        <li className="flex items-start">
          <span className="text-blue-400 mr-2">•</span>
          <span><strong>Photorealistic Accuracy:</strong> Our AI generates images indistinguishable from high-quality photographs, perfect for professional presentations and marketing materials.</span>
        </li>

        <li className="flex items-start">
          <span className="text-blue-400 mr-2">•</span>
          <span><strong>Customizable Styles:</strong> Easily adjust lighting, textures, and atmospheres to match specific brand aesthetics or creative visions.</span>
        </li>
        <li className="flex items-start">
          <span className="text-blue-400 mr-2">•</span>
          <span><strong>Rapid Generation:</strong> Create high-quality, complex images in seconds, dramatically reducing production time and costs.</span>
        </li>
        <li className="flex items-start">
          <span className="text-blue-400 mr-2">•</span>
          <span><strong>Scalable Resolution:</strong> Generate images from thumbnail sizes to ultra-high resolution prints without losing quality.</span>
        </li>
        <li className="flex items-start">
          <span className="text-blue-400 mr-2">•</span>
          <span><strong>Consistent Quality:</strong> Maintain a high standard of realism across multiple generations, ensuring cohesive visual narratives.</span>
        </li>
        
        <li className="flex items-start">
          <span className="text-blue-400 mr-2">•</span>
          <span><strong>Ethical Considerations:</strong> Built-in safeguards ensure responsible image generation, adhering to ethical guidelines and copyright considerations.</span>
        </li>
      </ul>
      <div className="mt-8 text-center">
        <button
          onClick={scrollToGallery}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          View Gallery
        </button>
      </div>
    </div>
  </AnimatedSection>
</section>

      <section ref={galleryRef} className="py-16 px-4">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-8 text-center">Consumer Photo Gallery</h2>
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
            console.log("image Test")
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