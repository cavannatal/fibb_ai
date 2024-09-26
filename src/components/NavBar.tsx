import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

const NavBar: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileCaseStudiesOpen, setIsMobileCaseStudiesOpen] = useState(false);

  const navItems = [
    { name: "Who We Are", path: "/who-we-are" },
    { name: "Events", path: "/events" },
    {
      name: "Case Studies",
      children: [
        { name: "Consumer", path: "/case-study" },
        { name: "Business", path: "/business-case-study" },
      ],
    },
    { name: "Blog", path: "/blog" },
    { name: "Subscribe", path: "/subscribe" },
    //Only works right now with autnetication needs fixing when subscribe plans
    ...(isAuthenticated ? [{ name: "Create", path: "/cam" }] : []),
  ];

  const handleAuth = () => {
    if (isAuthenticated) {
      logout({ logoutParams: { returnTo: window.location.origin } });
    } else {
      loginWithRedirect();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMobileCaseStudies = () => {
    setIsMobileCaseStudiesOpen(!isMobileCaseStudiesOpen);
  };

  return (
    <nav className="shadow-lg ">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <span className="font-semibold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-600">fibb.ai</span>
          </Link>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-400 hover:to-blue-600 transition duration-300">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navItems.map((item, index) => (
              item.children ? (
                <div key={index} className="relative group">
                  <button
                    className={`py-4 px-2 text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-400 hover:to-blue-600 transition duration-300 flex items-center ${
                      index === 0 ? 'md:ml-4' : ''
                    }`}
                  >
                    {item.name}
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      {item.children.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className="block px-4 py-2 text-sm text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-400 hover:to-blue-600 transition duration-300"
                          role="menuitem"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  to={item.path}
                  className={`py-4 px-2 text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-400 hover:to-blue-600 transition duration-300 ${
                    index === 0 ? 'md:ml-4' : ''
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
            <button
              onClick={handleAuth}
              className="ml-4 py-4 px-2 text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-400 hover:to-blue-600 transition duration-300"
            >
              {isAuthenticated ? 'Log Out' : 'Sign Up / Login'}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item, index) => (
            item.children ? (
              <div key={index}>
                <button
                  onClick={toggleMobileCaseStudies}
                  className="w-full text-left py-2 px-4 text-base text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-400 hover:to-blue-600 transition duration-300 flex items-center justify-between"
                >
                  {item.name}
                  {isMobileCaseStudiesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {isMobileCaseStudiesOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {item.children.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className="block py-2 px-4 text-sm text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-400 hover:to-blue-600 transition duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={index}
                to={item.path}
                className="block py-2 px-4 text-base text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-400 hover:to-blue-600 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            )
          ))}
          <button
            onClick={() => {
              handleAuth();
              setIsMenuOpen(false);
            }}
            className="w-full text-left py-2 px-4 text-base text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-400 hover:to-blue-600 transition duration-300"
          >
            {isAuthenticated ? 'Log Out' : 'Sign Up / Login'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;