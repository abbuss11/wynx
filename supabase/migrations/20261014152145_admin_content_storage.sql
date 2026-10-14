create table public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default 'WYNX Admin',
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
revoke all on public.admin_users from anon, authenticated;

create or replace function public.is_wynx_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_wynx_admin() from public;
grant execute on function public.is_wynx_admin() to anon, authenticated;

create table public.site_quotes (
  id text primary key,
  data jsonb not null check (jsonb_typeof(data) = 'object'),
  created_at timestamptz not null default now(),
  constraint site_quotes_public_submission_check check (
    length(data->>'clientName') between 1 and 100
    and (data->>'clientEmail') ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    and jsonb_typeof(data->'services') = 'array'
    and length(data->>'description') between 1 and 4000
  )
);

alter table public.site_quotes enable row level security;
grant insert on public.site_quotes to anon;
grant select, insert, update, delete on public.site_quotes to authenticated;

create policy "Visitors can submit quote requests"
  on public.site_quotes for insert to anon
  with check (
    data->>'status' = 'new'
    and length(data->>'clientName') between 1 and 100
    and (data->>'clientEmail') ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    and jsonb_typeof(data->'services') = 'array'
    and length(data->>'description') between 1 and 4000
  );

create policy "WYNX admins can manage quote requests"
  on public.site_quotes for all to authenticated
  using ((select public.is_wynx_admin()))
  with check ((select public.is_wynx_admin()));

create table public.site_clients (
  id text primary key,
  data jsonb not null check (jsonb_typeof(data) = 'object'),
  created_at timestamptz not null default now()
);

alter table public.site_clients enable row level security;
grant select, insert, update, delete on public.site_clients to authenticated;

create policy "WYNX admins can manage clients"
  on public.site_clients for all to authenticated
  using ((select public.is_wynx_admin()))
  with check ((select public.is_wynx_admin()));

create table public.site_blog_posts (
  id text primary key,
  data jsonb not null check (jsonb_typeof(data) = 'object'),
  created_at timestamptz not null default now()
);

alter table public.site_blog_posts enable row level security;
grant select on public.site_blog_posts to anon, authenticated;
grant insert, update, delete on public.site_blog_posts to authenticated;

create policy "Visitors can read published blog posts"
  on public.site_blog_posts for select to anon, authenticated
  using (data->>'status' = 'published');

create policy "WYNX admins can manage blog posts"
  on public.site_blog_posts for all to authenticated
  using ((select public.is_wynx_admin()))
  with check ((select public.is_wynx_admin()));

create table public.site_projects (
  id text primary key,
  data jsonb not null check (jsonb_typeof(data) = 'object'),
  created_at timestamptz not null default now()
);

alter table public.site_projects enable row level security;
grant select on public.site_projects to anon, authenticated;
grant insert, update, delete on public.site_projects to authenticated;

create policy "Visitors can read live projects"
  on public.site_projects for select to anon, authenticated
  using (data->>'status' = 'live');

create policy "WYNX admins can manage projects"
  on public.site_projects for all to authenticated
  using ((select public.is_wynx_admin()))
  with check ((select public.is_wynx_admin()));

create table public.site_settings (
  id smallint primary key check (id = 1),
  data jsonb not null check (jsonb_typeof(data) = 'object'),
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;
grant select on public.site_settings to anon, authenticated;
grant insert, update, delete on public.site_settings to authenticated;

create policy "Visitors can read public site settings"
  on public.site_settings for select to anon, authenticated
  using (true);

create policy "WYNX admins can manage site settings"
  on public.site_settings for all to authenticated
  using ((select public.is_wynx_admin()))
  with check ((select public.is_wynx_admin()));
