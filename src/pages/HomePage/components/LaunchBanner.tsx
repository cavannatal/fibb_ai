import React from 'react';
import { Rocket } from 'lucide-react';

interface StarProps {
  className?: string;
  style?: React.CSSProperties;
}

const Star: React.FC<StarProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const LaunchBanner: React.FC = () => {
  return (
    <div className="w-full bg-[#024751] text-white relative overflow-hidden" style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>
      <div className="absolute top-0 left-0 w-full h-full">
        {[...Array(20)].map((_, i) => {
          const size = Math.random() > 0.5 ? '2' : '3';
          const opacity = Math.floor(Math.random() * 40) + 30;
          const top = `${Math.random() * 100}%`;
          const left = `${Math.random() * 100}%`;
          const animationDuration = `${Math.random() * 2 + 1}s`;

          return (
            <Star
              key={i}
              className={`absolute h-${size} w-${size} text-[#F79302]`}
              style={{
                top,
                left,
                opacity: opacity / 100,
                animation: `twinkle ${animationDuration} ease-in-out infinite`
              }}
            />
          );
        })}
      </div>
      <div className="max-w-6xl mx-auto py-3 px-4 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center">
            <h2 className="text-sm sm:text-base font-bold mr-2">OFFICIALLY LAUNCHED</h2>
            <Rocket className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="flex justify-center items-center">
            <span className="text-lg sm:text-xl font-bold">We're live!</span>
          </div>

        </div>
      </div>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default LaunchBanner;