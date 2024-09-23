import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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

interface AnimatedSectionProps {
  children: React.ReactNode;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

const CaseStudyPage: React.FC = () => {
  const consumerRef = useRef<HTMLDivElement>(null);
  const productPlacementRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const consumerCase: CaseStudy = { 
    id: "consumer",
    title: "Use Case", 
    description: "", 
    imageUrl: "/api/placeholder/800/600",
    fullDescription: ""
  };

  const productPlacementCase: CaseStudy = { 
    id: "product_placement",
    title: "Product Placement", 
    description: "Product Placement", 
    imageUrl: "/api/placeholder/800/600",
    fullDescription: ""
  };

  const caseStudies = [consumerCase, productPlacementCase];

  const caseStudyRefs = {
    consumer: useRef<HTMLDivElement>(null),
    product_placement: useRef<HTMLDivElement>(null),
  };

  const handleCaseStudyClick = (id: string) => {
    scrollToSection(detailsRef);
    setTimeout(() => {
      caseStudyRefs[id as keyof typeof caseStudyRefs]?.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <AnimatedSection>
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-600"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            Case Studies
          </h1>
        </AnimatedSection>
        
        <AnimatedSection>
          <p
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-8"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            Discover how our product can transform your needs.
          </p>
        </AnimatedSection>
        
        <AnimatedSection>
          <div className="flex space-x-4">
            <button
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-blue-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              onClick={() => scrollToSection(consumerRef)}
            >
              Consumer
            </button>
            <button
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-purple-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
              onClick={() => scrollToSection(productPlacementRef)}
            >
              Product Placement
            </button>
          </div>
        </AnimatedSection>
      </header>

      <section ref={consumerRef} className="py-16 px-4">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-8 text-center">
            Consumer 
          </h2>
        </AnimatedSection>
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <CaseStudyCard {...consumerCase} onClick={handleCaseStudyClick} />
          </div>
        </AnimatedSection>
      </section>

      <section ref={productPlacementRef} className="py-16 px-4 bg-gray-800">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-8 text-center">
            Product Placement
          </h2>
        </AnimatedSection>
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <CaseStudyCard {...productPlacementCase} onClick={handleCaseStudyClick} />
          </div>
        </AnimatedSection>
      </section>

      <section ref={detailsRef} className="py-16 px-4">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-8 text-center">Detailed Case Studies</h2>
          <div className="max-w-4xl mx-auto space-y-16">
            {caseStudies.map((caseStudy) => (
              <div key={caseStudy.id} ref={caseStudyRefs[caseStudy.id as keyof typeof caseStudyRefs]} className="bg-gray-800 rounded-lg p-6 shadow-lg">
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

export default CaseStudyPage;