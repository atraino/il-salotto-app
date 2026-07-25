import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase, isLive } from './supabase'

type AuthValue = {
  /** null while loading, or when nobody is signed in */
  session: Session | null
  ready: boolean
  /** true when Supabase keys are configured; false means prototype mode */
  live: boolean
  /** Sends a sign-in link. Resolves to an error message, or null on success. */
  sendLink: (email: string) => Promise<string | null>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthValue>({
  session: null,
  ready: true,
  live: false,
  sendLink: async () => null,
  signOut: async () => {},
})

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
      sendLink: async (email) => {
        if (!supabase) return null
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: `${window.location.origin}/#/prototype` },
        })
        return error ? error.message : null
      },
      signOut: async () => {
        await supabase?.auth.signOut()
      },
    }),
    [session, ready],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
