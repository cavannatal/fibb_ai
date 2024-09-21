import { Link } from 'react-router-dom';

const NavBar = () => {
  const navItems = [
    { name: "Who We Are", path: "/who-we-are" },
    { name: "Mission Statement", path: "/mission" },
  ];

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/" className="flex items-center py-4 px-2">
              <span className="font-semibold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-600">fibb.ai</span>
            </Link>
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
        </div>
      </div>
      <div className="md:hidden bg-transparent">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center space-x-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="py-2 px-2 text-sm text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-400 hover:to-blue-600 transition duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;