# Admin Job Management (CMS) & Dual Careers Listings Design

## 1. Overview
The user requested that the Flo Studios Careers section (`/careers`) show **2 job listings** in the editorial format demonstrated in the job screenshots, and that the **Admin Portal (`/admin`)** include a complete Job Management CMS with the ability to:
- View all job postings
- Add a new job opening
- Edit any existing job opening
- Delete a job opening
- Manage role status (Active / Draft)

All changes made in the Admin CMS persist across sessions in local storage and reactively update the public `/careers` page in real-time.

---

## 2. Default Initial Job Postings (2 Listings)

### Job 01: Sales Development Representative (Development Division)
- **Title:** Sales Development Representative
- **Division:** Development Division
- **Status:** Active
- **Badges:** `['Development Division', 'Full-Cycle (Prospecting to Close)', '100% Commission (Uncapped)', 'Remote — North America & Europe Only', 'Contract']`
- **About Company:** Verbatim statement from user prompt/image.
- **About Job:** Verbatim statement from user prompt/image.
- **Responsibilities:** 9 verbatim responsibilities from user prompt/image.
- **Compensation:** 100% commission-based, 12–15% deal value ($5k–$100k+ scope).
- **Minimum Qualifications:** Includes updated clause: `"Based in North America or Europe (non-negotiable; applications from outside these regions will not be reviewed and will be automatically rejected)"`.
- **Preferred Qualifications, Success Metrics, Culture Points, Legal Disclaimer:** Verbatim adherence.

### Job 02: Full-Stack Product Engineer (Development Division)
- **Title:** Full-Stack Product Engineer
- **Division:** Development Division
- **Status:** Active
- **Badges:** `['Development Division', 'React & Node.js', 'Competitive Retainer + Performance Bonus', 'Remote — Global', 'Contract / Full-Time']`
- **About Company:** Flo Studios' dual-engine media and development hub overview.
- **About Job:** Flo Studios is hiring a Full-Stack Product Engineer to own end-to-end architecture, development, and deployment for high-growth venture-backed startups and creator platforms.
- **Responsibilities:** Full product delivery from design handoff to cloud deployment, React/TypeScript frontends, resilient backend architectures, CI/CD, and client technical communication.
- **Compensation:** High-bracket retainer + performance bonus per completed milestone.
- **Qualifications:** 3+ years modern full-stack engineering, production React, API design, autonomous execution.
- *(Note: All content for Job 02 is fully editable or deletable at any time directly through the Admin CMS).*

---

## 3. Storage Layer (`src/services/adminStorage.js`)
We add reactive Job CMS helpers to the existing single-source-of-truth storage engine:
- `JOBS_KEY = 'FLO_STUDIOS_JOBS_V1'`
- `getJobs()`: Returns array of job objects; initializes with default 2 jobs if not set.
- `saveJob(job)`: Adds a new job or updates an existing job by ID, emits `flo-storage-update`.
- `deleteJob(jobId)`: Deletes job by ID, emits `flo-storage-update`.
- `resetJobs()`: Restores the default job listings.

---

## 4. Admin Portal CMS UI (`src/pages/AdminPage.jsx`)
In the Admin Dashboard (`/admin`):
- Add a new tab pill: **`💼 Manage Jobs (CMS)`** alongside `All Inquiries`, `Client Messages`, and `Job Applications`.
- In the Job Management view:
  - Header with `+ Add New Job Opening` button.
  - Job card list displaying:
    - Tab number & Title
    - Division badge & Status pill (Active / Draft)
    - Total candidate applications received for this position
    - Actions: `✏️ Edit`, `🗑️ Delete`, and `↗ View on Careers`
- **Job Editor Modal:**
  - Clean, dark-mode/liquid-glass modal allowing full editing of:
    - Title & Tab Label
    - Division (Development Division / Creator Division)
    - Status (Active / Draft)
    - Metadata Badges
    - About Job text
    - Responsibilities (multiline text, split by lines)
    - Compensation details
    - Minimum & Preferred Qualifications (multiline text, split by lines)
    - Legal Disclaimer
  - Cancel & Save buttons.

---

## 5. Public Careers Page (`src/pages/CareersPage.jsx`)
- Reads jobs dynamically from `getJobs()`, filtering for `status === 'active'`.
- Renders role switcher tabs for both jobs (and any newly created jobs):
  `[ 01 · Sales Development Representative ] [ 02 · Full-Stack Product Engineer ]`
- Editorial view renders matching the screenshots:
  - Header with title, division, and meta badges.
  - "Apply for this role ↓" jump button.
  - Full-width editorial sections: About Flo Studios, About the Job, Responsibilities cards, Compensation grid, Qualifications split, Success criteria, Culture points, Legal notes.
  - Integrated qualification form dynamically submitting to the chosen role.

---

## 6. Verification Plan
1. **Compilation:** `npm run build` succeeds with 0 errors.
2. **Dual Job Navigation:** Verify switching between Job 01 and Job 02 on `/careers` seamlessly updates all copy and form binding.
3. **Admin CMS Functionality:**
   - Add a 3rd job in `/admin` -> verify it appears on `/careers`.
   - Edit an existing job in `/admin` -> verify changes appear on `/careers`.
   - Delete a job in `/admin` -> verify it disappears from `/careers`.
4. **Git Deployment:** Commit all changes and push to GitHub `origin/main`.
