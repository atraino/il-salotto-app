import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * The live client, or null when no keys are configured. Everything that touches
 * data checks for null and falls back to the sample room, so the app still runs
 * as a prototype (and inside the single-file build, which has no backend).
 */
export const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null

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
