import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import FibbLogoBlack from './images/FibbLogoBlack.svg';

interface NavBarProps {
  signOut?: () => void;
  user?: any; // We're using 'any' here as the exact type is not exported from Amplify
}

const NavBar: React.FC<NavBarProps> = ({ signOut, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Team", path: "/team" },
    { name: "Events", path: "/events" },
    { name: "Portfolio", path: '/portfolio' },
    { name: "Blog", path: "/blog" },
    { name: "Your Gallery", path: "/photo-gallery" },
    { name: "Subscribe", path: "/subscribe" },
    ...(user ? [{ name: "Create", path: "/cam" }] : []),
  ];

  const handleAuth = () => {
    if (user && signOut) {
      signOut();
    } else {
      navigate('/signup');
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-100 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img src={FibbLogoBlack} alt="fibb.ai logo" className="h-10" />
          </Link>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800 transition duration-300">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="py-2 px-2 text-gray-600 hover:text-gray-800 transition duration-300"
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={handleAuth}
              className="py-2 px-2 text-gray-600 hover:text-gray-800 transition duration-300 font-semibold"
            >
              {user ? 'Log Out' : 'Sign Up'}
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
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="block py-2 px-4 text-base text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => {
              handleAuth();
              setIsMenuOpen(false);
            }}
            className="w-full text-left py-2 px-4 text-base text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition duration-300 font-semibold"
          >
            {user ? 'Log Out' : 'Sign Up'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;