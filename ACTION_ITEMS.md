# Flo Studios — Simple 3-Step Production Guide

Follow these 3 steps in order to make your live website secure and working.

---

## STEP 1: Run This One SQL Script in Supabase

1. Open your [Supabase Project Dashboard](https://supabase.com/dashboard).
2. Click **SQL Editor** on the left menu -> click **New query**.
3. Copy and paste the entire SQL block below into the editor.
4. If your admin email is not `theflostudios0@gmail.com` or `admin@flostudios.com`, change the email on line 21 and line 28 to your email.
5. Click **Run** (green button).

```sql
-- 1. Helper function for admin check
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

grant execute on function public.is_studio_admin() to anon, authenticated;

-- 2. Give your admin account admin rights
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role": "studio_admin", "is_admin": true}'::jsonb
where lower(email) in ('theflostudios0@gmail.com', 'admin@flostudios.com');

-- 3. Contact Inquiries (Public can submit, only Admin can read/edit/delete)
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
drop policy if exists "Allow authorized studio admins to read contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow authorized studio admins to update contact_inquiries" on public.contact_inquiries;
drop policy if exists "Allow authorized studio admins to delete contact_inquiries" on public.contact_inquiries;

create policy "Allow public insert into contact_inquiries"
  on public.contact_inquiries for insert to anon, authenticated
  with check (status = 'new' and starred = false and length(trim(name)) > 0 and length(trim(email)) > 0 and length(trim(message)) > 0);

create policy "Allow authorized studio admins to read contact_inquiries"
  on public.contact_inquiries for select to authenticated
  using ((select public.is_studio_admin()));

create policy "Allow authorized studio admins to update contact_inquiries"
  on public.contact_inquiries for update to authenticated
  using ((select public.is_studio_admin()))
  with check ((select public.is_studio_admin()));

create policy "Allow authorized studio admins to delete contact_inquiries"
  on public.contact_inquiries for delete to authenticated
  using ((select public.is_studio_admin()));

-- 4. Job Applications (Public can submit, only Admin can read/edit/delete)
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
drop policy if exists "Allow authorized studio admins to read job_applications" on public.job_applications;
drop policy if exists "Allow authorized studio admins to update job_applications" on public.job_applications;
drop policy if exists "Allow authorized studio admins to delete job_applications" on public.job_applications;

create policy "Allow public insert into job_applications"
  on public.job_applications for insert to anon, authenticated
  with check (status = 'new' and starred = false and length(trim(name)) > 0 and length(trim(email)) > 0);

create policy "Allow authorized studio admins to read job_applications"
  on public.job_applications for select to authenticated
  using ((select public.is_studio_admin()));

create policy "Allow authorized studio admins to update job_applications"
  on public.job_applications for update to authenticated
  using ((select public.is_studio_admin()))
  with check ((select public.is_studio_admin()));

create policy "Allow authorized studio admins to delete job_applications"
  on public.job_applications for delete to authenticated
  using ((select public.is_studio_admin()));

-- 5. Job Postings (Public can view active jobs, only Admin can edit CMS)
alter table public.job_postings enable row level security;
drop policy if exists "Allow public read of active job postings and admin read of all" on public.job_postings;
drop policy if exists "Allow authenticated admin users to insert job_postings" on public.job_postings;
drop policy if exists "Allow authenticated admin users to update job_postings" on public.job_postings;
drop policy if exists "Allow authenticated admin users to delete job_postings" on public.job_postings;
drop policy if exists "Allow authorized studio admins to insert job_postings" on public.job_postings;
drop policy if exists "Allow authorized studio admins to update job_postings" on public.job_postings;
drop policy if exists "Allow authorized studio admins to delete job_postings" on public.job_postings;

create policy "Allow public read of active job postings and admin read of all"
  on public.job_postings for select to anon, authenticated
  using (status = 'active' or (select public.is_studio_admin()));

create policy "Allow authorized studio admins to insert job_postings"
  on public.job_postings for insert to authenticated
  with check ((select public.is_studio_admin()));

create policy "Allow authorized studio admins to update job_postings"
  on public.job_postings for update to authenticated
  using ((select public.is_studio_admin()))
  with check ((select public.is_studio_admin()));

create policy "Allow authorized studio admins to delete job_postings"
  on public.job_postings for delete to authenticated
  using ((select public.is_studio_admin()));

-- 6. Resumes Storage Bucket & Access
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
drop policy if exists "Allow authorized studio admins to read candidate resumes" on storage.objects;
drop policy if exists "Allow authorized studio admins to update candidate resumes" on storage.objects;
drop policy if exists "Allow authorized studio admins to delete candidate resumes" on storage.objects;
drop policy if exists "Allow authenticated admin users to read candidate resumes" on storage.objects;
drop policy if exists "Allow authenticated read resumes" on storage.objects;
drop policy if exists "Allow read resumes" on storage.objects;
drop policy if exists "Allow authenticated admin users to delete resumes" on storage.objects;

create policy "Allow anonymous and authenticated candidates to upload resumes"
  on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'resumes' and (storage.foldername(name))[1] like 'resumes_%');

create policy "Allow authorized studio admins to read candidate resumes"
  on storage.objects for select to authenticated
  using (bucket_id = 'resumes' and (select public.is_studio_admin()));

create policy "Allow authorized studio admins to update candidate resumes"
  on storage.objects for update to authenticated
  using (bucket_id = 'resumes' and (select public.is_studio_admin()))
  with check (bucket_id = 'resumes' and (select public.is_studio_admin()));

create policy "Allow authorized studio admins to delete candidate resumes"
  on storage.objects for delete to authenticated
  using (bucket_id = 'resumes' and (select public.is_studio_admin()));
```

---

## STEP 2: Add 2 Environment Variables to Your Hosting (Vercel / Netlify)

1. In Supabase Dashboard, go to **Project Settings** -> **API**.
2. Copy:
   - **Project URL**
   - **anon / public key**
3. In your Vercel (or Netlify) project settings under **Environment Variables**, add:
   - `VITE_SUPABASE_URL` = (paste Project URL)
   - `VITE_SUPABASE_ANON_KEY` = (paste anon / public key)
4. (Optional): If you test locally, add these same two lines into your local `.env` file.

---

## STEP 3: Push the Code to GitHub

Open your terminal in this project and run:

```bash
git add .
git commit -m "fix: harden security, RLS policies, and site fixes"
git push origin main
```

Your hosting provider (Vercel / Netlify) will automatically rebuild and deploy the secure site!
