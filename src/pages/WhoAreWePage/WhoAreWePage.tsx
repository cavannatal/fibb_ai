import React from 'react';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';
import matt from "./images/matt.webp";
import nick from "./images/nick.webp";
import cavan from "./images/cavan.webp";
import jake from "./images/jake.webp";
import ceasar from "./images/ceasar.webp";
import Mike from './images/Mike.webp';
import allie from './images/allie.webp';
import fahim from './images/fahim.webp';
import carrie from './images/carrie.webp';
import javier from './images/javier.webp';

// Define types for our data structure
interface TeamMember {
  name: string;
  role: string;
  description: string[];
  imageUrl: string;
  imageStyle: string;
  linkedIn?: string;
  instagram?: string;
}

interface BottomTeamMember {
  name: string;
  role: string;
  description: string;
  linkedIn?: string;  // Add this line
  instagram?: string;  // Add this line if you want Instagram for bottom members too
}

const topTeamMembers: TeamMember[] = [
  { 
    name: "Matt Yee", 
    role: "Co-Founder and CEO", 
    description: [
      "Matt Yee's professional journey is a remarkable fusion of athletic discipline and technical innovation, making significant contributions in both the corporate world and as a professional athlete. With dual Bachelor's degrees in Computer Science and Aerospace Engineering from Stanford University and an MBA from The University of Texas at Austin, Matt has excelled in roles at industry leaders like Google, AWS, and Facebook. He played a key part in high-impact projects, collaborating with NASA's Jet Propulsion Lab, the Department of Defense, and General Dynamics, focusing on AI-driven applications, cloud infrastructure optimization, and cutting-edge software engineering solutions.",
      "In addition to his corporate achievements, Matt's unique experience as a professional athlete, serving as a bullpen catcher for the New York Mets, has profoundly shaped his leadership style. Catching 95+ mph fastballs and mentoring athletes have instilled in him discipline, resilience, and a deep understanding of teamwork. His dual career, bridging professional sports and cutting-edge technology, showcases his adaptability and strategic mindset. Matt's athletic background not only enhances his physical endurance but also influences his leadership, fostering a culture of collaboration, continuous improvement, and excellence in every team he leads.",
    ],
    imageUrl: matt,
    imageStyle: "object-cover object-center scale-150",
    linkedIn: "https://www.linkedin.com/in/mattyee92/",
    instagram: "https://www.instagram.com/theogyeezy/", 
  },
  { 
    name: "Nick Friesen", 
    role: "Co-Founder and Head of Artificial Intelligence Research", 
    description: [
      "Nick is the founder of one of the largest dating photography companies in the world. With millions in revenue, and photographers based throughout the US, he's an expert on facial expressions, body language, and image optimization. ",
      "With Fibb.ai, he brings the attention to detail and artistic understanding to configure our models to generate the most accurate personal replicas anyone ever has seen.",
      "He also enjoys cooking, baking, and smoking various meats. In his spare time, he's often working on a welding project, playing piano and guitar, or spending time with his wife and two dogs.",
    ],
    imageUrl: nick,
    imageStyle: "object-cover object-center scale-100",
    linkedIn: "https://www.linkedin.com/in/nicholasfriesen/",
    instagram: "https://www.instagram.com/wanderinginatx/", 
    },

    { 
      name: "Cesar Aguilar", 
      role: "CTO", 
      description: [
        "An expert in the convergence of technology and strategic business applications, Cesar has carved a niche in spearheading initiatives that transform complex data into actionable business insights. With a solid academic background with degrees in Computer Science and Management Information Systems, Cesar has consistently leveraged his deep expertise to make significant impacts across various sectors.",
        "At the heart of his career, Cesar has played pivotal roles in developing advanced machine learning models and predictive analytics solutions, significantly enhancing productivity and sales for major players such as Raytheon Technologies, the Department of Defense, DARPA, and Lockheed Martin. His tenure at Infor is particularly notable, where he led a dynamic team in applying AI to revolutionize financial and supply chain management analytics.",
      ],
      imageUrl: ceasar,
      imageStyle: "object-cover object-center scale-100",
      linkedIn: "https://www.linkedin.com/in/cesar-iamboundless/",
      instagram: "https://www.instagram.com/performanceconcierge/", 
      },

  { 
    name: "Jake Metzer", 
    role: "COO", 
    description: [
      "Jake is the Chief Operating Officer at fibb, bringing a deep passion for building innovative solutions and a wealth of experience in both technology and entrepreneurship. A proud graduate of Ohio State University, where he majored in Computer Engineering and played as a punter for the football team, Jake has since built a diverse career as a tech consultant. He specializes in leading large-scale software implementations, serving as a solutions architect, and designing functional systems that solve complex problems.",
      "Outside of his consulting work, Jake is a serial entrepreneur, having explored ventures in everything from robotics to consumer products and food & beverage. While not every venture succeeded, each provided valuable learning experiences that fuel his drive for innovation.",
    ],
    imageUrl: jake,
    imageStyle: "object-cover object-center scale-100",
    linkedIn: "https://www.linkedin.com/in/jake-metzer-718713137/",
    instagram: "", 
    },
    { 
      name: "Fahim Fahad", 
      role: "Principal Software Engineer", 
      description: [
        "Fahim is a highly skilled Principal Engineer at our AI company, bringing a wealth of expertise in backend development and cloud infrastructure. With a strong foundation in data science, he seamlessly bridges the gap between complex data systems and innovative engineering solutions. Fahim excels in designing robust, scalable architectures that power our AI applications, ensuring they are efficient and reliable. His passion for leveraging cutting-edge technologies to solve challenging problems drives our team forward. With a collaborative spirit and a commitment to excellence, Fahim is instrumental in guiding our technical vision and mentoring the next generation of engineers.",
      ],
      imageUrl: fahim,
      imageStyle: "object-cover object-center scale-100",
      linkedIn: "https://www.linkedin.com/in/fahim-fahad-b49238266/",
      instagram: "", 
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
    instagram: "https://www.instagram.com/cavannatal/", 
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
    instagram: "https://www.instagram.com/allieaimone?igsh=MWkxeXQ0eGk3ZHY4Yw%3D%3D", 
    },

  { 
    name: "Michael Thompson", 
    role: "Senior Software Engineer", 
    description: [
      'Michael is the Senior Software Engineer at fibb. He has worked over 5 years in the industry, with experience developing a wide variety of apps and websites. ',
      ' In addition, Michael has been deepening his knowledge in infrastructure and architecture at IBM.',
      'He loves the challenge and creativity behind creating products and is looking forward to what fibb will bring to the world.',
    ],
    imageUrl: Mike,
    imageStyle: "object-cover object-center scale-100",
    linkedIn: "", 
    instagram: "", 
    },

   { 
    name: "Carrington Smurl", 
    role: "Enterprise Account Executive", 
    description: [
      "Carrington is a dynamic Tech Account Executive with a unique blend of technical expertise and a keen eye for UI/UX design. With a deep understanding of client needs and the ability to translate complex technology solutions into user-friendly experiences, she excels at building strong relationships and delivering exceptional value. Carrington's ability to communicate effectively with both technical teams and clients ensures seamless collaboration throughout the project lifecycle. Her passion for innovative design enhances her approach to client engagements, making her a trusted advisor in navigating the evolving tech landscape. With a commitment to excellence and a focus on customer satisfaction, Carrington is a vital asset to our team."
    ],
    imageUrl: carrie,
    imageStyle: "object-cover object-center scale-100",
    linkedIn: "", 
    instagram: "https://www.instagram.com/carringtongrace_?igsh=MTlvZGR3YjBiMzliNg%3D%3D", 
   },

   { 
      name: "Javier Reynoso", 
      role: "Account Executive", 
      description: [
        "Javier is a highly talented Tech Account Executive with a remarkable background as a former professional baseball player in the Kansas City Royals organization. His athletic experience instilled in him a strong competitive spirit and unparalleled self-discipline, qualities that he brings to the sales arena. Javier excels at forging meaningful relationships with clients and understanding their unique needs, using his strategic mindset to deliver tailored solutions. His ability to thrive under pressure and adapt to challenges mirrors the resilience he demonstrated on the field. With a passion for technology and a commitment to excellence, Javier is a powerful force in driving sales success and fostering long-lasting partnerships."
      ],
      imageUrl: javier,
      imageStyle: "object-cover object-center scale-100",
      linkedIn: "", 
      instagram: "https://www.instagram.com/the__duke13?igsh=ZXVmcmw4MGV2bzcx", 
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
    role: "A.I. Researcher", 
    description: "Santiago is a passionate AI researcher at Fibb, blending his strong background in technology with a flair for graphic design. Hailing from Argentina, he brings a unique perspective to the team, merging analytical thinking with creative innovation. Santiago’s enthusiasm for artificial intelligence drives him to explore cutting-edge solutions, pushing the boundaries of what’s possible in the field. His ability to communicate complex ideas visually enhances collaboration and understanding within the team. With an unwavering commitment to excellence and a deep love for his work, Santiago is dedicated to making a meaningful impact in the AI landscape.",
    linkedIn: "https://www.linkedin.com/in/sanmilano/",  
    instagram: ""  
  },
];

const AboutUs: React.FC = () => {
  return (
    <div className="py-16 bg-white text-[#004948]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl sm:text-5xl font-bold mb-4 text-center text-[#084248]"
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
                    <div className="flex space-x-2">
                      {member.linkedIn && (
                        <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" className="text-[#084248] hover:text-blue-800">
                          <FaLinkedin size={24} />
                        </a>
                      )}
                      {member.instagram && (
                        <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-[#084248] hover:text-pink-600">
                          <FaInstagram size={24} />
                        </a>
                      )}
                    </div>
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
              <div className="flex items-center justify-center mb-2">
                <h3 className="text-xl text-black font-semibold mr-2" style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>{member.name}</h3>
                <div className="flex space-x-2">
                  {member.linkedIn && (
                    <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" className="text-[#084248] hover:text-blue-800">
                      <FaLinkedin size={20} />
                    </a>
                  )}
                  {member.instagram && (
                    <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-[#084248] hover:text-pink-600">
                      <FaInstagram size={20} />
                    </a>
                  )}
                </div>
              </div>
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