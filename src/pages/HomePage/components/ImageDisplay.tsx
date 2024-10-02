import React, { useEffect, useRef } from 'react';
import img1 from '../images/img1.png';
import img2 from '../images/img2.png';
import img3 from '../images/img3.png';
import img4 from '../images/img4.png';
import img5 from '../images/img5.png';
import img6 from '../images/img6.png';
import img7 from '../images/img7.png';
import img8 from '../images/img8.png';

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

const ImageScrollBar: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const scroll = () => {
      if (scrollElement.scrollLeft >= scrollElement.scrollWidth / 2) {
        scrollElement.scrollLeft = 0;
      } else {
        scrollElement.scrollLeft += 1;
      }
    };

    const animationId = setInterval(scroll, 20);

    return () => clearInterval(animationId);
  }, []);

  return (
    <div className="w-full bg- py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={scrollRef}
          className="whitespace-nowrap"
          style={{ 
            height: '300px',
            overflow: 'hidden'
          }}
        >
          {[...images, ...images].map((image, index) => (
            <div 
              key={index} 
              className="inline-block mx-4 h-full"
              style={{ width: '300px' }}
            >
              <img 
                src={image} 
                alt={`Brand ${index % images.length + 1}`} 
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageScrollBar;