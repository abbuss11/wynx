drop policy "Visitors can read published blog posts" on public.site_blog_posts;
drop policy "WYNX admins can manage blog posts" on public.site_blog_posts;

create policy "Visitors can read published blog posts"
  on public.site_blog_posts for select to anon
  using (data->>'status' = 'published');

create policy "Authenticated users can read published posts or admins can read all"
  on public.site_blog_posts for select to authenticated
  using (data->>'status' = 'published' or (select public.is_wynx_admin()));

create policy "WYNX admins can insert blog posts"
  on public.site_blog_posts for insert to authenticated
  with check ((select public.is_wynx_admin()));

create policy "WYNX admins can update blog posts"
  on public.site_blog_posts for update to authenticated
  using ((select public.is_wynx_admin()))
  with check ((select public.is_wynx_admin()));

create policy "WYNX admins can delete blog posts"
  on public.site_blog_posts for delete to authenticated
  using ((select public.is_wynx_admin()));

drop policy "Visitors can read live projects" on public.site_projects;
drop policy "WYNX admins can manage projects" on public.site_projects;

create policy "Visitors can read live projects"
  on public.site_projects for select to anon
  using (data->>'status' = 'live');

create policy "Authenticated users can read live projects or admins can read all"
  on public.site_projects for select to authenticated
  using (data->>'status' = 'live' or (select public.is_wynx_admin()));

create policy "WYNX admins can insert projects"
  on public.site_projects for insert to authenticated
  with check ((select public.is_wynx_admin()));

create policy "WYNX admins can update projects"
  on public.site_projects for update to authenticated
  using ((select public.is_wynx_admin()))
  with check ((select public.is_wynx_admin()));

create policy "WYNX admins can delete projects"
  on public.site_projects for delete to authenticated
  using ((select public.is_wynx_admin()));

drop policy "Visitors can read public site settings" on public.site_settings;
drop policy "WYNX admins can manage site settings" on public.site_settings;

create policy "Visitors can read public site settings"
  on public.site_settings for select to anon
  using (true);

create policy "Authenticated users can read public site settings"
  on public.site_settings for select to authenticated
  using (true);

create policy "WYNX admins can insert site settings"
  on public.site_settings for insert to authenticated
  with check ((select public.is_wynx_admin()));

create policy "WYNX admins can update site settings"
  on public.site_settings for update to authenticated
  using ((select public.is_wynx_admin()))
  with check ((select public.is_wynx_admin()));

create policy "WYNX admins can delete site settings"
  on public.site_settings for delete to authenticated
  using ((select public.is_wynx_admin()));
