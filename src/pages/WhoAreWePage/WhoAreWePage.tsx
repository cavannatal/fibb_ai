import React from 'react';
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
}

const topTeamMembers: TeamMember[] = [
  { 
    name: "Matt Yee", 
    role: "Co-Founder and CEO", 
    description: [
      "Matt's professional journey is a testament to the transformative power of combining athletic discipline with technical innovation, making a tangible impact in both the corporate world and on the baseball field. Whether he's developing the next generation of cloud infrastructure or catching a 95+ mph fastball, Matt Yee embodies the spirit of adaptability, strategic thinking, and unwavering commitment to success.",
      "Matt's journey began with a solid academic foundation, earning dual Bachelor's degrees in Computer Science and Aerospace Engineering from Stanford University, followed by an MBA from The University of Texas at Austin. He has held significant roles at leading tech giants, including Google, Amazon Web Services (AWS), and Facebook, where he managed and contributed to groundbreaking projects, including collaboration with NASA JPL, the Department of Defense, and General Dynamics. His career has been marked by his ability to lead teams in developing cutting-edge solutions that integrate AI-driven applications, cloud architecture optimization, and innovative software engineering practices.",
      "Beyond his corporate achievements, Matt's role as a bullpen catcher for the New York Mets adds a unique dimension to his professional narrative. His experience as a professional athlete has profoundly shaped his corporate career, instilling in him a relentless pursuit of excellence, discipline, and teamwork.",
      "This dual career in both tech and sports underscores Matt's exceptional ability to bridge the gap between traditional practices and modern technology, making him a unique asset in both domains. His athletic background has not only honed his physical and mental endurance but has also enriched his leadership style, fostering a culture of collaboration, resilience, and continuous improvement in every team he leads.",
    ],
    imageUrl: matt,
    imageStyle: "object-cover object-center scale-150"
  },
  { 
    name: "Nick Friesen", 
    role: "Co-Founder and Head of Artificial Intelligence Research", 
    description: [
      "Nick is the founder of one of the largest dating photography companies in the world. With millions in revenue, and photographers based throughout the US, he’s an expert on facial expressions, body language, and image optimization. ",
      "With Fibb.ai, he brings the attention to detail and artistic understanding to configure our models to generate the most accurate personal replicas anyone ever has seen.",
    ],
    imageUrl: nick,
    imageStyle: "object-cover object-center scale-100" 
  },
  { 
    name: "Jake Metzer", 
    role: "Chief Operating Officer", 
    description: [
      "Jake is the Chief Operating Officer at fibb, bringing a deep passion for building innovative solutions and a wealth of experience in both technology and entrepreneurship. A proud graduate of Ohio State University, where he majored in Computer Engineering and played as a punter for the football team, Jake has since built a diverse career as a tech consultant. He specializes in leading large-scale software implementations, serving as a solutions architect, and designing functional systems that solve complex problems.",
    'Outside of his consulting work, Jake is a serial entrepreneur, having explored ventures in everything from robotics to consumer products and food & beverage. While not every venture succeeded, each provided valuable learning experiences that fuel his drive for innovation.',
    'In his spare time, you’ll find Jake working with his hands—whether it’s woodworking, electronics tinkering, or 3D printing—along with staying active in competitive sports and enjoying great food. At fibb, Jake combines his technical expertise and entrepreneurial spirit to help shape the company’s future in AI.'
    ],
    imageUrl: jake,
    imageStyle: "object-cover object-center scale-100" 
  },
  { 
    name: "Cesar Aguilar", 
    role: "Head of Engineering", 
    description: [
    "An expert in the convergence of technology and strategic business applications, Cesar has carved a niche in spearheading initiatives that transform complex data into actionable business insights. With a solid academic background with degrees in Computer Science and Management Information Systems, Cesar has consistently leveraged his deep expertise to make significant impacts across various sectors.",
    "At the heart of his career, Cesar has played pivotal roles in developing advanced machine learning models and predictive analytics solutions, significantly enhancing productivity and sales for major players such as Raytheon Technologies, the Department of Defense, DARPA, and Lockheed Martin. His tenure at Infor is particularly notable, where he led a dynamic team in applying AI to revolutionize financial and supply chain management analytics.",
    "Beyond his technical prowess, Cesar is known for his ability to manage large development teams, guiding them through complex AI projects with a leadership style rooted in humility, transparency, and dedication. He believes in empowering his team by surrounding himself with competent professionals and giving them the autonomy to excel in their respective areas.",
  "Outside of the office, Cesar is passionate about health and fitness, often starting his day with a morning walk and regular visits to the gym, underscoring his belief in the synergy of physical well-being and mental sharpness.",
  "As the new Head of Engineering at Fibb, Cesar is poised to bridge the gap between cutting-edge R&D and practical, impactful applications of new technologies. His vision is to not only advance the technological frontier but also to cultivate an environment where innovation is seamlessly integrated with real-world solutions."

  ],
    imageUrl: ceasar,
    imageStyle: "object-cover object-center scale-100" 
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
    imageStyle: "object-cover object-center scale-100" 
  },
  { 
    name: "Allie Friesen", 
    role: "Head of Public Relations & Ethics", 
    description: [
    ],
    imageUrl: allie,
    imageStyle: "object-cover object-center scale-100" 
  },
  { 
    name: "Cavan Natal", 
    role: "Senior Software Engineer", 
    description: [
      "Out of Texas Tech University with a Bachelor’s in Computer Science and a minor in Mathematics, Cavan is eager to apply his knowledge and skills to real-world challenges in software engineering and data science. His academic background has provided him with a solid foundation in programming, algorithms, and mathematical modeling, which he now aims to leverage in the professional world.",
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
    <div className="py-16 bg-[#efedea]  text-[#004948]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold mb-8 text-center text-[#084248]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Team & Mission
        </motion.h2>
        
        <motion.p 
          className="text-lg mb-12 text-black text-center"
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
              className="bg-[#bddde2] p-6 rounded-lg shadow-lg"
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
                  <p className="text-[#084248] mb-4">{member.role}</p>
                  <ul className="text-black list-disc list-inside md:list-outside space-y-2">
                    {member.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mb-12">
          {bottomTeamMembers.map((member, index) => (
            <motion.div 
              key={index}
              className="bg-[#bddde2] p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              <h3 className="text-xl text-black font-semibold mb-2">{member.name}</h3>
              <p className="text-[#084248] mb-2">{member.role}</p>
              <p className="text-black">{member.description}</p>
            </motion.div>
          ))}
        </div>

      
      </div>
    </div>
  );
};

export default AboutUs;
