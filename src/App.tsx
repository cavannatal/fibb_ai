import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage/HomePage';
import WhoAreWePage from './pages/WhoAreWePage/WhoAreWePage';
import EventsPage from './pages/EventsPage/EventsPage';
import FAQPage from './pages/FAQ/FAQPage';
import SubscriptionPage from './pages/SubscriptionPage/SubscriptionPage';
import CameraPage from './pages/CameraPage/CameraPage';
import ProtectedRoute from './components/ProtectedRoute';
import BlogPage from './pages/Blog/BlogPage';
import PhotoGallery from './pages/PhotoGalleryPage/photoGallery';
import TOSPage from './pages/TOSPage/TOSPage';
import MarketplaceSoon from './pages/Marketplace/MarketPlaceTemp';
import ImageGen from './pages/CreatePage/ImageGen/ImageGen';
import CreatePage from './pages/CreatePage/CreatePage';
import Portfolio from './pages/CaseStudies/Services';
import Signup, { checkUser, handleSignOut } from './pages/SignupPage/SignupPage';
import TempSub from './pages/SubscriptionPage/SubscriptionTempPage';
import GuidedProcess from './pages/CameraPage/GuidedProcess';       
import ComputePage from './pages/ComputePage/ComputePage';
import CompletionPage from './pages/CameraPage/CompletionPage';
import Profile from './pages/ProfilePage/ProfilePage';     
import TokenDisplay from './pages/CreatePage/ImageGen/tokenSystem/TokenDisplay'   



import awsExports from './aws-exports';

Amplify.configure(awsExports);

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const initUser = async () => {
      const currentUser = await checkUser();
      setUser(currentUser);
    };
    initUser();
  }, []);

  const signOutUser = async () => {
    await handleSignOut();
    setUser(null);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <NavBar user={user} signOut={signOutUser} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/team" element={<WhoAreWePage />} />
            <Route path="/FAQ" element={<FAQPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/subscribe" element={<SubscriptionPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/photo-gallery" element={<PhotoGallery />} />
            <Route path="/terms-of-service" element={<TOSPage />} />
            <Route path="/marketplace" element={<MarketplaceSoon />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/compute" element={<ComputePage />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute user={user}>
                  <Profile user={user} signOut={signOutUser} />
                </ProtectedRoute>
              } 
            />
            <Route path="/tempsub" element={<TempSub />} />
            <Route path="/completion" element={<CompletionPage/>} />
            <Route path="/signup" element={<Signup onUserChange={setUser} />} />
            <Route 
              path="/cam" 
              element={
                <ProtectedRoute user={user}>
                  <CameraPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/guided" 
              element={
                <ProtectedRoute user={user}>
                  <GuidedProcess />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/image-gen" 
              element={
                <ProtectedRoute user={user}>
                  <ImageGen />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/get-started" 
              element={
                <ProtectedRoute user={user}>
                  <CreatePage />
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