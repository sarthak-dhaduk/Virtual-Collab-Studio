import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './App/sign-up/signup';
import SignIn from './App/sign-in/signin';
import ForgotPassword from './App/forgot-password/forgotppass';
import ResetPass from './App/reset-password/resetpass';
import BlogPage from './App/blog/blog';
import AboutPage from './App/about/about';
import ContactUs from './App/contact/contact';
import MainContent from './components/main-content';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('user') !== null);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    setIsLoggedIn(user !== null);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    
    setIsLoggedIn(false);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/dashboard" element={<MainContent isLoggedIn={isLoggedIn} />} />
        <Route path="/blog" element={<BlogPage isLoggedIn={isLoggedIn} />} />
        <Route path="/about" element={<AboutPage isLoggedIn={isLoggedIn} />} />
        <Route path="/contact" element={<ContactUs isLoggedIn={isLoggedIn} />} />
      </Routes>
    </Router>
  );
};

export default App;
