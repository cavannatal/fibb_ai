import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage/HomePage';
import WhoAreWePage from './pages/WhoAreWePage/WhoAreWePage';
import EventsPage from './pages/EventsPage/EventsPage';
import FAQPage from './pages/FAQ/FAQPage';
import CaseStudyPage from './pages/CaseStudies/CaseStudyPage';
import BusinessCaseStudyPage from './pages/CaseStudies/BusinessCaseStudyPage';
import SubscriptionPage from './pages/SubscriptionPage/SubscriptionPage';
import CameraPage from './pages/CameraPage/CameraPage';
import PhotoCaptureComponent from './pages/CameraPage/PhotoCaptureComponent';
import ProtectedRoute from './components/ProtectedRoute';
import BlogPage from './pages/Blog/BlogPage';
import SignupPage from './pages/SignUpPage/SignupPage';
import PhotoGallery from './pages/HomePage/components/photoGallery';
import TOSPage from './pages/TOSPage/TOSPage';

import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsExports);

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      setUser(null);
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#efedee]" style={{ fontFamily: 'Nunito, sans-serif' }}>
        <NavBar signOut={handleSignOut} user={user} />
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
            <Route path="/photo-gallery" element={<PhotoGallery />} />
            <Route path="/terms-of-service" element={<TOSPage />} />
            <Route path="/signup" element={
              <Authenticator>
                {({ user }) => {
                  setUser(user);
                  return <SignupPage />;
                }}
              </Authenticator>
            } />
            <Route 
              path="/cam" 
              element={
                <ProtectedRoute user={user}>
                  <CameraPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/photo-capture" 
              element={
                <ProtectedRoute user={user}>
                  <PhotoCaptureComponent />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;