-- TABLE: works
create table public.works (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  company text not null,
  location text not null,
  pay text not null,
  duration text not null,
  tags text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- TABLE: events
create table public.events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  date text not null,
  time text not null,
  location text not null,
  type text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- TABLE: applications
create table public.applications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users on delete cascade,
  work_id uuid not null references public.works on delete cascade,
  status text default 'Pending' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, work_id)
);

-- Enable Row Level Security (RLS)
alter table public.works enable row level security;
alter table public.events enable row level security;
alter table public.applications enable row level security;

-- Policies for works (viewable by everyone)
create policy "Works are viewable by everyone." on public.works for select using (true);

-- Policies for events (viewable by everyone)
create policy "Events are viewable by everyone." on public.events for select using (true);

-- Policies for applications (users can view/insert their own)
create policy "Users can view their own applications." on public.applications 
  for select using (auth.uid() = user_id);
create policy "Users can insert their own applications." on public.applications 
  for insert with check (auth.uid() = user_id);

-- SEED DATA
insert into public.works (title, company, location, pay, duration, tags)
values 
  ('Construction Site Worker', 'BuildRight Corp', 'Downtown Metro', '$25/hr', '2 weeks', ARRAY['Heavy Lifting', 'Safety Gear Required']),
  ('Warehouse Loader', 'Logistics Pro', 'Westside Industrial Park', '$20/hr', 'On-going', ARRAY['Night Shift', 'Forklift optional']),
  ('Plumber Assistant', 'QuickFix Plumbing', 'North Suburbs', '$22/hr', '3 days', ARRAY['Apprentice', 'Tools Provided']);

insert into public.events (title, date, time, location, type)
values 
  ('OSHA Safety Certification', 'April 10, 2026', '09:00 AM', 'Online', 'Training'),
  ('Heavy Machinery Workshop', 'April 18, 2026', '14:00 PM', 'City Convention Center', 'Workshop');
