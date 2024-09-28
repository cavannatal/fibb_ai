import React from 'react';
import { motion } from 'framer-motion';

const MissionStatement = () => {
  return (
    <section className="px-4 sm:px-6 py-2"> {/* Added horizontal padding */}
      <div className="max-w-3xl mx-auto"> {/* Reduced max-width for better content width control */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold mb-8 text-center"
          style={{ fontFamily: 'Nunito, sans-serif' }}
        >
          Our Mission
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#bddde2] bg-opacity-50 rounded-lg shadow-xl p-6 sm:p-8 mb-8"
        >
          <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Our mission is to pioneer the ethical frontier of artificial intelligence in visual media. We strive to create photorealistic images that honor human likeness while specializing in innovative product placement, aiming to revolutionize marketing strategies without compromising authenticity or consumer trust.
          </p>
          <p className="text-base sm:text-lg leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
            We are committed to transparency, consent, and responsible AI practices, ensuring that our 'Authentically Artificial' creations enhance human creativity rather than replace it. Our goal is to empower industries with cutting-edge AI technology while maintaining the highest standards of integrity and respect for individual privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionStatement;