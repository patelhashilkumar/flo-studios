# Supabase Full-Stack Integration Design Specification

**Date:** 2026-10-08  
**Status:** Pending Review  
**Project:** Flo Studios (`new site`)  
**Topic:** End-to-End Supabase Data Architecture, Auth, Storage & CMS Integration  

---

## 1. Executive Summary & Goals

The Flo Studios platform currently relies on client-side storage (`localStorage` / in-memory) for contact inquiries, job applications, resumes (base64 strings), and job postings. This specification defines a production-grade transition to **Supabase** as the complete backend infrastructure:

1. **Relational Database (PostgreSQL)**:
   - Dedicated tables for `contact_inquiries`, `job_applications`, and `job_postings`.
   - Strict column typing, UUID primary keys, timestamps, and indexes on query filters.
2. **Private File Storage (`resumes`)**:
   - Secure private storage bucket in Supabase Storage.
   - Candidates upload directly with size and MIME validation.
   - Resumes can only be downloaded or previewed by authenticated Admins via signed URLs.
3. **Enterprise Authentication (Supabase Auth)**:
   - Email/password authentication replacing client-side hardcoded passcodes.
   - JWT sessions managed via Supabase Auth client.
4. **Row-Level Security (RLS)**:
   - Best-practice RLS policies isolating public submissions from administrative management.
   - Deprecated patterns (`auth.role()`) avoided in favor of direct `TO anon` and `TO authenticated` clauses.
5. **Seamless Local/Dev Fallback**:
   - If `.env` lacks Supabase credentials during initial setup or preview, the app displays helpful configuration notices without crashing.

---

## 2. Architecture & Data Flow

```
┌────────────────────────────────────────────────────────┐
│                   Flo Studios Web Client               │
└──────────────────────────────────────┬─────────────────┘
                                       │
     ┌─────────────────────────────────┼──────────────────────────────┐
     │                                 │                              │
     ▼                                 ▼                              ▼
Public Form Submissions       Public Career Pages            Admin Portal (/admin)
• /contact (Inquiries)        • /careers (Job Openings)      • Supabase Auth Login
• /careers (Applications)     • Real-time Active Jobs        • Inquiries Dashboard
• Resumes (Direct Upload)                                    • Applications Manager
     │                                 │                     • Job Postings CMS
     │ (INSERT as anon)                │ (SELECT as anon)    • Signed Resume URLs
     ▼                                 ▼                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Supabase Cloud Backend                           │
├─────────────────────────┬──────────────────────────┬────────────────────────┤
│     PostgreSQL (RLS)    │     Storage Bucket       │      Supabase Auth     │
│  • contact_inquiries    │  • resumes (Private)     │  • Email / Password    │
│  • job_applications     │    - anon: INSERT only   │  • JWT verification    │
│  • job_postings (CMS)   │    - admin: SELECT signed│  • Session state       │
└─────────────────────────┴──────────────────────────┴────────────────────────┘
```

---

## 3. Database Schema (PostgreSQL DDL)

### 3.1 Tables

#### 1. `contact_inquiries`
Stores lead generation submissions from the contact modal and page.
```sql
create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  phone text default '',
  service text default '',
  budget text default '',
  message text not null,
  status text default 'new' not null check (status in ('new', 'reviewed', 'contacted', 'archived')),
  starred boolean default false not null
);

create index if not exists idx_contact_inquiries_created_at on public.contact_inquiries (created_at desc);
create index if not exists idx_contact_inquiries_status on public.contact_inquiries (status);
```

#### 2. `job_applications`
Stores candidate job applications from `/careers`.
```sql
create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  job_id text not null,
  role_title text not null,
  name text not null,
  email text not null,
  phone text not null,
  region text not null,
  experience text not null,
  linkedin_url text default '',
  notes text default '',
  resume_path text default '',
  resume_name text default '',
  resume_size text default '',
  status text default 'new' not null check (status in ('new', 'reviewing', 'interviewing', 'offer', 'rejected', 'archived')),
  starred boolean default false not null
);

create index if not exists idx_job_applications_created_at on public.job_applications (created_at desc);
create index if not exists idx_job_applications_job_id on public.job_applications (job_id);
create index if not exists idx_job_applications_status on public.job_applications (status);
```

#### 3. `job_postings`
Stores job openings for the public careers page and Admin CMS.
```sql
create table if not exists public.job_postings (
  id text primary key,
  slug text not null unique,
  tab_number text not null default '01',
  tab_label text not null,
  title text not null,
  division text default 'Development Division' not null,
  status text default 'active' not null check (status in ('active', 'draft', 'closed')),
  badges jsonb default '[]'::jsonb not null,
  about_company text not null,
  about_job jsonb default '[]'::jsonb not null,
  responsibilities jsonb default '[]'::jsonb not null,
  compensation_lead text default '',
  compensation_items jsonb default '[]'::jsonb not null,
  compensation_terms text default '',
  minimum_qualifications jsonb default '[]'::jsonb not null,
  preferred_qualifications jsonb default '[]'::jsonb not null,
  what_success_looks_like text default '',
  thrive_points jsonb default '[]'::jsonb not null,
  company_mission text default '',
  equal_opportunity text default '',
  legal_disclaimer text default '',
  form_config jsonb default '{}'::jsonb not null,
  display_order integer default 1 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_job_postings_status on public.job_postings (status);
create index if not exists idx_job_postings_display_order on public.job_postings (display_order asc);
```

---

## 4. Row-Level Security (RLS) & Storage Access Policies

Adheres to Supabase security recommendations:
- Enable RLS on all tables in `public`.
- Avoid deprecated `auth.role()` in favor of direct `TO anon` and `TO authenticated`.

### 4.1 Policies for `contact_inquiries`
```sql
alter table public.contact_inquiries enable row level security;

-- Anyone (public/anon) can submit an inquiry
create policy "Allow anonymous and authenticated insert"
  on public.contact_inquiries
  for insert
  to anon, authenticated
  with check (true);

-- Only authenticated users (Admin) can view inquiries
create policy "Allow authenticated users to read inquiries"
  on public.contact_inquiries
  for select
  to authenticated
  using (true);

-- Only authenticated users can update inquiries
create policy "Allow authenticated users to update inquiries"
  on public.contact_inquiries
  for update
  to authenticated
  using (true)
  with check (true);

-- Only authenticated users can delete inquiries
create policy "Allow authenticated users to delete inquiries"
  on public.contact_inquiries
  for delete
  to authenticated
  using (true);
```

### 4.2 Policies for `job_applications`
```sql
alter table public.job_applications enable row level security;

-- Anyone can submit an application
create policy "Allow anonymous and authenticated insert"
  on public.job_applications
  for insert
  to anon, authenticated
  with check (true);

-- Only authenticated users (Admin) can view applications
create policy "Allow authenticated users to read applications"
  on public.job_applications
  for select
  to authenticated
  using (true);

-- Only authenticated users can update applications
create policy "Allow authenticated users to update applications"
  on public.job_applications
  for update
  to authenticated
  using (true)
  with check (true);

-- Only authenticated users can delete applications
create policy "Allow authenticated users to delete applications"
  on public.job_applications
  for delete
  to authenticated
  using (true);
```

### 4.3 Policies for `job_postings`
```sql
alter table public.job_postings enable row level security;

-- Public can view active job postings
create policy "Allow public to view active job postings"
  on public.job_postings
  for select
  to anon, authenticated
  using (status = 'active' or (select auth.role()) = 'authenticated');

-- Only authenticated users can insert, update, or delete jobs
create policy "Allow authenticated users to insert job postings"
  on public.job_postings
  for insert
  to authenticated
  with check (true);

create policy "Allow authenticated users to update job postings"
  on public.job_postings
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Allow authenticated users to delete job postings"
  on public.job_postings
  for delete
  to authenticated
  using (true);
```

### 4.4 Supabase Storage: Private `resumes` Bucket
```sql
-- Create private bucket if not exists
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'resumes',
  'resumes',
  false,
  5242880, -- 5 MB limit
  array['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
on conflict (id) do update set
  public = false,
  file_size_limit = 5242880;

-- Allow anyone (candidate) to upload resumes
create policy "Allow candidates to upload resumes"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'resumes');

-- Only authenticated admins can read/download resumes
create policy "Allow admins to read resumes"
  on storage.objects
  for select
  to authenticated
  using (bucket_id = 'resumes');

-- Only authenticated admins can delete resumes
create policy "Allow admins to delete resumes"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'resumes');
```

---

## 5. Seed Data

Pre-populates `job_postings` with the official Flo Studios **Sales Development Representative** opening verbatim, matching `src/data/jobPostings.js`.

---

## 6. Frontend & Application Architecture

### 6.1 Dependency Installation
- Install `@supabase/supabase-js` (pinned).

### 6.2 Supabase Client (`src/lib/supabase.js`)
- Reads `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_ANON_KEY`.
- Helper `isSupabaseConfigured()` to verify credentials.
- Creates and exports `supabase` client instance.

### 6.3 Service Layer (`src/services/supabaseService.js`)
- **Inquiries**: `createInquiry`, `getInquiries`, `updateInquiryStatus`, `toggleInquiryStar`, `deleteInquiry`.
- **Applications**: `createJobApplication`, `uploadResumeFile`, `getJobApplications`, `getResumeSignedUrl`, `updateApplicationStatus`, `toggleApplicationStar`, `deleteApplication`.
- **Jobs CMS**: `fetchJobPostings`, `upsertJobPosting`, `deleteJobPosting`, `resetJobPostings`.
- **Auth**: `signInAdmin(email, password)`, `signOutAdmin()`, `getAdminSession()`, `onAuthChange(callback)`.

### 6.4 Hybrid Adapter (`src/services/adminStorage.js`)
- Acts as a unified data gateway: routes calls to Supabase when configured, otherwise falls back gracefully to local storage with an informative notice.

### 6.5 Admin Page Updates (`src/pages/AdminPage.jsx`)
- Supports modern Supabase Email/Password login.
- Displays real-time connection status (Connected to Supabase / Local Preview Mode).
- Generates secure signed resume download links on-the-fly for private documents.

---

## 7. Verification & Testing Plan

1. **Schema Syntax Verification**: Verify all SQL executes cleanly in Supabase SQL Editor.
2. **Local Build Check**: Run `npm run build` with zero errors.
3. **Environment Setup**: Provide `.env.example` and a step-by-step setup guide for the user.
4. **Form Submissions**:
   - Contact form sends record to `contact_inquiries`.
   - Careers form uploads resume file to `resumes` bucket and inserts into `job_applications`.
5. **Admin Portal**:
   - Authenticates via Supabase Auth.
   - Loads real-time applications and inquiries from database.
   - Edits and manages jobs directly in `job_postings`.
