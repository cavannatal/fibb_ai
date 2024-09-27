import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import ProductPlacementSection from './components/ProductPlacementSection';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
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
    fullDescription: "Our comprehensive product placement strategy revolutionized how brands interact with their target audience.",
  };

  const professionalUseCase: CaseStudy = {
    id: "professional_use",
    title: "Professional Use Case",
    description: "Learn how professionals in various industries leveraged our solutions to streamline workflows and increase productivity by 25%.",
    fullDescription: "Across multiple industries, professionals found that our solutions dramatically improved their daily operations. By implementing our advanced workflow management system, teams were able to automate routine tasks, enhance collaboration, and gain valuable insights through real-time analytics. This led to a remarkable 25% increase in overall productivity. From legal firms streamlining case management to healthcare providers optimizing patient care, our versatile platform adapted to diverse professional needs. The result was not just increased efficiency, but also improved job satisfaction and better outcomes for clients and customers alike.",
  };

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

      <section ref={professionalUseRef} className="py-16 px-4 bg-gray-800">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-8 text-center">
            {professionalUseCase.title}
          </h2>
          <div className="max-w-4xl mx-auto bg-gray-700 rounded-lg p-6 shadow-lg">
            <p className="text-lg mb-4">{professionalUseCase.description}</p>
            <p className="text-lg">{professionalUseCase.fullDescription}</p>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default BusinessCaseStudyPage;