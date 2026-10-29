import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartHandshake, 
  Users, 
  FolderHeart, 
  MessageSquare, 
  TrendingUp, 
  Plus, 
  ArrowUpRight,
  ShieldCheck,
  Download
} from 'lucide-react';
import { useDonations } from '../../context/DonationContext';
import { isSupabaseConfigured } from '../../lib/supabase';

export default function AdminDashboard() {
  const { campaigns, donations, volunteers, contactMessages } = useDonations();

  const totalRaised = donations.reduce((sum, d) => sum + (d.amount || 0), 0);
  const activeCampaignsCount = campaigns.filter(c => c.is_active).length;
  const pendingVolunteers = volunteers.filter(v => v.status === 'Pending').length;
  const unreadMessages = contactMessages.filter(m => m.status === 'Unread').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <span className="text-xs font-bold text-umeed-gold-600 uppercase tracking-wider">
            Foundation Administration Portal
          </span>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">
            Overview & Operations
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Umeed Ki Kiran Foundation (Trust) • Registered in Varanasi, UP
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/campaigns"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-umeed-gold-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Campaign</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Funds Raised */}
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-slate-200 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Raised</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
            ₹{totalRaised.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            From {donations.length} recorded donations
          </span>
        </div>

        {/* Active Campaigns */}
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-slate-200 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Causes</span>
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <FolderHeart className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
            {activeCampaignsCount}
          </p>
          <span className="text-[11px] text-slate-500 font-semibold mt-1 block">
            Across 5 Core Verticals
          </span>
        </div>

        {/* Volunteers */}
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-slate-200 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Volunteers</span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
            {volunteers.length}
          </p>
          <span className="text-[11px] text-amber-600 font-bold mt-1 block">
            {pendingVolunteers} pending review
          </span>
        </div>

        {/* Inquiries */}
        <div className="bg-white p-6 rounded-3xl shadow-soft border border-slate-200 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Inquiries</span>
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
            {contactMessages.length}
          </p>
          <span className="text-[11px] text-purple-600 font-bold mt-1 block">
            {unreadMessages} new message{unreadMessages !== 1 ? 's' : ''}
          </span>
        </div>

      </div>

      {/* Two Column Layout: Recent Donations & Active Causes Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Donations Table */}
        <div className="lg:col-span-8 bg-white rounded-3xl shadow-card border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Contributions</h2>
              <p className="text-xs text-slate-500">Live feed of donations received</p>
            </div>
            <Link
              to="/admin/donations"
              className="text-xs font-bold text-umeed-blue-900 hover:text-umeed-gold-600 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3 px-6">Donor</th>
                  <th className="py-3 px-6">Amount</th>
                  <th className="py-3 px-6">Cause / Purpose</th>
                  <th className="py-3 px-6">Date</th>
                  <th className="py-3 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {donations.slice(0, 5).map((don) => (
                  <tr key={don.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-6">
                      <p className="font-bold text-slate-900">{don.donor_name}</p>
                      <p className="text-[11px] text-slate-500">{don.donor_phone}</p>
                    </td>
                    <td className="py-3.5 px-6 font-bold text-emerald-700">
                      ₹{don.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-6 text-slate-600 max-w-[180px] truncate">
                      {don.campaign_title}
                    </td>
                    <td className="py-3.5 px-6 text-slate-400 text-[11px]">
                      {don.created_at}
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                        {don.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Urgent Campaigns Progress */}
        <div className="lg:col-span-4 bg-white rounded-3xl shadow-card border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Urgent Campaigns</h2>
            <Link to="/admin/campaigns" className="text-xs font-bold text-umeed-gold-600 hover:underline">
              Manage
            </Link>
          </div>

          <div className="space-y-4">
            {campaigns.slice(0, 4).map((camp) => {
              const percent = Math.min(100, Math.round((camp.raised_amount / camp.goal_amount) * 100));
              return (
                <div key={camp.id} className="space-y-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{camp.title}</h4>
                    <span className="text-[10px] font-bold text-emerald-700 flex-shrink-0">{percent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${percent}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>₹{camp.raised_amount.toLocaleString('en-IN')}</span>
                    <span>Target: ₹{camp.goal_amount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
