import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import matt from "./images/matt.jpg";
import nick from "./images/nick.jpg";
import cavan from "./images/cavan.jpg";
import jake from "./images/jake.jpg";
import ceasar from "./images/ceasar.jpg";
import Mike from './images/Mike.jpeg';
import allie from './images/allie.jpg';

// Define types for our data structure
interface TeamMember {
  name: string;
  role: string;
  description: string[];
  imageUrl: string;
  imageStyle: string;
  linkedIn?: string;
}

const topTeamMembers: TeamMember[] = [
  
  { 
    name: "Matt Yee", 
    role: "Co-Founder and CEO", 
    description: [
      "Matt Yee's professional journey is a remarkable fusion of athletic discipline and technical innovation, making significant contributions in both the corporate world and as a professional athlete. With dual Bachelor’s degrees in Computer Science and Aerospace Engineering from Stanford University and an MBA from The University of Texas at Austin, Matt has excelled in roles at industry leaders like Google, AWS, and Facebook. He played a key part in high-impact projects, collaborating with NASA’s Jet Propulsion Lab, the Department of Defense, and General Dynamics, focusing on AI-driven applications, cloud infrastructure optimization, and cutting-edge software engineering solutions.",
      "In addition to his corporate achievements, Matt’s unique experience as a professional athlete, serving as a bullpen catcher for the New York Mets, has profoundly shaped his leadership style. Catching 95+ mph fastballs and mentoring athletes have instilled in him discipline, resilience, and a deep understanding of teamwork. His dual career, bridging professional sports and cutting-edge technology, showcases his adaptability and strategic mindset. Matt's athletic background not only enhances his physical endurance but also influences his leadership, fostering a culture of collaboration, continuous improvement, and excellence in every team he leads.",
    ],
    imageUrl: matt,
    imageStyle: "object-cover object-center scale-150",
    linkedIn: "https://www.linkedin.com/in/mattyee92/",
  },
  { 
    name: "Nick Friesen", 
    role: "Co-Founder and Head of Artificial Intelligence Research", 
    description: [
      "Nick is the founder of one of the largest dating photography companies in the world. With millions in revenue, and photographers based throughout the US, he’s an expert on facial expressions, body language, and image optimization. ",
      "With Fibb.ai, he brings the attention to detail and artistic understanding to configure our models to generate the most accurate personal replicas anyone ever has seen.",
    ],
    imageUrl: nick,
    imageStyle: "object-cover object-center scale-100",
    linkedIn: "https://www.linkedin.com/in/nicholasfriesen/",
  },
  { 
    name: "Jake Metzer", 
    role: "Chief Operating Officer", 
    description: [
      "Jake is the Chief Operating Officer at fibb, bringing a deep passion for building innovative solutions and a wealth of experience in both technology and entrepreneurship. A proud graduate of Ohio State University, where he majored in Computer Engineering and played as a punter for the football team, Jake has since built a diverse career as a tech consultant. He specializes in leading large-scale software implementations, serving as a solutions architect, and designing functional systems that solve complex problems.",
    'Outside of his consulting work, Jake is a serial entrepreneur, having explored ventures in everything from robotics to consumer products and food & beverage. While not every venture succeeded, each provided valuable learning experiences that fuel his drive for innovation.',
    ],
    imageUrl: jake,
    imageStyle: "object-cover object-center scale-100",
    linkedIn: "https://www.linkedin.com/in/jake-metzer-718713137/",
  },
  { 
    name: "Cesar Aguilar", 
    role: "Head of Engineering", 
    description: [
    "An expert in the convergence of technology and strategic business applications, Cesar has carved a niche in spearheading initiatives that transform complex data into actionable business insights. With a solid academic background with degrees in Computer Science and Management Information Systems, Cesar has consistently leveraged his deep expertise to make significant impacts across various sectors.",
    "At the heart of his career, Cesar has played pivotal roles in developing advanced machine learning models and predictive analytics solutions, significantly enhancing productivity and sales for major players such as Raytheon Technologies, the Department of Defense, DARPA, and Lockheed Martin. His tenure at Infor is particularly notable, where he led a dynamic team in applying AI to revolutionize financial and supply chain management analytics.",
    
  ],
    imageUrl: ceasar,
    imageStyle: "object-cover object-center scale-100",
    linkedIn: "https://www.linkedin.com/in/cesar-iamboundless/",
  },
  { 
    name: "Michael Thompson", 
    role: "Lead Software Engineer", 
    description: [
      'Michael is the Senior Software Engineer at fibb. He has worked over 5 years in the industry, with experience developing a wide variety of apps and websites. ',
      ' In addition, Michael has been deepening his knowledge in infrastructure and architecture at IBM.',
      'He loves the challenge and creativity behind creating products and is looking forward to what fibb will bring to the world.',
    
    ],
    imageUrl: Mike,
    imageStyle: "object-cover object-center scale-100",
    linkedIn: "https://www.linkedin.com/in/mattyee/", 
  },
  { 
    name: "Allie Friesen", 
    role: "Head of Public Relations & Ethics", 
    description: [
      'Allie has focused much of her efforts in studying great brands and understanding how design impacts our daily life. She is a graphic designer, photographer, and general artist. She obsesses about the framing with images, and has an eye for all the little details. She joined Fibb to ensure an accurate and genuine representation of people and brands, and to keep the future of AI image generation ethical and honest.'
    ],
    imageUrl: allie,
    imageStyle: "object-cover object-center scale-100",
    linkedIn: "https://www.linkedin.com/in/allieaimone/", 
  },
  { 
    name: "Cavan Natal", 
    role: "Senior Software Engineer", 
    description: [
      "During his time at Texas Tech, Cavan honed his problem-solving skills, worked on projects ranging from building web applications to conducting data analysis, and developed a keen interest in the intersection of technology and data. He is passionate about creating solutions that are both innovative and efficient, whether through software development or data-driven insights.",
      
    ],
    imageUrl: cavan,
    imageStyle: "object-cover object-center scale-100",
    linkedIn: "https://www.linkedin.com/in/cavannatal/",
  },
  
  
];

interface BottomTeamMember {
  name: string;
  role: string;
  description: string;
}

const bottomTeamMembers: BottomTeamMember[] = [
  
  { 
    name: "Santiago Milano", 
    role: "Artificial Intelligence Researcher", 
    description: "Pushing the boundaries of what's possible"
  },
  { 
    name: "Fahim Hasnain Fahad", 
    role: "Principal Software Engineer", 
    description: ""
  },
  
];

const AboutUs: React.FC = () => {
  return (
    <div className="py-16 bg-[#efedea] text-[#004948]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold mb-8 text-center text-[#084248]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
        >
          Our Team
        </motion.h2>
        
        <motion.p 
          className="text-lg mb-12 text-black text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontFamily: '"Font1", sans-serif' }}
        >
          We are dreamers, thinkers, and tinkerers at the forefront of ethical AI in visual media. Our team is driven by a passion for innovation and a commitment to responsible technology.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {topTeamMembers.map((member, index) => (
            <motion.div 
              key={index}
              className="bg-[#efedea] p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-48 h-48 mb-6 flex-shrink-0 overflow-hidden rounded-full">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className={`w-full h-full ${member.imageStyle}`}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <h3 className="text-2xl font-semibold mr-2" style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>{member.name}</h3>
                    {member.linkedIn && (
                      <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" className="text-[#084248] hover:text-blue-800">
                        <FaLinkedin size={24} />
                      </a>
                    )}
                  </div>
                  <p className="text-[#084248] mb-4" style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>{member.role}</p>
                  <div className="text-black text-lg space-y-4" style={{ fontFamily: '"Font1", sans-serif' }}>
                    {member.description.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mb-12">
          {bottomTeamMembers.map((member, index) => (
            <motion.div 
              key={index}
              className="bg-[#efedea] p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              <h3 className="text-xl text-black font-semibold mb-2" style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>{member.name}</h3>
              <p className="text-[#084248] mb-2" style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>{member.role}</p>
              <p className="text-black text-lg" style={{ fontFamily: '"Font1", sans-serif' }}>{member.description}</p>
            </motion.div>
          ))}
        </div>

      
      </div>
    </div>
  );
};

export default AboutUs;
