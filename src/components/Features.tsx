import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Artistic Styles',
    description: 'Generate unique images in various artistic styles with just a few clicks.',
    icon: '🎨'
  },
  {
    title: 'Photo Realism',
    description: 'Create hyper-realistic images that blur the line between AI and reality.',
    icon: '📸'
  },
  {
    title: 'Abstract Concepts',
    description: 'Bring abstract ideas to life with our advanced AI interpretation.',
    icon: '💡'
  }
];

const Features: React.FC = () => {
  return (
    <section>
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Unleash Your Creativity</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
