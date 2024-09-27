import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import your business-related images here
import img1 from './images/img1.png';
import img2 from './images/img2.png';
import img3 from './images/img3.png';
import img4 from './images/img4.png';
import img5 from './images/img5.png';
import img6 from './images/img6.png';

interface BusinessPhoto {
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

const BusinessPhotoCard: React.FC<BusinessPhoto & { onClick: () => void }> = ({ src, alt, onClick }) => (
  <div className="rounded-lg overflow-hidden shadow-lg cursor-pointer" onClick={onClick}>
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

const BusinessCaseStudyPage: React.FC = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<BusinessPhoto | null>(null);

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const businessPhotos: BusinessPhoto[] = [
    { src: img1, alt: "Business use case photo 1" },
    { src: img2, alt: "Business use case photo 2" },
    { src: img3, alt: "Business use case photo 3" },
    { src: img4, alt: "Business use case photo 4" },
    { src: img5, alt: "Business use case photo 5" },
    { src: img6, alt: "Business use case photo 6" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="h-[48vh] flex flex-col items-center justify-center text-center px-4">
        <AnimatedSection>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Business Case Studies
          </h1>
        </AnimatedSection>
        
        <AnimatedSection>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-8">
            Discover how our product is transforming business operations and strategies.
          </p>
        </AnimatedSection>
        
        <AnimatedSection>
          <div className="flex space-x-4">
            <button
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
              onClick={scrollToGallery}
            >
              Business Uses
            </button>
            <Link to="/consumer-case-study">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                Consumer Uses
              </button>
            </Link>
          </div>
        </AnimatedSection>
      </header>

      <section className="py-16 px-4">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-8 text-center">
            AI-Powered Business Solutions: Transforming Industries
          </h2>
        </AnimatedSection>
        <AnimatedSection>
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-8 shadow-lg">
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span><strong>Data-Driven Decision Making:</strong> Our AI analyzes vast datasets to provide actionable insights, empowering businesses to make informed strategic decisions.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span><strong>Automated Workflows:</strong> Streamline operations and increase efficiency with AI-powered automation of repetitive tasks.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span><strong>Predictive Analytics:</strong> Forecast market trends and customer behavior to stay ahead of the competition.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span><strong>Enhanced Customer Experience:</strong> Personalize interactions and improve customer satisfaction with AI-driven insights.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span><strong>Risk Management:</strong> Identify and mitigate potential risks before they impact your business.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span><strong>Scalable Solutions:</strong> Our AI grows with your business, providing consistent performance from startups to enterprises.</span>
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
          <h2 className="text-3xl font-bold mb-8 text-center">Business Use Case Gallery</h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessPhotos.map((photo, index) => (
                <BusinessPhotoCard 
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

export default BusinessCaseStudyPage;