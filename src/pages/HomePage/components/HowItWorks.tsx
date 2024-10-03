import React from 'react';
import { motion } from 'framer-motion';
import fibbIcon from '../fibbIconBlack.svg'; // Import your Fibb icon

const steps = [
  {
    title: "Step 1: Sign Up & SelfSync",
    description: "Create an account and sync your likeness with our guided photoshoot."
  },
  {
    title: "Step 2: Customize & Create",
    description: "Choose settings, outfits, and backgrounds to generate your images."
  },
  {
    title: "Step 3: Share & Utilize",
    description: "Download your images for personal or professional use."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center" style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>How It Works</h2>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start space-x-4 bg-gray-100 p-4 rounded-lg"
            >
              <img src={fibbIcon} alt="Fibb Icon" className="flex-shrink-0 w-6 h-6 mt-1" />
              <div>
                <h3 className="text-[#004948] font-bold mb-1" style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>{step.title}</h3>
                <span className="text-l sm:text-base text-gray-700" style={{ fontFamily: '"Font1", sans-serif' }}>{step.description}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;