import React from 'react';
import { motion } from 'framer-motion';
import IosApp from '../images/iosDisplay.webp';

const IOSDisplay: React.FC = () => {
  return (
    <section className="py-8 sm:py-16 bg-[#F5F5F5]">
      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left column - Title and Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-[#004948]" style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>
              Experience Fibb on iOS
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 mb-4 sm:mb-8" style={{ fontFamily: '"Font1", sans-serif' }}>
              Create stunning, personalized images right from your iPhone. Our intuitive iOS app brings the power of Fibb to your fingertips.
            </p>
            <p className="text-lg sm:text-xl text-gray-700" style={{ fontFamily: '"Font1", sans-serif' }}>
              Coming November 2024
            </p>
          </motion.div>
          
          {/* Right column - App Screenshot */}
          <div className="md:w-1/2 relative flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-[200px] sm:w-[250px] md:w-[300px] h-[400px] sm:h-[500px] md:h-[600px]"
            >
              <img 
                src={IosApp} 
                alt="Fibb.ai App Screenshot" 
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IOSDisplay;