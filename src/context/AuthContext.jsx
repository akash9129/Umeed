import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check saved session in localStorage first (for smooth UX & mock mode)
    const savedUser = localStorage.getItem('umeed_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setIsAdmin(parsed.role === 'admin' || parsed.email?.includes('admin'));
      } catch (e) {
        console.error(e);
      }
    }

    // If Supabase is configured with real keys, listen to auth changes
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const authUser = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
            avatar: session.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${session.user.email}`,
            role: session.user.email?.toLowerCase().includes('admin') ? 'admin' : 'user'
          };
          setUser(authUser);
          setIsAdmin(authUser.role === 'admin');
          localStorage.setItem('umeed_user', JSON.stringify(authUser));
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const authUser = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
            avatar: session.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${session.user.email}`,
            role: session.user.email?.toLowerCase().includes('admin') ? 'admin' : 'user'
          };
          setUser(authUser);
          setIsAdmin(authUser.role === 'admin');
          localStorage.setItem('umeed_user', JSON.stringify(authUser));
        } else {
          setUser(null);
          setIsAdmin(false);
          localStorage.removeItem('umeed_user');
        }
      });

      return () => subscription.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  // Google Login via Supabase OAuth (with fallback simulation)
  const signInWithGoogle = async () => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } else {
      // Graceful instant mock login for testing without waiting for Supabase credentials
      const mockGoogleUser = {
        id: 'usr-google-101',
        name: 'Aarav Sharma',
        email: 'aarav.sharma@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        role: 'user'
      };
      setUser(mockGoogleUser);
      setIsAdmin(false);
      localStorage.setItem('umeed_user', JSON.stringify(mockGoogleUser));
      return mockGoogleUser;
    }
  };

  // Email / Password Login
  const signInWithEmail = async (email, password) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    } else {
      const isMockAdmin = email.toLowerCase().includes('admin');
      const mockUser = {
        id: isMockAdmin ? 'admin-1' : 'user-' + Date.now(),
        name: isMockAdmin ? 'Administrator (Umeed)' : email.split('@')[0],
        email: email,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
        role: isMockAdmin ? 'admin' : 'user'
      };
      setUser(mockUser);
      setIsAdmin(isMockAdmin);
      localStorage.setItem('umeed_user', JSON.stringify(mockUser));
      return mockUser;
    }
  };

  // Fast Admin Demo Switch for testing Admin Panel
  const loginAsAdminDemo = () => {
    const adminUser = {
      id: 'admin-umeed-01',
      name: 'Super Admin (Umeed Trust)',
      email: 'admin@umeedkikiran.org',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      role: 'admin'
    };
    setUser(adminUser);
    setIsAdmin(true);
    localStorage.setItem('umeed_user', JSON.stringify(adminUser));
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('umeed_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin,
      loading,
      signInWithGoogle,
      signInWithEmail,
      loginAsAdminDemo,
      logout,
      isSupabaseConfigured
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
