# Design Specification: Flo Studios Careers Page (Sales Development Representative)

## 1. Overview & Objectives
Rebuild the `/careers` page of Flo Studios strictly adhering to the exact job listing and company copy provided for the **Sales Development Representative (Development Division)** role.
All dummy data, placeholder listings, and sample inquiries will be purged so that the site and admin storage operate solely with authentic production submissions.

## 2. Core Constraints
1. **Strict Copy Adherence**: Only the text and sections specified in the job listing are permitted on the careers page. No unrelated filler text, artificial perks, or unapproved role listings.
2. **Resume Upload Capability**: Applicants must be able to upload their resume file (`.pdf`, `.doc`, `.docx`). The file is processed and encoded to base64 for persistent storage.
3. **Admin Portal Resume Access**: The `/admin` dashboard must display an action to view/download the uploaded resume for any candidate.
4. **Purge Demo/Dummy Data**: Remove dummy seeds from `adminStorage.js` (Maya Lin, Alex Mercer, etc.) and remove dummy fallbacks from the form submission handlers.

---

## 3. Page Structure & Exact Content Architecture

### 3.1 Breadcrumb & Role Header
- **Breadcrumbs**: `Home / Careers`
- **Role Title**: `Sales Development Representative`
- **Department**: `Development Division`
- **Key Badges**:
  - `Full-Cycle (Prospecting to Close)`
  - `100% Commission (Uncapped)`
  - `Remote — North America & Europe Only`
  - `Contract Position`
- **CTA Action**: `Apply for this role ↓` (Smooth scrolls down to `#application-form`)

### 3.2 About Flo Studios
> Flo Studios is a dual-engine media and development hub for established creators and ambitious companies. Our Development Division owns the full product pipeline - Idea & Design, Full-Stack Development, Deployment, and Customer Acquisition - delivered as one complete, packaged engagement rather than a menu of standalone services. We work with venture-backed startups and ambitious companies building products worth building right.

### 3.3 About the Job
> Flo Studios is hiring a Sales Development Representative to own the entire sales cycle for our Development Division - from prospecting to close. This is a full-cycle, individual-contributor role: you will not hand off qualified leads to a separate closer, and you will not inherit inbound leads you didn't source yourself. You will build your own pipeline, run your own discovery process, and close your own deals.
>
> This role suits a sales professional who wants full ownership of outcomes and compensation with no ceiling, and who has the discipline to operate independently in a remote, contract-based structure.

### 3.4 Responsibilities (9 Items)
1. **Prospect List Development**: Research and build a targeted, continuously refreshed prospect list aligned to Flo Studios' ICP - venture-backed startups and ambitious companies with a validated product idea. This includes identifying the right decision-makers within each organization (founders, product leads, or technical stakeholders) and prioritizing outreach based on fit, timing, and likelihood to convert.
2. **Outbound Strategy & Execution**: Design, test, and execute outbound outreach sequences across relevant channels (email, LinkedIn, and others as appropriate), tailoring messaging to each segment of the ICP. This includes iterating on subject lines, opening hooks, and follow-up cadences based on response rates, and knowing when to personalize versus when to scale.
3. **Discovery & Qualification**: Book, prepare for, and lead discovery calls that go beyond surface-level qualification - understanding a prospect's business goals, technical constraints, budget realism, and timeline, in order to determine genuine fit before investing further sales cycle time.
4. **Solution Scoping & Positioning**: Translate what you learn in discovery into the right project tier - MVP, full-scale build, or lighter-scope project - and present Flo Studios' Development Division offering in a way that speaks directly to the client's specific goals, rather than a generic pitch.
5. **Negotiation & Closing**: Own the full negotiation process end-to-end, including handling objections around price, timeline, and scope, structuring proposals, and driving the deal to a signed contract without requiring escalation to a separate closer.
6. **Pipeline Management**: Maintain accurate, up-to-date records of every deal in your pipeline - including stage, next steps, deal notes, and realistic close-date forecasting - so that pipeline health is visible and predictable at any given time, not just at the point of closing.
7. **Performance Reporting**: Report on key sales metrics - including outreach volume, response and conversion rates, and closed revenue - on a regular cadence, using this data to identify what's working and where the pipeline needs adjustment.
8. **Messaging Refinement**: Continuously test and refine outbound messaging, targeting criteria, and qualification questions based on real response data and patterns observed in closed-won versus closed-lost deals, treating your own pipeline as a feedback loop for improving conversion over time.
9. **Delivery Handoff**: Collaborate closely with the Development Division's delivery team once a deal is signed, ensuring all context, expectations, and scope details are clearly transferred so the project kicks off smoothly and client expectations set during the sales process are honored during execution.

### 3.5 Compensation
- **Model**: This is a 100% commission-based contract position, with no fixed salary and no cap on earnings.
- **Commission Structure**: 12-15% of total contract value per closed deal, determined by project scope and complexity.
- **Deal Size**: Project pricing is scoped individually based on client requirements and varies accordingly - recent engagements have ranged from approximately $5,000 for smaller-scope projects to $100,000+ for full-scale product builds, with a substantial share of deals falling in the $35,000-$40,000 range for standard MVP work.
- **Illustrative Example**: A closed deal valued at $35,000 would yield approximately $4,200-$5,250 in commission at the stated rate; a closed deal valued at $100,000 would yield $12,000-$15,000.
- **Terms**: Final commission percentage and payment terms are confirmed during onboarding.

### 3.6 Minimum Qualifications (Strict Non-Negotiables)
- 2-3 years of experience in sales (strict range - candidates outside this window will not be considered)
- Demonstrated experience selling into the tech industry
- Proven full-cycle sales experience: prospecting, discovery, negotiation, and closing - not outreach-only or closing-only experience
- Exceptional written and verbal communication skills
- Based in North America or Europe (non-negotiable; applications from outside these regions will not be reviewed)
- Reliable access to a laptop, stable internet, and availability to work independently on a remote, self-directed basis

### 3.7 Preferred Qualifications
- Experience selling services or custom builds in a digital agency, software studio, or dev-shop environment
- Experience navigating consultative, multi-stakeholder sales cycles for high-consideration, high-ticket purchases
- Familiarity with CRM tools (e.g., HubSpot, Pipedrive, or similar) for pipeline tracking
- A track record of exceeding quota in a commission-driven or performance-based compensation structure
- Prior experience selling to startup founders or technical decision-makers (e.g., CTOs, product leads)

### 3.8 What Success Looks Like
> Success in this role looks like a consistent, self-generated pipeline that reflects genuine ICP fit rather than volume for its own sake. Within the first 60-90 days, we'd expect a rep to be fully ramped and closing 2-4 deals per quarter, with a CRM that reflects real-time, accurate deal status rather than optimistic guesswork. Just as importantly, success shows up in how clients describe the experience of working with you - a sales process that felt consultative and professional from the first outreach message through contract signature, setting the right expectations for the delivery team to build on.

### 3.9 You Might Thrive in this Role
- A genuine preference for ownership over structure - you'd rather build your own pipeline and be judged on outcomes than follow someone else's playbook
- A high tolerance for rejection and an ability to stay consistent through slow weeks, without needing external motivation to keep prospecting
- A competitive drive toward uncapped upside - you're energized, not intimidated, by compensation tied directly to performance
- Strong instincts for reading people and situations quickly, especially in early conversations where fit isn't yet obvious
- The discipline to manage your own time, priorities, and pipeline without day-to-day oversight
- A genuine interest in the technical and startup world - you enjoy understanding what founders are building, not just closing what's in front of you

### 3.10 Mission & Equal Opportunity Employer
> Flo Studios' mission is to give ambitious companies and established creators the infrastructure to build and grow at the highest level. We believe the best work comes from teams that bring genuinely different perspectives, backgrounds, and ways of thinking to the table - and we build our team, in both our Creator and Development Divisions, with that in mind.
>
> We are an equal opportunity employer. We do not discriminate based on race, religion, color, national origin, sex, sexual orientation, age, disability, veteran status, or any other legally protected characteristic. All applicants are evaluated solely on their qualifications, experience, and fit for the role.

---

## 4. Interactive Application Form Specifications

### 4.1 Form Fields
1. **Full Name** (`text`, required)
2. **Email Address** (`email`, required)
3. **Phone Number** (`tel`, optional)
4. **Current Region / Location** (`select`, required):
   - `North America`
   - `Europe`
   - `Other region (Note: strictly not reviewed per qualifications)`
5. **Years of Sales Experience** (`select`, required):
   - `2-3 years (Meets qualification)`
   - `Less than 2 years`
   - `More than 3 years`
6. **LinkedIn or Online Profile URL** (`url`, optional)
7. **Resume Upload** (`file`, required):
   - Accepted file types: `.pdf, .doc, .docx`
   - Max file size: 5MB
   - Encoded via `FileReader.readAsDataURL()` to preserve the file format and contents in local storage
   - Displays selected file name, file size, and a remove/replace action
8. **Sales Background & Fit** (`textarea`, required):
   - Context: Summary of tech sales experience, full-cycle deals closed, or outbound strategies executed.
9. **Mandatory Certification Checkbox** (`checkbox`, required):
   - Checkbox label text:
     > *"By applying for this role, you confirm that all information and details provided to Flo Studios are accurate and truthful, and that all certifications and credentials submitted belong to you. Any misrepresentation, falsification, or discrepancy discovered may result in immediate termination of employment and may lead to legal action."*

### 4.2 Data Payload to `adminStorage.js`
```javascript
{
  type: 'job',
  role: 'Sales Development Representative',
  division: 'Development Division',
  name: string,
  email: string,
  phone: string,
  region: string,
  experience: string,
  portfolioUrl: string, // LinkedIn/Profile
  resumeName: string,
  resumeSize: string,
  resumeType: string,
  resumeData: string, // Base64 Data URL
  coverNote: string,
  termsConfirmed: boolean
}
```

---

## 5. Admin Dashboard Resume Viewer (`/admin`)

1. **Candidate Card Enhancement**:
   - In `AdminPage.jsx`, if `item.resumeData` exists:
     - Render a primary button: **`📄 View / Download Resume (${item.resumeName || 'Resume.pdf'})`**
     - Clicking opens the data URI or downloads the file with appropriate filename.
   - Display region badge (e.g. `📍 North America`) alongside experience badge.
2. **Data Purge**:
   - Initialize `adminStorage.js` with `DEFAULT_SEEDS = []`.
   - Clear existing demo records in `localStorage` if they match the legacy seeds, ensuring a clean slate.
3. **Exports Update**:
   - Include `Resume Attached: Yes/No (${item.resumeName})` and `Region` in CSV and JSON exports.

---

## 6. Verification Plan
- Verify compilation with `npm run build`.
- Test application submission with file upload (PDF).
- Verify record appearance in `/admin` with working resume download button.
- Verify that no foreign dummy text appears anywhere on `/careers`.
