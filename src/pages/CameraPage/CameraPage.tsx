import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PhotoCollectionIntroPage: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    "Enter our photo collection portal",
    "Review and accept our photo submission guidelines",
    "Upload your photos using our secure uploader",
    "Add relevant tags and descriptions to your photos",
    "Submit your photos for review",
    "Receive confirmation of your submission"
  ];

  const handleReadyClick = () => {
    navigate('/photo-capture');
  };

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
          Photo Collection Process
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-800 bg-opacity-50 rounded-lg shadow-xl p-6 sm:p-8 mb-8"
        >
          <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Follow these steps to submit your photos:
          </h3>
          <ol className="list-decimal list-inside space-y-2">
            {steps.map((step, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="text-lg"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                {step}
              </motion.li>
            ))}
          </ol>
        </motion.div>
        
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center"
      >
        <button
          onClick={handleReadyClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
          style={{ fontFamily: 'Nunito, sans-serif' }}
        >
          Are you ready to go?
        </button>
      </motion.div>
      </div>
    </div>
  );
};

export default PhotoCollectionIntroPage;