import { useState } from 'react'
import { Screen } from '../components/Screen'
import { PhotoFrame } from '../components/PhotoFrame'
import { color, font } from '../theme'
import { useRoom, type Sample } from '../lib/room'
import type { ScreenProps } from '../navigation'

const table: Sample[] = [
  {
    id: 'paola',
    name: 'Paola',
    where: 'Roma',
    text: 'A question for the non-Italians: what was the first thing about Italy that surprised you, truly?',
    hearts: 14,
  },
  {
    id: 'emma',
    name: 'Emma',
    where: 'arrived in March',
    text: 'My street market this morning. The tomato man now saves me the good ones.',
    hearts: 21,
    photo: 'drop: member photo',
  },
  {
    id: 'kate',
    name: 'Kate',
    where: 'dreaming from Ohio',
    text: 'Did anyone else notice Zeno never actually quits anything? I found that strangely comforting.',
    hearts: 9,
  },
]

/** Replies and photos belong to the sample table until threads are built. */
const sampleReplies: Record<string, number> = { paola: 23, emma: 8, kate: 5 }
const samplePhotos: Record<string, string> = { emma: 'drop: member photo' }

const prompt = 'What’s Italy stirring in you this week? A thought, a photo, a question...'

/** 6. La Conversazione: the open room, warmer and busier than the notes page. */
export function LaConversazione({ go }: ScreenProps) {
  const { entries, loading, failed, write, toggleHeart } = useRoom('posts', table)
  const [draft, setDraft] = useState('')

  const share = async () => {
    await write(draft)
    setDraft('')
  }

  return (
    <Screen nav="conversazione" go={go} scrollable={Boolean(go)} bodyStyle={{ padding: '18px 24px 0', gap: 11 }}>
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: '1 1 auto' }}>
        {/* An empty room says so, rather than showing people who do not exist. */}
        {go && !loading && !failed && entries.length === 0 && (
          <div style={{ padding: '22px 10px', textAlign: 'center' }}>
            <div style={{ font: `italic 400 14px/1.5 ${font.serif}`, color: color.olive }}>
              The table is set, and quiet.
            </div>
            <div style={{ margin: '6px 0 0', font: `400 12.5px/1.6 ${font.body}`, color: color.muted }}>
              Say the first thing. Anything at all.
            </div>
          </div>
        )}
        {failed && (
          <div
            role="alert"
            style={{ padding: '18px 10px', textAlign: 'center', font: `400 12px/1.6 ${font.ui}`, color: color.terracotta }}
          >
            The room could not be reached just now. Your notes are safe; pull down to try again.
          </div>
        )}
        {entries.map((post) => {
          const name = post.author?.display_name ?? 'A member'
          const where = post.author?.where_from
          const photo = samplePhotos[post.id]
          const replies = sampleReplies[post.id]

          const body = (
            <>
              <div style={{ font: `600 12.5px ${font.serif}`, color: color.ink }}>
                {name}
                {where && <span style={{ font: `400 10px ${font.ui}`, color: color.mutedWarm }}> &middot; {where}</span>}
              </div>
              <p
                style={{
                  margin: photo ? '5px 0 7px' : '6px 0 8px',
                  font: `400 12.5px/${photo ? '1.5' : '1.55'} ${font.body}`,
                  color: color.inkSoft,
                }}
              >
                {post.body}
              </p>
              <div style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
                <button
                  type="button"
                  className={go ? 'btn-quiet heart' : 'btn-quiet'}
                  aria-pressed={post.hearted}
                  aria-label={`Warm ${name}'s post`}
                  onClick={go && (() => toggleHeart(post.id))}
                  style={{ font: `500 11px ${font.ui}`, color: color.terracotta }}
                >
                  &hearts; {post.hearts}
                </button>
                {replies !== undefined && (
                  <span style={{ font: `500 11px ${font.ui}`, color: color.muted }}>{replies} replies</span>
                )}
              </div>
            </>
          )

          return (
            <div
              key={post.id}
              className={post.id.startsWith('local-') ? 'note-anim' : undefined}
              style={{
                background: color.creamCard,
                borderRadius: 15,
                padding: '13px 16px',
                boxShadow: '0 2px 8px rgba(38,38,38,.05)',
                display: photo ? 'flex' : undefined,
                gap: photo ? 12 : undefined,
              }}
            >
              {photo ? (
                <>
                  <PhotoFrame
                    label={photo}
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
