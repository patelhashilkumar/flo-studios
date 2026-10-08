# Multi-Job Openings & Role Switcher Architecture Design

## 1. Context & Motivation
Flo Studios currently features a dedicated editorial Careers page for the **Sales Development Representative (Development Division)** role. The business is expanding and requires support for multiple open job postings on `/careers` (starting with SDR as Job #1, and prepared to seamlessly ingest Job #2 once details are supplied).

The objective is to establish a modular, scalable multi-job architecture that preserves Flo Studios' editorial presentation, maintains zero dummy data, ensures resume upload & security validation, and dynamically routes applicant submissions to the Admin intake dashboard.

---

## 2. Requirements & Constraints
- **Strict Verbatim Copy for Job #1:** Maintain 100% fidelity to the SDR job listing, including the updated qualification clause: `"Based in North America or Europe (non-negotiable; applications from outside these regions will not be reviewed and will be automatically rejected)"`.
- **Zero Dummy Data:** No mock roles, mock applicant seeds, or fake job perks anywhere.
- **Role Switcher UI:** Candidates can switch between open positions via high-contrast studio tab pills at the top of `/careers`.
- **Ready for Job #2:** An extensible schema in `src/data/jobPostings.js` allowing Job #2 to be added with a single object configuration without touching layout code.
- **Dynamic Application Form:** The integrated form dynamically adapts its role title, division, required experience options, and validation based on the active role.
- **Admin Intake Sync:** Submissions saved to `adminStorage.js` record the exact `role` and `division` applied for, viewable and downloadable in `AdminPage.jsx`.
- **Security & Reliability:** Preserve Base64 file upload limits (5MB max), anti-bot honeypot, XSS-safe links, CSV formula sanitization, and quota fallback.

---

## 3. Architecture & Component Structure

### A. Data Layer (`src/data/jobPostings.js`)
A centralized configuration defining open roles:
```javascript
export const JOB_POSTINGS = [
  {
    id: 'sdr',
    slug: 'sales-development-representative',
    tabNumber: '01',
    title: 'Sales Development Representative',
    division: 'Development Division',
    badges: [
      'Development Division',
      'Full-Cycle (Prospecting to Close)',
      '100% Commission (Uncapped)',
      'Remote — North America & Europe Only',
      'Contract'
    ],
    aboutCompany: 'Flo Studios is a dual-engine media and development hub...',
    aboutJob: [
      'Flo Studios is hiring a Sales Development Representative...',
      'This role suits a sales professional who wants full ownership...'
    ],
    responsibilities: [...],
    compensationLead: 'This is a 100% commission-based contract position, with no fixed salary and no cap on earnings.',
    compensationItems: [...],
    compensationTerms: 'Final commission percentage and payment terms are confirmed during onboarding',
    minimumQualifications: [
      '2-3 years of experience in sales (strict range - candidates outside this window will not be considered)',
      'Demonstrated experience selling into the tech industry',
      'Proven full-cycle sales experience: prospecting, discovery, negotiation, and closing - not outreach-only or closing-only experience',
      'Exceptional written and verbal communication skills',
      'Based in North America or Europe (non-negotiable; applications from outside these regions will not be reviewed and will be automatically rejected)',
      'Reliable access to a laptop, stable internet, and availability to work independently on a remote, self-directed basis'
    ],
    preferredQualifications: [...],
    whatSuccessLooks Like: '...',
    thrivePoints: [...],
    companyMission: '...',
    equalOpportunity: '...',
    legalDisclaimer: '...',
    formConfig: {
      experienceLabel: 'Sales Experience *',
      experienceOptions: [
        '2-3 years (Required)',
        'Under 2 years',
        '3+ years'
      ],
      regionOptions: [
        'North America',
        'Europe',
        'Other region (Note: strictly not reviewed per qualifications)'
      ]
    }
  }
]
```

### B. View Layer (`src/pages/CareersPage.jsx` & `CareersPage.css`)
- **Role Switcher Navigation:**
  - Located directly beneath the breadcrumb.
  - Interactive tabs displaying active and upcoming role slots.
  - Keyboard accessible (`role="tablist"`, `aria-selected`).
- **Dynamic Editorial Body:**
  - Smooth Framer Motion transitions (`<AnimatePresence mode="wait">`) when toggling roles.
  - Updates title, badges, responsibilities, compensation, and qualifications reactively.
- **Dynamic Application Form:**
  - Binds submission payload to `activeJob.title` and `activeJob.division`.
  - Resets validation errors and file upload state when switching jobs to avoid cross-role contamination.

### C. Admin Intake Layer (`src/pages/AdminPage.jsx`)
- Already reads `item.role` and `item.division`.
- Filter tabs and candidate cards seamlessly categorize submissions by the specific role applied for.

---

## 4. Error Handling & Edge Cases
- **Invalid Role ID / Slug:** Defaults gracefully to the first active job (`JOB_POSTINGS[0]`).
- **File Upload Limits:** Retains 5MB restriction, MIME checking, and zero-byte file rejection.
- **Storage Quota:** Automatically strips Base64 and preserves metadata if `localStorage` approaches 5MB limit.

---

## 5. Verification Plan
1. **Compilation:** `npm run build` cleanly compiles with 0 warnings or errors.
2. **Interactive UI Verification:**
   - Role switcher switches active role state cleanly.
   - Job #1 copy matches user's verbatim description exactly.
   - Form submission records `Sales Development Representative` in storage.
   - Admin page displays the submission under the correct role.
3. **Extensibility Check:** Adding a second mock-free job object immediately creates Tab 02 and renders its independent content and form options.
