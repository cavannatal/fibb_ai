import React from 'react';
import { motion } from 'framer-motion';
import fibbIcon from '../fibbIconBlack.svg';

const steps = [
  {
    title: "Step 1: Upload your Photos",
    description: "Create an account and get ready to use our patented SelfSync technology, follow our guided photoshoot and train your AI."
  },
  {
    title: "Step 2: Customize & Create",
    description: "If you can think it, you can generate it. Put yourself anywhere in the world."
  },
  {
    title: "Step 3: Download & Use",
    description: "Download your photos for social media, a new LinkedIn headshot, to send to friends, or product marketing for your business."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-1">
      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row items-start justify-between">
          {/* Left column - How it Works */}
          <div className="md:w-1/3 mb-8 md:mb-0">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#004948]" style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>How It Works</h2>
            <p className="text-gray-700" style={{ fontFamily: '"Font1", sans-serif' }}>
              Our simple three-step process makes it easy for you to create stunning, personalized images. Follow along to see how Fibb transforms your ideas into reality.
            </p>
          </div>
          
          {/* Right column - Steps */}
          <div className="md:w-1/2 md:pl-8">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm"
                >
                  
                  <div>
                    <h3 className="text-[#F79302] text-lg font-bold mb-1" style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>{step.title}</h3>
                    <span className="text-base text-gray-700" style={{ fontFamily: '"Font1", sans-serif' }}>{step.description}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
