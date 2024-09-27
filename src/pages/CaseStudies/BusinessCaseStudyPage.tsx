import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import ProductPlacementSection from './components/ProductPlacementSection';
import ProfessionalUseSection from './components/ProfessionalUseSection';

import pro1 from './bus_images/professional/pro_1.png';
import pro2 from './bus_images/professional/pro_2.png';
import pro3 from './bus_images/professional/pro_3.png';
import pro4 from './bus_images/professional/pro_4.png';
import pro5 from './bus_images/professional/pro_5.png';
import pro6 from './bus_images/professional/pro_6.png';
import pro7 from './bus_images/professional/pro_7.png';
import pro8 from './bus_images/professional/pro_8.png';
import pro9 from './bus_images/professional/pro_9.png';
import pro10 from './bus_images/professional/pro_10.png';
import pro11 from './bus_images/professional/pro_11.png';
import pro12 from './bus_images/professional/pro_12.png';
import rohit from './bus_images/professional/rohit.jpg';



interface CaseStudy {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
}

interface UserProfile {
  name: string;
  description: string;
  mainImage: string;
  galleryImages: string[];
}

const CaseStudyCard: React.FC<CaseStudy & { onClick: (id: string) => void }> = ({ id, title, description, onClick }) => (
  <motion.div 
    className="flex flex-col bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
    whileHover={{ scale: 1.02, y: -5 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onClick(id)}
  >
    <div className="p-6">
      <h3 className="text-white text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300 text-base">{description}</p>
    </div>
  </motion.div>
);

const AnimatedSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    {children}
  </motion.div>
);

const BusinessCaseStudyPage: React.FC = () => {
  const productPlacementRef = useRef<HTMLDivElement>(null);
  const professionalUseRef = useRef<HTMLDivElement>(null);

  const productPlacementCase: CaseStudy = { 
    id: "product_placement",
    title: "Product Placement Strategy", 
    description: "Discover how our innovative approach to product placement increased brand visibility by 40% and boosted sales in key markets.", 
    fullDescription: "Our comprehensive product placement strategy revolutionized how brands interact with their target audience. By leveraging data-driven insights and cutting-edge technology, we developed a multi-channel approach that seamlessly integrated products into various media formats. This resulted in a 40% increase in brand visibility and significant sales growth across key markets. Our strategy not only enhanced product recognition but also created meaningful connections between brands and consumers, leading to improved customer loyalty and long-term market success.",
  };

  const professionalUseCase: CaseStudy = {
    id: "professional_use",
    title: "Professional Use Case",
    description: "Learn how professionals in various industries leveraged our solutions to streamline workflows and increase productivity by 25%.",
    fullDescription: "Look at the comparison of the real photos against our AI generated photos of real clients who have used our service.",
  };

  const userProfiles: UserProfile[] = [
    {
      name: "Rohit",
      description: "After just one photoshoot, Rohit now has unlimited professional-grade images at his disposal. If he doesn't like the shirt, he can swap it out. If he wants a different setting, he can move locations. All without sacrificing that high-end photograph quality.",
      mainImage: rohit,
      galleryImages: [
        pro1,
        pro2,
        pro3,
        pro4,
        pro5,
        pro6,
        pro7,
        pro8,
        pro9,
        pro10,
        pro11,
        pro12
      ]
    },

  ];

  const scrollToSection = (id: string) => {
    const ref = id === "product_placement" ? productPlacementRef : professionalUseRef;
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-12">
        <AnimatedSection>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Business Case Studies
          </h1>
        </AnimatedSection>
        
        <AnimatedSection>
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            Explore how our solutions are revolutionizing business strategies and professional workflows.
          </p>
        </AnimatedSection>
        
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(124, 58, 237)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("product_placement")}
            >
              Product Placement
            </motion.button>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(99, 102, 241)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("professional_use")}
            >
              Professional Use
            </motion.button>
          </div>
        </AnimatedSection>
      </header>

      <section className="py-16 px-4">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-8 text-center">
            Our Case Studies
          </h2>
        </AnimatedSection>
        <AnimatedSection>
          <div className="max-w-5xl mx-auto space-y-8">
            <CaseStudyCard {...productPlacementCase} onClick={scrollToSection} />
            <CaseStudyCard {...professionalUseCase} onClick={scrollToSection} />
          </div>
        </AnimatedSection>
      </section>

      <div ref={productPlacementRef}>
        <ProductPlacementSection 
          title={productPlacementCase.title}
          description={productPlacementCase.description}
          fullDescription={productPlacementCase.fullDescription}
        />
      </div>

      <div ref={professionalUseRef}>
        <ProfessionalUseSection 
          title={professionalUseCase.title}
          description={professionalUseCase.description}
          fullDescription={professionalUseCase.fullDescription}
          userProfiles={userProfiles}
        />
      </div>
    </div>
  );
};

export default BusinessCaseStudyPage;