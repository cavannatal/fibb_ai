import React, { useContext, useEffect, useState } from 'react';
import awsconfig from '../../aws-exports'; 
import { Amplify } from 'aws-amplify'; // No Auth import here
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CognitoContext } from '../../auth/CognitoProviderWithNavigate'; 

Amplify.configure(awsconfig);

const CreatePage: React.FC = () => {
  const { isAuthenticated } = useContext(CognitoContext); // Get auth status from Cognito context
  const navigate = useNavigate();

  const handleButtonClick1 = () => {
      navigate("/cam");
  };

  const handleButtonClick2 = () => {
      navigate("/image-gen");
  };

  return (
    <header className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <motion.button
        initial={{ opacity: 0 ,y: 0 }}
        animate={{ opacity: 1, y: 10 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="px-9 py-4 bg-[#084248] text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105"
        onClick={handleButtonClick1}
      >
        Add a new subject
      </motion.button>

      <motion.button
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 10 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="px-9 py-4 bg-[#084248] text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105"
        onClick={handleButtonClick2}
      >
        Generate Images
      </motion.button>
    </header>
  );
};

export default CreatePage;