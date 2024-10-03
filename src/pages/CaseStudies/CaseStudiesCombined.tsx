import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

// Import all necessary images
import img2 from './images/img2.png';
import img3 from './images/img3.png';
import img4 from './images/img4.png';
import img5 from './images/img5.png';
import img6 from './images/img6.png';
import img8 from './images/img8.png';
import pp1 from './bus_images/productplacement/pp_nike2.jpg';
import pp2 from './bus_images/productplacement/pp_bar.png';
import pp3 from './bus_images/productplacement/pp_bc.png';
import pp4 from './bus_images/productplacement/pp_mc1.png';
import pp5 from './bus_images/productplacement/pp_nike.png';
import pp6 from './bus_images/productplacement/pp_northface.png';
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

// Define interfaces
interface ProductPhoto {
  src: string;
  alt: string;
}

interface UserProfile {
  name: string;
  description: string;
  mainImage: string;
  galleryImages: string[];
}

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
}

// Reusable components
const AnimatedSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    {children}
  </motion.div>
);

const PhotoCard: React.FC<{ src: string; alt: string; onClick: () => void }> = ({ src, alt, onClick }) => (
  <motion.div
    className="aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
    />
  </motion.div>
);

const Modal: React.FC<{ src: string; alt: string; onClose: () => void }> = ({ src, alt, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    onClick={onClose}
  >
    <div className="max-w-4xl max-h-[90vh] overflow-auto">
      <img 
        src={src} 
        alt={alt} 
        className="max-w-full max-h-full object-contain object-center"
      />
    </div>
  </motion.div>
);

const CaseStudyCard: React.FC<CaseStudy & { onClick: (id: string) => void }> = ({ id, title, description, onClick }) => (
  <motion.div 
    className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
    whileHover={{ scale: 1.02, y: -5 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onClick(id)}
  >
    <div className="p-6">
      <h3 className="text-[#084248] text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 text-base">{description}</p>
    </div>
  </motion.div>
);

// Main component
const CombinedCaseStudyPage: React.FC = () => {
    const [selectedPhoto, setSelectedPhoto] = useState<ProductPhoto | null>(null);
    const [expandedProfile, setExpandedProfile] = useState<string | null>(null);
    const consumerGalleryRef = useRef<HTMLDivElement>(null);
    const productPlacementRef = useRef<HTMLDivElement>(null);
    const professionalUseRef = useRef<HTMLDivElement>(null);
  
    const scrollToSection = (id: string) => {
      const ref = id === "consumer" ? consumerGalleryRef :
                  id === "product_placement" ? productPlacementRef : professionalUseRef;
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    const toggleProfile = (name: string) => {
      setExpandedProfile(expandedProfile === name ? null : name);
    };

  const consumerPhotos: ProductPhoto[] = [
    { src: img8, alt: "Consumer product photo 1" },
    { src: img2, alt: "Consumer product photo 2" },
    { src: img3, alt: "Consumer product photo 3" },
    { src: img4, alt: "Consumer product photo 4" },
    { src: img5, alt: "Consumer product photo 5" },
    { src: img6, alt: "Consumer product photo 6" },
  ];

  const productPlacementPhotos: ProductPhoto[] = [
    { src: pp1, alt: "Product placement 1" },
    { src: pp2, alt: "Product placement 2" },
    { src: pp3, alt: "Product placement 3" },
    { src: pp4, alt: "Product placement 4" },
    { src: pp5, alt: "Product placement 5" },
    { src: pp6, alt: "Product placement 6" },
  ];

  const userProfiles: UserProfile[] = [
    {
      name: "Rohit",
      description: "After just one photoshoot, Rohit now has unlimited professional-grade images at his disposal. If he doesn't like the shirt, he can swap it out. If he wants a different setting, he can move locations. All without sacrificing that high-end photograph quality.",
      mainImage: rohit,
      galleryImages: [pro1, pro2, pro3, pro4, pro5, pro6, pro7, pro8, pro9, pro10, pro11, pro12]
    },
  ];

  const caseStudies: CaseStudy[] = [
    {
      id: "consumer",
      title: "Consumer Use Cases",
      description: "Explore how our product is transforming consumer experiences.",
      fullDescription: "Our AI generates images indistinguishable from high-quality photographs, perfect for various consumer applications."
    },
    {
      id: "product_placement",
      title: "Product Placement Strategy",
      description: "Discover how our innovative approach to product placement increased brand visibility by 40% and boosted sales in key markets.",
      fullDescription: "Our comprehensive product placement strategy revolutionized how brands interact with their target audience. By leveraging data-driven insights and cutting-edge technology, we developed a multi-channel approach that seamlessly integrated products into various media formats."
    },
    {
      id: "professional_use",
      title: "Professional Use Cases",
      description: "Learn how professionals in various industries leveraged our solutions to streamline workflows and increase productivity by 25%.",
      fullDescription: "Look at the comparison of the real photos against our AI generated photos of real clients who have used our service."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800" style={{ fontFamily: 'Nunito, sans-serif' }}>
      <header className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-12">
        <AnimatedSection>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#084248]"
          style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
          >
            Case Studies
          </h1>
        </AnimatedSection>
        
        <AnimatedSection>
          <p className="text-xl text-gray-600 max-w-2xl mb-8"
          style={{ fontFamily: '"Font1", sans-serif' }}
          >
            Discover how our product is transforming experiences across consumer, business, and professional domains.
          </p>
        </AnimatedSection>
        
        <AnimatedSection>
          <div className="flex flex-wrap justify-center gap-4">
            {caseStudies.map(study => (
              <motion.button
                key={study.id}
                className="px-9 py-4 bg-[#084248] text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105"
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(study.id)}
                style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
              >
                {study.title}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>
      </header>

      <section className="py-16 px-4">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-8 text-center text-[#084248]"
          style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
          >
            Our Case Studies
          </h2>
        </AnimatedSection>
        <AnimatedSection>
          <div className="max-w-5xl mx-auto space-y-8"
          style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
          >
            {caseStudies.map(study => (
              <CaseStudyCard key={study.id} {...study} onClick={scrollToSection} />
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Consumer Use Cases Section */}
      <section ref={consumerGalleryRef} className="py-16 px-4">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-8 text-center text-[#084248]"
          style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
          >Consumer Photo Gallery</h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {consumerPhotos.map((photo, index) => (
                <PhotoCard 
                  key={index} 
                  {...photo} 
                  onClick={() => setSelectedPhoto(photo)}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Product Placement Section */}
      <section ref={productPlacementRef} className="py-16 px-4">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-8 text-center text-[#084248]"
          style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
          >
            Product Placement Strategy
          </h2>
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-lg">
            <p className="text-lg mb-4 text-gray-600"
            style={{ fontFamily: '"Font1", sans-serif' }}
            >{caseStudies[1].description}</p>
            <p className="text-lg mb-6 text-gray-600"
            style={{ fontFamily: '"Font1", sans-serif' }}
            >{caseStudies[1].fullDescription}</p>
            
            <div className="bg-gray-100 rounded-2xl p-6 mb-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center text-[#084248]"
              style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
              >
                <TrendingUp className="mr-2 text-[#084248]" size={24} />
                How Product Placement Works with Our Solution
              </h3>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-600"
              style={{ fontFamily: '"Font1", sans-serif' }}>
                <li>Our state-of-the-art model will seamlessly integrate your product in any scene you want</li>
                <li>Dynamic product rendering ensures natural integration into content</li>
                <li>Customizable placement strategies tailored to your brand's unique needs</li>
              </ul>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection>
          <h3 className="text-2xl font-bold mb-4 mt-8 text-center text-[#084248]"
          style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
          >Product Placement Gallery</h3>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productPlacementPhotos.map((photo, index) => (
                <PhotoCard 
                  key={index} 
                  {...photo} 
                  onClick={() => setSelectedPhoto(photo)}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

     {/* Professional Use Cases Section */}
     <section ref={professionalUseRef} className="py-16 px-4">
        <AnimatedSection>
          <h2 className="text-4xl font-bold mb-8 text-center text-[#084248]"
          style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
          >
            Professional Use Cases
          </h2>
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-xl mb-4 text-gray-700"
            style={{ fontFamily: '"Font1", sans-serif' }}
            >{caseStudies[2].description}</p>
            <p className="text-xl mb-8 text-gray-600"
            style={{ fontFamily: '"Font1", sans-serif' }}
            >{caseStudies[2].fullDescription}</p>
            
            {userProfiles.map((profile, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-100 rounded-2xl p-6 mb-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}

              >
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleProfile(profile.name)}
                >
                  <h3 className="text-2xl font-bold text-[#084248]"
                  style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                  >{profile.name}</h3>
                  {expandedProfile === profile.name ? (
                    <ChevronUp className="text-[#084248]" size={24} />
                  ) : (
                    <ChevronDown className="text-[#084248]" size={24} />
                  )}
                </div>
                
                <AnimatePresence>
                  {expandedProfile === profile.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                    >
                      <p className="text-xl my-4 text-gray-600"
                      style={{ fontFamily: '"Font1", sans-serif' }}
                      >{profile.description}</p>
                      <div className="w-full sm:w-64 h-86 mx-auto overflow-hidden rounded-lg mb-6">
                        <img 
                          src={profile.mainImage} 
                          alt={`${profile.name}'s main`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="text-xl font-bold mb-4 text-[#084248]"
                      style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                      >{profile.name}'s Authentically Artificial Gallery</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {profile.galleryImages.map((image, idx) => (
                          <PhotoCard
                            key={idx}
                            src={image}
                            alt={`${profile.name}'s gallery ${idx + 1}`}
                            onClick={() => setSelectedPhoto({ src: image, alt: `${profile.name}'s gallery ${idx + 1}` })}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </section>

              {/* Authentic Generation Section */}
      <section className="py-12 px-4">
        <AnimatedSection>
          <h2 className="text-3xl font-bold mb-8 text-center text-[#084248]"
          style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
          >
            Authentic Generation: Unparalleled Quality for Any Use
          </h2>
        </AnimatedSection>
        <AnimatedSection>
          <div className="max-w-4xl mx-auto bg-gray-100 rounded-2xl p-8 shadow-lg">
            <ul className="space-y-4 text-lg"
            style={{ fontFamily: '"Font1", sans-serif' }}
            >
              <li className="flex items-start">
                <span className="text-[#084248] mr-2">•</span>
                <span><strong>Photorealistic Accuracy:</strong> Our AI generates images indistinguishable from high-quality photographs, perfect for professional presentations and marketing materials.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#084248] mr-2">•</span>
                <span><strong>Customizable Styles:</strong> Easily adjust lighting, textures, and atmospheres to match specific brand aesthetics or creative visions.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#084248] mr-2">•</span>
                <span><strong>Rapid Generation:</strong> Create high-quality, complex images in seconds, dramatically reducing production time and costs.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#084248] mr-2">•</span>
                <span><strong>Scalable Resolution:</strong> Generate images from thumbnail sizes to ultra-high resolution prints without losing quality.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#084248] mr-2">•</span>
                <span><strong>Consistent Quality:</strong> Maintain a high standard of realism across multiple generations, ensuring cohesive visual narratives.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#084248] mr-2">•</span>
                <span><strong>Ethical Considerations:</strong> Built-in safeguards ensure responsible image generation, adhering to ethical guidelines and copyright considerations.</span>
              </li>
            </ul>
          </div>
        </AnimatedSection>
      </section>

      {/* Full-size Image Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <Modal 
            src={selectedPhoto.src} 
            alt={selectedPhoto.alt} 
            onClose={() => setSelectedPhoto(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CombinedCaseStudyPage;