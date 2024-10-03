import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { uniqueId } from 'lodash';
import { getCurrentTimeStamp } from '../../utils';
import { getCurrentUser } from 'aws-amplify/auth';

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

  const handleReadyClick = async () => {
    const { userId } = await getCurrentUser();
    navigate('/photo-capture', { state: {startingTimestamp: getCurrentTimeStamp(), sub: userId} });
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 py-16 px-4 sm:px-6 lg:px-8" style={{ fontFamily: 'Nunito, sans-serif' }}>
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold mb-8 text-center text-[#084248]"
        >
          Photo Collection Process
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-100 rounded-2xl shadow-lg p-6 sm:p-8 mb-8"
        >
          <h3 className="text-xl font-semibold mb-4 text-[#084248]">
            Follow these steps to submit your photos:
          </h3>
          <ol className="list-decimal list-inside space-y-2">
            {steps.map((step, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="text-lg text-gray-600"
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
            className="px-9 py-4 bg-[#084248] text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105"
          >
            Are you ready to go?
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PhotoCollectionIntroPage;