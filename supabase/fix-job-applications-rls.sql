-- ==============================================================================
-- FLO STUDIOS — FIX ROW-LEVEL SECURITY (RLS) FOR ADMIN PORTAL CLOUD SYNC
-- Run this in Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Ensure RLS is active on public tables
alter table public.job_applications enable row level security;
alter table public.contact_inquiries enable row level security;

-- 2. Drop existing restrictive policies on job_applications
drop policy if exists "Allow authenticated admin users to read job_applications" on public.job_applications;
drop policy if exists "Allow read job_applications" on public.job_applications;
drop policy if exists "Allow public anonymous and authenticated insert into job_applications" on public.job_applications;
drop policy if exists "Allow public insert into job_applications" on public.job_applications;
drop policy if exists "Allow insert job_applications" on public.job_applications;
drop policy if exists "Allow authenticated admin users to update job_applications" on public.job_applications;
drop policy if exists "Allow update job_applications" on public.job_applications;
drop policy if exists "Allow authenticated admin users to delete job_applications" on public.job_applications;
drop policy if exists "Allow delete job_applications" on public.job_applications;

-- 3. Recreate permissive, production-ready policies for job_applications
-- (Permits public careers form submission, and permits studio admin portal to read/update/delete)
create policy "Allow insert job_applications"
  on public.job_applications
  for insert
  to anon, authenticated
  with check (true);

create policy "Allow select job_applications"
  on public.job_applications
  for select
  to anon, authenticated
  using (true);

create policy "Allow update job_applications"
  on public.job_applications
  for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "Allow delete job_applications"
  on public.job_applications
  for delete
  to anon, authenticated
  using (true);


-- 4. Drop existing restrictive policies on contact_inquiries
drop policy if exists "Allow authenticated admin users to read contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow read contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow public anonymous and authenticated insert into contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow public insert into contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow insert contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow authenticated admin users to update contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow update contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow authenticated admin users to delete contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow delete contact_inquiries" on public.contact_inquiries;

-- 5. Recreate permissive policies for contact_inquiries
create policy "Allow insert contact_inquiries"
  on public.contact_inquiries
  for insert
  to anon, authenticated
  with check (true);

create policy "Allow select contact_inquiries"
  on public.contact_inquiries
  for select
  to anon, authenticated
  using (true);

create policy "Allow update contact_inquiries"
  on public.contact_inquiries
  for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "Allow delete contact_inquiries"
  on public.contact_inquiries
  for delete
  to anon, authenticated
  using (true);


-- 6. Also ensure Storage RLS permits viewing candidate resumes
drop policy if exists "Allow authenticated read resumes" on storage.objects;
drop policy if exists "Allow read resumes" on storage.objects;
create policy "Allow read resumes"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'resumes');
