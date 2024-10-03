import React from 'react';
import Header from './components/Header';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import LaunchBanner from './components/LaunchBanner';
import MissionStatement from './components/MissionStatement';
import ImageDisplay from './components/ImageDisplay';

const HomePage: React.FC = () => {
  return (
    <div className="">
      <LaunchBanner/>
      <Header />
      <main className="py-2">
        <div className="space-y-16">
          <Features />
          <HowItWorks />
          <ImageDisplay/>
          <MissionStatement/>
          
        </div>
      </main>
    </div>
  );
};

export default HomePage;