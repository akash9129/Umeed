import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useDonations } from '../context/DonationContext';
import { User, Heart, Download, ShieldCheck, Calendar, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useAuth();
  const { donations, setIsAuthModalOpen } = useDonations();

  if (!user) {
    return (
      <div className="py-20 max-w-lg mx-auto px-4 text-center space-y-4">
        <div className="w-16 h-16 bg-amber-100 text-umeed-gold-600 rounded-full flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Please Sign In</h2>
        <p className="text-xs text-slate-600">
          Sign in with your Google account or email to view your donation history and download official 80G tax exemption receipts.
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="px-6 py-2.5 bg-umeed-blue-900 text-white font-bold text-xs rounded-xl shadow"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  // Filter user's donations or show all if demo
  const userDonations = donations.filter(
    (d) => d.donor_email?.toLowerCase() === user.email?.toLowerCase() || user.role === 'admin'
  );

  const totalDonated = userDonations.reduce((sum, d) => sum + (d.amount || 0), 0);

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 text-center sm:text-left flex-col sm:flex-row">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full border-4 border-umeed-gold-400 object-cover shadow-md"
          />
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
              {user.role === 'admin' && (
                <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Supporter of Umeed Ki Kiran</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user.role === 'admin' && (
            <Link
              to="/admin"
              className="px-4 py-2 bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold rounded-xl hover:bg-blue-100"
            >
              Open Admin Panel
            </Link>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-xs font-bold text-rose-600 rounded-xl hover:bg-rose-50"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Contributions</span>
          <p className="text-2xl font-extrabold text-emerald-700 mt-1">₹{totalDonated.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-slate-500 mt-1 block">Across {userDonations.length} campaigns</span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tax Exemption Status</span>
          <p className="text-2xl font-extrabold text-umeed-blue-900 mt-1">100% Valid</p>
          <span className="text-[11px] text-slate-500 mt-1 block">PAN: AABTU5801C (Registered)</span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lives Touched</span>
          <p className="text-2xl font-extrabold text-umeed-gold-600 mt-1">{Math.max(15, userDonations.length * 12)}+</p>
          <span className="text-[11px] text-slate-500 mt-1 block">In Varanasi & Rural UP</span>
        </div>
      </div>

      {/* Donation History Table */}
      <div className="bg-white rounded-3xl shadow-card border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Donation History & 80G Receipts</h2>
            <p className="text-xs text-slate-500">Download your verified tax exemption receipts anytime</p>
          </div>
        </div>

        {userDonations.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            <Heart className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p>You haven't made any donations under this account yet.</p>
            <Link to="/causes" className="text-umeed-gold-600 font-bold underline mt-2 inline-block">
              Explore Active Causes
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Receipt ID</th>
                  <th className="py-3.5 px-6">Campaign / Cause</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6">Mode</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {userDonations.map((don) => (
                  <tr key={don.id} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6 font-mono font-bold text-slate-700">{don.id}</td>
                    <td className="py-4 px-6 font-semibold text-slate-900 max-w-xs truncate">{don.campaign_title}</td>
                    <td className="py-4 px-6 text-slate-500">{don.created_at}</td>
                    <td className="py-4 px-6 font-bold text-emerald-700">₹{don.amount.toLocaleString('en-IN')}</td>
                    <td className="py-4 px-6 text-slate-600">{don.payment_method}</td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Receipt</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
