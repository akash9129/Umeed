import React, { useState } from 'react';
import { Users, Phone, Mail, CheckCircle2, Clock, MessageSquare, Search, Filter, MessageCircle } from 'lucide-react';
import { useDonations } from '../../context/DonationContext';

export default function AdminVolunteers() {
  const { volunteers, updateVolunteerStatus } = useDonations();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const pendingCount = volunteers.filter(v => v.status === 'Pending').length;
  const approvedCount = volunteers.filter(v => v.status === 'Approved').length;
  const contactedCount = volunteers.filter(v => v.status === 'Contacted').length;

  const filteredVolunteers = volunteers.filter((vol) => {
    const q = search.toLowerCase();
    const matchesSearch = 
      vol.name?.toLowerCase().includes(q) ||
      vol.phone?.toLowerCase().includes(q) ||
      vol.city?.toLowerCase().includes(q) ||
      vol.interest_area?.toLowerCase().includes(q);

    const matchesStatus = statusFilter === 'All' || vol.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
            Volunteer Management Console
          </span>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5">
            Volunteer Applications & Ground Team
          </h1>
          <p className="text-xs text-slate-500">Review applicants from the website, approve credentials, and coordinate on WhatsApp</p>
        </div>

        {/* Status Counters */}
        <div className="flex items-center gap-2">
          <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-200">
            {pendingCount} Pending Review
          </span>
          <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-200">
            {approvedCount} Active Volunteers
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-soft border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Total Received</span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{volunteers.length}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-soft border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Pending Review</span>
            <p className="text-2xl font-extrabold text-amber-600 mt-1">{pendingCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-soft border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Approved</span>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">{approvedCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search and Filter Strip */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search volunteer name, phone, city, or area..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {['All', 'Pending', 'Approved', 'Contacted'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                statusFilter === st
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Volunteers Table */}
      <div className="bg-white rounded-3xl shadow-card border border-slate-200 overflow-hidden">
        {filteredVolunteers.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p>No volunteer records match your search filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Applicant Name</th>
                  <th className="py-3.5 px-6">Contact / WhatsApp</th>
                  <th className="py-3.5 px-6">Location</th>
                  <th className="py-3.5 px-6">Area of Interest</th>
                  <th className="py-3.5 px-6">Message / Note</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredVolunteers.map((vol) => (
                  <tr key={vol.id} className="hover:bg-slate-50/60">
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-900">{vol.name}</p>
                      <p className="text-[11px] text-slate-400">{vol.occupation || 'Volunteer'}</p>
                    </td>

                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-800">{vol.phone}</p>
                      {vol.email && <p className="text-[11px] text-slate-400">{vol.email}</p>}
                    </td>

                    <td className="py-4 px-6 text-slate-600">
                      {vol.city || 'Varanasi'}
                    </td>

                    <td className="py-4 px-6">
                      <span className="bg-blue-50 text-blue-800 font-semibold px-2.5 py-1 rounded-lg text-[11px]">
                        {vol.interest_area}
                      </span>
                    </td>

                    <td className="py-4 px-6 max-w-xs">
                      <p className="text-slate-600 line-clamp-2 text-[11px]">
                        {vol.message || 'Ready to support on weekends in Varanasi.'}
                      </p>
                    </td>

                    <td className="py-4 px-6 text-slate-400 text-[11px]">
                      {vol.created_at}
                    </td>

                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                        vol.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : vol.status === 'Contacted'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {vol.status}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Direct WhatsApp link */}
                        <a
                          href={`https://wa.me/${vol.phone.replace(/[^0-9]/g, '')}?text=Namaste%20${encodeURIComponent(vol.name)}%2C%20greetings%20from%20Umeed%20Ki%20Kiran%20Foundation%20Varanasi!%20We%20received%20your%20volunteer%20application.`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors shadow-sm"
                          title="Chat on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>

                        {/* Status Change Selector */}
                        <select
                          value={vol.status}
                          onChange={(e) => updateVolunteerStatus(vol.id, e.target.value)}
                          className="bg-slate-100 text-slate-700 text-[11px] font-bold py-1 px-2 rounded-lg border border-slate-200 focus:outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Contacted">Contacted</option>
                        </select>
                      </div>
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
