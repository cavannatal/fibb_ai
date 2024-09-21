import React from 'react';
import FAQComponent from './FAQComponent';
import { motion } from 'framer-motion';

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
    <div className="container mx-auto px-4 py-8">
      <motion.h2 
          className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h2>
      <FAQComponent faqs={faqs} />
    </div>
  );
};

export default FAQPage;