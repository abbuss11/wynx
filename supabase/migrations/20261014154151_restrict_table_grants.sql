revoke all on public.admin_users from public, anon, authenticated;
revoke all on public.site_quotes from public, anon, authenticated;
revoke all on public.site_clients from public, anon, authenticated;
revoke all on public.site_blog_posts from public, anon, authenticated;
revoke all on public.site_projects from public, anon, authenticated;
revoke all on public.site_settings from public, anon, authenticated;

grant select on public.admin_users to authenticated;

grant insert on public.site_quotes to anon;
grant select, insert, update, delete on public.site_quotes to authenticated;

grant select, insert, update, delete on public.site_clients to authenticated;

grant select on public.site_blog_posts to anon, authenticated;
grant insert, update, delete on public.site_blog_posts to authenticated;

grant select on public.site_projects to anon, authenticated;
grant insert, update, delete on public.site_projects to authenticated;

grant select on public.site_settings to anon, authenticated;
grant insert, update, delete on public.site_settings to authenticated;
