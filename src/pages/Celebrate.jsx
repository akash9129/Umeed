import React, { useState } from 'react';
import { Gift, Heart, CheckCircle2, Video, Award, Calendar, Sparkles, User, Phone, MessageSquare, Utensils, Star, ArrowRight } from 'lucide-react';
import { useDonations } from '../context/DonationContext';
import { SITE_CONFIG } from '../lib/config';

export default function Celebrate() {
  const { openDonateModal } = useDonations();

  const handleBookNow = (title, amount, category = 'Restaurant Food Distribution') => {
    openDonateModal({
      id: `celeb-${Date.now()}`,
      title: title,
      category: category,
      unit_price: amount,
      unitTitle: title
    }, amount);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
            <Gift className="w-4 h-4 text-orange-500" />
            <span>Special Milestone Sponsorship</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Celebrate Your Birthday or Anniversary with Underprivileged Children
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Dedicate your special day to bringing joyful memories and warm restaurant meals to children in Varanasi. Guaranteed personalized banner, cake cutting, and full WhatsApp video proof.
          </p>
        </div>

        {/* Featured Restaurant Food Distribution Plans */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Restaurant Food Distribution Plans
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Freshly prepared restaurant feast served with dignity, love, and complete video coverage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Normal Plan - ₹10,000 (25 Children) */}
            <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                    Normal Plan
                  </span>
                  <span className="text-xs font-bold text-slate-500">25 Children</span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Restaurant Meal for 25 Children
                  </h3>
                  <div className="mt-2">
                    <span className="text-3xl font-black text-slate-900">₹10,000</span>
                    <span className="text-xs text-slate-500 font-medium"> / complete celebration</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Provide 25 children with wholesome, delicious restaurant-prepared meals served with joy, balloons, and cake cutting.
                </p>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                    What is Included:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-600 font-medium">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>Restaurant-prepared hot delicious meals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>Food distribution for 25 children</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>Meal serving arrangements & hygiene support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>Activity photographs & WhatsApp video coverage</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleBookNow('Restaurant Food Distribution: Normal Plan (25 Children)', 10000)}
                  className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Gift className="w-4 h-4 fill-white" />
                  <span>Book Normal Plan (₹10,000)</span>
                </button>
              </div>
            </div>

            {/* Grand Plan - ₹20,000 (60 Children) */}
            <div className="bg-white rounded-3xl p-8 border-2 border-orange-500 shadow-xl ring-2 ring-orange-400/20 relative flex flex-col justify-between">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs uppercase tracking-wider font-extrabold px-4 py-1 rounded-full shadow-md">
                ★ Most Popular Celebration
              </span>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="bg-orange-100 text-orange-900 text-xs font-bold px-3 py-1 rounded-full uppercase">
                    Grand Plan
                  </span>
                  <span className="text-xs font-bold text-slate-500">60 Children</span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Grand Restaurant Feast for 60 Children
                  </h3>
                  <div className="mt-2">
                    <span className="text-3xl font-black text-orange-600">₹20,000</span>
                    <span className="text-xs text-slate-500 font-medium"> / grand feast event</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Host an expansive, joyous celebration for 60 children with enhanced restaurant food, sweet treats, and complete personalized banner.
                </p>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                    What is Included:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-600 font-medium">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>Enhanced restaurant food distribution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>More menu variety & special sweets / cake</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>Organised sit-down food serving ceremony</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>Personalized banner, high-definition WhatsApp video & photos</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleBookNow('Restaurant Food Distribution: Grand Plan (60 Children)', 20000)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Star className="w-4 h-4 fill-white" />
                  <span>Book Grand Plan (₹20,000)</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Video Proof Guarantee Card */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-3 py-1 rounded-full">
              <Video className="w-4 h-4 text-emerald-400" />
              <span>100% Video Transparency Guarantee</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">
              Can't Visit Varanasi in Person? No Problem!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Every celebration donor receives high-definition videos, photos with customized name banner, and audio blessings from the children sent directly to your WhatsApp.
            </p>
          </div>
          <a
            href={`https://wa.me/${SITE_CONFIG.org.whatsapp}?text=Namaste%2C%20I%20want%20to%20book%20a%20Restaurant%20Food%20Distribution%20meal%20for%20kids`}
            target="_blank"
            rel="noreferrer"
            className="flex-shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            Talk to Coordinator on WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}
