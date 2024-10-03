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
      <ImageDisplay/>
      <main className="py-12">
        <div className="space-y-20">
          <Features />
          <HowItWorks />
          <MissionStatement/>
          
        </div>
      </main>
    </div>
  );
};

export default HomePage;