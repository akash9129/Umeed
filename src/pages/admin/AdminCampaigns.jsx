import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, ShieldCheck, Check, X, AlertCircle } from 'lucide-react';
import { useDonations } from '../../context/DonationContext';

export default function AdminCampaigns() {
  const { campaigns, addCampaign, updateCampaign, deleteCampaign } = useDonations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCamp, setEditingCamp] = useState(null);

  const [form, setForm] = useState({
    title: '',
    category: 'Education',
    goal_amount: 100000,
    raised_amount: 0,
    image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
    description: '',
    urgent: false
  });

  const openCreateModal = () => {
    setEditingCamp(null);
    setForm({
      title: '',
      category: 'Education',
      goal_amount: 100000,
      raised_amount: 0,
      image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
      description: '',
      urgent: false
    });
    setIsModalOpen(true);
  };

  const openEditModal = (camp) => {
    setEditingCamp(camp);
    setForm({
      title: camp.title,
      category: camp.category,
      goal_amount: camp.goal_amount,
      raised_amount: camp.raised_amount,
      image_url: camp.image_url,
      description: camp.description,
      urgent: camp.urgent || false
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCamp) {
      await updateCampaign(editingCamp.id, form);
    } else {
      await addCampaign(form);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete campaign: "${title}"?`)) {
      deleteCampaign(id);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Manage Campaigns & Causes</h1>
          <p className="text-xs text-slate-500">Create, edit, or adjust targets for crowdfunding initiatives</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-umeed-gold-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow hover:from-amber-600 hover:to-amber-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Campaign</span>
        </button>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-3xl shadow-card border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Cause / Title</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Raised / Goal</th>
                <th className="py-3.5 px-6">Progress</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campaigns.map((camp) => {
                const percent = Math.min(100, Math.round((camp.raised_amount / camp.goal_amount) * 100));
                return (
                  <tr key={camp.id} className="hover:bg-slate-50/60">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={camp.image_url}
                          alt={camp.title}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1 max-w-sm">{camp.title}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{camp.description}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="bg-slate-100 text-slate-800 font-semibold px-2.5 py-1 rounded-lg text-[11px]">
                        {camp.category}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <p className="font-bold text-emerald-700">₹{camp.raised_amount.toLocaleString('en-IN')}</p>
                      <p className="text-[10px] text-slate-400">Target: ₹{camp.goal_amount.toLocaleString('en-IN')}</p>
                    </td>

                    <td className="py-4 px-6">
                      <div className="w-24">
                        <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                          <span>{percent}%</span>
                          <span>{camp.donors_count || 0} donors</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${percent}%` }}></div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      {camp.urgent ? (
                        <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
                          Urgent
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">
                          Active
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(camp)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit Campaign"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(camp.id, camp.title)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Campaign"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Campaign Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">
                {editingCamp ? 'Edit Campaign' : 'Create New Campaign'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Campaign Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Free Eye Surgeries for 50 Villagers"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-umeed-gold-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-umeed-gold-500 bg-white"
                  >
                    <option>Education</option>
                    <option>Hunger Relief</option>
                    <option>Medical Aid</option>
                    <option>Women Empowerment</option>
                    <option>Healthcare</option>
                    <option>Emergency Relief</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Goal Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1000"
                    value={form.goal_amount}
                    onChange={(e) => setForm({ ...form, goal_amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-umeed-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Initial Raised (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.raised_amount}
                    onChange={(e) => setForm({ ...form, raised_amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-umeed-gold-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="urgentCheck"
                    checked={form.urgent}
                    onChange={(e) => setForm({ ...form, urgent: e.target.checked })}
                    className="w-4 h-4 text-umeed-gold-600 rounded"
                  />
                  <label htmlFor="urgentCheck" className="font-bold text-slate-700 cursor-pointer">
                    Mark as Urgent Need 🔥
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Banner Image URL</label>
                <input
                  type="url"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-umeed-gold-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Story & Description *</label>
                <textarea
                  rows="3"
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Explain why this cause needs help and how the funds will be utilized..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-umeed-gold-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-umeed-gold-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-colors"
              >
                {editingCamp ? 'Save Campaign Changes' : 'Publish Campaign'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
