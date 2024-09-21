import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  'Take a Photo of yourself',
  'Prompt the system by uploading your photo.',
  'Our AI model will enhance your image to ensure a professional look without compromising quality.',
  'Enjoy your polished and professional-looking photos!'
];

const HowItWorks: React.FC = () => {
  return (
    <section>
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">How It Works</h2>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center space-x-4 bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg shadow-lg"
          >
            <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-sm">{index + 1}</span>
            <span className="text-sm sm:text-base">{step}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;