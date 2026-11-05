-- Interest sign-ups from the "launching 2027" landing page.
-- Run this once in Supabase: SQL Editor -> paste -> Run.

-- Dive shops. Fields follow dema-lead-capture.md: a lead record, not a
-- Dive Shop account. No verification happens here.
create table if not exists public.shop_leads (
  id            uuid primary key default gen_random_uuid(),
  business_name text not null check (char_length(business_name) between 1 and 200),
  contact_name  text not null check (char_length(contact_name) between 1 and 200),
  email         text not null check (char_length(email) between 3 and 320),
  phone         text check (char_length(phone) <= 50),
  region        text not null check (char_length(region) between 1 and 200),
  notes         text check (char_length(notes) <= 2000),
  source        text not null default 'website' check (char_length(source) <= 50),
  created_at    timestamptz not null default now()
);

create index if not exists shop_leads_created_at_idx on public.shop_leads (created_at desc);

-- Divers: email only. One row per address.
create table if not exists public.diver_signups (
  id         uuid primary key default gen_random_uuid(),
  email      text not null check (char_length(email) between 3 and 320),
  source     text not null default 'website' check (char_length(source) <= 50),
  created_at timestamptz not null default now()
);

create unique index if not exists diver_signups_email_key on public.diver_signups (lower(email));

-- Lock both tables down. With row level security on and no policies, the
-- public (anon) key can neither read nor write them. Only the website's
-- server, using the service_role key, can insert rows, and only you can read
-- them in the Supabase dashboard.
alter table public.shop_leads enable row level security;
alter table public.diver_signups enable row level security;
