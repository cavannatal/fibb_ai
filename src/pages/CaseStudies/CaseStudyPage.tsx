import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  fullDescription: string;
}

const CaseStudyCard: React.FC<CaseStudy & { onClick: () => void }> = ({ title, description, imageUrl, onClick }) => (
  <motion.div 
    className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
    onClick={onClick}
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

const CaseStudyPage: React.FC = () => {
  const detailsRef = useRef<HTMLDivElement>(null);

  const consumerCase: CaseStudy = { 
    id: "consumer",
    title: "Consumer Use Case", 
    description: "How our product transforms individual consumer experiences", 
    imageUrl: "/api/placeholder/800/600",
    fullDescription: ""
 };

  const scrollToDetails = () => {
    detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <AnimatedSection>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-600">
            Case Studies
          </h1>
        </AnimatedSection>
        
        <AnimatedSection>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-8">
            Discover how our product is transforming user experiences.
          </p>
        </AnimatedSection>
        
        <AnimatedSection>
          <div className="flex space-x-4">
            <button
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-blue-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              onClick={scrollToDetails}
            >
              Consumer Uses
            </button>
            <Link to="/business-case-study">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-purple-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105">
                Business Uses
              </button>
            </Link>
          </div>
        </AnimatedSection>
      </header>

      <section className="py-16 px-4">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-8 text-center">
            Consumer Case Study
          </h2>
        </AnimatedSection>
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <CaseStudyCard {...consumerCase} onClick={scrollToDetails} />
          </div>
        </AnimatedSection>
      </section>

      <section ref={detailsRef} className="py-16 px-4">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-8 text-center">Detailed Case Study</h2>
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">{consumerCase.title}</h3>
            <img src={consumerCase.imageUrl} alt={consumerCase.title} className="w-full h-64 object-cover mb-4 rounded-lg" />
            <p className="text-lg mb-4">{consumerCase.description}</p>
            <p className="text-lg">{consumerCase.fullDescription}</p>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default CaseStudyPage;