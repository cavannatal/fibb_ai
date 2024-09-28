import React from 'react';
import { motion } from 'framer-motion';
import { Hexagon } from 'lucide-react';

const features = [
  {
    title: 'Authentically Artifical',
    description: 'Bring abstract ideas to life with our advanced AI interpretation.',
    icon: '💡'
  },
  {
    title: 'Photo Realism',
    description: 'Create hyper-realistic images that blur the line between AI and reality.',
    icon: '📸'
  },
  {
    title: 'Artistic Styles',
    description: 'Generate unique images in various artistic styles with just a few clicks.',
    icon: '🎨'
  }
];

const Features = () => {
  return (
    <section className="bg-[#024751] text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Unleash Your Creativity</h2>
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
              <Hexagon className="w-12 h-12 mb-4 text-white" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;