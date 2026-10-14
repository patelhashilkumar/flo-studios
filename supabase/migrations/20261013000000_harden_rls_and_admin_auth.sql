-- ==============================================================================
-- FLO STUDIOS — SECURITY MIGRATION: HARDEN RLS & ADMIN AUTHORIZATION
-- Migration: 20261013000000_harden_rls_and_admin_auth.sql
--
-- Fixes:
-- 1. Removes permissive `to anon` SELECT/UPDATE/DELETE policies on
--    contact_inquiries, job_applications, and storage.objects (resumes).
-- 2. Enforces role/claim-based studio admin authorization via `public.is_studio_admin()`
--    so authentication alone (`TO authenticated`) never grants admin access.
-- 3. Keeps public anonymous submission (INSERT) working without exposing PII.
-- ==============================================================================

begin;

-- 1. Helper: Studio Admin Authorization Check
-- Uses non-user-editable JWT app_metadata claims or verified studio admin email,
-- and explicitly rejects anonymous Auth sessions.
create or replace function public.is_studio_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select
    (select auth.uid()) is not null
    and coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false) = false
    and (
      coalesce(((select auth.jwt()) -> 'app_metadata' ->> 'role'), '') in ('admin', 'studio_admin')
      or coalesce(((select auth.jwt()) -> 'app_metadata' ->> 'is_admin'), '') = 'true'
      or lower(coalesce(((select auth.jwt()) ->> 'email'), '')) in (
        'theflostudios0@gmail.com',
        'admin@flostudios.com'
      )
    );
$$;

-- Optional: Stamp app_metadata.role = 'studio_admin' on existing studio admin accounts in auth.users
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role": "studio_admin", "is_admin": true}'::jsonb
where lower(email) in ('theflostudios0@gmail.com', 'admin@flostudios.com');

-- ==============================================================================
-- 2. TABLE: public.contact_inquiries
-- ==============================================================================
alter table public.contact_inquiries enable row level security;

drop policy if exists "Allow public anonymous and authenticated insert into contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow public insert into contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow insert contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow admin and studio portal to read contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow authenticated admin users to read contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow read contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow select contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow admin and studio portal to update contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow authenticated admin users to update contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow update contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow admin and studio portal to delete contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow authenticated admin users to delete contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow delete contact_inquiries" on public.contact_inquiries;

create policy "Allow public insert into contact_inquiries"
  on public.contact_inquiries
  for insert
  to anon, authenticated
  with check (
    status = 'new'
    and starred = false
    and length(trim(name)) > 0
    and length(trim(email)) > 0
    and length(trim(message)) > 0
  );

create policy "Allow authorized studio admins to read contact_inquiries"
  on public.contact_inquiries
  for select
  to authenticated
  using ((select public.is_studio_admin()));

create policy "Allow authorized studio admins to update contact_inquiries"
  on public.contact_inquiries
  for update
  to authenticated
  using ((select public.is_studio_admin()))
  with check ((select public.is_studio_admin()));

create policy "Allow authorized studio admins to delete contact_inquiries"
  on public.contact_inquiries
  for delete
  to authenticated
  using ((select public.is_studio_admin()));

-- ==============================================================================
-- 3. TABLE: public.job_applications
-- ==============================================================================
alter table public.job_applications enable row level security;

drop policy if exists "Allow public anonymous and authenticated insert into job_applications" on public.job_applications;
drop policy if exists "Allow public insert into job_applications" on public.job_applications;
drop policy if exists "Allow insert job_applications" on public.job_applications;
drop policy if exists "Allow admin and studio portal to read job_applications" on public.job_applications;
drop policy if exists "Allow authenticated admin users to read job_applications" on public.job_applications;
drop policy if exists "Allow read job_applications" on public.job_applications;
drop policy if exists "Allow select job_applications" on public.job_applications;
drop policy if exists "Allow admin and studio portal to update job_applications" on public.job_applications;
drop policy if exists "Allow authenticated admin users to update job_applications" on public.job_applications;
drop policy if exists "Allow update job_applications" on public.job_applications;
drop policy if exists "Allow admin and studio portal to delete job_applications" on public.job_applications;
drop policy if exists "Allow authenticated admin users to delete job_applications" on public.job_applications;
drop policy if exists "Allow delete job_applications" on public.job_applications;

create policy "Allow public insert into job_applications"
  on public.job_applications
  for insert
  to anon, authenticated
  with check (
    status = 'new'
    and starred = false
    and length(trim(name)) > 0
    and length(trim(email)) > 0
  );

create policy "Allow authorized studio admins to read job_applications"
  on public.job_applications
  for select
  to authenticated
  using ((select public.is_studio_admin()));

create policy "Allow authorized studio admins to update job_applications"
  on public.job_applications
  for update
  to authenticated
  using ((select public.is_studio_admin()))
  with check ((select public.is_studio_admin()));

create policy "Allow authorized studio admins to delete job_applications"
  on public.job_applications
  for delete
  to authenticated
  using ((select public.is_studio_admin()));

-- ==============================================================================
-- 4. TABLE: public.job_postings (CMS)
-- ==============================================================================
alter table public.job_postings enable row level security;

drop policy if exists "Allow public read of active job postings and admin read of all" on public.job_postings;
drop policy if exists "Allow authenticated admin users to insert job_postings" on public.job_postings;
drop policy if exists "Allow authenticated admin users to update job_postings" on public.job_postings;
drop policy if exists "Allow authenticated admin users to delete job_postings" on public.job_postings;
drop policy if exists "Allow authorized studio admins to insert job_postings" on public.job_postings;
drop policy if exists "Allow authorized studio admins to update job_postings" on public.job_postings;
drop policy if exists "Allow authorized studio admins to delete job_postings" on public.job_postings;

create policy "Allow public read of active job postings and admin read of all"
  on public.job_postings
  for select
  to anon, authenticated
  using (status = 'active' or (select public.is_studio_admin()));

create policy "Allow authorized studio admins to insert job_postings"
  on public.job_postings
  for insert
  to authenticated
  with check ((select public.is_studio_admin()));

create policy "Allow authorized studio admins to update job_postings"
  on public.job_postings
  for update
  to authenticated
  using ((select public.is_studio_admin()))
  with check ((select public.is_studio_admin()));

create policy "Allow authorized studio admins to delete job_postings"
  on public.job_postings
  for delete
  to authenticated
  using ((select public.is_studio_admin()));

-- ==============================================================================
-- 5. STORAGE BUCKET: resumes (Private)
-- ==============================================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'resumes',
  'resumes',
  false,
  5242880,
  array['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
on conflict (id) do update set
  public = false,
  file_size_limit = 5242880,
  allowed_mime_types = array['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

drop policy if exists "Allow anonymous and authenticated candidates to upload resumes" on storage.objects;
drop policy if exists "Allow authenticated admin users to read candidate resumes" on storage.objects;
drop policy if exists "Allow authenticated read resumes" on storage.objects;
drop policy if exists "Allow read resumes" on storage.objects;
drop policy if exists "Allow authenticated admin users to delete resumes" on storage.objects;
drop policy if exists "Allow authorized studio admins to read candidate resumes" on storage.objects;
drop policy if exists "Allow authorized studio admins to update candidate resumes" on storage.objects;
drop policy if exists "Allow authorized studio admins to delete candidate resumes" on storage.objects;

create policy "Allow anonymous and authenticated candidates to upload resumes"
  on storage.objects
  for insert
  to anon, authenticated
  with check (
    bucket_id = 'resumes'
    and (storage.foldername(name))[1] like 'resumes_%'
  );

create policy "Allow authorized studio admins to read candidate resumes"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'resumes'
    and (select public.is_studio_admin())
  );

create policy "Allow authorized studio admins to update candidate resumes"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'resumes'
    and (select public.is_studio_admin())
  )
  with check (
    bucket_id = 'resumes'
    and (select public.is_studio_admin())
  );

create policy "Allow authorized studio admins to delete candidate resumes"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'resumes'
    and (select public.is_studio_admin())
  );

commit;
