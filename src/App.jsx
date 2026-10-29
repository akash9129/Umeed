import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DonateModal from './components/DonateModal';
import AuthModal from './components/AuthModal';
import StickyBasketBar from './components/StickyBasketBar';

import Home from './pages/Home';
import Causes from './pages/Causes';
import Celebrate from './pages/Celebrate';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Login from './pages/Login';
import RefundPolicy from './pages/RefundPolicy';
import Checkout from './pages/Checkout';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pb-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/causes" element={<Causes />} />
          <Route path="/celebrate" element={<Celebrate />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>

      <Footer />

      {/* Sticky Seva Basket Bar at bottom */}
      <StickyBasketBar />

      {/* Global Modals */}
      <DonateModal />
      <AuthModal />
    </div>
  );
}
