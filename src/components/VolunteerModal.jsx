import React, { useState } from 'react';
import { X, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { useDonations } from '../context/DonationContext';

export default function VolunteerModal() {
  const { isVolunteerModalOpen, setIsVolunteerModalOpen, submitVolunteer } = useDonations();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Varanasi',
    occupation: '',
    interest_area: 'Teaching & Child Education',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isVolunteerModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitVolunteer(form);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setIsVolunteerModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6">
        
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-slate-200 hover:text-white p-1 rounded-full bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <HeartHandshake className="w-10 h-10 text-emerald-300" />
            <div>
              <h2 className="text-lg font-bold">Join Our Volunteer Team</h2>
              <p className="text-xs text-emerald-200">Dedicate a few hours a week to bring light to someone's life</p>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Application Received!</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thank you, <span className="font-semibold text-slate-900">{form.name}</span>. Our volunteer coordinator in Varanasi will connect with you on WhatsApp within 24-48 hours.
            </p>
            <button
              onClick={handleClose}
              className="py-2.5 px-6 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Rahul Verma"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="rahul@example.com"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">City / Location</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Varanasi / Online"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Area of Interest</label>
              <select
                value={form.interest_area}
                onChange={(e) => setForm({ ...form, interest_area: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option>Teaching & Child Education</option>
                <option>Food Distribution & Kitchen Drives</option>
                <option>Medical Camps & Patient Care</option>
                <option>Social Media, Photography & Tech</option>
                <option>Emergency Disaster / Winter Relief</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Short Message / Background</label>
              <textarea
                rows="3"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us a little bit about yourself and why you'd like to join Umeed Ki Kiran Foundation..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-colors"
            >
              Submit Volunteer Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
