import React from 'react';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isAuthenticated) {
      // Navigate to the creation page if authenticated
      navigate("/cam");
    } else {
      // Redirect to login if not authenticated
      loginWithRedirect();
    }
  };

  return (
    <header className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-600"
        style={{ fontFamily: 'Nunito, sans-serif' }}
      >
        Welcome to fibb.ai
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-8"
        style={{ fontFamily: 'Nunito, sans-serif' }}
      >
        Transform your imagination with our proprietary cutting edge likeness technology.
      </motion.p>
      
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="px-6 py-3 bg-gradient-to-r from-red-500 to-blue-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
        onClick={handleButtonClick}
      >
        Start Creating
      </motion.button>
    </header>
  );
};

export default Header;