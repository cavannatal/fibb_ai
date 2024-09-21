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


const App: React.FC = () => {
  return (
    <Auth0Provider
      domain="dev-lhwdzzr2qj2rsblv.us.auth0.com"
      clientId="gWZG4iKSzMicWfsbOTeLdapFunLyqZoo"
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
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Auth0Provider>
  );
};

export default App;