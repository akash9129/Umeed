import React from 'react';
import { MessageSquare, Phone, Mail, CheckCircle2, MessageCircle } from 'lucide-react';
import { useDonations } from '../../context/DonationContext';

export default function AdminMessages() {
  const { contactMessages } = useDonations();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Inquiries & Contact Messages</h1>
          <p className="text-xs text-slate-500">Citizen queries, CSR partnership requests, and donor support messages</p>
        </div>
        <span className="text-xs font-bold bg-blue-50 text-blue-900 px-3 py-1.5 rounded-xl border border-blue-200">
          Total Messages: {contactMessages.length}
        </span>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {contactMessages.map((msg) => (
          <div
            key={msg.id}
            className="bg-white rounded-3xl p-6 shadow-card border border-slate-200 space-y-4 hover:border-umeed-gold-300 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-umeed-gold-600 uppercase tracking-wider block">
                  {msg.subject || 'General Inquiry'}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {msg.name}
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>{msg.created_at}</span>
                <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                  msg.status === 'Unread' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {msg.status}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              "{msg.message}"
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
              <div className="flex items-center gap-4 text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <strong>{msg.phone}</strong>
                </span>
                {msg.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>{msg.email}</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}?text=Namaste%20${encodeURIComponent(msg.name)}%2C%20regarding%20your%20inquiry%20to%20Umeed%20Ki%20Kiran%20Foundation...`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Reply on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
