-- 1. PROFILES (Modified with Role)
create table if not exists public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text not null,
  name text,
  phone text,
  role text check (role in ('labour', 'employer')),
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- 2. COMPANIES (For Employers)
create table if not exists public.companies (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  logo_url text,
  location text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for companies
alter table public.companies enable row level security;
create policy "Companies are viewable by everyone." on public.companies for select using (true);
create policy "Employers can manage their own company." on public.companies 
  for all using (auth.uid() = owner_id);

-- 3. WORKS / JOBS
create table if not exists public.works (
  id uuid default gen_random_uuid() primary key,
  company_id uuid references public.companies(id) on delete cascade,
  title text not null,
  description text not null,
  location text not null,
  pay integer not null,
  duration text not null,
  type text check (type in ('shift', 'fulltime')) default 'shift',
  status text check (status in ('open', 'closed')) default 'open',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for works
alter table public.works enable row level security;
create policy "Works are viewable by everyone." on public.works for select using (true);
create policy "Employers can manage their own jobs." on public.works 
  for all using (
    exists (
      select 1 from public.companies 
      where id = public.works.company_id and owner_id = auth.uid()
    )
  );

-- 4. APPLICATIONS (With Bidding)
create table if not exists public.applications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  work_id uuid not null references public.works(id) on delete cascade,
  status text check (status in ('pending', 'accepted', 'rejected')) default 'pending',
  bid_amount integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, work_id)
);

-- Enable RLS for applications
alter table public.applications enable row level security;
create policy "Users can view their own applications." on public.applications for select using (auth.uid() = user_id);
create policy "Employers can view applications for their jobs." on public.applications 
  for select using (
    exists (
      select 1 from public.works 
      join public.companies on works.company_id = companies.id
      where works.id = public.applications.work_id and companies.owner_id = auth.uid()
    )
  );
create policy "Workers can apply for jobs." on public.applications for insert with check (auth.uid() = user_id);

-- 5. DOCUMENTS (Verification)
create table if not exists public.documents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text check (type in ('profile', 'aadhar')),
  url text not null,
  verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for documents
alter table public.documents enable row level security;
create policy "Users can manage their own documents." on public.documents for all using (auth.uid() = user_id);

-- 6. EVENTS (Worker Side)
create table if not exists public.events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  datetime timestamp with time zone not null,
  location text not null,
  type text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for events
alter table public.events enable row level security;
create policy "Events are viewable by everyone." on public.events for select using (true);

-- 7. TRIGGER: Handle New User Signup with Role
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, phone, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'phone',
    coalesce(new.raw_user_meta_data->>'role', 'labour')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
-- Drop if exists to avoid errors on schema re-runs
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
