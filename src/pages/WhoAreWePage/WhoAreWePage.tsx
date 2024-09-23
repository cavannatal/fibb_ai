import React from 'react';
import { motion } from 'framer-motion';
import matt from "./images/matt.jpg";
import nick from "./images/nick.jpg";
import cavan from "./images/cavan.jpg"

// Define types for our data structure
interface TeamMember {
  name: string;
  role: string;
  description: string[];
  imageUrl: string;
  imageStyle: string;
}

const topTeamMembers: TeamMember[] = [
  { 
    name: "Matt Yee", 
    role: "Co-founder and CTO", 
    description: [
      "Matt's professional journey is a testament to the transformative power of combining athletic discipline with technical innovation, making a tangible impact in both the corporate world and on the baseball field. Whether he's developing the next generation of cloud infrastructure or catching a 95+ mph fastball, Matt Yee embodies the spirit of adaptability, strategic thinking, and unwavering commitment to success.",
      "Matt's journey began with a solid academic foundation, earning dual Bachelor's degrees in Computer Science and Aerospace Engineering from Stanford University, followed by an MBA from The University of Texas at Austin. He has held significant roles at leading tech giants, including Google, Amazon Web Services (AWS), and Facebook, where he managed and contributed to groundbreaking projects, including collaboration with NASA JPL, the Department of Defense, and General Dynamics. His career has been marked by his ability to lead teams in developing cutting-edge solutions that integrate AI-driven applications, cloud architecture optimization, and innovative software engineering practices.",
      "Beyond his corporate achievements, Matt's role as a bullpen catcher for the New York Mets adds a unique dimension to his professional narrative. His experience as a professional athlete has profoundly shaped his corporate career, instilling in him a relentless pursuit of excellence, discipline, and teamwork.",
      "This dual career in both tech and sports underscores Matt's exceptional ability to bridge the gap between traditional practices and modern technology, making him a unique asset in both domains. His athletic background has not only honed his physical and mental endurance but has also enriched his leadership style, fostering a culture of collaboration, resilience, and continuous improvement in every team he leads."
    ],
    imageUrl: matt,
    imageStyle: "object-cover object-center scale-150"
  },
  { 
    name: "Nick Friesen", 
    role: "Co-founder", 
    description: [
      "Steering company vision",
      "Expert in strategic planning",
      "Passionate about ethical AI in visual media"
    ],
    imageUrl: nick,
    imageStyle: "object-cover object-center scale-100" 
  },
  { 
    name: "Cavan Natal", 
    role: "Software Engineer", 
    description: [
      "Fresh out of Texas Tech University with a Bachelor’s in Computer Science and a minor in Mathematics, Cavan is eager to apply his knowledge and skills to real-world challenges in software engineering and data science. His academic background has provided him with a solid foundation in programming, algorithms, and mathematical modeling, which he now aims to leverage in the professional world.",
      "During his time at Texas Tech, Cavan honed his problem-solving skills, worked on projects ranging from building web applications to conducting data analysis, and developed a keen interest in the intersection of technology and data. He is passionate about creating solutions that are both innovative and efficient, whether through software development or data-driven insights.",
      
    ],
    imageUrl: cavan,
    imageStyle: "object-cover object-center scale-100" 
  },
];

interface BottomTeamMember {
  name: string;
  role: string;
  description: string;
}

const bottomTeamMembers: BottomTeamMember[] = [
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
  
];

const AboutUs: React.FC = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-gray-900  text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          We are dreamers, thinkers, and tinkerers at the forefront of ethical AI in visual media. Our team is driven by a passion for innovation and a commitment to responsible technology.
        </motion.p>

        <div className="space-y-12 mb-12">
          {topTeamMembers.map((member, index) => (
            <motion.div 
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="w-48 h-48 mb-6 md:mb-0 md:mr-6 flex-shrink-0 overflow-hidden rounded-full">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className={`w-full h-full ${member.imageStyle}`}
                  />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-blue-400 mb-4">{member.role}</p>
                  <ul className="text-gray-400 list-disc list-inside md:list-outside space-y-2">
                    {member.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
          <p className="text-gray-300">
            Our goal is to empower industries with AI technology that's as authentic as it is artificial, always prioritizing creativity, integrity, and respect for individual privacy.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;