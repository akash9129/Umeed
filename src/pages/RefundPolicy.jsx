import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  HelpCircle, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  Phone, 
  Mail, 
  ArrowLeft,
  Heart
} from 'lucide-react';
import { SITE_CONFIG } from '../lib/config';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Back Link */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Transparency & Donor Trust</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Return & Refund Policy
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 border-t border-slate-100 pt-3">
            <span>Effective Date: <strong className="text-slate-800">21 December 2025</strong></span>
            <span>•</span>
            <span>Organization: <strong className="text-slate-800">{SITE_CONFIG.org.name} (Trust)</strong></span>
            <span>•</span>
            <span>PAN: <strong className="text-emerald-700 font-mono">{SITE_CONFIG.org.pan}</strong></span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed font-medium pt-2">
            At <strong>{SITE_CONFIG.org.name}</strong>, we value complete transparency and donor trust. Since our platform operates as a donation and cause-based philanthropic contribution platform in Varanasi, our return and refund policy differs from that of traditional commercial e-commerce businesses.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">

          {/* Section 1 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center">
                1
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Nature of Contributions
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              All payments made on <strong>{SITE_CONFIG.org.name}</strong> are voluntary donations or cause-specific contributions intended to support social welfare initiatives, child education kits, hospital patient meals, animal feeding, and community campaigns. These payments are not purchases of physical goods or commercial services.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5 text-xs font-bold text-slate-700">
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                <span>Returns are not applicable</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                <span>Exchanges are not applicable</span>
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center">
                2
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Refund Eligibility
              </h2>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Refunds are considered only under exceptional technical or transactional circumstances, including:
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Duplicate payment processed for the same contribution transaction</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Payment debited from bank/UPI but transaction failed or was not recorded</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Incorrect amount charged due to a verified banking gateway error</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Unauthorized or system-generated payment error</span>
              </li>
            </ul>

            <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100 space-y-2 text-xs font-semibold text-rose-900">
              <span className="font-black uppercase tracking-wider block text-rose-800">
                Refunds are NOT applicable in the following cases:
              </span>
              <p>• Change of mind after a successful voluntary donation</p>
              <p>• Dissatisfaction after campaign proof or video is shared</p>
              <p>• Once the donation has been allocated or utilized on-ground for meal distribution or stationery procurement</p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center">
                3
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Refund Request Process & Channels
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Refund requests must be raised within <strong>7 days</strong> from the date of the transaction. Donors may contact our official foundation team through the following verified channels:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-slate-800">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-600" />
                <div>
                  <span className="block text-[11px] text-slate-500 font-normal">Call & WhatsApp:</span>
                  <a href={`tel:${SITE_CONFIG.org.phone}`} className="hover:text-emerald-700">
                    {SITE_CONFIG.org.phone}
                  </a>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-600" />
                <div>
                  <span className="block text-[11px] text-slate-500 font-normal">Official Email:</span>
                  <a href={`mailto:${SITE_CONFIG.org.email}`} className="hover:text-emerald-700">
                    {SITE_CONFIG.org.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-black uppercase text-slate-700 block">
                To process a refund request, donors must provide:
              </span>
              <ul className="text-xs text-slate-600 space-y-1 font-medium pl-4 list-disc">
                <li>Donor Name</li>
                <li>Registered Mobile Number or Email</li>
                <li>Transaction ID / UPI Reference (UTR) Number</li>
                <li>Date and Exact Time of Transaction</li>
                <li>Reason for Refund Request with relevant bank statement screenshot</li>
              </ul>
              <p className="text-[11px] text-slate-500 italic pt-1">
                * Requests without sufficient or verifiable information may not be processed.
              </p>
            </div>
          </div>

          {/* Section 4 & 5 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-black text-slate-900">4. Processing Timeline</h3>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Once approved, refunds will be initiated within <strong>5–7 business days</strong>. Refunds are credited directly to the original payment method (Bank/UPI). Actual credit time depends on the banking network.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-black text-slate-900">5. Campaign Execution</h3>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {SITE_CONFIG.org.name} follows a transparency-first approach. Photo and/or video proof is shared on WhatsApp. Refunds cannot be requested once campaign procurement or ground delivery has commenced.
              </p>
            </div>

          </div>

          {/* Section 6 & 7 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-black text-slate-900">
              6. Tax & Donation Receipt (80G / 10BE) Disclaimer
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              If an official donation receipt or 80G tax benefit certificate has already been generated or filed with the Income Tax Department:
            </p>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1 font-medium pl-4 list-disc">
              <li>Refunds may not be possible due to regulatory compliance.</li>
              <li>Or, the receipt will be formally cancelled and updated on the portal in accordance with applicable tax laws.</li>
            </ul>

            <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
              <strong>7. Policy Updates:</strong> {SITE_CONFIG.org.name} reserves the right to amend or update this policy at any time. Any changes will be published directly on this page with an updated effective date.
            </div>
          </div>

          {/* Section 8: Contact Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg font-black">Have any questions about your contribution?</h4>
              <p className="text-xs text-slate-400">
                Our team at Kamachha, Varanasi is available to help you with complete accountability.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href={`https://wa.me/${SITE_CONFIG.org.whatsapp}?text=Namaste%2C%20I%20have%20a%20query%20regarding%20refund%20or%20donation`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-all"
              >
                Chat on WhatsApp
              </a>

              <Link
                to="/contact"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
