import React, { useState } from 'react';
import { Phone, Mail, MapPin, QrCode, CheckCircle2, Send, MessageSquare, ExternalLink } from 'lucide-react';
import { useDonations } from '../context/DonationContext';
import { SITE_CONFIG } from '../lib/config';

export default function Contact() {
  const { submitContactMessage } = useDonations();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitContactMessage(form);
    setSubmitted(true);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-widest text-umeed-gold-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-umeed-blue-900">
          Contact Umeed Ki Kiran Foundation
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Have questions about making a donation, organizing a celebration meal, or visiting our grassroots centers in Varanasi? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Contact Info & Bank Account Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 space-y-6">
            <h3 className="text-lg font-bold text-umeed-blue-900 border-b border-slate-100 pb-3">
              Official Contact Information
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-umeed-gold-600 mt-1 flex-shrink-0" />
                <div>
                  <strong className="block text-slate-900 font-bold">Registered Office:</strong>
                  <p className="text-slate-600 mt-0.5">{SITE_CONFIG.org.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <strong className="block text-slate-900 font-bold">Helpline & WhatsApp:</strong>
                  <a href={`tel:${SITE_CONFIG.org.phone}`} className="text-slate-600 hover:text-umeed-blue-900 font-semibold block mt-0.5">
                    {SITE_CONFIG.org.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-umeed-gold-600 mt-1 flex-shrink-0" />
                <div>
                  <strong className="block text-slate-900 font-bold">Email:</strong>
                  <a href={`mailto:${SITE_CONFIG.org.email}`} className="text-slate-600 hover:text-umeed-blue-900 block mt-0.5">
                    {SITE_CONFIG.org.email}
                  </a>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${SITE_CONFIG.org.whatsapp}?text=Namaste%20Umeed%20Foundation`}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl transition-colors shadow"
            >
              <span>Chat Directly on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Bank Transfer Details Box */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <h3 className="text-sm font-bold text-umeed-gold-400 flex items-center gap-2">
                <QrCode className="w-4 h-4" /> Direct NEFT / RTGS / UPI
              </h3>
              <span className="text-[10px] bg-slate-800 text-emerald-400 font-bold px-2 py-0.5 rounded">
                Official Trust Account
              </span>
            </div>

            <div className="text-xs space-y-2 text-slate-300">
              <p><span className="text-slate-400">Account Name:</span> <span className="text-white font-semibold">{SITE_CONFIG.org.bankDetails.accountName}</span></p>
              <p><span className="text-slate-400">Bank Name:</span> <span className="text-white">{SITE_CONFIG.org.bankDetails.bankName}</span></p>
              <p><span className="text-slate-400">Account No:</span> <span className="font-mono text-emerald-400 font-bold">{SITE_CONFIG.org.bankDetails.accountNumber}</span></p>
              <p><span className="text-slate-400">IFSC Code:</span> <span className="font-mono text-white font-bold">{SITE_CONFIG.org.bankDetails.ifscCode}</span></p>
              <p><span className="text-slate-400">UPI ID:</span> <span className="font-mono text-umeed-gold-300 font-bold">{SITE_CONFIG.org.bankDetails.upiId}</span></p>
            </div>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out. We will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-umeed-blue-900 text-white font-bold text-xs rounded-xl hover:bg-umeed-blue-800"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-umeed-blue-900">Send Us an Inquiry</h3>
                  <p className="text-xs text-slate-500">Fill out this quick form and our trust administration team will respond promptly.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-umeed-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-umeed-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ramesh@example.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-umeed-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="e.g. CSR Partnership, Food Distribution inquiry..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-umeed-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message *</label>
                  <textarea
                    rows="4"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-umeed-gold-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-umeed-blue-900 hover:bg-umeed-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
