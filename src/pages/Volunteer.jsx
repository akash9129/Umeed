import React, { useState } from 'react';
import { HeartHandshake, CheckCircle2, Award, Users, Sparkles, Smile } from 'lucide-react';
import { useDonations } from '../context/DonationContext';

export default function Volunteer() {
  const { submitVolunteer } = useDonations();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitVolunteer(form);
    setSubmitted(true);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Make a Difference
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-umeed-blue-900">
          Become a Volunteer with Umeed
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          No act of kindness, no matter how small, is ever wasted. Join 450+ passionate young volunteers across Varanasi dedicating their time to teach, feed, and heal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Perks & Info */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-2xl font-bold text-umeed-blue-900">
            Why Volunteer with Us?
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl bg-white shadow-soft border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                <Smile className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Grassroots Experience</h4>
                <p className="text-xs text-slate-600 mt-0.5">Work directly on the ground with slum clusters, hospitals, and community schools.</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-white shadow-soft border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Official Certificate & Letter of Recommendation</h4>
                <p className="text-xs text-slate-600 mt-0.5">Valuable for college admissions, CSR careers, and scholarship applications.</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-white shadow-soft border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Flexible Weekend Hours</h4>
                <p className="text-xs text-slate-600 mt-0.5">Participate according to your schedule — 2 to 4 hours on Saturday or Sunday.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Registration Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Thank You, {form.name}!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Your volunteer application has been received. Our Varanasi coordinator will message you on WhatsApp (+91 {form.phone}) with the next orientation details.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700"
                >
                  Submit Another Form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-umeed-blue-900">Volunteer Registration Form</h3>
                  <p className="text-xs text-slate-500">Please provide your valid WhatsApp number for coordination.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="priya@example.com"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City / Town</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="Varanasi"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary Interest Area</label>
                  <select
                    value={form.interest_area}
                    onChange={(e) => setForm({ ...form, interest_area: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option>Teaching & Remedial Slum Education</option>
                    <option>Annapurna Rasoi Food Distribution</option>
                    <option>Emergency Medical Camps & Hospital Aid</option>
                    <option>Photography, Social Media & Digital Design</option>
                    <option>Winter Blanket & Relief Drives</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message / How would you like to contribute?</label>
                  <textarea
                    rows="3"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your background, skills, or available time..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-colors"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
