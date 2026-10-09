/**
 * ══════════════════════════════════════════════════════════════
 * FLO STUDIOS — SUPABASE FULL-STACK SERVICE LAYER
 * Production CRUD for Inquiries, Job Applications, Resumes, & CMS
 * ══════════════════════════════════════════════════════════════
 */

import { supabase, isSupabaseConfigured } from '../lib/supabase.js'
import { INITIAL_JOB_POSTINGS } from '../data/jobPostings.js'

/* ─────────────────────────────────────────────────────────────
   1. AUTHENTICATION (ADMIN)
   ───────────────────────────────────────────────────────────── */

/**
 * Sign in admin user with email & password
 */
export async function signInAdmin(email, password) {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: null, error: new Error('Supabase is not configured') }
  }
  return await supabase.auth.signInWithPassword({
    email: email.trim(),
    password: password.trim()
  })
}

/**
 * Sign out current admin user
 */
export async function signOutAdmin() {
  if (!isSupabaseConfigured() || !supabase) {
    return { error: null }
  }
  return await supabase.auth.signOut()
}

/**
 * Get active admin session
 */
export async function getAdminSession() {
  if (!isSupabaseConfigured() || !supabase) {
    return { session: null, user: null }
  }
  const { data, error } = await supabase.auth.getSession()
  if (error || !data) return { session: null, user: null }
  return { session: data.session, user: data.session?.user || null }
}

/**
 * Listen to auth state transitions
 */
export function onAuthChange(callback) {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: { subscription: { unsubscribe: () => {} } } }
  }
  return supabase.auth.onAuthStateChange((event, session) => {
    if (typeof callback === 'function') {
      callback(event, session)
    }
  })
}

/* ─────────────────────────────────────────────────────────────
   2. CONTACT INQUIRIES
   ───────────────────────────────────────────────────────────── */

/**
 * Public submission of contact form / inquiry
 */
export async function createInquiry(payload = {}) {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase is not configured')
  }

  const { error } = await supabase
    .from('contact_inquiries')
    .insert([
      {
        name: payload.name || 'Anonymous',
        email: payload.email || '',
        phone: payload.phone || '',
        service: payload.service || payload.projectType || '',
        budget: payload.budget || '',
        message: payload.message || '',
        status: 'new',
        starred: false
      }
    ])

  if (error) throw error
  return { ok: true }
}

/**
 * Admin: Retrieve all contact inquiries
 */
export async function getInquiries() {
  if (!isSupabaseConfigured() || !supabase) return []

  const { data, error } = await supabase
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
  if (!isSupabaseConfigured() || !supabase) return false

  const { error } = await supabase
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
  if (!isSupabaseConfigured() || !supabase) return false

  const { error } = await supabase
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
  if (!isSupabaseConfigured() || !supabase) return false

  const { error } = await supabase
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
  if (!isSupabaseConfigured() || !supabase || !file) return null

  const sanitizeName = (file.name || 'resume.pdf')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
  const filePath = `resumes_${appId || Date.now()}/${Date.now()}_${sanitizeName}`

  const { error: uploadError } = await supabase.storage
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
    size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
  }
}

/**
 * Admin: Create a secure temporary signed URL for a candidate's resume
 */
export async function getResumeSignedUrl(resumePath, expiresInSeconds = 3600) {
  if (!isSupabaseConfigured() || !supabase || !resumePath) return null

  const { data, error } = await supabase.storage
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

/**
 * Public submission of job application with optional file upload
 */
export async function createJobApplication(payload = {}, file = null) {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase is not configured')
  }

  let resumeMeta = {
    path: payload.resumePath || '',
    name: payload.resumeName || '',
    size: payload.resumeSize || ''
  }

  // Upload file to private storage if binary file provided
  if (file instanceof File || file instanceof Blob) {
    try {
      const uploaded = await uploadResumeFile(file, payload.jobId || 'app')
      if (uploaded) {
        resumeMeta = uploaded
      }
    } catch (err) {
      console.warn('File upload failed, proceeding with application metadata:', err)
    }
  }

  const { error } = await supabase
    .from('job_applications')
    .insert([
      {
        job_id: payload.jobId || 'sdr',
        role_title: payload.role || payload.roleTitle || 'Sales Development Representative',
        name: payload.name || '',
        email: payload.email || '',
        phone: payload.phone || '',
        region: payload.region || '',
        experience: payload.experience || '',
        linkedin_url: payload.linkedinUrl || '',
        notes: payload.notes || payload.coverNote || '',
        resume_path: resumeMeta.path,
        resume_name: resumeMeta.name,
        resume_size: resumeMeta.size,
        status: 'new',
        starred: false
      }
    ])

  if (error) throw error
  return { ok: true, resume_path: resumeMeta.path }
}

/**
 * Admin: Retrieve all job applications
 */
export async function getJobApplications() {
  if (!isSupabaseConfigured() || !supabase) return []

  const { data, error } = await supabase
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
  if (!isSupabaseConfigured() || !supabase) return false

  const { error } = await supabase
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
  if (!isSupabaseConfigured() || !supabase) return false

  const { error } = await supabase
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
  if (!isSupabaseConfigured() || !supabase) return false

  // Delete resume from storage if it exists
  if (resumePath) {
    try {
      await supabase.storage.from('resumes').remove([resumePath])
    } catch (err) {
      console.warn('Failed deleting resume file from storage:', err)
    }
  }

  const { error } = await supabase
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
  if (!isSupabaseConfigured() || !supabase) {
    return INITIAL_JOB_POSTINGS
  }

  const { data, error } = await supabase
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
  if (!isSupabaseConfigured() || !supabase) return false

  const id = jobData.id || `job_${Date.now()}`
  const dbPayload = mapJobToDB({ ...jobData, id })

  const { error } = await supabase
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
  if (!isSupabaseConfigured() || !supabase) return false

  const { error } = await supabase
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
  if (!isSupabaseConfigured() || !supabase) return false

  // Delete all
  await supabase.from('job_postings').delete().neq('id', '___none___')

  // Re-insert initial SDR job
  const sdrDb = mapJobToDB(INITIAL_JOB_POSTINGS[0], 1)
  const { error } = await supabase
    .from('job_postings')
    .insert([sdrDb])

  if (error) {
    console.error('Error resetting job postings:', error)
    return false
  }
  return true
}
