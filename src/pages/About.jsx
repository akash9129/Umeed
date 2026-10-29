import React from 'react';
import { ShieldCheck, Heart, Users, Target, Eye, Award, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '../lib/config';

export default function About() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-widest text-umeed-gold-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Our Story & Purpose
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-umeed-blue-900">
          About Umeed Ki Kiran Foundation
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Founded in the sacred spiritual city of Varanasi, we are dedicated to illuminating the lives of impoverished children, abandoned elderly souls, and families in acute distress.
        </p>
      </div>

      {/* Story & Visual Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-umeed-blue-900">
            A Ray of Hope for Those Who Need It Most
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            In October 2025, a group of dedicated local educators, social workers, and doctors united in Varanasi with a simple conviction: <em>no child should be forced to abandon their studies due to hunger or lack of a school bag, and no patient should perish on the pavement outside a hospital for lack of basic medicine.</em>
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Thus was born <strong className="text-umeed-blue-900 font-bold">Umeed Ki Kiran Foundation</strong> (Trust). What began with distributing 50 hot meals from a humble kitchen has expanded into a structured movement serving thousands every month across education, food security, and healthcare.
          </p>

          <div className="bg-amber-50/80 border-l-4 border-umeed-gold-500 p-4 rounded-r-xl">
            <p className="text-xs font-semibold text-amber-950 italic">
              "खुशियाँ बाँटिए, उम्मीद जगाइए — Spreading joy is not an act of charity; it is our sacred human duty towards our brothers and sisters."
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 flex justify-center">
          <div className="relative">
            <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full border-4 border-umeed-gold-400 p-2 bg-white shadow-2xl overflow-hidden">
              <img
                src="/logo.jpg"
                alt="Umeed Ki Kiran Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-umeed-blue-900 text-white p-4 rounded-2xl shadow-xl border border-slate-700 text-xs font-bold text-center">
              <p className="text-umeed-gold-400 text-base">Registered Trust</p>
              <p className="text-slate-300 font-normal">PAN: {SITE_CONFIG.org.pan}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-card border border-slate-200 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-umeed-gold-600 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-umeed-blue-900">Our Mission</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            To provide continuous nutritious food, dignified remedial education, essential healthcare, and vocational livelihood skills to marginalized urban and rural families without discrimination of caste, creed, or religion.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-card border border-slate-200 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-umeed-blue-700 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-umeed-blue-900">Our Vision</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            An India where every child in eastern Uttar Pradesh holds books instead of begging bowls, where preventable illness is treated promptly with compassion, and where vulnerable mothers stand financially empowered.
          </p>
        </div>
      </div>

      {/* Legal Transparency & Compliance Strip */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> 100% Legal & Financial Transparency
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-display">
            Trust Governance Details
          </h3>
          <p className="text-xs text-slate-400">
            We adhere to the highest standards of non-profit governance and financial accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <p className="text-slate-400">Legal Name</p>
            <p className="font-bold text-white mt-1">{SITE_CONFIG.org.name}</p>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <p className="text-slate-400">Permanent Account Number (PAN)</p>
            <p className="font-mono font-bold text-umeed-gold-300 mt-1">{SITE_CONFIG.org.pan}</p>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <p className="text-slate-400">Trust Deed Registration</p>
            <p className="font-bold text-white mt-1">{SITE_CONFIG.org.trustDeedDate}</p>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <p className="text-slate-400">Registered Sub-District</p>
            <p className="font-bold text-white mt-1">{SITE_CONFIG.org.location}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
