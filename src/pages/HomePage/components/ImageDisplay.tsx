import React from 'react';
import img1 from '../images/img1.webp';
import img2 from '../images/img2.webp';
import img3 from '../images/img3.webp';
import img4 from '../images/img4.webp';
import img5 from '../images/img5.webp';
import img6 from '../images/img6.webp';
import img7 from '../images/img7.webp';
import img8 from '../images/img8.webp';
import img9 from '../images/img9.webp';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const ImageScrollBar: React.FC = () => {
    return (
      <div className="w-full  py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="overflow-hidden" >
              <div 
                className="flex animate-scroll"
                style={{
                  width: `${images.length * 300 * 2}px`,
                  animation: 'scroll 60s linear infinite'
                }}
              >
                {[...images, ...images].map((image, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 mx-4"
                    style={{ width: '300px', height: '300px' }}
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
        </div>
      </div>
    );
  };
  
  export default ImageScrollBar;