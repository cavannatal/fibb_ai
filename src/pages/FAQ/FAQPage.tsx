import React from 'react';
import { motion } from 'framer-motion';
import FAQComponent from './FAQComponent';
import fibbLogo from '../../components/images/FibbLogoWhite.svg';

const FAQPage: React.FC = () => {
  const faqs = [
    { 
      question: "What is fibb.ai?", 
      answer: "fibb.ai is a cutting-edge AI platform that specializes in image transformation and enhancement using advanced artificial intelligence algorithms."
    },
    { 
      question: "How does fibb.ai work?", 
      answer: "fibb.ai uses state-of-the-art machine learning models to analyze and process images, allowing for various transformations and improvements based on user inputs and preferences."
    },
    { 
      question: "Is fibb.ai free to use?", 
      answer: "fibb.ai offers both free and premium tiers. Basic features are available for free, while advanced capabilities and higher usage limits are part of our premium plans."
    },
    { 
      question: "Can I use fibb.ai for commercial purposes?", 
      answer: "Yes, fibb.ai can be used for commercial purposes under our premium plans. Please refer to our terms of service for specific details on commercial usage."
    },
    { 
      question: "How do I get started with fibb.ai?", 
      answer: "To get started, simply sign up for an account on our website, verify your email, and you can begin using our AI tools right away. We also offer tutorials and documentation to help you make the most of our platform."
    }
  ];

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
          Frequently Asked Questions
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          <FAQComponent faqs={faqs} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-xl mt-12"
          style={{ fontFamily: '"Font1", sans-serif' }}
        >
          Can't find what you're looking for? Contact our support team for further assistance, support@fibb.ai
        </motion.p>
      </main>
    </div>
  );
};

export default FAQPage;