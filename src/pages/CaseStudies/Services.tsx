import React, { useState } from 'react';
import { motion } from 'framer-motion';

import market1 from './DemPhotos/marketing_1.webp';
import market2 from './DemPhotos/marketing_2.webp';
import market3 from './DemPhotos/marketing_8.webp';
import market4 from './DemPhotos/marketing_4.webp';
import market5 from './DemPhotos/marketing_5.webp';
import market6 from './DemPhotos/marketing_6.webp';
import market7 from './DemPhotos/marketing_7.webp';
import market8 from './DemPhotos/marketing_3.webp';
import market9 from './DemPhotos/marketing_9.webp';

import profess1 from './DemPhotos/professional_1.webp';
import profess2 from './DemPhotos/professional_2.webp';
import profess3 from './DemPhotos/professional_3.webp';
import profess4 from './DemPhotos/professional_4.webp';
import profess5 from './DemPhotos/professional_5.webp';
import profess6 from './DemPhotos/professional_6.webp';
import profess7 from './DemPhotos/professional7.webp';
import profess8 from './DemPhotos/professional_8.webp';
import profess9 from './DemPhotos/professional_9.webp';

import pers1 from './DemPhotos/personalbrand_1.webp';
import pers2 from './DemPhotos/personalbrand_2.webp';
import pers3 from './DemPhotos/personalbrand_3.webp';
import pers4 from './DemPhotos/personalbrand_4.webp';
import pers5 from './DemPhotos/personalbrand_5.webp';
import pers6 from './DemPhotos/personalbrand_6.webp';
import pers7 from './DemPhotos/personalbrand_7.webp';

import ls1 from './DemPhotos/ls1.webp';
import ls2 from './DemPhotos/ls2.webp';
import ls3 from './DemPhotos/ls3.webp';
import ls4 from './DemPhotos/ls4.webp';
import ls5 from './DemPhotos/ls5.webp';
import ls6 from './DemPhotos/ls6.webp';
import ls7 from './DemPhotos/ls7.webp';
import ls8 from './DemPhotos/ls8.webp';
import ls9 from './DemPhotos/ls9.webp';








interface CardProps {
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, color, onClick }) => (
  <div 
    className="flex bg-[#efedea] shadow-md rounded-tl-xl rounded-bl-lg rounded-br-[10rem] overflow-hidden h-full cursor-pointer"
    onClick={onClick}
  >
    <div className={`w-3 ${color} flex-shrink-0`}></div>
    <div className="flex-grow p-4 pt-8 flex flex-col">
      <h3 
        className="text-2xl font-bold mb-4" 
        style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
      >
        {title}
      </h3>
      <p 
        className="text-xl text-gray-600 mb-16 flex-grow"
        style={{ fontFamily: '"Font1", sans-serif' }}
      >
        {description}
      </p>
      <button className="bg-[#f79e07] text-black px-12 py-2 rounded-2xl hover:bg-orange-600 transition-colors text-md self-start mt-4"
      style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
      >
        View
      </button>
    </div>
  </div>
);

interface SectionProps {
  title: string;
  description: string;
  color: string;
  images: string[];
}

const Modal: React.FC<{ src: string; alt: string; onClose: () => void }> = ({ src, alt, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="max-w-4xl max-h-[90vh] overflow-auto">
        <img src={src} alt={alt} className="max-w-full max-h-full object-contain" onClick={(e) => e.stopPropagation()} />
      </div>
    </div>
  );
  
  const Section: React.FC<SectionProps> = ({ title, description, color, images }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
    const getImageClass = (index: number) => {
      if (title === "Personal Brand" && (index === 0 || index === 4)) {
        return "col-span-1 row-span-2 aspect-[1/2]";
      }
      return "aspect-square";
    };
  
    return (
      <div id={title.toLowerCase().replace(/\s+/g, '-')} className="flex flex-col lg:flex-row w-full min-h-[600px] bg-gray-100 py-8 lg:py-12">
        <div className="w-full lg:w-1/3 p-4 lg:p-6">
          <div className="flex bg-[#efedea] shadow-md rounded-tl-xl rounded-bl-lg rounded-br-[10rem] overflow-hidden h-full">
            <div className={`w-3 ${color} flex-shrink-0`}></div>
            <div className="flex-grow p-4 pt-6 flex flex-col">
              <h3 
                className="text-xl lg:text-2xl font-bold mb-2 lg:mb-4" 
                style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
              >
                {title}
              </h3>
              <p 
                className="text-lg lg:text-xl text-gray-600 mb-4 lg:mb-6"
                style={{ fontFamily: '"Font1", sans-serif' }}
              >
                {description}
              </p>
              <div className="mt-auto mb-4 lg:mb-8">
                <button 
                  className={`${color.replace('bg-', 'bg-opacity-20 ')} text-black px-6 py-1.5 lg:px-8 lg:py-2 rounded-full border-2 border-black hover:bg-opacity-30 transition-colors text-sm lg:text-md`}
                  style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/4 p-4 lg:p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4 auto-rows-auto">
            {images.map((src, index) => (
              <div key={index} className={`cursor-pointer ${getImageClass(index)}`} onClick={() => setSelectedImage(src)}>
                <img src={src} alt={`${title} ${index + 1}`} className="w-full h-full object-cover rounded-lg hover:opacity-80 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
        {selectedImage && (
          <Modal 
            src={selectedImage} 
            alt={title} 
            onClose={() => setSelectedImage(null)} 
          />
        )}
      </div>
    );
  };

const PortfolioScreen: React.FC = () => {
  const sections: SectionProps[] = [
    {
      title: "Professional",
      description: "Generate headshots so realistic you'd fool your mother.",
      color: "bg-[#093f48]",
      images:  [
        profess1,
        profess2,
        profess3,
        profess4,
        profess5,
        profess6,
        profess7,
        profess8,
        profess9,

      ],

    },
    {
      title: "Personal Brand",
      description: "Skip endless and exhausting photoshoots. See yourself anywhere with a few clicks.",
      color: "bg-[#ee4036]",
      images: [
        pers3, //2x1
        pers1,
        pers2,
        pers4,
        pers6, //2x1
        pers5,
        pers7,
      ],
    },
    {
      title: "Product & Brand Marketing",
      description: "Instead of wrangling models and photographers, spend your time making your brand even better than it already is.",
      color: "bg-[#cbf59a]",
      images: [
        market1,
        market2,
        market3,
        market4,
        market5,
        market6,
        market7,
        market8,
        market9,

      ],
    },
    {
      title: "Lifestyle",
      description: "We're on our phones too much already. Stay in the moment, create photos later.",
      color: "bg-[#581a3a]",
      images: [
        ls1,
        ls2,
        ls3,
        ls4,
        ls5,
        ls6,
        ls7,
        ls8,
        ls9,
      ],
    },
  ];

  const scrollToSection = (title: string) => {
    const element = document.getElementById(title.toLowerCase().replace(/\s+/g, '-'));
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-16">
      <div className="max-w-7xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
          
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[#084248]"
          style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>
            Services
          </h1>
          <p className="text-xl text-gray-600 mb-32"
          style={{ fontFamily: '"Font1", sans-serif' }}>
            What our advanced technology can do for
          </p>
        </motion.header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {sections.map((section, index) => (
            <Card 
              key={index}
              {...section}
              onClick={() => scrollToSection(section.title)}
            />
          ))}
        </div>
        {sections.map((section, index) => (
          <Section key={index} {...section} />
        ))}
      </div>
    </div>
  );
};

export default PortfolioScreen;