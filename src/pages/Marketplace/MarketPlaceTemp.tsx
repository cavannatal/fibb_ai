import React from 'react';
import { motion } from 'framer-motion';
import fibbLogo from '../../components/images/FibbLogoWhite.svg';
import marketimg from './marketplacehome.png'

const MarketComingSoon: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#084248]">
      <main className="flex flex-col items-center px-4 sm:px-6 pb-16 sm:pb-6 max-w-5xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl sm:text-7xl font-bold mb-8 sm:mb-16 mt-8 sm:mt-16 text-center"
          style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
        >
          Marketplace
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl sm:text-5xl font-semibold mb-8 text-center text-[#cbf59a]"
          style={{ fontFamily: '"Sofia Pro", sans-serif' }}
        >
          Coming Soon in November 2024
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-4xl mx-auto mb-12"
        >
          <p className="text-lg sm:text-xl mb-8 text-center"
             style={{ fontFamily: '"Font1", sans-serif' }}>
            Welcome to fibb.ai Marketplace - your one-stop shop for all A.I. needs. Our platform offers a vibrant ecosystem where AI developers, businesses, and enthusiasts converge. Discover a wide array of cutting-edge AI models, datasets, and tools, fostering collaboration and driving innovation in the AI community. Get ready to explore, create, and innovate with the most comprehensive AI marketplace in the industry.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg overflow-hidden shadow-xl">
            <img 
              src= {marketimg} 
              alt="fibb.ai Marketplace Preview" 
              className="w-full h-auto"
            />
            
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default MarketComingSoon;