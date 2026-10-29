import React, { useState } from 'react';
import { Search, Download, Filter, FileText, CheckCircle2 } from 'lucide-react';
import { useDonations } from '../../context/DonationContext';

export default function AdminDonations() {
  const { donations } = useDonations();
  const [search, setSearch] = useState('');

  const filteredDonations = donations.filter((d) => {
    const q = search.toLowerCase();
    return (
      d.donor_name?.toLowerCase().includes(q) ||
      d.donor_phone?.toLowerCase().includes(q) ||
      d.donor_pan?.toLowerCase().includes(q) ||
      d.campaign_title?.toLowerCase().includes(q)
    );
  });

  const exportCSV = () => {
    const headers = ["Receipt ID,Donor Name,Email,Phone,PAN,Amount (INR),Campaign,Payment Method,Date,Status\n"];
    const rows = filteredDonations.map(d => 
      `"${d.id}","${d.donor_name}","${d.donor_email}","${d.donor_phone}","${d.donor_pan || 'N/A'}",${d.amount},"${d.campaign_title}","${d.payment_method}","${d.created_at}","${d.status}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `umeed_donations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Donations & 80G Tax Records</h1>
          <p className="text-xs text-slate-500">Track incoming contributions, verify donor PAN, and export reports</p>
        </div>
        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV Report</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search donor name, phone, PAN, or receipt..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-umeed-gold-500"
          />
        </div>
        <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
          Showing {filteredDonations.length} of {donations.length} records
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-card border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Receipt ID</th>
                <th className="py-3.5 px-6">Donor Details</th>
                <th className="py-3.5 px-6">Donor PAN</th>
                <th className="py-3.5 px-6">Amount</th>
                <th className="py-3.5 px-6">Campaign / Purpose</th>
                <th className="py-3.5 px-6">Payment Mode</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDonations.map((don) => (
                <tr key={don.id} className="hover:bg-slate-50/60">
                  <td className="py-4 px-6 font-mono font-bold text-slate-700">{don.id}</td>
                  
                  <td className="py-4 px-6">
                    <p className="font-bold text-slate-900">{don.donor_name}</p>
                    <p className="text-[11px] text-slate-500">{don.donor_phone}</p>
                    {don.donor_email && <p className="text-[10px] text-slate-400">{don.donor_email}</p>}
                  </td>

                  <td className="py-4 px-6">
                    <span className="font-mono bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px]">
                      {don.donor_pan || 'N/A'}
                    </span>
                  </td>

                  <td className="py-4 px-6 font-bold text-emerald-700 text-sm">
                    ₹{don.amount.toLocaleString('en-IN')}
                  </td>

                  <td className="py-4 px-6 text-slate-700 max-w-xs truncate">
                    {don.campaign_title}
                  </td>

                  <td className="py-4 px-6 text-slate-600">
                    {don.payment_method}
                  </td>

                  <td className="py-4 px-6 text-slate-500 text-[11px]">
                    {don.created_at}
                  </td>

                  <td className="py-4 px-6 text-right">
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

    </div>
  );
}
