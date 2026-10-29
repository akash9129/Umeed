import React, { useState } from 'react';
import { Database, ShieldCheck, Key, Copy, Check, ExternalLink, Save } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';
import { SITE_CONFIG } from '../../lib/config';

export default function AdminSettings() {
  const [copiedSchema, setCopiedSchema] = useState(false);

  const sampleSchema = `-- Supabase SQL Schema for Umeed Ki Kiran Foundation

-- 1. Campaigns Table
create table if not exists public.campaigns (
  id text primary key,
  title text not null,
  category text not null,
  description text,
  goal_amount numeric not null,
  raised_amount numeric default 0,
  donors_count integer default 0,
  image_url text,
  urgent boolean default false,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Donations Table
create table if not exists public.donations (
  id text primary key,
  donor_name text not null,
  donor_email text,
  donor_phone text not null,
  donor_pan text,
  amount numeric not null,
  campaign_title text,
  campaign_id text references public.campaigns(id),
  payment_method text,
  status text default 'Completed',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Volunteers Table
create table if not exists public.volunteers (
  id text primary key,
  name text not null,
  email text,
  phone text not null,
  city text,
  occupation text,
  interest_area text,
  message text,
  status text default 'Pending',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. Contact Inquiries Table
create table if not exists public.contact_messages (
  id text primary key,
  name text not null,
  email text,
  phone text not null,
  subject text,
  message text not null,
  status text default 'Unread',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS) & Public Reads
alter table public.campaigns enable row level security;
alter table public.donations enable row level security;
alter table public.volunteers enable row level security;
alter table public.contact_messages enable row level security;

create policy "Public Read Campaigns" on public.campaigns for select using (true);
create policy "Public Insert Donations" on public.donations for insert with check (true);
create policy "Public Insert Volunteers" on public.volunteers for insert with check (true);
create policy "Public Insert Messages" on public.contact_messages for insert with check (true);
`;

  const copySchemaToClipboard = () => {
    navigator.clipboard.writeText(sampleSchema);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-xl font-bold text-slate-900">System & Database Settings</h1>
        <p className="text-xs text-slate-500">Manage Supabase database credentials, Google OAuth, and Foundation configuration</p>
      </div>

      {/* Supabase Status Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              isSupabaseConfigured ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}>
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Supabase Cloud Database</h3>
              <p className="text-xs text-slate-500">PostgreSQL database + Google OAuth Auth service</p>
            </div>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            isSupabaseConfigured 
              ? 'bg-emerald-100 text-emerald-800' 
              : 'bg-amber-100 text-amber-900'
          }`}>
            {isSupabaseConfigured ? '● Live Supabase Connected' : '● Demo Local Storage Mode'}
          </span>
        </div>

        {/* Instructions */}
        <div className="text-xs space-y-3 text-slate-600">
          <p>
            To link your live Supabase project to this website, create a <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-mono">.env</code> file in the project root with:
          </p>
          <pre className="bg-slate-900 text-slate-200 p-4 rounded-2xl font-mono text-[11px] overflow-x-auto">
            {`VITE_SUPABASE_URL=https://your-project.supabase.co\nVITE_SUPABASE_ANON_KEY=your-anon-public-key`}
          </pre>
          <p className="text-[11px] text-slate-500">
            For Google Login, simply go to your Supabase Dashboard → <strong>Authentication</strong> → <strong>Providers</strong> → <strong>Google</strong> and paste your Google OAuth Client ID & Secret.
          </p>
        </div>

        {/* SQL Schema Copy Button */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase">
              Supabase SQL Schema Script (Ready to Run)
            </span>
            <button
              onClick={copySchemaToClipboard}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors"
            >
              {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSchema ? 'Copied to Clipboard!' : 'Copy SQL Schema'}</span>
            </button>
          </div>
          <pre className="bg-slate-950 text-emerald-400 p-4 rounded-2xl font-mono text-[10px] max-h-52 overflow-y-auto">
            {sampleSchema}
          </pre>
        </div>
      </div>

      {/* Organization Meta Details Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Foundation Legal Registration Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-400 block">Trust Name</span>
            <span className="font-bold text-slate-900">{SITE_CONFIG.org.name}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-400 block">Permanent Account Number (PAN)</span>
            <span className="font-mono font-bold text-emerald-700">{SITE_CONFIG.org.pan}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-400 block">Trust Deed Date</span>
            <span className="font-semibold text-slate-900">{SITE_CONFIG.org.trustDeedDate}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-400 block">Official Helpline</span>
            <span className="font-semibold text-slate-900">{SITE_CONFIG.org.phone}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
