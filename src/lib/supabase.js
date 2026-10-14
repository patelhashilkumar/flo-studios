/**
 * ══════════════════════════════════════════════════════════════
 * FLO STUDIOS — SUPABASE CLIENT INITIALIZATION & CONFIG CHECK
 * ══════════════════════════════════════════════════════════════
 */

import { createClient } from '@supabase/supabase-js'

function readEnv(key) {
  if (typeof globalThis !== 'undefined' && globalThis.process?.env && key in globalThis.process.env) {
    return globalThis.process.env[key] || ''
  }
  if (typeof import.meta !== 'undefined' && import.meta.env && key in import.meta.env) {
    return import.meta.env[key] || ''
  }
  return ''
}

export function getSupabaseCredentials() {
  const url = (readEnv('VITE_SUPABASE_URL') || readEnv('NEXT_PUBLIC_SUPABASE_URL') || '').trim()
  const anonKey = (
    readEnv('VITE_SUPABASE_ANON_KEY') ||
    readEnv('VITE_SUPABASE_PUBLISHABLE_KEY') ||
    readEnv('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY') ||
    ''
  ).trim()
  return { url, anonKey }
}

/**
 * Returns true if valid Supabase environment credentials are present
 */
export function isSupabaseConfigured() {
  const { url, anonKey } = getSupabaseCredentials()
  return (
    typeof url === 'string' &&
    url.length > 0 &&
    url.startsWith('http') &&
    typeof anonKey === 'string' &&
    anonKey.length > 0
  )
}

const initialCreds = getSupabaseCredentials()

/**
 * Initialize Supabase client when environment variables are configured
 */
export const supabase = isSupabaseConfigured()
  ? createClient(initialCreds.url, initialCreds.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null

