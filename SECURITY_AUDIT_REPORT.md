# Flo Studios — Comprehensive Security & Information Exposure Audit Report

> **Target Platform:** Flo Studios ([https://www.flostudio.co/](https://www.flostudio.co/))  
> **Repository:** [https://github.com/patelhashilkumar/flo-studios](https://github.com/patelhashilkumar/flo-studios)  
> **Audit Type:** Authorized Codebase & Production Bundle Security Audit  
> **Date:** October 2026  
> **Build Status:** Verified (Zero Errors / Warnings)

---

## Executive Summary

A complete, comprehensive security and information-exposure audit was conducted across the Flo Studios codebase, production browser bundles, static assets, configuration files, environment definitions, and Git history.

All confirmed vulnerabilities were patched, verified with clean production builds, and pushed to `origin/main`. No visual design, animation systems, or legitimate business contact information was altered or removed.

---

## A. CRITICAL ISSUES

*No severe remote-code execution, unauthorized database read/write breaches, or exposed private backend keys were detected.*

---

## B. HIGH ISSUES

### 1. Hardcoded Plaintext Passcodes in Client-Side JavaScript Bundle
- **Severity:** HIGH
- **What Was Exposed:** Hardcoded static passcodes (`'flo2026'` and `'flo'`) were defined in `src/services/adminStorage.js` and compiled into the production JavaScript bundle (`dist/assets/adminStorage-*.js`).
- **Where Found:** [`src/services/adminStorage.js`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/src/services/adminStorage.js) lines 34 & 397; [`src/pages/AdminPage.jsx`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/src/pages/AdminPage.jsx) line 161.
- **Why It Is a Problem:** Anyone inspecting the client-side JavaScript bundle via browser Developer Tools could extract the passcode, enter it into the `/admin` route, and unlock the administrative portal, gaining unauthorized visibility into client inquiries and candidate applications stored in that browser's `localStorage`.
- **Status:** **FIXED**.
- **Action Taken:**
  - Removed static `'flo2026'` and `'flo'` constants from source code.
  - Replaced fallback checking with `import.meta.env.VITE_ADMIN_PASSCODE`. If unconfigured, passcode authentication is completely disabled.
  - Set Supabase Auth (`signInWithPassword`) as the default, authoritative authentication mechanism whenever cloud sync is enabled.

### 2. Hardcoded Supabase Project URL & Publishable Key in Source Code
- **Severity:** HIGH
- **What Was Exposed:** Active Supabase Project URL (`https://jemvbvzucqvetaghoyjg.supabase.co`) and Publishable Key (`sb_publishable_****vaDj`) were hardcoded as fallback constants in source code.
- **Where Found:** [`src/lib/supabase.js`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/src/lib/supabase.js) lines 9–10 (and committed in Git history commit `00d3ae0a`).
- **Why It Is a Problem:** Although Supabase publishable keys are public by design with Postgres Row-Level Security (RLS) enforcement, hardcoding them into source code embeds them into every bundle and Git history. Any rotation of keys on the dashboard would be rendered ineffective because the hardcoded fallback persisted in the codebase.
- **Status:** **FIXED**.
- **Action Taken:** Removed hardcoded fallback constants. The Supabase client now strictly reads from `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_ANON_KEY`.

---

## C. MEDIUM ISSUES

### 3. Production Source Maps Not Explicitly Disabled in Build Configuration
- **Severity:** MEDIUM
- **What Was Exposed:** Potential exposure of unminified original source code, file structures, and internal comments if sourcemaps were enabled during build.
- **Where Found:** [`vite.config.js`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/vite.config.js)
- **Why It Is a Problem:** Without explicit `sourcemap: false` configuration, changes in build flags or CI/CD pipelines could generate `.map` files, revealing original source code to any visitor.
- **Status:** **FIXED**.
- **Action Taken:** Explicitly configured `build.sourcemap: false` in `vite.config.js`.

### 4. Vulnerability to Sensitive File Probing on Web Hosts
- **Severity:** MEDIUM
- **What Was Exposed:** Automated security scanners probing for `/.env`, `/.git/HEAD`, `/schema.sql`, `/.DS_Store`, or `.bak` files were being captured by SPA rewrites (`/(.*) -> /index.html`), returning HTTP 200 with the single-page application shell instead of an explicit error.
- **Where Found:** [`vercel.json`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/vercel.json) & [`public/_redirects`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/public/_redirects)
- **Why It Is a Problem:** Probes could confuse security scanners or potentially expose files if server configuration changed.
- **Status:** **FIXED**.
- **Action Taken:** Added explicit defensive redirect/block rules in `vercel.json` and `public/_redirects` routing dotfiles (`/\..*`) and sensitive extensions (`.env`, `.sql`, `.log`, `.bak`, `.zip`, `.lock`, `.sh`) directly to `/404`.

### 5. Missing Modern Cross-Origin Defensive Headers
- **Severity:** MEDIUM
- **What Was Exposed:** Missing defense-in-depth headers for cross-origin isolation and policy control.
- **Where Found:** [`vercel.json`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/vercel.json)
- **Why It Is a Problem:** Lacked modern protections against cross-origin data leaks and Flash/PDF cross-domain policy execution.
- **Status:** **FIXED**.
- **Action Taken:** Added `X-Permitted-Cross-Domain-Policies: none`, `Cross-Origin-Opener-Policy: same-origin`, and `Cross-Origin-Resource-Policy: same-origin` to `vercel.json`.

---

## D. LOW ISSUES

### 6. Unused Next.js Environment Variables in Local Configuration
- **Severity:** LOW
- **What Was Exposed:** Local `.env` contained unused `NEXT_PUBLIC_SUPABASE_*` definitions alongside Vite variables.
- **Where Found:** [`.env`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/.env)
- **Why It Is a Problem:** Creates configuration ambiguity and risk of accidental exposure if frameworks change.
- **Status:** **FIXED**. Cleaned up `.env.example` to document only active Vite variables.

---

## E. FIXES IMPLEMENTED

| File | Change Details |
| :--- | :--- |
| [`src/services/adminStorage.js`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/src/services/adminStorage.js) | Removed hardcoded `'flo2026'` and `'flo'`. Replaced with environment-driven `VITE_ADMIN_PASSCODE` check. |
| [`src/pages/AdminPage.jsx`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/src/pages/AdminPage.jsx) | Defaulted auth method to Supabase Admin (`signInWithPassword`) when cloud backend is active. Updated error messaging for unconfigured passcodes. |
| [`src/lib/supabase.js`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/src/lib/supabase.js) | Removed hardcoded fallback Project URL and Anon Key. Client strictly initializes from environment variables. |
| [`vite.config.js`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/vite.config.js) | Explicitly set `sourcemap: false` to ensure production source maps are never emitted. |
| [`vercel.json`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/vercel.json) | Added blocking rules for dotfiles and sensitive extensions. Added `X-Permitted-Cross-Domain-Policies`, `Cross-Origin-Opener-Policy`, and `Cross-Origin-Resource-Policy`. |
| [`public/_redirects`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/public/_redirects) | Added 404 rules for `/.env*`, `/.git*`, and `/*.sql`. |
| [`.env.example`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/.env.example) | Standardized documented variables and added `VITE_ADMIN_PASSCODE` documentation. |

---

## F. ITEMS REQUIRING MANUAL DEPLOYMENT

1. **Vercel Environment Variables:**
   In your **Vercel Dashboard** -> **Project Settings** -> **Environment Variables**, ensure the following are defined:
   - `VITE_SUPABASE_URL`: `https://your-project.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `your-publishable-anon-key`
   - *(Optional)* `VITE_ADMIN_PASSCODE`: A secure, secret fallback passphrase if offline preview access is desired.

2. **Supabase Auto-Confirm & MFA:**
   - In your **Supabase Dashboard** -> **Authentication** -> **Users**, verify that only authorized admin emails exist.
   - We recommend enabling Multi-Factor Authentication (MFA) in the Supabase Dashboard for admin accounts.

---

## G. ITEMS THAT SHOULD BE ROTATED / REVOKED

Because commit `00d3ae0a` historically contained the Supabase publishable key:
- **Key Identifier:** `sb_publishable_peQ2bFpIImyQWF0g-GQtUw_****vaDj`
- **Recommended Action:**
  1. Open your **[Supabase Dashboard](https://supabase.com/dashboard)** -> Select your project -> **Project Settings** -> **API**.
  2. If desired, generate a new publishable API key and revoke the previous one.
  3. Add the new key to Vercel Environment Variables and local `.env`.
  4. *Note:* Because Row-Level Security (RLS) is strictly enabled on `contact_inquiries`, `job_applications`, and storage buckets, unauthenticated access using this key is blocked by Postgres. Rotating the key is defense-in-depth best practice.

---

## H. AUDIT VERIFICATION BY CATEGORY

1. **Secret & Credential Scan:** 0 critical secrets in current codebase. All AWS, Stripe, GitHub, Gemini, OpenAI, database URIs clean.
2. **Environment Variables:** No server-only secrets leaked through `VITE_*` prefixes.
3. **Production JS Bundle:** Compiled `dist/` inspected; 0 passwords, 0 internal filesystem paths, 0 hardcoded passcodes present.
4. **Source Maps:** Verified 0 `.map` files in production output.
5. **Git Exposure:** `.git` directory strictly excluded from build and blocked by web server rules.
6. **Sensitive Files:** No `.env`, `.sql`, `.bak`, `.zip`, `.log` files in `public/` or `dist/`.
7. **Internal Info:** No internal IP addresses, developer usernames, or local machine paths exposed.
8. **Admin Routes:** `/admin` route is marked with `noindex, nofollow`, disallowed in `robots.txt`, and requires authentication.
9. **API Security:** Supabase RLS policies enforce `insert` only for anonymous form submissions; `select`, `update`, and `delete` strictly restricted to `authenticated` admins.
10. **Forms:** Protected with anti-bot honeypots. File uploads restricted to `.pdf`, `.doc`, `.docx` with a 5 MB maximum.
11. **Personal Information:** Intentionally public studio business contact information (`hello@flostudios.com`) preserved. No private personal data exposed.
12. **Error Handling:** `ErrorBoundary.jsx` renders user-friendly recovery UI without revealing stack traces, database errors, or internal paths.
13. **Dependency Security:** `npm audit` returned **0 vulnerabilities**.

---

## I. PRODUCTION BUILD STATUS

- **Build Command:** `npm run build`
- **Output:**
  ```text
  vite v8.3.2 building client environment for production...
  transforming...
  ✓ 1075 modules transformed.
  rendering chunks...
  dist/index.html                             5.67 kB │ gzip:   1.57 kB
  dist/assets/NotFoundPage-C25lWhh5.css       1.59 kB │ gzip:   0.62 kB
  dist/assets/ContactPage-DMFvwSIm.css        4.24 kB │ gzip:   1.38 kB
  dist/assets/WorkflowSection-ByTzcXJ_.css    4.63 kB │ gzip:   1.41 kB
  dist/assets/CareersPage-De9NUaqG.css       11.03 kB │ gzip:   2.35 kB
  dist/assets/AdminPage-CgeUuOQo.css         16.93 kB │ gzip:   3.34 kB
  dist/assets/index-WCvIOU3r.css             51.70 kB │ gzip:   8.85 kB
  dist/assets/rolldown-runtime-hePW80VL.js    0.71 kB │ gzip:   0.42 kB
  dist/assets/NotFoundPage-CCT2mp05.js        1.30 kB │ gzip:   0.60 kB
  dist/assets/LatestPage-CpnUb55P.js          4.88 kB │ gzip:   1.76 kB
  dist/assets/ServicesPage-B2I4wij2.js        5.10 kB │ gzip:   1.82 kB
  dist/assets/WorkPage-AmpS409t.js            6.54 kB │ gzip:   2.00 kB
  dist/assets/AboutPage-C3lnfMN2.js           6.61 kB │ gzip:   2.05 kB
  dist/assets/WorkflowSection-C8qlio7X.js    10.91 kB │ gzip:   3.65 kB
  dist/assets/vendor-misc-D53CNTj6.js        13.35 kB │ gzip:   4.75 kB
  dist/assets/CareersPage-DyKxNEut.js        19.03 kB │ gzip:   5.01 kB
  dist/assets/AdminPage-_-309q-c.js          25.36 kB │ gzip:   6.46 kB
  dist/assets/adminStorage-cor6ZPWt.js       25.58 kB │ gzip:   8.71 kB
  dist/assets/ContactPage-DgHnZz9l.js        32.80 kB │ gzip:   9.44 kB
  dist/assets/index-CSYmTfRv.js              44.65 kB │ gzip:  13.22 kB
  dist/assets/vendor-supabase-ZjJciyKg.js   208.19 kB │ gzip:  53.65 kB
  dist/assets/vendor-react-BgVgy5Kg.js      221.91 kB │ gzip:  70.90 kB
  dist/assets/vendor-animation-DcBvoWDg.js  271.69 kB │ gzip:  95.18 kB
  dist/assets/vendor-three-3j0w-gDc.js      878.24 kB │ gzip: 233.64 kB
  ✓ built in 804ms
  ```
- **Git Commit:** `0275a67`
- **Branch:** `main` (Pushed to `https://github.com/patelhashilkumar/flo-studios.git`)
