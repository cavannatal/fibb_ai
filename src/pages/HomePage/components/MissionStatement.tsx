import React from 'react';
import { motion } from 'framer-motion';

const MissionStatement = () => {
  return (
    <section className="py-12 bg-[#084248]">
      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row items-start justify-between">
          {/* Left column - Our Mission */}
          <div className="md:w-1/3 mb-8 md:mb-0 md:pt-6 sm:pt-8"> {/* Added padding top to align with right column content */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl font-bold text-white"
              style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
            >
              Our Mission
            </motion.h2>
          </div>
          
          {/* Right column - Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 md:pl-8"
          >
            <div className="rounded-lg p-6 sm:p-8">
              <p className="text-base sm:text-lg leading-relaxed mb-6 text-white" style={{ fontFamily: 'Font1, sans-serif' }}>
                Our mission is to pioneer the ethical frontier of artificial intelligence in visual media. We strive to create photorealistic images that honor human likeness while specializing in innovative product placement, aiming to revolutionize marketing strategies without compromising authenticity or consumer trust.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-white" style={{ fontFamily: 'Font1, sans-serif' }}>
                We are committed to transparency, consent, and responsible AI practices, ensuring that our 'Authentically Artificial' creations enhance human creativity rather than replace it. Our goal is to empower industries with cutting-edge AI technology while maintaining the highest standards of integrity and respect for individual privacy.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionStatement;