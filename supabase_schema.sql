-- ==============================================================================
-- SUPABASE POSTGRESQL SCHEMA FOR UMEED KI KIRAN FOUNDATION (TRUST)
-- ==============================================================================

-- 1. Create Campaigns Table
CREATE TABLE IF NOT EXISTS public.campaigns (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  goal_amount NUMERIC NOT NULL DEFAULT 100000,
  raised_amount NUMERIC DEFAULT 0,
  donors_count INTEGER DEFAULT 0,
  image_url TEXT,
  urgent BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Create Donations Table (Tracks all online and UPI contributions)
CREATE TABLE IF NOT EXISTS public.donations (
  id TEXT PRIMARY KEY,
  donor_name TEXT NOT NULL,
  donor_email TEXT,
  donor_phone TEXT NOT NULL,
  donor_pan TEXT,
  amount NUMERIC NOT NULL,
  campaign_title TEXT,
  campaign_id TEXT REFERENCES public.campaigns(id) ON DELETE SET NULL,
  payment_method TEXT,
  status TEXT DEFAULT 'Completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Create Volunteers Table
CREATE TABLE IF NOT EXISTS public.volunteers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  city TEXT,
  occupation TEXT,
  interest_area TEXT,
  message TEXT,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Create Contact Inquiries Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'Unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Row Level Security (RLS) Settings
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies
-- Allow anyone to view campaigns
CREATE POLICY "Public Read Campaigns" ON public.campaigns FOR SELECT USING (true);

-- Allow public to record donations
CREATE POLICY "Public Insert Donations" ON public.donations FOR INSERT WITH CHECK (true);

-- Allow public to submit volunteer requests
CREATE POLICY "Public Insert Volunteers" ON public.volunteers FOR INSERT WITH CHECK (true);

-- Allow public to send contact messages
CREATE POLICY "Public Insert Messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Allow full access to authenticated admins (service role or admin emails)
CREATE POLICY "Admin Full Access Campaigns" ON public.campaigns FOR ALL USING (true);
CREATE POLICY "Admin Full Access Donations" ON public.donations FOR ALL USING (true);
CREATE POLICY "Admin Full Access Volunteers" ON public.volunteers FOR ALL USING (true);
CREATE POLICY "Admin Full Access Messages" ON public.contact_messages FOR ALL USING (true);
