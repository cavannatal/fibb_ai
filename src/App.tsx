import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage/HomePage';
import WhoAreWePage from './pages/WhoAreWePage/WhoAreWePage';
import MissionStatementPage from './pages/MissionStatementPage/MissionStatementPage';
import EventsPage from './pages/EventsPage/EventsPage';
import FAQPage from './pages/FAQ/FAQPage';
import CaseStudyPage from './pages/CaseStudies/CaseStudyPage';


const App: React.FC = () => {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN!}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <Router>
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-white" style={{ fontFamily: 'Nunito, sans-serif' }}>
          <NavBar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/who-we-are" element={<WhoAreWePage />} />
              <Route path="/mission" element={<MissionStatementPage />} />
              <Route path="/FAQ" element={<FAQPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/case-study" element={<CaseStudyPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Auth0Provider>
  );
};

export default App;