-- Il Salotto: the whole database.
-- Paste this into the Supabase SQL editor and run it once.

-- Who is in the room. One row per member, created on first sign-in.
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text not null default 'A member',
  -- the line beside a name: "Torino", "moving in May", "dreaming from Ohio"
  where_from text,
  created_at timestamptz not null default now()
);

-- Notes left on a path. path is 'book' | 'city' | 'soul'.
create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  author uuid not null references profiles on delete cascade,
  path text not null,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);

-- Posts in La Conversazione, the open room.
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  author uuid not null references profiles on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);

-- A heart on a note or a post. One per member per thing.
create table if not exists hearts (
  id uuid primary key default gen_random_uuid(),
  member uuid not null references profiles on delete cascade,
  target_kind text not null check (target_kind in ('note', 'post')),
  target_id uuid not null,
  created_at timestamptz not null default now(),
  unique (member, target_kind, target_id)
);

create index if not exists notes_path_created on notes (path, created_at desc);
create index if not exists posts_created on posts (created_at desc);
create index if not exists hearts_target on hearts (target_kind, target_id);

-- Give every new sign-in a profile automatically.
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Row level security: members read the room, and write only as themselves.
alter table profiles enable row level security;
alter table notes enable row level security;
alter table posts enable row level security;
alter table hearts enable row level security;

create policy "profiles are readable by members" on profiles
  for select to authenticated using (true);
create policy "a member edits their own profile" on profiles
  for update to authenticated using (auth.uid() = id);

create policy "notes are readable by members" on notes
  for select to authenticated using (true);
create policy "a member writes their own notes" on notes
  for insert to authenticated with check (auth.uid() = author);
create policy "a member deletes their own notes" on notes
  for delete to authenticated using (auth.uid() = author);

create policy "posts are readable by members" on posts
  for select to authenticated using (true);
create policy "a member writes their own posts" on posts
  for insert to authenticated with check (auth.uid() = author);
create policy "a member deletes their own posts" on posts
  for delete to authenticated using (auth.uid() = author);

create policy "hearts are readable by members" on hearts
  for select to authenticated using (true);
create policy "a member gives their own hearts" on hearts
  for insert to authenticated with check (auth.uid() = member);
create policy "a member takes back their own hearts" on hearts
  for delete to authenticated using (auth.uid() = member);
