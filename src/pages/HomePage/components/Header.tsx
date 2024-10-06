import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';

import himg1 from './header_images/himg1.png';
import himg2 from './header_images/himg2.png';
import himg3 from './header_images/himg3.png';
import himg4 from './header_images/himg4.png';
import himg5 from './header_images/himg5.png';
import himg6 from './header_images/himg6.png';
import himg9 from './header_images/himg9.png';

import circle from './header_images/home_shape_1.png';
import square from './header_images/home_shape_11.png';
import lemonleft from './header_images/home_shape_7.png';
import lemonright from './header_images/home_shape_5.png';

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

  const galleryItems = [
    { src: circle }, { src: himg9 }, { src: himg5 },
    { src: himg4 }, { src: lemonright }, { src: circle },
    { src: lemonleft }, { src: himg2 }, { src: himg3 },
    { src: himg1 }, { src: square }, { src: himg6 },
  ];

  return (
    <header className="min-h-screen flex flex-col justify-start pt-8 lg:pt-2 px-4 bg-[#F5F5F5]">
      <div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-5/12 text-left mb-12 lg:mb-0 lg:self-center"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-black leading-tight"
              style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>
            Artificially<br />Authentic
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl mb-10 text-gray-700 leading-relaxed"
             style={{ fontFamily: '"Font1", sans-serif' }}>
            World-class image generation of you or your product without compromising authenticity or trust.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[#F79302] text-black text-lg font-semibold rounded-full transition-all duration-300"
            onClick={handleButtonClick}
            style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
          >
            Get Started!!
          </motion.button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="lg:w-7/12 lg:flex lg:items-center lg:justify-end"
        >
          <div className="grid grid-cols-3 gap-3 max-w-xl w-full">
            {galleryItems.map((item, index) => (
              <motion.div
                key={index}
                className="aspect-square"
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ duration: 0.3 }}
              >
                <img src={item.src} alt={`Gallery item ${index + 1}`} className="w-full h-full object-cover " />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;