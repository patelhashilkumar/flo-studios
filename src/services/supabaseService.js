/**
 * ══════════════════════════════════════════════════════════════
 * FLO STUDIOS — SUPABASE FULL-STACK SERVICE LAYER
 * Production CRUD for Inquiries, Job Applications, Resumes, & CMS
 * ══════════════════════════════════════════════════════════════
 */

import { supabase, isSupabaseConfigured } from '../lib/supabase.js'
import { INITIAL_JOB_POSTINGS } from '../data/jobPostings.js'

let clientOverride = undefined

/**
 * Test hook to inject a mock Supabase client in automated tests
 */
export function __setSupabaseClientForTests(mockClient) {
  clientOverride = mockClient
}

function getClient() {
  return clientOverride !== undefined ? clientOverride : supabase
}

function isClientReady() {
  if (clientOverride !== undefined) return Boolean(clientOverride)
  return isSupabaseConfigured() && Boolean(supabase)
}

export const STUDIO_ADMIN_EMAILS = [
  'theflostudios0@gmail.com',
  'admin@flostudios.com',
  'hashilisbest@gmail.com'
]
export const INQUIRY_STATUSES = ['new', 'reviewed', 'contacted', 'archived']
export const JOB_APPLICATION_STATUSES = [
  'new',
  'reviewing',
  'interviewing',
  'offer',
  'rejected',
  'archived'
]

export function isValidStatusForType(type, status) {
  if (typeof status !== 'string' || !status.trim()) return false
  const allowed = type === 'job' || type === 'career' ? JOB_APPLICATION_STATUSES : INQUIRY_STATUSES
  return allowed.includes(status.trim())
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function ensureUuid(candidate) {
  if (typeof candidate === 'string' && UUID_REGEX.test(candidate.trim())) {
    return candidate.trim()
  }
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const inFlightSubmissionKeys = new Set()

/* ─────────────────────────────────────────────────────────────
   1. AUTHENTICATION & AUTHORIZATION (ADMIN)
   ───────────────────────────────────────────────────────────── */

/**
 * Verifies whether an authenticated Supabase user has studio admin authorization.
 * Never trusts user_metadata (which is user-editable). Checks app_metadata or verified studio admin email.
 */
export function isAuthorizedAdminUser(user) {
  if (!user || typeof user !== 'object' || typeof user.id !== 'string' || !user.id.trim()) {
    return false
  }
  if (user.is_anonymous === true) {
    return false
  }
  const appMeta = user.app_metadata && typeof user.app_metadata === 'object' ? user.app_metadata : {}
  if (
    appMeta.role === 'admin' ||
    appMeta.role === 'studio_admin' ||
    appMeta.is_admin === true
  ) {
    return true
  }
  const email = typeof user.email === 'string' ? user.email.trim().toLowerCase() : ''
  return Boolean(email && STUDIO_ADMIN_EMAILS.includes(email))
}

async function requireAuthorizedAdmin() {
  const { session, user } = await getAdminSession()
  if (!session || !user || !isAuthorizedAdminUser(user)) {
    throw new Error('Unauthorized: Valid studio administrator session required.')
  }
  return { session, user }
}

/**
 * Sign in admin user with email & password and verify admin authorization
 */
export async function signInAdmin(email, password) {
  const client = getClient()
  if (!isClientReady() || !client) {
    return { data: null, error: new Error('Supabase is not configured') }
  }
  const cleanEmail = typeof email === 'string' ? email.trim() : ''
  const cleanPassword = typeof password === 'string' ? password.trim() : ''
  if (!cleanEmail || !cleanPassword) {
    return { data: null, error: new Error('Email and password are required') }
  }

  const result = await client.auth.signInWithPassword({
    email: cleanEmail,
    password: cleanPassword
  })

  if (result?.error) {
    return result
  }

  const user = result?.data?.session?.user || result?.data?.user || null
  if (!isAuthorizedAdminUser(user)) {
    try {
      await client.auth.signOut()
    } catch {
      // Ignore sign-out cleanup error
    }
    return {
      data: { session: null, user: null },
      error: new Error('Unauthorized: Account does not have studio administrator privileges.')
    }
  }

  return result
}

/**
 * Sign out current admin user
 */
export async function signOutAdmin() {
  const client = getClient()
  if (!isClientReady() || !client) {
    return { error: null }
  }
  return await client.auth.signOut()
}

/**
 * Get active admin session (only returns session if user is an authorized studio admin)
 */
export async function getAdminSession() {
  const client = getClient()
  if (!isClientReady() || !client) {
    return { session: null, user: null }
  }
  const { data, error } = await client.auth.getSession()
  if (error || !data?.session?.user) return { session: null, user: null }
  if (!isAuthorizedAdminUser(data.session.user)) {
    return { session: null, user: null }
  }
  return { session: data.session, user: data.session.user }
}

/**
 * Listen to auth state transitions
 */
export function onAuthChange(callback) {
  const client = getClient()
  if (!isClientReady() || !client) {
    return { data: { subscription: { unsubscribe: () => {} } } }
  }
  return client.auth.onAuthStateChange((event, session) => {
    if (typeof callback === 'function') {
      const authorizedSession =
        session && isAuthorizedAdminUser(session.user) ? session : null
      callback(event, authorizedSession)
    }
  })
}

/* ─────────────────────────────────────────────────────────────
   2. CONTACT INQUIRIES
   ───────────────────────────────────────────────────────────── */

/**
 * Public submission of contact form / inquiry (single-insert idempotent strategy)
 */
export async function createInquiry(payload = {}) {
  const client = getClient()
  if (!isClientReady() || !client) {
    throw new Error('Supabase is not configured')
  }

  const id = ensureUuid(payload.id)
  const dedupeKey = `inquiry:${id}:${(payload.email || '').trim().toLowerCase()}:${(payload.message || '').trim()}`
  if (inFlightSubmissionKeys.has(dedupeKey)) {
    throw new Error('Duplicate submission in progress')
  }

  inFlightSubmissionKeys.add(dedupeKey)
  try {
    const insertPayload = {
      id,
      name: (payload.name || 'Anonymous').trim(),
      email: (payload.email || '').trim(),
      phone: (payload.phone || '').trim(),
      service: payload.service || payload.projectType || '',
      budget: payload.budget || '',
      message: (payload.message || '').trim(),
      status: 'new',
      starred: false
    }

    // Single insert without .select() so restricted SELECT RLS never triggers a duplicate retry
    const { error } = await client.from('contact_inquiries').insert([insertPayload])
    if (error) {
      throw error
    }

    return { ok: true, id }
  } finally {
    inFlightSubmissionKeys.delete(dedupeKey)
  }
}

/**
 * Admin: Retrieve all contact inquiries
 */
export async function getInquiries() {
  const client = getClient()
  if (!isClientReady() || !client) return []

  try {
    await requireAuthorizedAdmin()
  } catch {
    return []
  }

  const { data, error } = await client
    .from('contact_inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching inquiries from Supabase:', error)
    return []
  }

  // Normalize to client model
  return (data || []).map((row) => ({
    id: row.id,
    type: 'message',
    createdAt: row.created_at,
    name: row.name,
    email: row.email,
    phone: row.phone,
    service: row.service,
    budget: row.budget,
    message: row.message,
    status: row.status,
    starred: Boolean(row.starred)
  }))
}

/**
 * Admin: Update inquiry status
 */
export async function updateInquiryStatus(id, newStatus) {
  const client = getClient()
  if (!isClientReady() || !client) return false
  if (!isValidStatusForType('message', newStatus)) {
    console.error(`Invalid inquiry status "${newStatus}". Allowed: ${INQUIRY_STATUSES.join(', ')}`)
    return false
  }

  try {
    await requireAuthorizedAdmin()
  } catch {
    return false
  }

  const { error } = await client
    .from('contact_inquiries')
    .update({ status: newStatus })
    .eq('id', id)

  if (error) {
    console.error('Error updating inquiry status:', error)
    return false
  }
  return true
}

/**
 * Admin: Toggle starred flag on inquiry
 */
export async function toggleInquiryStar(id, currentStarred) {
  const client = getClient()
  if (!isClientReady() || !client) return false

  try {
    await requireAuthorizedAdmin()
  } catch {
    return false
  }

  const { error } = await client
    .from('contact_inquiries')
    .update({ starred: !currentStarred })
    .eq('id', id)

  if (error) {
    console.error('Error toggling inquiry star:', error)
    return false
  }
  return true
}

/**
 * Admin: Delete an inquiry
 */
export async function deleteInquiry(id) {
  const client = getClient()
  if (!isClientReady() || !client) return false

  try {
    await requireAuthorizedAdmin()
  } catch {
    return false
  }

  const { error } = await client
    .from('contact_inquiries')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting inquiry:', error)
    return false
  }
  return true
}

/* ─────────────────────────────────────────────────────────────
   3. RESUME STORAGE (PRIVATE BUCKET)
   ───────────────────────────────────────────────────────────── */

/**
 * Upload resume file to private Supabase Storage bucket
 */
export async function uploadResumeFile(file, appId) {
  const client = getClient()
  if (!isClientReady() || !client || !file) return null

  const sanitizeName = (file.name || 'resume.pdf').replace(/[^a-zA-Z0-9._-]/g, '_')
  const filePath = `resumes_${appId || Date.now()}/${Date.now()}_${sanitizeName}`

  const { error: uploadError } = await client.storage
    .from('resumes')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (uploadError) {
    console.error('Supabase resume upload error:', uploadError)
    throw uploadError
  }

  return {
    path: filePath,
    name: file.name,
    size: typeof file.size === 'number' ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : ''
  }
}

/**
 * Admin: Create a secure temporary signed URL for a candidate's resume
 */
export async function getResumeSignedUrl(resumePath, expiresInSeconds = 3600) {
  const client = getClient()
  if (!isClientReady() || !client || !resumePath) return null

  try {
    await requireAuthorizedAdmin()
  } catch {
    return null
  }

  const { data, error } = await client.storage
    .from('resumes')
    .createSignedUrl(resumePath, expiresInSeconds)

  if (error) {
    console.error('Error creating signed resume URL:', error)
    return null
  }
  return data?.signedUrl || null
}

/* ─────────────────────────────────────────────────────────────
   4. JOB APPLICATIONS
   ───────────────────────────────────────────────────────────── */

function isUploadableFile(file) {
  if (!file || typeof file !== 'object') return false
  if (typeof File !== 'undefined' && file instanceof File) return true
  if (typeof Blob !== 'undefined' && file instanceof Blob) return true
  return typeof file.name === 'string' && typeof file.size === 'number'
}

/**
 * Public submission of job application with file upload (single-insert idempotent strategy)
 */
export async function createJobApplication(payload = {}, file = null) {
  const client = getClient()
  if (!isClientReady() || !client) {
    throw new Error('Supabase is not configured')
  }

  const id = ensureUuid(payload.id)
  const dedupeKey = `job:${id}:${(payload.email || '').trim().toLowerCase()}:${payload.jobId || 'sdr'}`
  if (inFlightSubmissionKeys.has(dedupeKey)) {
    throw new Error('Duplicate application submission in progress')
  }

  inFlightSubmissionKeys.add(dedupeKey)
  try {
    let resumeMeta = {
      path: payload.resumePath || '',
      name: payload.resumeName || '',
      size: payload.resumeSize || ''
    }

    // Upload file to private storage if binary file provided; propagate upload errors
    if (isUploadableFile(file)) {
      const uploaded = await uploadResumeFile(file, payload.jobId || 'app')
      if (uploaded) {
        resumeMeta = uploaded
      }
    }

    const insertPayload = {
      id,
      job_id: payload.jobId || 'sdr',
      role_title: payload.role || payload.roleTitle || 'Sales Development Representative',
      name: (payload.name || '').trim(),
      email: (payload.email || '').trim(),
      phone: (payload.phone || '').trim(),
      region: payload.region || '',
      experience: payload.experience || '',
      linkedin_url: payload.linkedinUrl || payload.portfolioUrl || '',
      notes: payload.notes || payload.coverNote || '',
      resume_path: resumeMeta.path,
      resume_name: resumeMeta.name,
      resume_size: resumeMeta.size,
      status: 'new',
      starred: false
    }

    // Single insert without .select() so restricted SELECT RLS never triggers a duplicate retry
    const { error } = await client.from('job_applications').insert([insertPayload])
    if (error) {
      throw error
    }

    return { ok: true, id, resume_path: resumeMeta.path }
  } finally {
    inFlightSubmissionKeys.delete(dedupeKey)
  }
}

/**
 * Admin: Retrieve all job applications
 */
export async function getJobApplications() {
  const client = getClient()
  if (!isClientReady() || !client) return []

  try {
    await requireAuthorizedAdmin()
  } catch {
    return []
  }

  const { data, error } = await client
    .from('job_applications')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching job applications:', error)
    return []
  }

  // Normalize to client model
  return (data || []).map((row) => ({
    id: row.id,
    type: 'job',
    createdAt: row.created_at,
    jobId: row.job_id,
    role: row.role_title,
    service: row.role_title,
    name: row.name,
    email: row.email,
    phone: row.phone,
    region: row.region,
    experience: row.experience,
    portfolioUrl: row.linkedin_url,
    linkedinUrl: row.linkedin_url,
    coverNote: row.notes,
    message: row.notes,
    resumePath: row.resume_path,
    resumeName: row.resume_name,
    resumeSize: row.resume_size,
    status: row.status,
    starred: Boolean(row.starred)
  }))
}

/**
 * Admin: Update application status
 */
export async function updateApplicationStatus(id, newStatus) {
  const client = getClient()
  if (!isClientReady() || !client) return false
  if (!isValidStatusForType('job', newStatus)) {
    console.error(
      `Invalid job application status "${newStatus}". Allowed: ${JOB_APPLICATION_STATUSES.join(', ')}`
    )
    return false
  }

  try {
    await requireAuthorizedAdmin()
  } catch {
    return false
  }

  const { error } = await client
    .from('job_applications')
    .update({ status: newStatus })
    .eq('id', id)

  if (error) {
    console.error('Error updating application status:', error)
    return false
  }
  return true
}

/**
 * Admin: Toggle application starred
 */
export async function toggleApplicationStar(id, currentStarred) {
  const client = getClient()
  if (!isClientReady() || !client) return false

  try {
    await requireAuthorizedAdmin()
  } catch {
    return false
  }

  const { error } = await client
    .from('job_applications')
    .update({ starred: !currentStarred })
    .eq('id', id)

  if (error) {
    console.error('Error toggling application star:', error)
    return false
  }
  return true
}

/**
 * Admin: Delete an application (and its resume file from storage)
 */
export async function deleteApplication(id, resumePath) {
  const client = getClient()
  if (!isClientReady() || !client) return false

  try {
    await requireAuthorizedAdmin()
  } catch {
    return false
  }

  // Delete resume from storage if it exists
  if (resumePath) {
    try {
      await client.storage.from('resumes').remove([resumePath])
    } catch (err) {
      console.warn('Failed deleting resume file from storage:', err)
    }
  }

  const { error } = await client
    .from('job_applications')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting job application:', error)
    return false
  }
  return true
}


/* ─────────────────────────────────────────────────────────────
   5. JOB POSTINGS (CMS)
   ───────────────────────────────────────────────────────────── */

/**
 * Map DB row (snake_case) to client JobPosting model (camelCase)
 */
function mapJobFromDB(row) {
  return {
    id: row.id,
    slug: row.slug,
    tabNumber: row.tab_number,
    tabLabel: row.tab_label,
    title: row.title,
    division: row.division,
    status: row.status,
    badges: Array.isArray(row.badges) ? row.badges : [],
    aboutCompany: row.about_company,
    aboutJob: Array.isArray(row.about_job) ? row.about_job : [row.about_job],
    responsibilities: Array.isArray(row.responsibilities) ? row.responsibilities : [],
    compensationLead: row.compensation_lead,
    compensationItems: Array.isArray(row.compensation_items) ? row.compensation_items : [],
    compensationTerms: row.compensation_terms,
    minimumQualifications: Array.isArray(row.minimum_qualifications) ? row.minimum_qualifications : [],
    preferredQualifications: Array.isArray(row.preferred_qualifications) ? row.preferred_qualifications : [],
    whatSuccessLooksLike: row.what_success_looks_like,
    thrivePoints: Array.isArray(row.thrive_points) ? row.thrive_points : [],
    companyMission: row.company_mission,
    equalOpportunity: row.equal_opportunity,
    legalDisclaimer: row.legal_disclaimer,
    formConfig: row.form_config || {},
    displayOrder: row.display_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

/**
 * Map client JobPosting model (camelCase) to DB row (snake_case)
 */
function mapJobToDB(job, order = 1) {
  return {
    id: job.id,
    slug:
      job.slug ||
      (job.title || 'role')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, ''),
    tab_number: job.tabNumber || '01',
    tab_label: job.tabLabel || job.title,
    title: job.title,
    division: job.division || 'Development Division',
    status: job.status || 'active',
    badges: Array.isArray(job.badges) ? job.badges : [],
    about_company: job.aboutCompany || '',
    about_job: Array.isArray(job.aboutJob) ? job.aboutJob : [job.aboutJob || ''],
    responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities : [],
    compensation_lead: job.compensationLead || '',
    compensation_items: Array.isArray(job.compensationItems) ? job.compensationItems : [],
    compensation_terms: job.compensationTerms || '',
    minimum_qualifications: Array.isArray(job.minimumQualifications) ? job.minimumQualifications : [],
    preferred_qualifications: Array.isArray(job.preferredQualifications) ? job.preferredQualifications : [],
    what_success_looks_like: job.whatSuccessLooksLike || '',
    thrive_points: Array.isArray(job.thrivePoints) ? job.thrivePoints : [],
    company_mission: job.companyMission || '',
    equal_opportunity: job.equalOpportunity || '',
    legal_disclaimer: job.legalDisclaimer || '',
    form_config: job.formConfig || {},
    display_order: order,
    updated_at: new Date().toISOString()
  }
}

/**
 * Fetch all job postings from Supabase
 */
export async function fetchJobPostings() {
  const client = getClient()
  if (!isClientReady() || !client) {
    return INITIAL_JOB_POSTINGS
  }

  const { data, error } = await client
    .from('job_postings')
    .select('*')
    .order('display_order', { ascending: true })

  if (error || !Array.isArray(data) || data.length === 0) {
    console.warn('Falling back to local job postings data:', error?.message)
    return INITIAL_JOB_POSTINGS
  }

  return (data || []).map(mapJobFromDB)
}

/**
 * Admin: Create or update a job posting in Supabase
 */
export async function upsertJobPosting(jobData) {
  const client = getClient()
  if (!isClientReady() || !client) return false

  try {
    await requireAuthorizedAdmin()
  } catch {
    return false
  }

  const id = jobData.id || `job_${Date.now()}`
  const dbPayload = mapJobToDB({ ...jobData, id })

  const { error } = await client
    .from('job_postings')
    .upsert([dbPayload], { onConflict: 'id' })

  if (error) {
    console.error('Error upserting job posting:', error)
    return false
  }
  return true
}

/**
 * Admin: Delete a job posting from Supabase
 */
export async function deleteJobPosting(id) {
  const client = getClient()
  if (!isClientReady() || !client) return false

  try {
    await requireAuthorizedAdmin()
  } catch {
    return false
  }

  const { error } = await client
    .from('job_postings')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting job posting:', error)
    return false
  }
  return true
}

/**
 * Admin: Restore default job listings in Supabase
 */
export async function resetJobPostings() {
  const client = getClient()
  if (!isClientReady() || !client) return false

  try {
    await requireAuthorizedAdmin()
  } catch {
    return false
  }

  // Delete all
  await client.from('job_postings').delete().neq('id', '___none___')

  // Re-insert initial SDR job
  const sdrDb = mapJobToDB(INITIAL_JOB_POSTINGS[0], 1)
  const { error } = await client
    .from('job_postings')
    .insert([sdrDb])

  if (error) {
    console.error('Error resetting job postings:', error)
    return false
  }
  return true
}

