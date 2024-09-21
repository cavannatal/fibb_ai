import React from 'react';
import { motion } from 'framer-motion';
import matt from "../images/matt.jpg"
import nick from "../images/nick.jpg"

const topTeamMembers = [
  { 
    name: "Matt Yee", 
    role: "Co-founder and CTO", 
    description: "Leading our technological innovations",
    imageUrl: matt,
    imageStyle: "object-cover object-center scale-150" // Zoomed in
  },
  { 
    name: "Nick Friesen", 
    role: "Co-founder", 
    description: "Steering our company vision",
    imageUrl: nick,
    imageStyle: "object-cover object-center scale-100" 
  }
];

const bottomTeamMembers = [
  { 
    name: "Mike Thompson", 
    role: "Lead Software Engineer", 
    description: "Architecting our AI systems"
  },
  { 
    name: "Santiago Milano", 
    role: "Artificial Intelligence Researcher", 
    description: "Pushing the boundaries of what's possible"
  },
  { 
    name: "Cavan Natal", 
    role: "Software Engineer", 
    description: "Crafting our cutting-edge solutions"
  },
];

const AboutUs: React.FC = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Team & Mission
        </motion.h2>
        
        <motion.p 
          className="text-lg mb-12 text-gray-300 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          We are dreamers, thinkers, and tinkerers at the forefront of ethical AI in visual media. Our team is driven by a passion for innovation and a commitment to responsible technology. We're the minds behind "Authentically Artificial," pioneering photorealistic image creation and revolutionary product placement that respects human likeness and privacy.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {topTeamMembers.map((member, index) => (
            <motion.div 
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-48 h-48 mb-4 overflow-hidden rounded-full">
                <img 
                  src={member.imageUrl} 
                  alt={member.name} 
                  className={`w-full h-full ${member.imageStyle}`}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-blue-400 mb-2">{member.role}</p>
              <p className="text-gray-400">{member.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {bottomTeamMembers.map((member, index) => (
            <motion.div 
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-blue-400 mb-2">{member.role}</p>
              <p className="text-gray-400">{member.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="bg-gray-800 p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-600">Our Vision</h3>
          <p className="text-gray-300 mb-4">
            At our core, we're a group of visionaries dedicated to enhancing human creativity through AI, not replacing it. We believe in the power of technology to transform industries while maintaining the highest standards of integrity and consumer trust.
          </p>
          <p className="text-gray-300 mb-4">
            Together, we're committed to transparency, consent, and ethical AI practices. We're not just creating images; we're shaping the future of visual media with a conscience.
          </p>
          <p className="text-gray-300">
            Our goal is to empower industries with AI technology that's as authentic as it is artificial, always prioritizing creativity, integrity, and respect for individual privacy.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;