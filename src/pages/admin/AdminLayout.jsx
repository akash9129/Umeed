import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  HeartHandshake, 
  FolderHeart, 
  Users, 
  MessageSquare, 
  Settings, 
  ExternalLink,
  ShieldCheck,
  LogOut,
  Database
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { isSupabaseConfigured } from '../../lib/supabase';

export default function AdminLayout() {
  const location = useLocation();
  const { user, isAdmin, loginAsAdminDemo, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Manage Campaigns', path: '/admin/campaigns', icon: FolderHeart },
    { name: 'Donations & Donors', path: '/admin/donations', icon: HeartHandshake },
    { name: 'Volunteer Requests', path: '/admin/volunteers', icon: Users },
    { name: 'Inquiries & Messages', path: '/admin/messages', icon: MessageSquare },
    { name: 'Settings & Supabase', path: '/admin/settings', icon: Settings },
  ];

  const isCurrent = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  // If user is not admin, provide 1-click test access button
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-amber-100 text-umeed-gold-600 rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-umeed-blue-900">Admin Panel Access</h2>
            <p className="text-xs text-slate-600 mt-2">
              This area is reserved for Umeed Ki Kiran Foundation administrators. Click below to enter demo mode or sign in with admin credentials.
            </p>
          </div>

          <button
            onClick={loginAsAdminDemo}
            className="w-full py-3.5 bg-umeed-blue-900 hover:bg-umeed-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-colors"
          >
            Enter Admin Panel (1-Click Demo)
          </button>

          <Link
            to="/"
            className="inline-block text-xs text-slate-500 hover:text-slate-900 font-semibold underline"
          >
            Return to Public Website
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-umeed-blue-900 text-slate-300 flex flex-col justify-between flex-shrink-0">
        
        <div>
          {/* Brand */}
          <div className="p-5 border-b border-slate-700/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-umeed-gold-400 bg-white p-0.5 flex-shrink-0">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <span className="block text-sm font-extrabold text-white tracking-wide">
                UMEED ADMIN
              </span>
              <span className="block text-[10px] text-umeed-gold-400 uppercase font-semibold">
                Foundation Console
              </span>
            </div>
          </div>

          {/* Database indicator */}
          <div className="px-5 py-3 bg-slate-800/60 border-b border-slate-700/40 flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Supabase DB:</span>
            </span>
            <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
              isSupabaseConfigured ? 'bg-emerald-900/60 text-emerald-300' : 'bg-amber-900/60 text-amber-300'
            }`}>
              {isSupabaseConfigured ? 'Connected' : 'Demo Local'}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isCurrent(item);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-umeed-gold-500 text-umeed-blue-900 font-bold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile & Exit */}
        <div className="p-4 border-t border-slate-700/60 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-between w-full px-3 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 rounded-xl transition-colors"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-umeed-gold-400" />
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-slate-800/50 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}
