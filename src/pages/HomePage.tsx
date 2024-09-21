import React from 'react';
import Header from '../components/Header';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';

const HomePage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <Header />
      <main className="py-12">
        <div className="space-y-20">
          <Features />
          <HowItWorks />
        </div>
      </main>
    </div>
  );
};

export default HomePage;