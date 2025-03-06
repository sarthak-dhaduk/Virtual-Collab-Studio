import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './App/sign-up/signup';
import SignIn from './App/sign-in/signin';
import ForgotPassword from './App/forgot-password/forgotppass';
import ResetPass from './App/reset-password/resetpass';
import DashboardPage from './App/dashboard/dashboard';
import BlogPage from './App/blog/blog';
import AboutPage from './App/about/about';
import ContactUs from './App/contact/contact';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
};

export default App;
