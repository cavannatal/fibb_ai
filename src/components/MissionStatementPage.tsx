import React from 'react';
import { motion } from 'framer-motion';

const MissionStatementPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-600"
          style={{ fontFamily: 'Nunito, sans-serif' }}
        >
          Our Mission
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-800 bg-opacity-50 rounded-lg shadow-xl p-6 sm:p-8 mb-8"
        >
          <p className="text-lg leading-relaxed mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Our mission is to pioneer the ethical frontier of artificial intelligence in visual media. We strive to create photorealistic images that honor human likeness while specializing in innovative product placement, aiming to revolutionize marketing strategies without compromising authenticity or consumer trust.
          </p>
          <p className="text-lg leading-relaxed mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
            We are committed to transparency, consent, and responsible AI practices, ensuring that our 'Authentically Artificial' creations enhance human creativity rather than replace it. Our goal is to empower industries with cutting-edge AI technology while maintaining the highest standards of integrity and respect for individual privacy.
          </p>
        </motion.div>
        
        
      </div>
    </div>
  );
};

export default MissionStatementPage;