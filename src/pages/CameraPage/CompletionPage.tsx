import React from 'react';
import { motion } from 'framer-motion';
import fibbLogo from '../../components/images/FibbLogoWhite.svg';
import dogsinlab from './images/dogsInLab.jpg'

const CompletionPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#093f48] to-[#004948] text-white">
      <header className="flex justify-center p-4">
        <img src={fibbLogo} alt="fibb.ai" className="h-8 sm:h-12 mt-4 sm:mt-6 mb-2 sm:mb-4" />
      </header>
      <main className="flex flex-col items-center px-4 sm:px-6 pb-16 sm:pb-6 max-w-3xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-16 mt-8 sm:mt-16 text-center text-[#cbf59a]"
          style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
        >
          Guided Process Complete
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-3xl sm:text-2xl mb-12 text-center"
          style={{ fontFamily: '"Font1", sans-serif' }}
        >
          <p className="mb-6">
          Thanks for submitting your photos, our data scientists are hard at working bringing it to life! We will email you again when your Fibb is ready!
          </p>

        </motion.div>

        <motion.img
          src={dogsinlab}
          alt="Completion celebration"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 sm:mb-12 rounded-lg shadow-lg"
        />
        

      </main>
    </div>
  );
};

export default CompletionPage;