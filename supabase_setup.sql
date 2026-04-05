-- Create a table for public profiles
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text not null,
  name text,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);
create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Function to handle new user signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, phone)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
