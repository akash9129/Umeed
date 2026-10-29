import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Lock, User, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useDonations } from '../context/DonationContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen } = useDonations();
  const { signInWithGoogle, signInWithEmail, loginAsAdminDemo } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithGoogle();
      setIsAuthModalOpen(false);
    } catch (err) {
      setError(err.message || 'Google Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    try {
      setLoading(true);
      setError('');
      await signInWithEmail(email, password);
      setIsAuthModalOpen(false);
    } catch (err) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminDemo = () => {
    loginAsAdminDemo();
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-umeed-blue-900 to-blue-900 text-white p-6 relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 text-slate-300 hover:text-white p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-umeed-gold-400 bg-white p-0.5 flex-shrink-0">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Welcome to Umeed</h2>
              <p className="text-xs text-umeed-gold-300">Sign in to track donations & download 80G tax receipts</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3 px-4 bg-white border border-slate-300 hover:border-slate-400 rounded-xl shadow-sm hover:shadow text-xs sm:text-sm font-bold text-slate-700 flex items-center justify-center gap-3 transition-all"
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

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider relative">
              Or with Email
            </span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-umeed-gold-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-umeed-gold-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-umeed-blue-900 hover:bg-umeed-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow"
            >
              {mode === 'login' ? 'Sign In to Account' : 'Create Free Account'}
            </button>
          </form>

          {/* Quick Admin Demo Button */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleAdminDemo}
              className="w-full py-2.5 px-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-amber-900 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-umeed-gold-600" />
              <span>⚡ 1-Click Test Login as Administrator</span>
            </button>
            <p className="text-[10px] text-slate-400 text-center mt-1">
              Instantly unlocks the full `/admin` dashboard with sample controls.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
