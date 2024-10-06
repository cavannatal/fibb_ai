import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Infinity, Shield } from 'lucide-react';

const features = [
  {
    title: 'SelfSync Technology',
    description: 'Experience seamless AI model training with our guided photo-taking process.',
    icon: Zap
  },
  {
    title: 'Infinite Possibilities',
    description: 'Place yourself anywhere, wearing anything, with photorealistic precision.',
    icon: Infinity
  },
  {
    title: 'Ethical & Transparent',
    description: 'Committed to responsible AI practices that respect your privacy.',
    icon: Shield
  }
];

const Features = () => {
  return (
    <section className="bg-[#024751] text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center" 
        style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>Unleash Your Creativity</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#02353d] p-6 rounded-lg"
            >
              <div className="text-5xl mb-24">
                {React.createElement(feature.icon, { size: 48, style: { color: '#F79302' } })}
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>{feature.title}</h3>
              <p className="text-gray-300 text-l" style={{ fontFamily: '"Font1", sans-serif' }}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;