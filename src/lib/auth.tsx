import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase, isLive } from './supabase'

type AuthValue = {
  /** null while loading, or when nobody is signed in */
  session: Session | null
  ready: boolean
  /** true when Supabase keys are configured; false means prototype mode */
  live: boolean
  /** Creates an account and signs in. Resolves to an error message, or null. */
  signUp: (email: string, password: string, displayName: string) => Promise<string | null>
  /** Signs an existing member in. Resolves to an error message, or null. */
  signIn: (email: string, password: string) => Promise<string | null>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthValue>({
  session: null,
  ready: true,
  live: false,
  signUp: async () => null,
  signIn: async () => null,
  signOut: async () => {},
})

/**
 * Email and password, deliberately, rather than an emailed sign-in link.
 *
 * A link has to be opened from a mail app, and on a phone that opens the site
 * in the browser rather than the copy installed on the home screen: the member
 * ends up signed in somewhere other than where they were standing, which
 * reads as "it didn't work". A password never leaves the app.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [ready, setReady] = useState(!isLive)

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setReady(true)
    })
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
    return () => data.subscription.unsubscribe()
  }, [])

  const value = useMemo<AuthValue>(
    () => ({
      session,
      ready,
      live: isLive,

      signUp: async (email, password, displayName) => {
        if (!supabase) return null
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          /*
           * The database trigger reads display_name out of here when it makes
           * the profile row. Without it every member is named after the front
           * of their email address.
           */
          options: { data: { display_name: displayName.trim() } },
        })
        if (error) return friendly(error.message)

        /*
         * No session back means the project still has "Confirm email" switched
         * on, so Supabase has posted a link instead of letting them in. Say so
         * plainly rather than leaving them staring at an unchanged screen.
         */
        if (!data.session) {
          return 'Your account was made, but this project still asks for email confirmation. Check your email for a confirmation link, or turn off “Confirm email” in Supabase.'
        }
        return null
      },

      signIn: async (email, password) => {
        if (!supabase) return null
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
        return error ? friendly(error.message) : null
      },

      signOut: async () => {
        await supabase?.auth.signOut()
      },
    }),
    [session, ready],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/** Supabase's wording is accurate and cold. This is the same news, said kindly. */
function friendly(message: string) {
  const text = message.toLowerCase()
  if (text.includes('invalid login credentials')) {
    return 'That email and password do not match. Try again, or create an account.'
  }
  if (text.includes('already registered') || text.includes('already been registered')) {
    return 'There is already an account with that email. Log in instead.'
  }
  if (text.includes('password should be at least')) {
    return 'Passwords need at least six characters.'
  }
  if (text.includes('unable to validate email') || text.includes('invalid email')) {
    return 'That email address does not look right.'
  }
  return message
}

export function useAuth() {
  return useContext(AuthContext)
}
