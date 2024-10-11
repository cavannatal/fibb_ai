import React, { useState, useRef, useEffect } from 'react';
import TokenDisplay from '../CreatePage/ImageGen/tokenSystem/TokenDisplay';
import ComingSoon from './components/ComingSoon';
import PhotoGallery from './components/PhotoGallery';
import { LayoutDashboard, Settings, CreditCard, LogOut, Image, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProfileProps {
  user: any; // You might want to replace 'any' with a more specific type if available
  signOut: () => Promise<void>;
}

const Profile: React.FC<ProfileProps> = ({ user, signOut }) => {
  const [activeItem, setActiveItem] = useState<string>('Dashboard');
  const [showArrows, setShowArrows] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Photo Gallery', icon: <Image size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
    { name: 'Billing', icon: <CreditCard size={20} /> },
  ];

  const renderContent = () => {
    switch (activeItem) {
      case 'Dashboard':
        return <TokenDisplay />;
      case 'Photo Gallery':
        return <PhotoGallery />;
      default:
        return <ComingSoon featureName={activeItem} />;
    }
  };

  const scrollMenu = (direction: 'left' | 'right') => {
    if (menuRef.current) {
      const scrollAmount = 100;
      menuRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (menuRef.current) {
        setShowArrows(menuRef.current.scrollWidth > menuRef.current.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Mobile horizontal menu */}
      <div className="md:hidden bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Welcome, {user.username}</h2>
        </div>
        <div className="relative">
          {showArrows && (
            <>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 p-1 rounded-r z-10">
                <button onClick={() => scrollMenu('left')} className="text-gray-600">
                  <ChevronLeft size={20} />
                </button>
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 p-1 rounded-l z-10">
                <button onClick={() => scrollMenu('right')} className="text-gray-600">
                  <ChevronRight size={20} />
                </button>
              </div>
            </>
          )}
          <div 
            ref={menuRef} 
            className={`flex overflow-x-auto scrollbar-hide py-2 ${!showArrows ? 'justify-center' : ''}`}
          >
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`flex-shrink-0 flex flex-col items-center p-3 cursor-pointer ${
                  activeItem === item.name
                    ? 'text-blue-600'
                    : 'text-gray-600'
                }`}
                onClick={() => setActiveItem(item.name)}
              >
                <span className="mb-1">{item.icon}</span>
                <span className="text-xs">{item.name}</span>
              </div>
            ))}
            <div
              className="flex-shrink-0 flex flex-col items-center p-3 cursor-pointer text-red-600"
              onClick={signOut}
            >
              <span className="mb-1"><LogOut size={20} /></span>
              <span className="text-xs">Log Out</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block w-64 bg-white shadow-lg overflow-y-auto">
        <nav className="mt-8">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center p-4 cursor-pointer ${
                activeItem === item.name
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveItem(item.name)}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
          <div
            className="flex items-center p-4 cursor-pointer text-red-600 hover:bg-red-100"
            onClick={signOut}
          >
            <span className="mr-3"><LogOut size={20} /></span>
            <span>Log Out</span>
          </div>
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4 md:p-10 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Profile;