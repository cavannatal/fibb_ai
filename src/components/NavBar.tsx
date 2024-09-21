import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const navItems = [
    { name: "Who We Are", path: "/who-we-are" },
    { name: "Mission Statement", path: "/mission" },
    { name: "Events", path: "/events" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="py-4 flex justify-center md:justify-start">
            <Link to="/" className="flex items-center">
              <span className="font-semibold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-600">fibb.ai</span>
            </Link>
          </div>
          <div className="md:hidden grid grid-cols-2 gap-2 pb-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="py-2 px-2 text-center text-sm text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-400 hover:to-blue-600 transition duration-300  rounded"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`py-4 px-2 text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-400 hover:to-blue-600 transition duration-300 ${
                  index === 0 ? 'md:ml-4' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            {!isAuthenticated ? (
              <button
                onClick={() => loginWithRedirect()}
                className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
              >
                Log In
              </button>
            ) : (
              <button
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;