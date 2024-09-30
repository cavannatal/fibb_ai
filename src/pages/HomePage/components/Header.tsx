import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CognitoContext } from '../../../auth/CognitoProviderWithNavigate'; // Import Cognito context

// Add user gallery

const Header: React.FC = () => {
  const { isAuthenticated } = useContext(CognitoContext); // Get auth status from Cognito context
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isAuthenticated) {
      // Navigate to the creation page if authenticated
      navigate("/cam");
    } else {
      // Redirect to login if not authenticated
      window.location.href = '/signup'; // Assuming you have a login route
    }
  };

  return (
    <header className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 "
        style={{ fontFamily: 'Nunito, sans-serif' }}
      >
        Authentically Artificial
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-lg sm:text-xl max-w-2xl mb-8"
        style={{ fontFamily: 'Nunito, sans-serif' }}
      >
        Transform your images into limitless possibilities without compromising authenticity or trust.
      </motion.p>
      
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="px-9 py-4 bg-[#084248] text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105"
        onClick={handleButtonClick}
      >
        Get Started
      </motion.button>
    </header>
  );
};

export default Header;
