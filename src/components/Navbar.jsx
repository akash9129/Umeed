import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Phone, Gift, LogOut, LogIn, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useDonations } from '../context/DonationContext';
import { SITE_CONFIG } from '../lib/config';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { openDonateModal, getBasketCount } = useDonations();
  const basketCount = getBasketCount();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: '10 Seva Kits', path: '/causes' },
    { name: 'Celebrate With Kids', path: '/celebrate', isSpecial: true },
    { name: 'Our Story', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-200">
              उम्मीद की किरण फाउंडेशन • PAN: <strong className="text-white font-mono">{SITE_CONFIG.org.pan}</strong> • Kamachha, Varanasi
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <a 
              href={`https://wa.me/${SITE_CONFIG.org.whatsapp}?text=Namaste%20Umeed%20Foundation`} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: {SITE_CONFIG.org.phone}</span>
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-[11px] bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold px-2 py-0.5 rounded">
              80G Tax Exemption
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div 
              className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500 shadow-sm bg-white flex-shrink-0 group-hover:scale-105 transition-transform"
              style={{ width: '48px', height: '48px' }}
            >
              <img 
                src="/logo.jpg" 
                alt="Umeed Ki Kiran Foundation Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight group-hover:text-emerald-600 transition-colors">
                UMEED KI KIRAN
              </span>
              <span className="text-[10px] font-black tracking-widest text-emerald-700 uppercase leading-none mt-0.5">
                FOUNDATION (TRUST)
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors relative py-1 flex items-center gap-1.5 ${
                    active 
                      ? 'text-emerald-700 font-bold' 
                      : 'text-slate-600 hover:text-emerald-600'
                  } ${link.isSpecial ? 'text-orange-600 hover:text-orange-700' : ''}`}
                >
                  {link.isSpecial && <Gift className="w-3.5 h-3.5 text-orange-500" />}
                  <span>{link.name}</span>
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-4">
            
            {/* User Login State */}
            {user ? (
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center gap-2 py-1 px-2.5 rounded-full bg-slate-50 border border-slate-200"
                  title={`Logged in as ${user.name}`}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-emerald-500"
                  />
                  <span className="text-xs font-bold text-slate-800 max-w-[80px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-xs font-bold text-slate-700 hover:text-emerald-700 px-3.5 py-2 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1.5 border border-slate-200"
              >
                <LogIn className="w-3.5 h-3.5 text-emerald-600" />
                <span>Login</span>
              </Link>
            )}

            {/* Giving Cart / Seva Basket Icon */}
            <Link
              to="/checkout"
              className="relative p-2 text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-full transition-colors"
              title="View Seva Cart & Customization"
            >
              <ShoppingBag className="w-5 h-5" />
              {basketCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {basketCount}
                </span>
              )}
            </Link>

            {/* Donate Button - Vibrant Red as per user request & Ihskas reference */}
            <button
              onClick={() => openDonateModal()}
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-md shadow-rose-600/25 hover:shadow-lg transition-all active:scale-95"
            >
              <Heart className="w-4 h-4 fill-white text-white" />
              <span>Donate Now</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => openDonateModal()}
              className="bg-rose-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-xs"
            >
              Donate
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-xl text-sm font-semibold ${
                isActive(link.path)
                  ? 'text-emerald-700 bg-emerald-50 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              } ${link.isSpecial ? 'text-orange-600' : ''}`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-rose-600"
              >
                Sign Out ({user.name.split(' ')[0]})
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-emerald-600"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}

    </header>
  );
}
