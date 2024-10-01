import React, { useEffect, useState, ChangeEvent } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Authenticator, CheckboxField } from '@aws-amplify/ui-react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage/HomePage';
import WhoAreWePage from './pages/WhoAreWePage/WhoAreWePage';
import EventsPage from './pages/EventsPage/EventsPage';
import FAQPage from './pages/FAQ/FAQPage';
import CombinedCaseStudyPage from './pages/CaseStudies/CaseStudiesCombined';
import SubscriptionPage from './pages/SubscriptionPage/SubscriptionPage';
import CameraPage from './pages/CameraPage/CameraPage';
import PhotoCaptureComponent from './pages/CameraPage/PhotoCaptureComponent';
import ProtectedRoute from './components/ProtectedRoute';
import BlogPage from './pages/Blog/BlogPage';
import PhotoGallery from './pages/HomePage/components/photoGallery';
import TOSPage from './pages/TOSPage/TOSPage';
import Marketplace from './pages/Marketplace/index'


import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsExports);

const CustomSignUp = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <Authenticator.SignUp.FormFields />
      <CheckboxField
        label="I agree to the Terms of Service and Privacy Policy"
        name="agreement"
        value="agree"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      {!isChecked && (
        <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>
          You must agree to the Terms of Service and Privacy Policy to create an account.
        </p>
      )}
    </>
  );
};

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
            <Route path="/team" element={<WhoAreWePage />} />
            <Route path="/FAQ" element={<FAQPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/portfolio" element={<CombinedCaseStudyPage />} />
            <Route path="/subscribe" element={<SubscriptionPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/photo-gallery" element={<PhotoGallery />} />
            <Route path="/terms-of-service" element={<TOSPage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/signup" element={
              <div className="my-12">
              <Authenticator
                //socialProviders={['facebook', 'google']}
                components={{
                  SignUp: {
                    FormFields: CustomSignUp
                  }
                }}
              >
                {({ signOut, user }) => {
                  if (user) {
                    setUser(user);
                  }
                  return (
                    <div>
                      <HomePage />
                    </div>
                  );
                }}
              </Authenticator>
              </div>
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