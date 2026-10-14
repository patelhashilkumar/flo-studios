-- ==============================================================================
-- FLO STUDIOS — HARDENED ROW-LEVEL SECURITY (RLS) FOR ADMIN PORTAL CLOUD SYNC
-- Run this in Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Studio Admin Authorization Helper (rejects anon and unauthorized authenticated users)
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

-- 2. Ensure RLS is active on public tables
alter table public.job_applications enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.job_postings enable row level security;

-- 3. Drop legacy permissive policies on job_applications
drop policy if exists "Allow admin and studio portal to read job_applications" on public.job_applications;
drop policy if exists "Allow authenticated admin users to read job_applications" on public.job_applications;
drop policy if exists "Allow read job_applications" on public.job_applications;
drop policy if exists "Allow select job_applications" on public.job_applications;
drop policy if exists "Allow public anonymous and authenticated insert into job_applications" on public.job_applications;
drop policy if exists "Allow public insert into job_applications" on public.job_applications;
drop policy if exists "Allow insert job_applications" on public.job_applications;
drop policy if exists "Allow admin and studio portal to update job_applications" on public.job_applications;
drop policy if exists "Allow authenticated admin users to update job_applications" on public.job_applications;
drop policy if exists "Allow update job_applications" on public.job_applications;
drop policy if exists "Allow admin and studio portal to delete job_applications" on public.job_applications;
drop policy if exists "Allow authenticated admin users to delete job_applications" on public.job_applications;
drop policy if exists "Allow delete job_applications" on public.job_applications;
drop policy if exists "Allow authorized studio admins to read job_applications" on public.job_applications;
drop policy if exists "Allow authorized studio admins to update job_applications" on public.job_applications;
drop policy if exists "Allow authorized studio admins to delete job_applications" on public.job_applications;

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

-- 4. Drop legacy permissive policies on contact_inquiries
drop policy if exists "Allow admin and studio portal to read contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow authenticated admin users to read contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow read contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow select contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow public anonymous and authenticated insert into contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow public insert into contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow insert contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow admin and studio portal to update contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow authenticated admin users to update contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow update contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow admin and studio portal to delete contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow authenticated admin users to delete contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow delete contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow authorized studio admins to read contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow authorized studio admins to update contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow authorized studio admins to delete contact_inquiries" on public.contact_inquiries;

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

-- 5. Lock down Storage RLS on candidate resumes bucket
drop policy if exists "Allow authenticated read resumes" on storage.objects;
drop policy if exists "Allow read resumes" on storage.objects;
drop policy if exists "Allow authenticated admin users to read candidate resumes" on storage.objects;
drop policy if exists "Allow authorized studio admins to read candidate resumes" on storage.objects;

create policy "Allow authorized studio admins to read candidate resumes"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'resumes'
    and (select public.is_studio_admin())
  );

