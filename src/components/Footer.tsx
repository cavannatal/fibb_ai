import React from 'react';
import { Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center">
          <div className="order-2 md:order-1 mt-4 md:mt-0">
            <p className="text-gray-600 text-sm">&copy; 2024 fibb.ai. All rights reserved.</p>
          </div>
          <div className="order-1 md:order-2 flex flex-col md:flex-row items-center md:space-x-6">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="/faq" className="text-gray-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-400 hover:to-blue-600 transition duration-300">
                FAQ
              </a>
              <a href="/terms-of-service" className="text-gray-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-400 hover:to-blue-600 transition duration-300">
                Terms of Service
              </a>
            </div>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/company/fibb-ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://www.instagram.com/fibb.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;