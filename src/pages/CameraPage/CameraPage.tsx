import React from 'react';
import { motion } from 'framer-motion';
import fibbLogo from '../../components/images/FibbLogoWhite.svg';
import { useNavigate } from 'react-router-dom';

const PhotoCollectionIntroPage: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/photo-capture');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#093f48] to-[#004948] text-white">
      <header className="flex justify-center p-4">
        <img src={fibbLogo} alt="fibb.ai" className="h-8 sm:h-12 mt-4 sm:mt-6 mb-2 sm:mb-4" />
      </header>
      <main className="flex flex-col items-center flex-grow p-4 sm:p-6 pb-16 sm:pb-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-16 mt-8 sm:mt-16 text-center"
          style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
        >
          Ready to create your <span className="text-[#cbf59a]">fibb</span>?
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl sm:text-3xl font-semibold mb-8 sm:mb-16 text-center"
          style={{ fontFamily: '"Sofia Pro", sans-serif' }}
        >
          Here's how it works.
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 w-full max-w-5xl mb-8 sm:mb-16">
          {[
            { title: "Prep", content: "Find a few places in your area where you can take photos. A tripod or something to set your phone on will be helpful." },
            { title: "Guided Photo Experience", content: "Follow our guided photo experience. Sample images and instructions for each shot will appear." },
            { title: "Submit", content: "Submit your photos and grab a beer or a cup of coffee while our top-of-line computers get to work." }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 10 }}
              transition={{ duration: 0.2 + index * 0.1, delay: 0.6 }}
              className="flex-1 bg-[#144a53] p-6 sm:p-8 rounded-lg hover:bg-[#285a62] transition-all duration-300 transform hover:scale-105 h-auto sm:h-80 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-16"
                style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                >{step.title}</h2>
                <p className="text-base sm:text-lg"
                style={{ fontFamily: '"Font1", sans-serif' }}
                >
                  {step.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="bg-[#f79302] text-black font-bold py-3 px-8 rounded-lg text-xl hover:bg-[#f79600] transition-all duration-300 transform hover:scale-105"
          style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
          onClick={handleContinue}
        >
          Continue
        </motion.button>
      </main>
    </div>
  );
};

export default PhotoCollectionIntroPage;