import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LayoutDashboard, Settings, CreditCard, LogOut, Image, ChevronDown } from 'lucide-react';
import FibbLogoBlack from './images/FibbLogoBlack.svg';

interface NavBarProps {
  user?: any;
  signOut: () => Promise<void>;
}

const NavBar: React.FC<NavBarProps> = ({ user, signOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { name: "Our Team", path: "/team" },
    { name: "fibbCompute", path: "/compute"},
    { name: "Marketplace", path: "/marketplace" },
    { name: "Services", path: '/portfolio' },
    { name: "Subscribe", path: "/subscribe" },
    ...(user ? [{ name: "Create", path: "/get-started" }] : []),
  ];

  const profileMenuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={16} />, path: '/profile' },
    { name: 'Photo Gallery', icon: <Image size={16} />, path: '/photo-gallery' },
    { name: 'Billing', icon: <CreditCard size={16} />, path: 'https://payments.fibb.ai/p/login/bIYbK836g9UA7ew144' },
  ];

  const handleSignUp = () => {
    navigate('/signup');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <nav className="bg-gray-100 shadow-lg" style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img src={FibbLogoBlack} alt="fibb.ai logo" className="h-10" />
          </Link>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-[#084248] transition duration-300">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-1 lg:space-x-2 xl:space-x-4 flex-wrap justify-end">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="py-2 px-1 lg:px-2 text-sm lg:text-base text-gray-600 hover:text-[#084248] transition duration-300 whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  ref={profileButtonRef}
                  onClick={toggleProfileDropdown}
                  className="py-2 px-1 lg:px-2 text-sm lg:text-base text-gray-600 hover:text-[#084248] transition duration-300 font-semibold whitespace-nowrap flex items-center"
                  aria-haspopup="true"
                  aria-expanded={isProfileDropdownOpen}
                >
                  <User size={20} />
                  <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${isProfileDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>
                {isProfileDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    {profileMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
                        role="menuitem"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.name}
                      </Link>
                    ))}
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        signOut();
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
                      role="menuitem"
                    >
                      <LogOut size={16} className="mr-2" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleSignUp}
                className="py-2 px-1 lg:px-2 text-sm lg:text-base text-gray-600 hover:text-[#084248] transition duration-300 font-semibold whitespace-nowrap"
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center py-2 px-4 text-base text-gray-600 hover:text-[#084248] hover:bg-gray-100 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <>
              {profileMenuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="flex items-center py-2 px-4 text-base text-gray-600 hover:text-[#084248] hover:bg-gray-100 transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
                className="flex items-center w-full text-left py-2 px-4 text-base text-red-600 hover:bg-gray-100 transition duration-300 font-semibold"
              >
                <LogOut size={16} className="mr-2" />
                Log Out
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                handleSignUp();
                setIsMenuOpen(false);
              }}
              className="flex items-center w-full text-left py-2 px-4 text-base text-gray-600 hover:text-[#084248] hover:bg-gray-100 transition duration-300 font-semibold"
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;