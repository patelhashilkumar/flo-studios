# Flo Studios — Supabase Cloud Backend Setup Guide

This guide walks you through connecting Flo Studios to your Supabase cloud project in **under 3 minutes**.

---

## Step 1: Create Your Supabase Project (If Not Already Created)
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard) and sign in.
2. Click **New project**.
3. Set your project name (e.g. `flo-studios`), enter a strong database password, and select your preferred region (e.g., US East / EU Central).
4. Wait 1-2 minutes for your project to provision.

---

## Step 2: Run the Turnkey Database & Storage Schema
1. In your Supabase Dashboard, click the **SQL Editor** icon in the left navigation sidebar.
2. Click **New query** (or open the query box).
3. Open the file [`supabase/schema.sql`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/supabase/schema.sql) from this repository, copy its entire contents, and paste it into the Supabase SQL editor.
4. Click the green **Run** button (or press `Ctrl+Enter` / `Cmd+Enter`).

> **What this executes automatically:**
> - Creates `contact_inquiries` table with constraints & indexes
> - Creates `job_applications` table with constraints & indexes
> - Creates `job_postings` table with verified **Sales Development Representative** seed data
> - Creates the private `resumes` Storage bucket with 5MB file size limits and document MIME restrictions
> - Enables **Row-Level Security (RLS)** on all tables and storage objects so public visitors can submit forms/applications, while only authenticated Admins can view/edit leads or download private candidate resumes.

---

## Step 3: Create Your Admin Account
1. In your Supabase Dashboard, click **Authentication** in the left sidebar.
2. Navigate to **Users** and click **Add user** -> **Create user**.
3. Enter your admin email (e.g. `admin@flostudios.com`) and a secure password.
4. Check **Auto Confirm User** (so you can sign in immediately without email confirmation).
5. Click **Create user**.

---

## Step 4: Configure Your Environment Variables
1. In your Supabase Dashboard, go to **Project Settings** (gear icon) -> **API** (or **Data API**).
2. Copy your **Project URL** (e.g., `https://abcdefghijkl.supabase.co`).
3. Copy your **anon / public** API key.
4. In your project root, create a file named `.env` (or copy `.env.example` to `.env`):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-publishable-key-here
```

5. Restart your Vite development server if running (`npm run dev`).

---

## Step 5: Verify Your Integration
1. **Public Contact Form (`/contact`)**: Submit a test message. It will immediately appear in your Supabase `contact_inquiries` table.
2. **Public Careers Page (`/careers`)**: Submit a test application with a PDF/DOC resume. The file will upload to the private `resumes` bucket and the record will appear in `job_applications`.
3. **Admin Portal (`/admin`)**:
   - The top banner will indicate: `🟢 SUPABASE CLOUD SYNC`.
   - Sign in using your Admin Email & Password created in Step 3.
   - Click **View Private Resume** to test the secure signed URL generation.
   - Go to **💼 Manage Jobs (CMS)** to add, edit, or delete job postings live on your site!
