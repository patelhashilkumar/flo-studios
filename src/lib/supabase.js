/**
 * ══════════════════════════════════════════════════════════════
 * FLO STUDIOS — SUPABASE CLIENT INITIALIZATION & CONFIG CHECK
 * ══════════════════════════════════════════════════════════════
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * Returns true if valid Supabase environment credentials are present
 */
export function isSupabaseConfigured() {
  return (
    typeof supabaseUrl === 'string' &&
    supabaseUrl.trim().length > 0 &&
    supabaseUrl.startsWith('http') &&
    typeof supabaseAnonKey === 'string' &&
    supabaseAnonKey.trim().length > 0
  )
}

/**
 * Initialize Supabase client
 * Fallback to dummy client if unconfigured so components don't crash on boot
 */
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null
