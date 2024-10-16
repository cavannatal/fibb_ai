import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';

import himg1 from './header_images/himg1.webp';
import himg2 from './header_images/himg2.webp';
import himg3 from './header_images/himg3.webp';
import himg4 from './header_images/himg4.webp';
import himg5 from './header_images/himg5.webp';
import himg6 from './header_images/himg6.webp';
import himg9 from './header_images/himg9.webp';

import circle from './header_images/home_shape_1.webp';
import square from './header_images/home_shape_11.webp';
import lemonleft from './header_images/home_shape_7.webp';
import lemonright from './header_images/home_shape_5.webp';

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
    { src: circle, link: '/circle' },
    { src: himg9, link: '/image9' },
    { src: himg5, link: '/image5' },
    { src: himg4, link: '/image4' },
    { src: lemonright, link: '/lemon-right' },
    { src: circle, link: '/circle-2' },
    { src: lemonleft, link: '/lemon-left' },
    { src: himg2, link: '/image2' },
    { src: himg3, link: '/image3' },
    { src: himg1, link: '/image1' },
    { src: square, link: '/square' },
    { src: himg6, link: '/image6' },
  ];

  return (
    <header className="min-h-screen flex flex-col justify-start pt-8 lg:pt-2 px-4 bg-[#F5F5F5]">
      <div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-5/12 text-left mb-12 lg:mb-0 lg:self-center md:pl-8 lg:pl-4 xl:pl-8 2xl:pl-16"
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
            Get Started
          </motion.button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="lg:w-7/12 lg:flex lg:items-center lg:justify-end"
        >
          <div className="grid grid-cols-3 gap-1 max-w-xl w-full">
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