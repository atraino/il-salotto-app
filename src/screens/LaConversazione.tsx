import { useState } from 'react'
import { Screen } from '../components/Screen'
import { PhotoFrame } from '../components/PhotoFrame'
import { color, font } from '../theme'
import type { ScreenProps } from '../navigation'

type Post = {
  id: string
  name: string
  where: string
  text: string
  hearts: number
  replies: number
  photo?: string
  fresh?: boolean
}

const table: Post[] = [
  {
    id: 'paola',
    name: 'Paola',
    where: 'Roma',
    text: 'A question for the non-Italians: what was the first thing about Italy that surprised you, truly?',
    hearts: 14,
    replies: 23,
  },
  {
    id: 'emma',
    name: 'Emma',
    where: 'arrived in March',
    text: 'My street market this morning. The tomato man now saves me the good ones.',
    hearts: 21,
    replies: 8,
    photo: 'drop: member photo',
  },
  {
    id: 'kate',
    name: 'Kate',
    where: 'dreaming from Ohio',
    text: 'Did anyone else notice Zeno never actually quits anything? I found that strangely comforting.',
    hearts: 9,
    replies: 5,
  },
]

const prompt = 'What’s Italy stirring in you this week? A thought, a photo, a question...'

/** 6. La Conversazione: the open room, warmer and busier than the notes page. */
export function LaConversazione({ go }: ScreenProps) {
  const [posts, setPosts] = useState(table)
  const [draft, setDraft] = useState('')
  const [hearted, setHearted] = useState<Record<string, boolean>>({})

  const share = () => {
    const text = draft.trim()
    if (!text) return
    setPosts((current) => [
      { id: `you-${current.length}`, name: 'You', where: 'just now', text, hearts: 0, replies: 0, fresh: true },
      ...current,
    ])
    setDraft('')
  }

  const toggleHeart = (id: string) => setHearted((current) => ({ ...current, [id]: !current[id] }))

  return (
    <Screen
      nav="conversazione"
      go={go}
      scrollable={Boolean(go)}
      bodyStyle={{ padding: '18px 24px 0', gap: 11 }}
    >
      <div style={{ flex: 'none' }}>
        <h1 style={{ margin: 0, font: `500 30px/1.1 ${font.serif}`, color: color.ink }}>La Conversazione</h1>
        <div style={{ margin: '5px 0 0', font: `italic 400 13.5px/1.4 ${font.serif}`, color: color.olive }}>
          The table where the talk wanders.
        </div>
      </div>

      <div
        style={{
          background: color.creamCard,
          border: '1px solid rgba(200,107,74,.3)',
          borderRadius: 16,
          padding: '14px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          flex: 'none',
        }}
      >
        {go ? (
          <input
            className="share-input"
            placeholder={prompt}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
        ) : (
          <div style={{ font: `italic 400 13.5px/1.45 ${font.serif}`, color: color.muted }}>{prompt}</div>
        )}
        <button
          type="button"
          className="btn-primary"
          style={{ flex: 'none', borderRadius: 17, padding: '8px 18px', font: `600 12px ${font.ui}` }}
          onClick={go && share}
        >
          Share
        </button>
      </div>

      <div
        style={{
          background: 'rgba(201,162,74,.1)',
          border: '1px solid rgba(201,162,74,.4)',
          borderRadius: 16,
          padding: '14px 16px',
          flex: 'none',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ font: `600 13px ${font.serif}`, color: color.ink }}>
            Alexis <span style={{ font: `400 10px ${font.ui}`, color: color.goldDeep }}>&middot; your host</span>
          </span>
          <span
            style={{
              font: `600 8.5px ${font.ui}`,
              letterSpacing: 2,
              color: color.goldDeep,
              border: '1px solid rgba(201,162,74,.5)',
              borderRadius: 9,
              padding: '3px 8px',
            }}
          >
            PINNED
          </span>
        </div>
        <p style={{ margin: '7px 0 0', font: `400 12.5px/1.6 ${font.body}`, color: color.inkSoft }}>
          Welcome in. Pull up a chair, pour something warm. This is the open room of Il Salotto, where the month&rsquo;s
          reading meets your Tuesday. Nothing is too small to share.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 'none' }}>
        {posts.map((post) => {
          const hearts = post.hearts + (hearted[post.id] ? 1 : 0)
          const body = (
            <>
              <div style={{ font: `600 12.5px ${font.serif}`, color: color.ink }}>
                {post.name} <span style={{ font: `400 10px ${font.ui}`, color: color.mutedWarm }}>&middot; {post.where}</span>
              </div>
              <p
                style={{
                  margin: post.photo ? '5px 0 7px' : '6px 0 8px',
                  font: `400 12.5px/${post.photo ? '1.5' : '1.55'} ${font.body}`,
                  color: color.inkSoft,
                }}
              >
                {post.text}
              </p>
              <div style={{ display: 'flex', gap: 14, font: `500 11px ${font.ui}`, color: color.terracotta }}>
                <span className={go ? 'heart' : undefined} onClick={go && (() => toggleHeart(post.id))}>
                  &hearts; {hearts}
                </span>
                <span style={{ color: color.muted }}>{post.replies} replies</span>
              </div>
            </>
          )

          return (
            <div
              key={post.id}
              className={post.fresh ? 'note-anim' : undefined}
              style={{
                background: color.creamCard,
                borderRadius: 15,
                padding: '13px 16px',
                boxShadow: '0 2px 8px rgba(38,38,38,.05)',
                display: post.photo ? 'flex' : undefined,
                gap: post.photo ? 12 : undefined,
              }}
            >
              {post.photo ? (
                <>
                  <PhotoFrame
                    label={post.photo}
                    width={70}
                    height={70}
                    radius="12px"
                    stripe={7}
                    labelSize={7.5}
                    labelPad={6}
                    style={{ flex: 'none' }}
                  />
                  <div style={{ flex: 1 }}>{body}</div>
                </>
              ) : (
                body
              )}
            </div>
          )
        })}
      </div>
    </Screen>
  )
}
