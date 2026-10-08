# Admin Job Management (CMS) & Dual Careers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Provide 2 active job listings on `/careers` matching the editorial screenshot layout, and empower the Admin Portal (`/admin`) with full CMS capabilities to Add, Edit, and Delete job openings in real-time.

**Architecture:**
- **Data & Storage Layer (`src/data/jobPostings.js` & `src/services/adminStorage.js`):** Store jobs in `localStorage` under key `FLO_STUDIOS_JOBS_V1`, initialized with 2 active roles (Job 01: SDR verbatim; Job 02: Full-Stack Product Engineer). Provide `getJobs()`, `saveJob(job)`, `deleteJob(jobId)`, `resetJobs()`. Broadcast updates via `flo-storage-update` custom event.
- **Admin CMS UI (`src/pages/AdminPage.jsx` & `AdminPage.css`):** Add a dedicated tab `💼 Manage Jobs (CMS)` with listing table, "+ Add New Job" button, Edit/Delete modal.
- **Careers Page (`src/pages/CareersPage.jsx`):** Dynamically render all active jobs with role switcher tabs, verbatim editorial formatting, and application form binding.

**Tech Stack:** React 19, Vite, Framer Motion, GSAP, CSS Variables, LocalStorage Storage Engine.

---

### Task 1: Expand Job Storage Engine & Dual Initial Jobs

**Files:**
- Modify: `src/data/jobPostings.js`
- Modify: `src/services/adminStorage.js`
- Test: `npm run build`

**Interfaces:**
- Produces: `getJobs(): Array<JobPosting>`, `saveJob(job: JobPosting): boolean`, `deleteJob(id: string): boolean`

- [ ] **Step 1: Define Job 02 in `src/data/jobPostings.js`**
Add Full-Stack Product Engineer as Job 02 alongside Job 01 (SDR) with full editorial sections and form configuration.
- [ ] **Step 2: Add Job CMS methods to `src/services/adminStorage.js`**
Implement `getJobs()`, `saveJob()`, `deleteJob()`, and `resetJobs()` with event broadcasting.
- [ ] **Step 3: Run build to verify compilation**
Run: `npm run build`
Expected: PASS
- [ ] **Step 4: Commit**
```bash
git add src/data/jobPostings.js src/services/adminStorage.js
git commit -m "feat(storage): add job CMS storage engine with dual default openings"
```

---

### Task 2: Implement Job Management CMS in Admin Dashboard

**Files:**
- Modify: `src/pages/AdminPage.jsx`
- Modify: `src/pages/AdminPage.css`
- Test: `npm run build`

**Interfaces:**
- Consumes: `getJobs()`, `saveJob()`, `deleteJob()` from `../services/adminStorage`

- [ ] **Step 1: Add Job CMS tab and view in `AdminPage.jsx`**
Add `activeTab === 'cms'` tab pill `💼 Manage Jobs (CMS)`.
Render job cards with status badge, division, applicant counter, Edit, and Delete actions.
- [ ] **Step 2: Add Job Editor Modal in `AdminPage.jsx`**
Modal supporting creation of new jobs and editing of existing jobs (Title, Division, Status, Badges, About Job, Responsibilities, Compensation, Qualifications).
- [ ] **Step 3: Add CSS for Job CMS in `AdminPage.css`**
Add styles for job cards, actions, and the modal dialog.
- [ ] **Step 4: Run build to verify**
Run: `npm run build`
Expected: PASS
- [ ] **Step 5: Commit**
```bash
git add src/pages/AdminPage.jsx src/pages/AdminPage.css
git commit -m "feat(admin): add job management CMS with add, edit, and delete actions"
```

---

### Task 3: Dynamic Dual Job Listings on Careers Page & GitHub Push

**Files:**
- Modify: `src/pages/CareersPage.jsx`
- Test: `npm run build`

**Interfaces:**
- Consumes: `getJobs()` from `../services/adminStorage`

- [ ] **Step 1: Connect `CareersPage.jsx` to reactive storage jobs**
Subscribe to `getJobs()` and listen to `flo-storage-update` events so newly added/edited/deleted jobs from the Admin portal appear immediately.
Ensure both default jobs are rendered with tabs `01 · Sales Development Representative` and `02 · Full-Stack Product Engineer`.
- [ ] **Step 2: Verify production build**
Run: `npm run build`
Expected: PASS with 0 errors.
- [ ] **Step 3: Commit and Push to GitHub**
```bash
git add .
git commit -m "feat(careers): connect dual job listings to reactive admin CMS and deploy"
git push origin main
```
