import React from 'react';
import { motion } from 'framer-motion';
import fibbLogo from '../../components/images/FibbLogoWhite.svg';

const ComputePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#093f48] to-[#004948] text-white">
      <header className="flex justify-center p-4">
        <img src={fibbLogo} alt="fibb.ai" className="h-8 sm:h-12 mt-4 sm:mt-6 mb-2 sm:mb-4" />
      </header>
      <main className="flex flex-col items-start px-4 sm:px-6 pb-16 sm:pb-6 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl sm:text-7xl font-bold mb-8 sm:mb-16 mt-8 sm:mt-16"
          style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
        >
          <div>Others wait hours,</div>
          <div className="text-[#cbf59a]">we deliver in minutes.</div>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl sm:text-5xl font-semibold mb-8 mt-12 sm:mb-16"
          style={{ fontFamily: '"Sofia Pro", sans-serif' }}
        >
          Introducing fibbCompute,
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl sm:text-5xl font-semibold mb-8 sm:mb-16"
          style={{ fontFamily: '"Sofia Pro", sans-serif' }}
        >
          Coming in 2025.
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 w-full mt-32 mb-8 sm:mb-16">
          {[
            { title: "Fastest Training", content: "Nearly 10x faster than our closest competitor. Train to 3200+ steps in as low as 7 minutes and 24 seconds." },
            { title: "Custom Control", content: "Access to more thorough training and advanced control over model training and output." },
            { title: "Monetization", content: "Monetize your quality data set and bring in revenue on our marketplace." }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 10 }}
              transition={{ duration: 0.2 + index * 0.1, delay: 0.6 }}
              className="flex-1 bg-[#144a53] p-6 sm:p-8 rounded-lg hover:bg-[#285a62] transition-all duration-300 transform hover:scale-105 h-auto sm:h-80 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#cbf59a] sm:mb-16"
                style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                >{step.title}</h2>
                <p className="text-base sm:text-xl"
                style={{ fontFamily: '"Font1", sans-serif' }}
                >
                  {step.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ComputePage;