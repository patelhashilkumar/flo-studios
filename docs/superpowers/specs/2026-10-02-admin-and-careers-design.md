# Design Spec: Flo Studios Admin Dashboard & Careers Application System

**Date:** 2026-10-02  
**Status:** In Review  
**Target:** Client Messages & Job Applications Admin Portal + Dedicated Careers Page  

---

## 1. Overview & Objectives

Flo Studios requires an internal **Admin Section** where the studio director can review, organize, and manage all incoming:
1. **Client Inquiries & Project Messages** (submitted from the Contact page).
2. **Studio Job Applications** (submitted from a dedicated `/careers` page).

The system must operate smoothly without demanding external backend infrastructure by leveraging a structured **Local Persistence Engine (`adminStorage.js`)** with localStorage, realistic initial seed records, full CRUD capabilities (mark read, star, filter, status change, delete), and data export (CSV/JSON).

---

## 2. Architecture & Data Flow

```
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│       /contact Page             │       │       /careers Page             │
│  (Client Project Inquiries)     │       │   (Job / Talent Applications)   │
└───────────────┬─────────────────┘       └───────────────┬─────────────────┘
                │                                         │
                ▼                                         ▼
   [MotionContactForm Submit]                [CareerApplicationForm Submit]
                │                                         │
                └───────────────────┬─────────────────────┘
                                    │
                                    ▼
                ┌──────────────────────────────────────┐
                │     src/services/adminStorage.js     │
                │  - Persistent localStorage store     │
                │  - Pre-seeded realistic records      │
                │  - Add / Update / Delete / Export    │
                └───────────────────┬──────────────────┘
                                    │
                                    ▼
                ┌──────────────────────────────────────┐
                │          /admin Dashboard            │
                │   - Passcode Guard ('flo2026')       │
                │   - Metrics & KPIs Overview          │
                │   - Messages Management Tab          │
                │   - Job Applications Management Tab  │
                │   - CSV / JSON Export & Quick Reply  │
                └──────────────────────────────────────┘
```

---

## 3. Data Schema

### 3.1 Client Inquiry Record (`type: 'message'`)
```json
{
  "id": "msg_1727836800000",
  "type": "message",
  "name": "Maya Lin",
  "email": "maya@linstudio.design",
  "phone": "+1 (503) 555-0192",
  "service": "Motion Graphics",
  "message": "Looking to produce a high-octane 3D product reveal video for our upcoming hardware release in Q3.",
  "createdAt": "2026-10-01T18:30:00Z",
  "status": "new", // "new" | "in-review" | "replied" | "archived"
  "starred": true
}
```

### 3.2 Job Application Record (`type: 'job'`)
```json
{
  "id": "job_1727836900000",
  "type": "job",
  "name": "Alex Mercer",
  "email": "alex.mercer@cgi-lab.io",
  "phone": "+1 (415) 555-8391",
  "role": "Senior 3D & Houdini Artist",
  "portfolioUrl": "https://alexmercer.artstation.com",
  "experience": "5+ years",
  "coverNote": "Passionate about procedural simulations, liquid glass shaders, and high-fidelity automotive motion.",
  "createdAt": "2026-10-01T19:15:00Z",
  "status": "interview", // "new" | "reviewing" | "interview" | "rejected" | "hired"
  "starred": true
}
```

---

## 4. Key Components to Build

### 4.1 Storage Service (`src/services/adminStorage.js`)
- `getSubmissions()`: Retrieves all records (merging initial seed data if first launch).
- `saveSubmission(submission)`: Appends new record and dispatches custom `flo-storage-update` event for reactive live UI updates.
- `updateSubmissionStatus(id, newStatus)`: Updates workflow stage.
- `toggleStar(id)`: Toggles bookmark/favorite.
- `deleteSubmission(id)`: Removes record.
- `exportToCSV()` & `exportToJSON()`: Instant one-click file download.
- `seedSampleData()`: Reset or populate fresh demo records.

### 4.2 Dedicated Careers Page (`src/pages/CareersPage.jsx` & `CareersPage.css`)
- **Hero & Culture Section:** Flo Studios studio culture, remote/hybrid perks, creative manifesto.
- **Open Roles Directory:**
  - *Senior 3D / Houdini Artist* (Full-time / Portland or Remote)
  - *Motion Art Director* (Full-time / Hybrid)
  - *Creative Technologist / WebGL Engineer* (Contract / Remote)
  - *Brand & Visual Identity Designer* (Full-time / Portland)
- **Interactive Application Form Card:**
  - Uses the same refined liquid glass card aesthetic.
  - Role dropdown, portfolio link, experience level, cover note.
  - Submits through `adminStorage.js` with instant confirmation.
- **Navigation Integration:** Linked from `/about`'s Careers CTA and available at `/careers`.

### 4.3 Admin Portal (`src/pages/AdminPage.jsx` & `AdminPage.css`)
- **Access Guard:**
  - Sleek dark PIN lock modal requesting studio passcode (default: `flo2026`).
  - "Demo One-Click Unlock" option for effortless evaluation.
  - Remembers unlocked session in `sessionStorage`.
- **Top Stats Bar:**
  - Total Inquiries
  - Unread Messages
  - Active Job Applications
  - Action Required
- **Navigation Tabs:**
  - **All Overview:** Combined chronological feed.
  - **Client Messages:** Filtered for brand inquiries, project budgets, and service disciplines.
  - **Job Applications:** Filtered for candidate applications, portfolio links, and hiring stages.
- **Detail & Action Modals:**
  - Full view of message or application.
  - Direct `mailto:` action button pre-filling subject line and recipient.
  - Workflow status selector dropdown.
  - Delete / Archive.
- **Header Actions:**
  - Search bar (by name, email, keyword, or role).
  - Export CSV / Export JSON button.
  - "Generate Sample Inquiries" button for live demo testing.

### 4.4 Discreet Footer Access
- Add a subtle, tasteful `Admin` link in [`Footer.jsx`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/src/components/Footer.jsx) bottom legal row (`© 2026 Flo Studios · Admin`).

---

## 5. Security & Privacy Considerations

- PIN code protected on client (`sessionStorage` authentication).
- Data kept entirely client-side; zero external tracking or database leaks.
- Data export gives user full ownership of contact lists.

---

## 6. Verification Plan

1. **Submissions Test:**
   - Submit message on `/contact` -> check that record appears instantly on `/admin`.
   - Submit job application on `/careers` -> check that record appears in Job Applications tab on `/admin`.
2. **Admin Interactions:**
   - Test PIN unlock (`flo2026`).
   - Test status changing (*New* -> *Replied* / *Interview*).
   - Test search filtering by keyword, service, and role.
   - Test CSV and JSON download.
   - Test deletion and sample data regeneration.
3. **Build & Responsiveness:**
   - Run `npm run build` to verify 0 errors.
   - Test mobile & desktop responsiveness on `/careers` and `/admin`.
