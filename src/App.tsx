import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage/HomePage';
import WhoAreWePage from './pages/WhoAreWePage/WhoAreWePage';
import EventsPage from './pages/EventsPage/EventsPage';
import FAQPage from './pages/FAQ/FAQPage';
import CaseStudyPage from './pages/CaseStudies/CaseStudyPage';
import BusinessCaseStudyPage from './pages/CaseStudies/BusinessCaseStudyPage';
import SubscriptionPage from './pages/SubscriptionPage/SubscriptionPage'
import CameraPage from './pages/CameraPage/CameraPage';
import PhotoCaptureComponent from './pages/CameraPage/PhotoCaptureComponent';
import ProtectedRoute from './components/ProtectedRoute';
import BlogPage from './pages/Blog/BlogPage';

const Auth0ProviderWithNavigate = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN!}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Auth0ProviderWithNavigate>
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-white" style={{ fontFamily: 'Nunito, sans-serif' }}>
          <NavBar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/who-we-are" element={<WhoAreWePage />} />
              <Route path="/FAQ" element={<FAQPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/case-study" element={<CaseStudyPage />} />
              <Route path="/business-case-study" element={<BusinessCaseStudyPage />} />
              <Route path="/subscribe" element={<SubscriptionPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/cam" element={
                <ProtectedRoute>
                  <CameraPage />
                </ProtectedRoute>
              } />
              <Route path="/photo-capture" element={
                <ProtectedRoute>
                  <PhotoCaptureComponent />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Auth0ProviderWithNavigate>
    </Router>
  );
};

export default App;