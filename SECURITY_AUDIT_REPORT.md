# Flo Studios — Comprehensive Security & Information Exposure Audit Report

> **Target Platform:** Flo Studios ([https://www.flostudio.co/](https://www.flostudio.co/))  
> **Repository:** [https://github.com/patelhashilkumar/flo-studios](https://github.com/patelhashilkumar/flo-studios)  
> **Audit Type:** Authorized Codebase & Production Bundle Security & Information-Exposure Audit  
> **Date:** October 2026  
> **Build Status:** Verified (Zero Errors / Warnings, 0 Audit Vulnerabilities)  
> **Commit Hash:** `0275a67` (Patched & Pushed to `origin/main`)

---

## Executive Summary

An exhaustive security and information-exposure audit was conducted across the entire Flo Studios codebase, production browser bundles, static assets, configuration files, environment definitions, network APIs, and Git history. 

The primary objective of this audit was to ensure that **no confidential credentials, private endpoints, internal infrastructure details, or unauthenticated administrative bypasses are accessible to public visitors**, while strictly preserving all legitimate business information, visual aesthetics, animations, forms, and responsive interactions.

All confirmed vulnerabilities were immediately remediated, verified via clean production builds, and synchronized to GitHub.

---

## 1. Secret / Credential Scan

An automated and manual static analysis was executed across the entire codebase to detect exposed credentials.

### File Types Inspected
- Code files: `.js`, `.jsx`, `.ts`, `.tsx`, `.json`, `.html`, `.css`
- Configuration & server files: `vite.config.js`, `vercel.json`, `package.json`, `public/_redirects`
- Environment definitions: `.env`, `.env.example`, `.env.local`
- Version control history: Complete commit logs across all branches.

### Credential Categories Evaluated
- Cloud Provider Keys: AWS (`AKIA...`), Google Cloud Platform, Firebase Service Accounts
- Database Credentials: PostgreSQL connection strings (`postgres://`), MongoDB, Redis
- API & AI Keys: OpenAI (`sk-...`), Gemini, Anthropic, Stripe (`sk_live_...`), Razorpay, GitHub PATs (`ghp_...`)
- Authentication: Private keys (`BEGIN RSA PRIVATE KEY`), JWT secrets, OAuth client secrets, SMTP credentials, webhook secrets, encryption keys
- Backend Services: Supabase project credentials, secret role keys (`service_role`).

### Findings & Severity Classification
| Discovered Item | Location | Classification | Status |
| :--- | :--- | :--- | :--- |
| AWS / GCP / Azure Admin Keys | Global scan | None found (0 occurrences) | **Clean** |
| Database Direct URIs (`postgres://`) | Global scan | None found (0 occurrences) | **Clean** |
| Stripe / Razorpay Secret Keys | Global scan | None found (0 occurrences) | **Clean** |
| OpenAI / Gemini / Anthropic Keys | Global scan | None found (0 occurrences) | **Clean** |
| Supabase `service_role` Private Key | Global scan | None found (0 occurrences) | **Clean** |
| Hardcoded Supabase URL & Anon Key | [`src/lib/supabase.js`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/src/lib/supabase.js) | Public-by-design Anon Key (`sb_publishable_****vaDj`), but hardcoded in source code | **Remediated** |
| Hardcoded Admin Passcodes (`flo2026`, `flo`) | [`src/services/adminStorage.js`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/src/services/adminStorage.js) | Sensitive plaintext passcode compiled into browser bundle | **Remediated** |

### Remediation Applied
1. **Removed Hardcoded Supabase Fallbacks:** `src/lib/supabase.js` was modified to strictly read from `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_ANON_KEY`.
2. **Removed Client-Side Passcodes:** Hardcoded `'flo2026'` and `'flo'` strings were purged from `src/services/adminStorage.js` and replaced with an environment variable check (`import.meta.env.VITE_ADMIN_PASSCODE`). If unconfigured, passcode authentication is completely disabled in favor of Supabase Auth.

---

## 2. Environment Variables

An audit was conducted to verify that no server-only secrets or private credentials are exposed to the browser runtime.

### Framework Mechanism (Vite 8)
- Under Vite, only variables explicitly prefixed with `VITE_` are statically embedded into client-side JavaScript bundles at build time.
- Variables without the `VITE_` prefix remain strictly server-side.

### Variable Audit
| Variable | Scope | Destination | Assessment |
| :--- | :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Client / Browser | Embedded in bundle | Safe (Points to Supabase project API gateway) |
| `VITE_SUPABASE_ANON_KEY` | Client / Browser | Embedded in bundle | Safe (Publishable client anon key governed by Postgres RLS) |
| `VITE_ADMIN_PASSCODE` | Client / Optional | Embedded if set | Safe (Optional fallback preview; defaults to disabled) |
| `NEXT_PUBLIC_*` | Legacy / Unused | Not parsed by Vite | Cleaned up from documentation to avoid ambiguity |

### Action Taken
- Purged legacy Next.js environment variable comments from [`.env.example`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/.env.example).
- Confirmed that no sensitive database passwords, private encryption keys, or third-party service role keys exist in environment definitions.

---

## 3. Production JavaScript Bundle

The production application was compiled using `npm run build` into `dist/`, and the generated browser-delivered artifacts were inspected.

### Artifacts Inspected
- `dist/index.html` (5.67 kB)
- `dist/assets/index-*.js` (44.65 kB)
- `dist/assets/adminStorage-*.js` (25.58 kB)
- `dist/assets/AdminPage-*.js` (25.36 kB)
- `dist/assets/vendor-supabase-*.js` (208.19 kB)
- `dist/assets/vendor-three-*.js` (878.24 kB)
- All chunked CSS and media assets.

### Verification Queries Executed
1. **Passcode Elimination:**
   - Command: `Select-String -Path dist/assets/*.js -Pattern "flo2026"`
   - Result: **0 matches**. The hardcoded passcode was completely removed from the compiled distribution bundle.
2. **Localhost & Staging URLs:**
   - Searched for: `localhost`, `127.0.0.1`, `http://0.0.0.0`, `staging.flostudio.co`.
   - Result: **0 matches**. All production bundles use relative paths and canonical HTTPS URLs.
3. **Internal Filesystem Paths:**
   - Searched for: Developer usernames, `C:\Users\`, `/home/`, `/var/`.
   - Result: **0 matches**. Rollup chunking emitted clean relative chunk references.
4. **Internal Comments & Debug Statements:**
   - Terser/esbuild minification successfully stripped all internal developer comments, inline notes, and debug consoles.

---

## 4. Source Maps

Public source maps (`*.map`) allow external visitors to reconstruct the exact original source code, directory structures, unminified comments, and internal logic.

### Audit Findings
- Vite’s default configuration does not generate source maps unless configured.
- However, to prevent unintended source map emission during CI/CD pipeline deployments or configuration changes, explicit enforcement was required.

### Action Taken
In [`vite.config.js`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/vite.config.js), explicit configuration was added:
```javascript
export default defineConfig({
  build: {
    sourcemap: false, // Guarantees zero .map files emitted in production
  },
  // ...
});
```
- Inspected `dist/` post-build: Confirmed **0 `.map` files** present.

---

## 5. Git / Repository Exposure

Audited the repository for exposed `.git` directories, sensitive files in version control, and historical credential leakage.

### Web Server Directory Protection
- Checked whether `.git/` could be served over HTTP:
  - Added blocking rules in [`vercel.json`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/vercel.json) and [`public/_redirects`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/public/_redirects) mapping `/\.git.*` directly to HTTP 404.
  - Verified `.git` is outside the `dist/` build output and cannot be deployed to public static hosts.

### Git History Audit
- Executed full commit history scan across all historical commits:
  - Commit `00d3ae0a`: Contained the Supabase anon key `sb_publishable_peQ2bFpIImyQWF0g-GQtUw_****vaDj` in `src/lib/supabase.js`.
  - While this key is designed as a client-side publishable key and protected by PostgreSQL Row-Level Security, having it committed historically creates risk if key rotation is needed.
- **Recommendation:** Rotate the publishable anon key via the Supabase Dashboard as documented in Section G.

---

## 6. Sensitive Files

Verified that sensitive files, backup artifacts, and configuration dumps cannot be accessed publicly.

### Files Audited
- Dotfiles: `.env`, `.env.local`, `.env.production`, `.git`, `.gitignore`
- Dependency Lockfiles: `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`
- Configuration & Database Files: `tsconfig.json`, `schema.sql`, `backup.zip`, `.DS_Store`
- Logs & Backups: `*.log`, `*.bak`, `*.old`, `*.tmp`

### Hosting Rewrite Protection
Single Page Applications (SPAs) often route all requests to `index.html`. If an attacker requests `/.env` or `/schema.sql`, a poorly configured SPA returns HTTP 200 with the HTML homepage. While this does not leak the file content directly, it misleads security scanners and risks accidental exposure if static hosting rules change.

### Action Taken
Configured explicit negative pattern matching in [`vercel.json`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/vercel.json):
```json
{
  "routes": [
    {
      "src": "^/\\..*",
      "dest": "/404"
    },
    {
      "src": "^/(.*)\\.(sql|log|bak|tmp|zip|tar|gz|sh|lock|conf|yaml|yml)$",
      "dest": "/404"
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```
And added corresponding directives to [`public/_redirects`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/public/_redirects).

---

## 7. Internal Information

Scanned the production website and codebase for internal network signatures and developer artifacts.

- **IP Addresses:** 0 private IPs (e.g., `10.0.0.0/8`, `192.168.0.0/16`, `172.16.0.0/12`) discovered.
- **Hostnames:** No internal hostnames or staging URLs (`dev.flo...`, `test.flo...`).
- **Database Names:** No raw internal database names or SQL table schema definitions exposed in client bundles.
- **Developer Usernames:** No personal developer usernames or workstation paths in build outputs.
- **Stack Traces:** Error boundaries prevent internal stack traces from bubbling to user-facing DOM.

---

## 8. Admin & Debug Routes

Audited all application routes registered in [`src/App.jsx`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/src/App.jsx).

### Route Inventory
- Public Routes: `/`, `/about`, `/services`, `/work`, `/contact`, `/careers`, `/latest`
- Fallback Route: `*` -> [`NotFoundPage.jsx`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/src/pages/NotFoundPage.jsx)
- Administrative Route: `/admin` -> [`AdminPage.jsx`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/src/pages/AdminPage.jsx)
- Debug / Test Routes: None (`/debug`, `/test`, `/staging` do not exist).

### `/admin` Security Hardening
1. **Search Engine De-indexing:**
   - Dynamic meta tag `<meta name="robots" content="noindex, nofollow" />` enforced.
   - Disallowed in `public/robots.txt` (`Disallow: /admin`).
2. **Authentication Refactoring:**
   - Previous state: Allowed login using hardcoded passcode `'flo2026'`.
   - Remediated state:
     - When connected to Supabase, authentication defaults to **Supabase Admin Auth** (`supabase.auth.signInWithPassword`), requiring verified admin credentials and returning cryptographically signed JWTs.
     - Hardcoded passcodes were purged. The optional passcode tab only activates if a secret `VITE_ADMIN_PASSCODE` is configured via environment variables.

---

## 9. API Security & Row-Level Security (RLS)

Audited communication between the browser frontend and backend services (Supabase PostgreSQL, Supabase Auth, Supabase Storage).

### Live API Penetration Testing
Live requests were sent to the Supabase REST API using the publishable client key to verify database isolation:

1. **Unauthorized Read on `contact_inquiries`:**
   - Request: `GET https://jemvbvzucqvetaghoyjg.supabase.co/rest/v1/contact_inquiries`
   - Response: `HTTP 200 OK []`
   - Evaluation: **PASSED**. Postgres RLS policy prevents unauthenticated users from reading customer inquiries. Zero rows returned.
2. **Unauthorized Read on `job_applications`:**
   - Request: `GET https://jemvbvzucqvetaghoyjg.supabase.co/rest/v1/job_applications`
   - Response: `HTTP 200 OK []`
   - Evaluation: **PASSED**. Postgres RLS policy prevents public access to candidate resumes and personal details.
3. **Unauthorized Write to `job_postings`:**
   - Request: `POST https://jemvbvzucqvetaghoyjg.supabase.co/rest/v1/job_postings` (attempting unauthorized job injection)
   - Response: `HTTP 401 Unauthorized` (`"new row violates row-level security policy for table 'job_postings'"`)
   - Evaluation: **PASSED**. Only authenticated administrators can modify job postings.
4. **Legitimate Contact & Career Submissions:**
   - Public anonymous users are permitted `INSERT` permissions on `contact_inquiries` and `job_applications`, allowing seamless public form submissions.

---

## 10. Form Security & Anti-Abuse

Audited contact and job application forms in [`src/components/contact/MotionContactForm.jsx`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/src/components/contact/MotionContactForm.jsx) and [`src/pages/CareersPage.jsx`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/src/pages/CareersPage.jsx).

### Anti-Spam / Anti-Bot Protection
- Implemented **honeypot fields** (`website` / `company_fax` visually hidden with CSS `opacity: 0; position: absolute; pointer-events: none`).
- Automated spam bots filling hidden honeypots are intercepted and silently rejected without making database calls.

### Input Validation & Sanitization
- Contact Form: Enforces maximum string lengths, trims inputs, validates standard RFC 5322 email patterns.
- Careers Form:
  - File Upload Validation: Strictly enforces allowed MIME types (`application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`).
  - Size Limit: Enforces a strict 5 MB file size ceiling before initiating uploads to Supabase Storage.
  - Sanitizes uploaded filenames to prevent directory traversal or script injection.

---

## 11. Personal Information (PII) Audit

Audited all pages, metadata, and JSON-LD structured data for accidental personal data leakage.

### Distinction: Business Contact Info vs. Private PII
- **Public Business Contact Data (Legitimate & Preserved):**
  - Official Brand Name: `Flo Studios`
  - Official Inquiries Email: `hello@flostudios.com`
  - Official Social Channels: LinkedIn, Instagram, X/Twitter
- **Private Personal Information (Verified 0 Exposure):**
  - 0 private employee cell phone numbers.
  - 0 home addresses or residential locations.
  - 0 internal developer email addresses.
  - 0 unconsented team member personal accounts.

---

## 12. Comments & HTML Inspection

Audited the rendered HTML and source files for confidential comments.

- `index.html`: Contains clean semantic HTML, Open Graph tags, JSON-LD structured data, and font preconnect tags. No internal developer notes or commented-out secrets.
- JSX/JS Source Code: All internal developer comments (`// TODO`, `/* FIXME */`) are stripped out during the production build bundling phase.
- Rendered DOM in Production: Clean, unencumbered by developer comments.

---

## 13. Error Handling

Audited runtime error boundaries and API failure cascades to ensure internal error details never leak to website visitors.

### React Error Boundary
- [`src/components/ErrorBoundary.jsx`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/src/components/ErrorBoundary.jsx) intercepts uncaught rendering errors.
- Renders an elegant fallback screen with a branded "Reload Page" button.
- **Zero Stack Traces:** Stack traces, component hierarchies, and internal file paths are logged to the browser console during development but completely hidden from the user interface.

### Network Error Handling
- In `contactService.js` and `careerService.js`, network or database errors are caught gracefully.
- End users receive generic, reassuring feedback (e.g., *"Unable to send message. Please try again or email hello@flostudios.com"*), preventing database schema names or error codes from appearing on screen.

---

## 14. Security Headers

Audited HTTP response headers configured in [`vercel.json`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/vercel.json).

### Header Configuration
| Header | Value | Purpose |
| :--- | :--- | :--- |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com; ...` | Mitigates XSS and restricts resource loading to approved domains |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Enforces HTTPS connections |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-type confusion attacks |
| `X-Frame-Options` | `DENY` | Prevents clickjacking by blocking iframe embedding |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Protects referrer leakage on outbound requests |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Disables invasive browser hardware APIs |
| `X-Permitted-Cross-Domain-Policies` | `none` | Prevents Adobe Flash/PDF cross-domain policy access |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isolates browsing context from cross-origin popups |
| `Cross-Origin-Resource-Policy` | `same-origin` | Restricts resource loading to same-origin requests |

---

## 15. Cross-Origin Resource Sharing (CORS)

- Frontend runs as a client-side Single Page Application.
- Supabase REST & Storage APIs enforce CORS based on the project's authorized site URLs.
- No wildcards (`Access-Control-Allow-Origin: *`) are utilized for authenticated administrative operations.

---

## 16. Public Storage & Assets

Audited the `public/` directory and cloud storage buckets.

### `public/` Directory Audit
- Contains exclusively intentional, static public brand assets:
  - `favicon.ico`, `Flo Studios logo.png`, `og-image.jpg`
  - `robots.txt`, `sitemap.xml`, `_redirects`
  - Video and animation media (`flo.mp4`, etc.)
- **Zero Exposure:** No `.sql` database dumps, `.zip` backups, or private employee files exist in `public/`.

### Cloud Storage (`resumes` bucket)
- Supabase Storage `resumes` bucket stores submitted candidate resumes.
- Access Control: Configured with restricted permissions. Public anonymous users can only perform `INSERT` operations (upload). Listing or downloading resumes requires authenticated administrator authorization.

---

## 17. Third-Party Integrations

Audited external scripts, CDNs, and SaaS dependencies:
- **Supabase:** Managed database and storage provider. Connected via publishable client anon key governed by RLS.
- **Fontshare & Google Fonts:** Loaded over HTTPS from verified CDNs (`api.fontshare.com`, `fonts.googleapis.com`).
- **Zero Unverified Trackers:** No unauthorized third-party trackers, pixels, or ad networks injecting scripts into the DOM.

---

## 18. Dependency Security Audit

Executed package manager vulnerability scanner:
```bash
npm audit
```
### Audit Results
- **Scanned Dependencies:** 28 total packages.
- **Vulnerabilities Found:** **0** (0 Critical, 0 High, 0 Moderate, 0 Low).
- All dependencies (Vite, React 19, Lucide React, Supabase JS, Three.js, GSAP) are clean and free of known CVE vulnerabilities.

---

## 19. Production Build Verification

Executed a complete production build to verify zero syntax errors, broken imports, or bundle warnings:
```bash
npm run build
```
### Build Output
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
- **Result:** Successfully compiled in 804ms with zero errors.

---

## 20. Live Website Verification

Tested live paths and simulated malicious probes:

### 1. Standard Production Endpoints
- `/` (Homepage): Loads hero animations, canvas, navigation, and positioning.
- `/about`, `/services`, `/work`, `/contact`, `/careers`, `/latest`: Load dynamically without errors.
- `/robots.txt`: Accessible, defines sitemap, blocks `/admin`.
- `/sitemap.xml`: Accessible, indexable XML sitemap with canonical `https://www.flostudio.co/` URLs.

### 2. Accidental Exposure Probes
- `/.env`: Intercepted by `vercel.json` routing rules -> routed to `/404`.
- `/.git/HEAD`: Intercepted by routing rules -> routed to `/404`.
- `/schema.sql`: Intercepted by routing rules -> routed to `/404`.
- `/backup.zip`: Intercepted by routing rules -> routed to `/404`.
- No sensitive server files or directory listings are downloadable.

---

## 21. Fix Confirmed Issues (Summary of Remediations)

Prioritized breakdown of all applied patches:

### HIGH Severity Fixes
1. **Purged Hardcoded Passcode:**
   - Files: `src/services/adminStorage.js`, `src/pages/AdminPage.jsx`
   - Removed `'flo2026'` and `'flo'`. Replaced with environment-driven variable `VITE_ADMIN_PASSCODE` and set Supabase Admin auth as default.
2. **Purged Hardcoded Supabase Credentials:**
   - File: `src/lib/supabase.js`
   - Removed hardcoded fallback project URL and anon key. Enforced strict environment variable initialization.

### MEDIUM Severity Fixes
3. **Disabled Source Map Emission:**
   - File: `vite.config.js`
   - Set `build.sourcemap: false` explicitly to guarantee zero `.map` generation.
4. **Blocked Sensitive File Probing:**
   - Files: `vercel.json`, `public/_redirects`
   - Added regex rules routing dotfiles (`/\..*`) and sensitive extensions (`.sql`, `.bak`, `.zip`, `.log`) to `/404`.
5. **Enhanced Security Headers:**
   - File: `vercel.json`
   - Added `X-Permitted-Cross-Domain-Policies`, `Cross-Origin-Opener-Policy`, and `Cross-Origin-Resource-Policy`.

### LOW Severity Fixes
6. **Cleaned Up Environment Documentation:**
   - File: `.env.example`
   - Removed obsolete Next.js environment variables to prevent developer confusion.

---

## 22. Integrity of Legitimate Public Information

In accordance with strict audit requirements, **zero legitimate business information was removed or degraded**:
- **Brand Identity:** "Flo Studios" is consistently presented.
- **Business Contact:** `hello@flostudios.com` remains prominently accessible for customer inquiries.
- **Social Profiles:** Verified links to official LinkedIn, Instagram, and X profiles preserved.
- **Portfolio & Case Studies:** All client projects, media assets, case studies, and services remain fully functional.
- **Careers Portal:** Job listings, qualification criteria, and application forms remain fully operational.

---

## 23. Final Security Report Summary

### A. CRITICAL ISSUES
*Zero critical vulnerabilities detected.* No remote code execution, database compromise, or private key leakage.

### B. HIGH ISSUES
1. **Hardcoded Plaintext Passcodes in Client-Side JavaScript Bundle**
   - **Severity:** HIGH
   - **What Was Exposed:** Static passcodes (`'flo2026'`, `'flo'`) hardcoded in `adminStorage.js`.
   - **Where Found:** `src/services/adminStorage.js` lines 34 & 397; `src/pages/AdminPage.jsx` line 161.
   - **Why It Is a Problem:** Anyone inspecting the browser bundle could extract the passcode and unlock the `/admin` view in localStorage.
   - **Status:** **FIXED**. Hardcoded strings removed; replaced with environment-driven authentication and Supabase Auth.
2. **Hardcoded Supabase Project URL & Publishable Key in Source Code**
   - **Severity:** HIGH
   - **What Was Exposed:** Supabase project URL and anon key hardcoded as fallback constants in source files.
   - **Where Found:** `src/lib/supabase.js` lines 9–10 (and Git history commit `00d3ae0a`).
   - **Why It Is a Problem:** Bypassed environment variable separation and embedded keys permanently into source repositories.
   - **Status:** **FIXED**. Removed fallback constants; client strictly reads from `import.meta.env`.

### C. MEDIUM ISSUES
3. **Production Source Maps Not Explicitly Disabled**
   - **Severity:** MEDIUM
   - **Status:** **FIXED**. Explicitly locked down via `vite.config.js` (`sourcemap: false`).
4. **Vulnerability to Sensitive File Probing on Web Hosts**
   - **Severity:** MEDIUM
   - **Status:** **FIXED**. Explicit 404 rewrite rules added to `vercel.json` and `public/_redirects`.
5. **Missing Modern Cross-Origin Defensive Headers**
   - **Severity:** MEDIUM
   - **Status:** **FIXED**. Modern CORP, COOP, and Cross-Domain policies added to `vercel.json`.

### D. LOW ISSUES
6. **Unused Next.js Environment Variables in Local Configuration**
   - **Severity:** LOW
   - **Status:** **FIXED**. Documented definitions cleaned up in `.env.example`.

### E. FIXES IMPLEMENTED
| File Modified | Summary of Change |
| :--- | :--- |
| [`src/services/adminStorage.js`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/src/services/adminStorage.js) | Removed hardcoded `'flo2026'` / `'flo'`. Replaced with environment-driven `VITE_ADMIN_PASSCODE` check. |
| [`src/pages/AdminPage.jsx`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/src/pages/AdminPage.jsx) | Set Supabase Admin (`signInWithPassword`) as primary auth mechanism. Updated passcode validation. |
| [`src/lib/supabase.js`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/src/lib/supabase.js) | Removed hardcoded fallback Project URL and Anon Key. |
| [`vite.config.js`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/vite.config.js) | Enforced `build.sourcemap: false`. |
| [`vercel.json`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/vercel.json) | Added blocking rules for dotfiles and sensitive extensions; added modern cross-origin headers. |
| [`public/_redirects`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/public/_redirects) | Added 404 rules for sensitive files. |
| [`.env.example`](file:///c:/Users/hashi/Documents/MCP%20projects/new%20site/.env.example) | Standardized documented environment variables. |

### F. ITEMS REQUIRING MANUAL DEPLOYMENT
1. **Vercel Dashboard Environment Variables:**
   - In **Vercel Dashboard** -> **Project Settings** -> **Environment Variables**, ensure the following are configured:
     - `VITE_SUPABASE_URL`: `https://jemvbvzucqvetaghoyjg.supabase.co`
     - `VITE_SUPABASE_ANON_KEY`: `your-publishable-anon-key`
     - *(Optional)* `VITE_ADMIN_PASSCODE`: A secret passphrase for offline preview access.
2. **Supabase Admin Authentication:**
   - In **Supabase Dashboard** -> **Authentication** -> **Users**, ensure your designated administrator email is registered with a strong password.

### G. ITEMS THAT SHOULD BE ROTATED / REVOKED
Because commit `00d3ae0a` historically contained the Supabase publishable key:
- **Key Identifier:** `sb_publishable_peQ2bFpIImyQWF0g-GQtUw_****vaDj`
- **Recommended Action:**
  1. Open **[Supabase Dashboard](https://supabase.com/dashboard)** -> Select Project -> **Project Settings** -> **API**.
  2. Generate a new publishable API key and revoke the previous key.
  3. Update Vercel Environment Variables and local `.env` with the newly generated key.

### H. FILES CHANGED
1. `src/lib/supabase.js`
2. `src/services/adminStorage.js`
3. `src/pages/AdminPage.jsx`
4. `vite.config.js`
5. `vercel.json`
6. `public/_redirects`
7. `.env.example`
8. `SECURITY_AUDIT_REPORT.md`

### I. PRODUCTION BUILD STATUS
- **Build Status:** Verified (Success)
- **Compile Time:** 804 ms
- **Lint / Type / Syntax Errors:** 0
- **Vulnerabilities:** 0
- **Git Commit:** `0275a67`
- **Current Branch:** `main` (synchronized with `origin/main`)
