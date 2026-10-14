grant select on public.admin_users to authenticated;

create policy "Administrators can verify their own membership"
  on public.admin_users for select to authenticated
  using (user_id = (select auth.uid()));

create or replace function public.is_wynx_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_wynx_admin() from public;
revoke execute on function public.is_wynx_admin() from anon;
grant execute on function public.is_wynx_admin() to authenticated;
