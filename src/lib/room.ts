import { useCallback, useEffect, useState } from 'react'
import { supabase, type Entry, type Member } from './supabase'
import { useAuth } from './auth'

type Table = 'notes' | 'posts'
type Kind = 'note' | 'post'

/** The sample room, shown when no database is configured. */
export type Sample = {
  id: string
  name: string
  where: string
  text: string
  hearts: number
  photo?: string
}

function fromSample(sample: Sample): Entry {
  return {
    id: sample.id,
    body: sample.text,
    created_at: '',
    author: { id: sample.id, display_name: sample.name, where_from: sample.where },
    hearts: sample.hearts,
    hearted: false,
  }
}

type Row = {
  id: string
  body: string
  created_at: string
  author: Member | Member[] | null
}

/**
 * Reads a table of entries with their authors and heart counts, and writes new
 * ones. Falls back to the sample room when Supabase is not configured, so the
 * screens look and behave the same either way.
 */
export function useRoom(table: Table, samples: Sample[], path?: string) {
  const { session, live } = useAuth()
  /*
   * With a database behind it the room shows real members and nobody else.
   *
   * It used to open with the samples and then swap in whatever the database
   * returned, which meant an empty table wiped them: notes appeared for a
   * moment and vanished, which is what it looked like from the outside too.
   * Now the samples belong to prototype mode only, where there is no database
   * to contradict them, and a live room that is empty says so honestly.
   */
  const [entries, setEntries] = useState<Entry[]>(() => (live ? [] : samples.map(fromSample)))
  const [loading, setLoading] = useState(live)
  const [failed, setFailed] = useState<string | null>(null)
  const kind: Kind = table === 'notes' ? 'note' : 'post'
  const me = session?.user.id

  const load = useCallback(async () => {
    if (!supabase || !session) return
    let query = supabase
      .from(table)
      .select('id, body, created_at, author:profiles(id, display_name, where_from)')
      .order('created_at', { ascending: false })
      .limit(50)
    if (path) query = query.eq('path', path)

    const [rows, hearts] = await Promise.all([
      query,
      supabase.from('hearts').select('target_id, member').eq('target_kind', kind),
    ])

    if (rows.error) {
      // Silence here is what made this look like data loss rather than a fault.
      setFailed(rows.error.message)
      setLoading(false)
      return
    }
    setFailed(null)

    const counts = new Map<string, number>()
    const mine = new Set<string>()
    for (const heart of hearts.data ?? []) {
      counts.set(heart.target_id, (counts.get(heart.target_id) ?? 0) + 1)
      if (heart.member === me) mine.add(heart.target_id)
    }

    setEntries(
      (rows.data as Row[]).map((row) => ({
        id: row.id,
        body: row.body,
        created_at: row.created_at,
        author: Array.isArray(row.author) ? (row.author[0] ?? null) : row.author,
        hearts: counts.get(row.id) ?? 0,
        hearted: mine.has(row.id),
      })),
    )
    setLoading(false)
  }, [table, path, kind, session, me])

  useEffect(() => {
    if (!live) return
    // Signed out in a live room: nothing to read, and nothing to wait for.
    if (!session) {
      setEntries([])
      setLoading(false)
      return
    }
    void load()
  }, [live, session, load])

  const write = useCallback(
    async (body: string) => {
      const text = body.trim()
      if (!text) return

      if (!supabase || !session) {
        // prototype mode: keep it in the page so the interaction still reads
        setEntries((current) => [
          {
            id: `local-${current.length}`,
            body: text,
            created_at: new Date().toISOString(),
            author: { id: 'you', display_name: 'You', where_from: 'just now' },
            hearts: 0,
            hearted: false,
          },
          ...current,
        ])
        return
      }

      const row: Record<string, string> = { author: session.user.id, body: text }
      if (path) row.path = path
      const { error } = await supabase.from(table).insert(row)
      if (error) {
        setFailed(error.message)
        return
      }
      setFailed(null)
      await load()
    },
    [table, path, session, load],
  )

  /**
   * Take back something you wrote. Row level security already allows a member
   * to delete their own rows and nobody else's, so the check below is about
   * not offering a button that would fail, not about safety.
   */
  const remove = useCallback(
    async (id: string) => {
      if (!supabase || !session) {
        setEntries((current) => current.filter((entry) => entry.id !== id))
        return
      }
      const { error } = await supabase.from(table).delete().eq('id', id)
      if (error) {
        setFailed(error.message)
        return
      }
      setFailed(null)
      setEntries((current) => current.filter((entry) => entry.id !== id))
    },
    [table, session],
  )

  const toggleHeart = useCallback(
    async (id: string) => {
      // optimistic either way: the room should feel immediate
      setEntries((current) =>
        current.map((entry) =>
          entry.id === id
            ? { ...entry, hearted: !entry.hearted, hearts: entry.hearts + (entry.hearted ? -1 : 1) }
            : entry,
        ),
      )
      if (!supabase || !session) return

      const entry = entries.find((candidate) => candidate.id === id)
      if (entry?.hearted) {
        await supabase
          .from('hearts')
          .delete()
          .match({ member: session.user.id, target_kind: kind, target_id: id })
      } else {
        await supabase.from('hearts').insert({ member: session.user.id, target_kind: kind, target_id: id })
      }
    },
    [entries, kind, session],
  )

  return { entries, loading, failed, me, write, remove, toggleHeart }
}
