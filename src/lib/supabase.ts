import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * The live client, or null when no keys are configured. Everything that touches
 * data checks for null and falls back to the sample room, so the app still runs
 * as a prototype (and inside the single-file build, which has no backend).
 */
export const supabase: SupabaseClient | null = url && key
  ? createClient(url, key, {
      auth: {
        // Keep the session in localStorage so the room stays open on this device.
        persistSession: true,
        autoRefreshToken: true,
        // Read the tokens Supabase puts on the end of the sign-in link and then
        // tidy them out of the address bar.
        detectSessionInUrl: true,
        /*
         * Implicit, not PKCE, and deliberately. PKCE stores a verifier in the
         * browser that asked for the link, so opening the email on a different
         * device than you requested it from fails. Members will request on a
         * laptop and tap the link on a phone; implicit survives that.
         */
        flowType: 'implicit',
      },
    })
  : null

export const isLive = supabase !== null

export type Member = {
  id: string
  display_name: string
  where_from: string | null
}

export type Entry = {
  id: string
  body: string
  created_at: string
  author: Member | null
  hearts: number
  hearted: boolean
}
