/**
 * ══════════════════════════════════════════════════════════════
 * FLO STUDIOS — SUPABASE CLIENT INITIALIZATION & CONFIG CHECK
 * ══════════════════════════════════════════════════════════════
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env && process.env.VITE_SUPABASE_URL) ||
  'https://jemvbvzucqvetaghoyjg.supabase.co'

const supabaseAnonKey =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && process.env && process.env.VITE_SUPABASE_ANON_KEY) ||
  'sb_publishable_peQ2bFpIImyQWF0g-GQtUw_1P48vaDj'

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
