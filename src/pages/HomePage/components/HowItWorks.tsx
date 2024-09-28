import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const steps = [
  'Follow the guided experience to capture your likeness in its entirety.',
  'Our advanced algorithms and AI models learn and adapt to your every detail.',
  'Provide a prompt to generate an authentically artifical image without compromising quality.',
  'Enjoy your polished and photorealistic photos!'
];


const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">How It Works</h2>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg"
            >
              <Star className="flex-shrink-0 w-6 h-6 text-orange-400" />
              <span className="text-sm sm:text-base text-gray-700">{step}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;