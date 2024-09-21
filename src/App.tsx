import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WhoAreWePage from './components/WhoAreWePage';
import LaunchBanner from './components/LaunchBanner';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-white "style={{ fontFamily: 'Nunito, sans-serif' }}>
        <NavBar />
        <LaunchBanner/>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/who-we-are" element={<WhoAreWePage />} />
            
        
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;