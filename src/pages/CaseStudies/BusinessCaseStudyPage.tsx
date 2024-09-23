import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  fullDescription: string;
}

interface CaseStudyCardProps extends CaseStudy {
  onClick: (id: string) => void;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ id, title, description, imageUrl, onClick }) => (
  <motion.div 
    className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
    onClick={() => onClick(id)}
  >
    <img src={imageUrl} alt={title} className="w-full h-64 object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
      <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
      <p className="text-white text-sm">{description}</p>
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
    description: "", 
    imageUrl: "/api/placeholder/800/600",
    fullDescription: ""};

  const professionalUseCase: CaseStudy = {
    id: "professional_use",
    title: "Professional Use Case",
    description: "",
    imageUrl: "/api/placeholder/800/600",
    fullDescription: ""
};

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <AnimatedSection>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Business Case Studies
          </h1>
        </AnimatedSection>
        
        <AnimatedSection>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-8">
            Explore how our solutions are revolutionizing business strategies and professional workflows.
          </p>
        </AnimatedSection>
        
        <AnimatedSection>
          <div className="flex space-x-4">
            <button
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
              onClick={() => scrollToSection(productPlacementRef)}
            >
              Product Placement
            </button>
            <button
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              onClick={() => scrollToSection(professionalUseRef)}
            >
              Professional Use
            </button>
          </div>
        </AnimatedSection>
      </header>

      <section ref={productPlacementRef} className="py-16 px-4 bg-gray-800">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-8 text-center">
            Product Placement Case Study
          </h2>
        </AnimatedSection>
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <CaseStudyCard {...productPlacementCase} onClick={() => scrollToSection(productPlacementRef)} />
          </div>
        </AnimatedSection>
      </section>

      <section ref={professionalUseRef} className="py-16 px-4">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-8 text-center">
            Professional Use Case Study
          </h2>
        </AnimatedSection>
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <CaseStudyCard {...professionalUseCase} onClick={() => scrollToSection(professionalUseRef)} />
          </div>
        </AnimatedSection>
      </section>

      <section className="py-16 px-4 bg-gray-800">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-8 text-center">Detailed Case Studies</h2>
          <div className="max-w-4xl mx-auto space-y-16">
            {[productPlacementCase, professionalUseCase].map((caseStudy) => (
              <div key={caseStudy.id} className="bg-gray-700 rounded-lg p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-4">{caseStudy.title}</h3>
                <img src={caseStudy.imageUrl} alt={caseStudy.title} className="w-full h-64 object-cover mb-4 rounded-lg" />
                <p className="text-lg mb-4">{caseStudy.description}</p>
                <p className="text-lg">{caseStudy.fullDescription}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default BusinessCaseStudyPage;