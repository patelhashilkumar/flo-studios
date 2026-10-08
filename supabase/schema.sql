-- ==============================================================================
-- FLO STUDIOS — COMPLETE SUPABASE DATABASE & STORAGE SCHEMA
-- Production Schema: Inquiries, Job Applications, Job Postings (CMS), & Resumes
-- ==============================================================================

-- 1. EXTENSIONS
create extension if not exists "pgcrypto";

-- ==============================================================================
-- 2. TABLE: contact_inquiries
-- ==============================================================================
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

-- Enable RLS
alter table public.contact_inquiries enable row level security;

-- Policies
create policy "Allow public anonymous and authenticated insert into contact_inquiries"
  on public.contact_inquiries
  for insert
  to anon, authenticated
  with check (true);

create policy "Allow authenticated admin users to read contact_inquiries"
  on public.contact_inquiries
  for select
  to authenticated
  using (true);

create policy "Allow authenticated admin users to update contact_inquiries"
  on public.contact_inquiries
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Allow authenticated admin users to delete contact_inquiries"
  on public.contact_inquiries
  for delete
  to authenticated
  using (true);


-- ==============================================================================
-- 3. TABLE: job_applications
-- ==============================================================================
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

-- Enable RLS
alter table public.job_applications enable row level security;

-- Policies
create policy "Allow public anonymous and authenticated insert into job_applications"
  on public.job_applications
  for insert
  to anon, authenticated
  with check (true);

create policy "Allow authenticated admin users to read job_applications"
  on public.job_applications
  for select
  to authenticated
  using (true);

create policy "Allow authenticated admin users to update job_applications"
  on public.job_applications
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Allow authenticated admin users to delete job_applications"
  on public.job_applications
  for delete
  to authenticated
  using (true);


-- ==============================================================================
-- 4. TABLE: job_postings (CMS)
-- ==============================================================================
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

-- Enable RLS
alter table public.job_postings enable row level security;

-- Policies
create policy "Allow public read of active job postings and admin read of all"
  on public.job_postings
  for select
  to anon, authenticated
  using (status = 'active' or (select auth.uid()) is not null);

create policy "Allow authenticated admin users to insert job_postings"
  on public.job_postings
  for insert
  to authenticated
  with check (true);

create policy "Allow authenticated admin users to update job_postings"
  on public.job_postings
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Allow authenticated admin users to delete job_postings"
  on public.job_postings
  for delete
  to authenticated
  using (true);


-- ==============================================================================
-- 5. STORAGE BUCKET: resumes (Private)
-- ==============================================================================
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

-- Storage RLS Policies
create policy "Allow anonymous and authenticated candidates to upload resumes"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'resumes');

create policy "Allow authenticated admin users to read candidate resumes"
  on storage.objects
  for select
  to authenticated
  using (bucket_id = 'resumes');

create policy "Allow authenticated admin users to delete resumes"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'resumes');


-- ==============================================================================
-- 6. INITIAL SEED DATA: Verified Sales Development Representative Role
-- ==============================================================================
insert into public.job_postings (
  id,
  slug,
  tab_number,
  tab_label,
  title,
  division,
  status,
  badges,
  about_company,
  about_job,
  responsibilities,
  compensation_lead,
  compensation_items,
  compensation_terms,
  minimum_qualifications,
  preferred_qualifications,
  what_success_looks_like,
  thrive_points,
  company_mission,
  equal_opportunity,
  legal_disclaimer,
  form_config,
  display_order
)
values (
  'sdr',
  'sales-development-representative',
  '01',
  'Sales Development Representative',
  'Sales Development Representative',
  'Development Division',
  'active',
  '[
    "Development Division",
    "Full-Cycle (Prospecting to Close)",
    "100% Commission (Uncapped)",
    "Remote — North America & Europe Only",
    "Contract"
  ]'::jsonb,
  'Flo Studios is a dual-engine media and development hub for established creators and ambitious companies. Our Development Division owns the full product pipeline - Idea & Design, Full-Stack Development, Deployment, and Customer Acquisition - delivered as one complete, packaged engagement rather than a menu of standalone services. We work with venture-backed startups and ambitious companies building products worth building right.',
  '[
    "Flo Studios is hiring a Sales Development Representative to own the entire sales cycle for our Development Division - from prospecting to close. This is a full-cycle, individual-contributor role: you will not hand off qualified leads to a separate closer, and you will not inherit inbound leads you didn''t source yourself. You will build your own pipeline, run your own discovery process, and close your own deals.",
    "This role suits a sales professional who wants full ownership of outcomes and compensation with no ceiling, and who has the discipline to operate independently in a remote, contract-based structure."
  ]'::jsonb,
  '[
    {"num": "01", "title": "Prospect List Development", "desc": "Research and build a targeted, continuously refreshed prospect list aligned to Flo Studios'' ICP - venture-backed startups and ambitious companies with a validated product idea. This includes identifying the right decision-makers within each organization (founders, product leads, or technical stakeholders) and prioritizing outreach based on fit, timing, and likelihood to convert."},
    {"num": "02", "title": "Outbound Strategy & Execution", "desc": "Design, test, and execute outbound outreach sequences across relevant channels (email, LinkedIn, and others as appropriate), tailoring messaging to each segment of the ICP. This includes iterating on subject lines, opening hooks, and follow-up cadences based on response rates, and knowing when to personalize versus when to scale."},
    {"num": "03", "title": "Discovery & Qualification", "desc": "Book, prepare for, and lead discovery calls that go beyond surface-level qualification - understanding a prospect''s business goals, technical constraints, budget realism, and timeline, in order to determine genuine fit before investing further sales cycle time."},
    {"num": "04", "title": "Solution Scoping & Positioning", "desc": "Translate what you learn in discovery into the right project tier - MVP, full-scale build, or lighter-scope project - and present Flo Studios'' Development Division offering in a way that speaks directly to the client''s specific goals, rather than a generic pitch."},
    {"num": "05", "title": "Negotiation & Closing", "desc": "Own the full negotiation process end-to-end, including handling objections around price, timeline, and scope, structuring proposals, and driving the deal to a signed contract without requiring escalation to a separate closer."},
    {"num": "06", "title": "Pipeline Management", "desc": "Maintain accurate, up-to-date records of every deal in your pipeline - including stage, next steps, deal notes, and realistic close-date forecasting - so that pipeline health is visible and predictable at any given time, not just at the point of closing."},
    {"num": "07", "title": "Performance Reporting", "desc": "Report on key sales metrics - including outreach volume, response and conversion rates, and closed revenue - on a regular cadence, using this data to identify what''s working and where the pipeline needs adjustment."},
    {"num": "08", "title": "Messaging Refinement", "desc": "Continuously test and refine outbound messaging, targeting criteria, and qualification questions based on real response data and patterns observed in closed-won versus closed-lost deals, treating your own pipeline as a feedback loop for improving conversion over time."},
    {"num": "09", "title": "Delivery Handoff", "desc": "Collaborate closely with the Development Division''s delivery team once a deal is signed, ensuring all context, expectations, and scope details are clearly transferred so the project kicks off smoothly and client expectations set during the sales process are honored during execution."}
  ]'::jsonb,
  'This is a 100% commission-based contract position, with no fixed salary and no cap on earnings.',
  '[
    {"label": "Commission Structure", "text": "12-15% of total contract value per closed deal, determined by project scope and complexity"},
    {"label": "Deal Size", "text": "Project pricing is scoped individually based on client requirements and varies accordingly - recent engagements have ranged from approximately $5,000 for smaller-scope projects to $100,000+ for full-scale product builds, with a substantial share of deals falling in the $35,000-$40,000 range for standard MVP work"},
    {"label": "Illustrative Example", "text": "A closed deal valued at $35,000 would yield approximately $4,200-$5,250 in commission at the stated rate; a closed deal valued at $100,000 would yield $12,000-$15,000"}
  ]'::jsonb,
  'Final commission percentage and payment terms are confirmed during onboarding',
  '[
    "2-3 years of experience in sales (strict range - candidates outside this window will not be considered)",
    "Demonstrated experience selling into the tech industry",
    "Proven full-cycle sales experience: prospecting, discovery, negotiation, and closing - not outreach-only or closing-only experience",
    "Exceptional written and verbal communication skills",
    "Based in North America or Europe (non-negotiable; applications from outside these regions will not be reviewed and will be automatically rejected)",
    "Reliable access to a laptop, stable internet, and availability to work independently on a remote, self-directed basis"
  ]'::jsonb,
  '[
    "Experience selling services or custom builds in a digital agency, software studio, or dev-shop environment",
    "Experience navigating consultative, multi-stakeholder sales cycles for high-consideration, high-ticket purchases",
    "Familiarity with CRM tools (e.g., HubSpot, Pipedrive, or similar) for pipeline tracking",
    "A track record of exceeding quota in a commission-driven or performance-based compensation structure",
    "Prior experience selling to startup founders or technical decision-makers (e.g., CTOs, product leads)"
  ]'::jsonb,
  'Success in this role looks like a consistent, self-generated pipeline that reflects genuine ICP fit rather than volume for its own sake. Within the first 60-90 days, we''d expect a rep to be fully ramped and closing 2-4 deals per quarter, with a CRM that reflects real-time, accurate deal status rather than optimistic guesswork. Just as importantly, success shows up in how clients describe the experience of working with you - a sales process that felt consultative and professional from the first outreach message through contract signature, setting the right expectations for the delivery team to build on.',
  '[
    "A genuine preference for ownership over structure - you''d rather build your own pipeline and be judged on outcomes than follow someone else''s playbook",
    "A high tolerance for rejection and an ability to stay consistent through slow weeks, without needing external motivation to keep prospecting",
    "A competitive drive toward uncapped upside - you''re energized, not intimidated, by compensation tied directly to performance",
    "Strong instincts for reading people and situations quickly, especially in early conversations where fit isn''t yet obvious",
    "The discipline to manage your own time, priorities, and pipeline without day-to-day oversight",
    "A genuine interest in the technical and startup world - you enjoy understanding what founders are building, not just closing what''s in front of you"
  ]'::jsonb,
  'Flo Studios'' mission is to give ambitious companies and established creators the infrastructure to build and grow at the highest level. We believe the best work comes from teams that bring genuinely different perspectives, backgrounds, and ways of thinking to the table - and we build our team, in both our Creator and Development Divisions, with that in mind.',
  'We are an equal opportunity employer. We do not discriminate based on race, religion, color, national origin, sex, sexual orientation, age, disability, veteran status, or any other legally protected characteristic. All applicants are evaluated solely on their qualifications, experience, and fit for the role.',
  'Note*: By applying for this role, you confirm that all information and details provided to Flo Studios are accurate and truthful, and that all certifications and credentials submitted belong to you. Any misrepresentation, falsification, or discrepancy discovered may result in immediate termination of employment and may lead to legal action.',
  '{
    "roleTitle": "Sales Development Representative",
    "division": "Development Division",
    "experienceLabel": "Sales Experience *",
    "experienceOptions": [
      {"value": "", "label": "Select Experience Window"},
      {"value": "2-3 years (Required)", "label": "2-3 years (Meets qualification)"},
      {"value": "Under 2 years", "label": "Under 2 years (Outside qualification window)"},
      {"value": "3+ years", "label": "3+ years (Senior/Outside qualification window)"}
    ],
    "regionOptions": [
      {"value": "", "label": "Select Region"},
      {"value": "North America", "label": "North America"},
      {"value": "Europe", "label": "Europe"},
      {"value": "Other region (Note: strictly not reviewed per qualifications)", "label": "Other region (Note: strictly not reviewed per qualifications)"}
    ]
  }'::jsonb,
  1
)
on conflict (id) do update set
  title = excluded.title,
  division = excluded.division,
  badges = excluded.badges,
  about_company = excluded.about_company,
  about_job = excluded.about_job,
  responsibilities = excluded.responsibilities,
  compensation_lead = excluded.compensation_lead,
  compensation_items = excluded.compensation_items,
  compensation_terms = excluded.compensation_terms,
  minimum_qualifications = excluded.minimum_qualifications,
  preferred_qualifications = excluded.preferred_qualifications,
  what_success_looks_like = excluded.what_success_looks_like,
  thrive_points = excluded.thrive_points,
  company_mission = excluded.company_mission,
  equal_opportunity = excluded.equal_opportunity,
  legal_disclaimer = excluded.legal_disclaimer,
  form_config = excluded.form_config,
  updated_at = timezone('utc'::text, now());
