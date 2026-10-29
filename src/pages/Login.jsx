import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ShieldCheck, Sparkles, LogIn, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SITE_CONFIG } from '../lib/config';

export default function Login() {
  const { user, signInWithGoogle, signInWithEmail, loginAsAdminDemo } = useAuth();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to profile or admin
  if (user) {
    return (
      <div className="py-20 max-w-md mx-auto px-4 text-center space-y-5">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">You are already signed in!</h2>
        <p className="text-xs text-slate-600">
          Logged in as <strong className="text-slate-900 font-bold">{user.name}</strong> ({user.email})
        </p>

        <div className="flex flex-col gap-2 pt-2">
          {user.role === 'admin' ? (
            <Link
              to="/admin"
              className="py-3 px-4 bg-umeed-blue-900 text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800"
            >
              Go to Admin Dashboard
            </Link>
          ) : (
            <Link
              to="/profile"
              className="py-3 px-4 bg-umeed-blue-900 text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800"
            >
              Go to My Profile & Receipts
            </Link>
          )}

          <Link
            to="/"
            className="py-2 text-xs text-slate-500 hover:text-slate-900 underline"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithGoogle();
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Google Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide email and password.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await signInWithEmail(email, password);
      if (email.toLowerCase().includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminDemo = () => {
    loginAsAdminDemo();
    navigate('/admin');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50/60 to-white">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-200">
        
        {/* Header with Logo */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400 p-0.5 bg-white mx-auto shadow-md">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain rounded-full" />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 block">
            Umeed Ki Kiran Foundation
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            {isSignUp ? 'Create Supporter Account' : 'Sign In to Your Account'}
          </h2>
          <p className="text-xs text-slate-500">
            Track your donations, download 80G tax receipts, and stay connected with our Varanasi mission.
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3.5 rounded-xl">
            {error}
          </div>
        )}

        {/* 1-Click Google Sign In */}
        <div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3.5 px-4 bg-white border-2 border-slate-200 hover:border-slate-400 rounded-xl shadow-sm hover:shadow text-xs sm:text-sm font-bold text-slate-700 flex items-center justify-center gap-3 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider relative">
            Or with Email
          </span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-colors flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>{isSignUp ? 'Create My Account' : 'Sign In Now'}</span>
          </button>

          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-xs text-amber-700 hover:underline font-semibold"
            >
              {isSignUp 
                ? 'Already have an account? Sign in here' 
                : "Don't have an account? Register for free"}
            </button>
          </div>
        </form>

        {/* 1-Click Fast Admin Login Demo Button */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <button
            type="button"
            onClick={handleAdminDemo}
            className="w-full py-2.5 px-3 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl text-amber-900 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>⚡ 1-Click Fast Login as Foundation Admin</span>
          </button>
          <p className="text-[10px] text-slate-400 text-center">
            Instantly enters the Admin Panel with full access to manage donations, volunteers & causes.
          </p>
        </div>

      </div>
    </div>
  );
}
