import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import {
  __setSupabaseClientForTests,
  isAuthorizedAdminUser,
  signInAdmin,
  getAdminSession,
  getInquiries,
  getJobApplications,
  getResumeSignedUrl,
  INQUIRY_STATUSES,
  JOB_APPLICATION_STATUSES,
  isValidStatusForType
} from '../src/services/supabaseService.js'

import {
  STORAGE_KEY,
  AUTH_KEY,
  getSubmissions,
  saveSubmission,
  updateSubmissionStatus,
  checkPasscode,
  isAuthenticated,
  getJobs,
  saveJob
} from '../src/services/adminStorage.js'

import { INITIAL_JOB_POSTINGS } from '../src/data/jobPostings.js'
import { getSupabaseCredentials } from '../src/lib/supabase.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')

function createMockStorage(quotaLimitBytes = Infinity) {
  const store = new Map()
  return {
    store,
    getItem(key) {
      return store.has(key) ? store.get(key) : null
    },
    setItem(key, value) {
      const str = String(value)
      if (str.length > quotaLimitBytes) {
        const err = new Error('QuotaExceededError: The quota has been exceeded.')
        err.name = 'QuotaExceededError'
        throw err
      }
      store.set(key, str)
    },
    removeItem(key) {
      store.delete(key)
    },
    clear() {
      store.clear()
    }
  }
}

function installGlobalStorage(quotaLimitBytes = Infinity) {
  const local = createMockStorage(quotaLimitBytes)
  const session = createMockStorage(quotaLimitBytes)
  globalThis.localStorage = local
  globalThis.sessionStorage = session
  return { local, session }
}

test('1. Admin authentication & authorization rejects localStorage bypass, user_metadata spoofing, and unauthorized users', async () => {
  const { local, session } = installGlobalStorage()

  // Simulate attacker planting AUTH_KEY in localStorage & sessionStorage
  local.setItem(AUTH_KEY, 'true')
  session.setItem(AUTH_KEY, 'true')

  assert.equal(isAuthenticated(), false, 'localStorage AUTH_KEY must never grant admin auth')
  assert.equal(local.getItem(AUTH_KEY), null, 'isAuthenticated must purge legacy AUTH_KEY')
  assert.equal(checkPasscode('flo2026'), false, 'Client-side passcode fallback must be disabled')
  assert.equal(checkPasscode('admin'), false, 'Client-side admin pin must be disabled')

  // Authorization checks on user objects
  assert.equal(isAuthorizedAdminUser(null), false)
  assert.equal(isAuthorizedAdminUser({ email: 'theflostudios0@gmail.com' }), false, 'Missing user.id must be rejected')
  assert.equal(
    isAuthorizedAdminUser({
      id: 'user-anon',
      email: 'theflostudios0@gmail.com',
      is_anonymous: true,
      app_metadata: { role: 'studio_admin' }
    }),
    false,
    'Anonymous sessions must never be authorized as admin'
  )
  assert.equal(
    isAuthorizedAdminUser({
      id: 'user-spoof',
      email: 'attacker@example.com',
      user_metadata: { role: 'studio_admin', is_admin: true },
      app_metadata: {}
    }),
    false,
    'Client-editable user_metadata must never grant admin authorization'
  )
  assert.equal(
    isAuthorizedAdminUser({
      id: 'user-regular',
      email: 'visitor@example.com',
      app_metadata: { role: 'authenticated' }
    }),
    false,
    'Authenticated user without admin role must be rejected'
  )
  assert.equal(
    isAuthorizedAdminUser({
      id: 'user-admin-claim',
      email: 'ops@example.com',
      app_metadata: { role: 'studio_admin' }
    }),
    true,
    'User with app_metadata.role = studio_admin is authorized'
  )
  assert.equal(
    isAuthorizedAdminUser({
      id: 'user-admin-email',
      email: 'theflostudios0@gmail.com',
      app_metadata: {}
    }),
    true,
    'Verified studio admin email with valid user.id is authorized'
  )

  // Verify signInAdmin rejects authenticated non-admin users and signs them out
  let signedOut = false
  __setSupabaseClientForTests({
    auth: {
      async signInWithPassword() {
        return {
          data: {
            session: {
              user: {
                id: 'user-normal-123',
                email: 'randomuser@example.com',
                app_metadata: {}
              }
            }
          },
          error: null
        }
      },
      async getSession() {
        return {
          data: {
            session: {
              user: {
                id: 'user-normal-123',
                email: 'randomuser@example.com',
                app_metadata: {}
              }
            }
          },
          error: null
        }
      },
      async signOut() {
        signedOut = true
        return { error: null }
      }
    },
    from() {
      throw new Error('Database should not be queried for unauthorized user')
    },
    storage: {
      from() {
        throw new Error('Storage should not be queried for unauthorized user')
      }
    }
  })

  const loginRes = await signInAdmin('randomuser@example.com', 'validPass123')
  assert.ok(loginRes.error, 'signInAdmin must return an error for non-admin authenticated user')
  assert.equal(signedOut, true, 'signInAdmin must sign out unauthorized authenticated user')

  const sessionRes = await getAdminSession()
  assert.equal(sessionRes.session, null, 'getAdminSession must return null session for unauthorized user')
  assert.deepEqual(await getInquiries(), [], 'getInquiries must return empty array for unauthorized user')
  assert.deepEqual(await getJobApplications(), [], 'getJobApplications must return empty array for unauthorized user')
  assert.equal(await getResumeSignedUrl('resumes_sdr/123_cv.pdf'), null, 'getResumeSignedUrl must reject unauthorized user')

  __setSupabaseClientForTests(undefined)
})

test('2. Supabase client config has no hardcoded project URL or key when env vars are unset', () => {
  const prevUrl = process.env.VITE_SUPABASE_URL
  const prevNextUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const prevKey = process.env.VITE_SUPABASE_ANON_KEY
  const prevPubKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY
  const prevNextKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  try {
    process.env.VITE_SUPABASE_URL = ''
    process.env.NEXT_PUBLIC_SUPABASE_URL = ''
    process.env.VITE_SUPABASE_ANON_KEY = ''
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY = ''
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = ''

    const creds = getSupabaseCredentials()
    assert.equal(creds.url, '', 'URL must be empty when env vars are empty')
    assert.equal(creds.anonKey, '', 'Anon key must be empty when env vars are empty')
  } finally {
    if (prevUrl === undefined) delete process.env.VITE_SUPABASE_URL
    else process.env.VITE_SUPABASE_URL = prevUrl
    if (prevNextUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL
    else process.env.NEXT_PUBLIC_SUPABASE_URL = prevNextUrl
    if (prevKey === undefined) delete process.env.VITE_SUPABASE_ANON_KEY
    else process.env.VITE_SUPABASE_ANON_KEY = prevKey
    if (prevPubKey === undefined) delete process.env.VITE_SUPABASE_PUBLISHABLE_KEY
    else process.env.VITE_SUPABASE_PUBLISHABLE_KEY = prevPubKey
    if (prevNextKey === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    else process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = prevNextKey
  }
})

test('3. SQL migration and schema enforce studio admin authorization and forbid anon read/update/delete', () => {
  const migrationSql = fs.readFileSync(
    path.join(repoRoot, 'supabase/migrations/20261013000000_harden_rls_and_admin_auth.sql'),
    'utf8'
  )
  const schemaSql = fs.readFileSync(path.join(repoRoot, 'supabase/schema.sql'), 'utf8')

  for (const sql of [migrationSql, schemaSql]) {
    assert.match(sql, /create or replace function public\.is_studio_admin\(\)/i)
    assert.doesNotMatch(
      sql,
      /for\s+(update|delete)\s+to\s+anon/i,
      'SQL must never grant UPDATE or DELETE to anon on any table or storage bucket'
    )
    assert.doesNotMatch(
      sql,
      /on\s+(public\.contact_inquiries|public\.job_applications|storage\.objects)\s+for\s+select\s+to\s+anon/i,
      'SQL must never grant SELECT to anon on contact_inquiries, job_applications, or storage.objects'
    )
    assert.match(
      sql,
      /on\s+public\.job_postings\s+for\s+select\s+to\s+anon,\s*authenticated\s+using\s*\(\s*status\s*=\s*'active'\s+or\s+\(select public\.is_studio_admin\(\)\)\s*\)/i
    )
    assert.match(sql, /using\s*\(\s*\(select public\.is_studio_admin\(\)\)\s*\)/i)
  }
})

test('4. Public form submission propagates failed network requests and prevents duplicate inserts', async () => {
  installGlobalStorage()
  process.env.VITE_SUPABASE_URL = 'https://example.supabase.co'
  process.env.VITE_SUPABASE_ANON_KEY = 'test-anon-key'

  let inquiryInsertCalls = 0
  __setSupabaseClientForTests({
    from(table) {
      assert.equal(table, 'contact_inquiries')
      return {
        async insert(rows) {
          inquiryInsertCalls += 1
          assert.equal(rows.length, 1)
          assert.ok(rows[0].id, 'Single insert must include client-generated UUID')
          return { error: new Error('PostgREST network timeout') }
        }
      }
    }
  })

  try {
    await assert.rejects(
      () =>
        saveSubmission({
          type: 'message',
          name: 'Founder Jane',
          email: 'jane@startup.io',
          message: 'Need full-lifecycle product build'
        }),
      /PostgREST network timeout/,
      'saveSubmission must reject when cloud insert fails so contact form shows retry feedback'
    )

    assert.equal(
      inquiryInsertCalls,
      1,
      'createInquiry must perform exactly 1 insert attempt (never retry insert on error)'
    )
    assert.equal(
      getSubmissions().length,
      0,
      'Failed cloud submission must not leave a false-positive saved record in localStorage'
    )
  } finally {
    __setSupabaseClientForTests(undefined)
    delete process.env.VITE_SUPABASE_URL
    delete process.env.VITE_SUPABASE_ANON_KEY
  }
})

test('5. Resume upload strips Base64 from localStorage, propagates upload failures, and handles localStorage quota limits', async () => {
  const { local } = installGlobalStorage(1800) // Small 1.8 KB quota limit
  process.env.VITE_SUPABASE_URL = 'https://example.supabase.co'
  process.env.VITE_SUPABASE_ANON_KEY = 'test-anon-key'

  let shouldFailUpload = true
  let appInsertCount = 0

  __setSupabaseClientForTests({
    storage: {
      from(bucket) {
        assert.equal(bucket, 'resumes')
        return {
          async upload(filePath) {
            if (shouldFailUpload) {
              return { error: new Error('Storage bucket upload failed') }
            }
            return { data: { path: filePath }, error: null }
          }
        }
      }
    },
    from(table) {
      assert.equal(table, 'job_applications')
      return {
        async insert(rows) {
          appInsertCount += 1
          assert.ok(rows[0].resume_path.startsWith('resumes_sdr/'))
          return { error: null }
        }
      }
    }
  })

  const fake6MBBase64 = 'data:application/pdf;base64,' + 'A'.repeat(50000)
  const fakeFile = { name: 'candidate_cv.pdf', size: 204800, type: 'application/pdf' }

  try {
    // 5a. Upload failure must reject and never insert partial application row
    await assert.rejects(
      () =>
        saveSubmission({
          type: 'job',
          jobId: 'sdr',
          role: 'Sales Development Representative',
          name: 'Alex Candidate',
          email: 'alex@example.com',
          region: 'North America',
          experience: '2-3 years (Required)',
          resumeName: 'candidate_cv.pdf',
          resumeSize: '200.0 KB',
          resumeData: fake6MBBase64,
          rawFile: fakeFile,
          coverNote: 'Full-cycle closer'
        }),
      /Storage bucket upload failed/
    )
    assert.equal(appInsertCount, 0, 'Database row must not be inserted when resume upload fails')

    // 5b. Successful upload strips Base64 & rawFile from localStorage and survives tight quota
    shouldFailUpload = false
    for (let i = 0; i < 6; i++) {
      const saved = await saveSubmission({
        type: 'job',
        jobId: 'sdr',
        role: 'Sales Development Representative',
        name: `Candidate ${i}`,
        email: `candidate${i}@example.com`,
        region: 'Europe',
        experience: '2-3 years (Required)',
        resumeName: 'candidate_cv.pdf',
        resumeSize: '200.0 KB',
        resumeData: fake6MBBase64,
        rawFile: fakeFile,
        coverNote: 'Experienced B2B SDR'
      })
      assert.ok(saved.resumePath.startsWith('resumes_sdr/'))
      assert.equal('resumeData' in saved, false, 'Saved submission must not contain resumeData')
      assert.equal('rawFile' in saved, false, 'Saved submission must not contain rawFile')
    }

    const rawStored = local.getItem(STORAGE_KEY)
    assert.ok(rawStored && rawStored.length <= 1800, 'localStorage cache must stay within quota')
    assert.equal(rawStored.includes('data:application/pdf;base64'), false, 'Base64 must never be in localStorage')
  } finally {
    __setSupabaseClientForTests(undefined)
    delete process.env.VITE_SUPABASE_URL
    delete process.env.VITE_SUPABASE_ANON_KEY
  }
})

test('6. Editing a job posting in CMS preserves compensationItems, compensationTerms, whatSuccessLooksLike, and thrivePoints', async () => {
  installGlobalStorage()
  const initialSdr = INITIAL_JOB_POSTINGS[0]

  // Simulate AdminPage handleSaveJob payload (which only sends basic modal fields)
  const adminModalPayload = {
    id: 'sdr',
    title: 'Sales Development Representative (Updated)',
    tabLabel: 'Sales Development Representative (Updated)',
    division: 'Development Division',
    status: 'active',
    badges: ['Development Division', 'Remote'],
    aboutJob: ['Updated intro paragraph.'],
    responsibilities: [{ num: '01', title: 'Outbound', desc: 'Own outbound pipeline' }],
    compensationLead: '100% commission uncapped.',
    minimumQualifications: ['2-3 years sales experience'],
    preferredQualifications: ['Agency experience']
  }

  const ok = await saveJob(adminModalPayload)
  assert.equal(ok, true)

  const jobsAfterEdit = getJobs()
  const updatedSdr = jobsAfterEdit.find((j) => j.id === 'sdr')
  assert.ok(updatedSdr)
  assert.equal(updatedSdr.title, 'Sales Development Representative (Updated)')
  assert.deepEqual(
    updatedSdr.compensationItems,
    initialSdr.compensationItems,
    'compensationItems must be preserved when editing a job via Admin CMS'
  )
  assert.equal(
    updatedSdr.compensationTerms,
    initialSdr.compensationTerms,
    'compensationTerms must be preserved when editing a job via Admin CMS'
  )
  assert.equal(
    updatedSdr.whatSuccessLooksLike,
    initialSdr.whatSuccessLooksLike,
    'whatSuccessLooksLike must be preserved when editing a job via Admin CMS'
  )
  assert.deepEqual(
    updatedSdr.thrivePoints,
    initialSdr.thrivePoints,
    'thrivePoints must be preserved when editing a job via Admin CMS'
  )
})

test('7. Status updates enforce database CHECK constraints for contact_inquiries vs job_applications', async () => {
  installGlobalStorage()

  const inquiry = await saveSubmission({
    type: 'message',
    name: 'Client Lead',
    email: 'lead@company.com',
    message: 'Hello'
  })
  const jobApp = await saveSubmission({
    type: 'job',
    jobId: 'sdr',
    name: 'Job Applicant',
    email: 'applicant@company.com',
    resumeName: 'cv.pdf'
  })

  // Valid statuses per table
  for (const status of INQUIRY_STATUSES) {
    assert.equal(isValidStatusForType('message', status), true)
  }
  for (const status of JOB_APPLICATION_STATUSES) {
    assert.equal(isValidStatusForType('job', status), true)
  }

  // Invalid cross-table statuses must be rejected
  assert.equal(
    await updateSubmissionStatus(jobApp.id, 'reviewed'),
    false,
    '"reviewed" violates job_applications_status_check and must be rejected'
  )
  assert.equal(
    await updateSubmissionStatus(jobApp.id, 'contacted'),
    false,
    '"contacted" violates job_applications_status_check and must be rejected'
  )
  assert.equal(
    await updateSubmissionStatus(jobApp.id, 'reviewing'),
    true,
    '"reviewing" is valid for job_applications'
  )
  assert.equal(
    await updateSubmissionStatus(jobApp.id, 'interviewing'),
    true,
    '"interviewing" is valid for job_applications'
  )
  assert.equal(
    await updateSubmissionStatus(inquiry.id, 'interviewing'),
    false,
    '"interviewing" violates contact_inquiries_status_check and must be rejected'
  )
  assert.equal(
    await updateSubmissionStatus(inquiry.id, 'reviewed'),
    true,
    '"reviewed" is valid for contact_inquiries'
  )
})

test('8. Homepage featured-work video preview condition and reduced-motion safeguards', () => {
  const workSectionCode = fs.readFileSync(
    path.join(repoRoot, 'src/components/WorkSection.jsx'),
    'utf8'
  )
  assert.match(
    workSectionCode,
    /function hasWorkItemVideo\(item\)\s*\{\s*return Boolean\(item && \(item\.videoWebm \|\| item\.videoMp4 \|\| item\.video\)\)/,
    'WorkSection must check videoWebm and videoMp4 in hasWorkItemVideo'
  )
  assert.doesNotMatch(
    workSectionCode,
    /if\s*\(\s*item\.video\s*&&\s*videoRef\.current\s*\)/,
    'WorkSection must not gate hover playback solely on undefined item.video'
  )

  const aboutPageCode = fs.readFileSync(path.join(repoRoot, 'src/pages/AboutPage.jsx'), 'utf8')
  assert.doesNotMatch(
    aboutPageCode,
    /setTimeout\(\(\)\s*=>\s*frame/,
    'AboutPage must not run a 400ms setTimeout polling loop under prefers-reduced-motion'
  )
  assert.doesNotMatch(
    aboutPageCode,
    /clearTimeout\(raf\)/,
    'AboutPage must not pass requestAnimationFrame IDs to clearTimeout'
  )
  assert.match(
    aboutPageCode,
    /if\s*\(\s*!still\s*\)\s*\{[\s\S]*?requestAnimationFrame\(frame\)/,
    'AboutPage must only start continuous RAF loop when reduced motion is not active'
  )

  const smoothScrollCode = fs.readFileSync(
    path.join(repoRoot, 'src/components/SmoothScroll.jsx'),
    'utf8'
  )
  assert.match(
    smoothScrollCode,
    /prefers-reduced-motion:\s*reduce/,
    'SmoothScroll must respect prefers-reduced-motion: reduce'
  )
})
