import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Who We Are", path: "/who-we-are" },
    { name: "Mission Statement", path: "/mission" },
    /*{ name: "FAQ", path: "/faq" },
    { name: "Events", path: "/events" },
    { name: "Mission Statement", path: "/mission" },*/

  ];

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-600">fibb.ai</span>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`py-4 px-2 text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-400 hover:to-blue-600 transition duration-300 ${
                  index >= navItems.length - 2 ? 'ml-4' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
              <svg
                className="w-6 h-6 text-gray-300 hover:text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div 
          className="mobile-menu md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path}
              className="block py-2 px-4 text-sm text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-400 hover:to-blue-600 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default NavBar;