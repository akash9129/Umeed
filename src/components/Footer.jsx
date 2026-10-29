import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Lock, 
  Video, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { SITE_CONFIG } from '../lib/config';

export default function Footer() {
  return (
    <footer className="bg-[#FAF7F2] text-slate-700 border-t border-amber-200/60 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* =========================================================================
            PRE-FOOTER: "GIVE A MEAL TODAY" BANNER (EXACT IHSKAS / GIDEA STYLE)
            ========================================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Give a meal today
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              ₹25 feeds a child, and you get guaranteed photo & video proof of your donation.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
            <Link
              to="/causes"
              className="bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm px-7 py-3 rounded-2xl shadow-sm transition-all active:scale-95"
            >
              Donate now
            </Link>

            <Link
              to="/checkout"
              className="bg-white hover:bg-slate-50 text-rose-600 border border-rose-300 font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl transition-all"
            >
              Customise Cart
            </Link>
          </div>
        </div>

        {/* =========================================================================
            MAIN 4 COLUMNS (WARM IVORY / BEIGE CLEAN THEME FROM USER SCREENSHOT)
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pt-4 pb-8 border-b border-amber-200/60">
          
          {/* Col 1: Organization Brand & Trust Badges (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-full overflow-hidden border-2 border-rose-500 shadow-xs bg-white flex-shrink-0"
                style={{ width: '48px', height: '48px', minWidth: '48px', minHeight: '48px' }}
              >
                <img 
                  src="/logo.jpg" 
                  alt="Umeed Ki Kiran Foundation Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-base tracking-tight leading-tight">
                  UMEED KI KIRAN
                </h4>
                <p className="text-[10px] font-black text-rose-600 tracking-widest uppercase">
                  FOUNDATION (TRUST)
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              India's trusted, transparent way to give in Varanasi. Every donation reaches those in need, with photo & video proof delivered directly to your WhatsApp.
            </p>

            {/* 4 Trust Badges Chips as in Screenshot */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-700 pt-1">
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                <span>12A registered</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                <FileText className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                <span>80G tax benefit</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                <Lock className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                <span>Secure payments</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                <Video className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                <span>Photo & video proof</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-rose-600 hover:border-rose-300 transition-colors shadow-2xs text-xs font-bold">
                f
              </a>
              <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-rose-600 hover:border-rose-300 transition-colors shadow-2xs text-xs font-bold">
                ig
              </a>
              <a href={SITE_CONFIG.social.youtube} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-rose-600 hover:border-rose-300 transition-colors shadow-2xs text-xs font-bold">
                yt
              </a>
              <a href={SITE_CONFIG.social.twitter} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-rose-600 hover:border-rose-300 transition-colors shadow-2xs text-xs font-bold">
                x
              </a>
            </div>
          </div>

          {/* Col 2: EXPLORE (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-slate-900 font-extrabold text-xs uppercase tracking-wider">
              EXPLORE
            </h5>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <Link to="/about" className="hover:text-rose-600 transition-colors block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/causes" className="hover:text-rose-600 transition-colors block">
                  Explore 10 Causes
                </Link>
              </li>
              <li>
                <Link to="/celebrate" className="hover:text-rose-600 transition-colors block text-rose-700 font-bold">
                  Celebrate With Kids
                </Link>
              </li>
              <li>
                <Link to="/causes" className="hover:text-rose-600 transition-colors block">
                  Monthly Giving
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-rose-600 transition-colors block">
                  Seva Cart & Addons
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: SUPPORT (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-slate-900 font-extrabold text-xs uppercase tracking-wider">
              SUPPORT & TRUST
            </h5>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <Link to="/checkout" className="hover:text-rose-600 transition-colors block">
                  Customise Donation Banner
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-rose-600 transition-colors block">
                  80G Tax Exemption Info
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-rose-600 transition-colors block font-semibold text-slate-800">
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-rose-600 transition-colors block">
                  Request Custom Seva Drive
                </Link>
              </li>
              <li>
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                  UPI ID: {SITE_CONFIG.org.bankDetails.upiId}
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: GET IN TOUCH (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-slate-900 font-extrabold text-xs uppercase tracking-wider">
              GET IN TOUCH
            </h5>

            <div className="space-y-2.5 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <a href={`tel:${SITE_CONFIG.org.phone}`} className="hover:text-rose-600 font-bold text-slate-800">
                  {SITE_CONFIG.org.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <a href={`mailto:${SITE_CONFIG.org.email}`} className="hover:text-rose-600 truncate">
                  {SITE_CONFIG.org.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {SITE_CONFIG.org.address}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${SITE_CONFIG.org.whatsapp}?text=Namaste%2C%20I%20want%20to%20connect%20with%20Umeed%20Foundation`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3.5 rounded-xl transition-all shadow-xs"
              >
                <span>Chat on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Compliance details line from screenshot */}
        <div className="text-center text-[11px] text-slate-500 font-medium">
          Registered under the Income Tax Act, 1961 • 12A Reg. No: UP/2025/12A • 80G Approval Trust PAN: <strong className="text-slate-700 font-mono">{SITE_CONFIG.org.pan}</strong>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2024-2026 {SITE_CONFIG.org.name} (Trust). All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/about" className="hover:text-slate-800">Privacy</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-slate-800">Terms</Link>
            <span>•</span>
            <Link to="/refund-policy" className="hover:text-slate-800 font-bold text-slate-700">Refunds</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-slate-800">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
