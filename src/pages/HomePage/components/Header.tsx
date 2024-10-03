import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, signOut } from 'aws-amplify/auth';

const Header: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      await getCurrentUser();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const handleButtonClick = () => {
    if (isAuthenticated) {
      navigate("/get-started");
    } else {
      window.location.href = '/signup';
    }
  };

  return (
    <header className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
        style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
      >
        Artificially Authentic Media
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-lg sm:text-xl max-w-2xl mb-8"
        style={{ fontFamily: '"Font1", sans-serif' }}
      >
        Total Customization, Total You – Build Photos Exactly How You Want
      </motion.p>
      
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="px-9 py-4 bg-[#084248] text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105"
        onClick={handleButtonClick}
        style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
      >
        Get Started
      </motion.button>
    </header>
  );
};

export default Header;