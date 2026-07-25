import { useState } from 'react'
import { GoldCaps, Screen } from '../components/Screen'
import { PhotoFrame } from '../components/PhotoFrame'
import { CameraIcon } from '../components/icons'
import { color, font } from '../theme'
import { useRoom, type Sample } from '../lib/room'
import type { ScreenProps } from '../navigation'

const roomSoFar: Sample[] = [
  {
    id: 'giulia',
    name: 'Giulia',
    where: 'Torino',
    text: 'I grew up two hours from Trieste and never once thought of it as strange. Reading this, I finally see it.',
    hearts: 6,
  },
  {
    id: 'sarah',
    name: 'Sarah',
    where: 'moving in May',
    text: 'Zeno’s last cigarette made me laugh out loud on the train. I have a few last cigarettes of my own.',
    hearts: 11,
  },
  {
    id: 'marta',
    name: 'Marta',
    where: 'Trieste',
    text: 'The bora wind today. Svevo would have held onto his hat.',
    hearts: 0,
    photo: 'drop: photo',
  },
]

/** Photos belong to the sample room; notes written for real are text for now. */
const samplePhotos = Object.fromEntries(roomSoFar.filter((s) => s.photo).map((s) => [s.id, s.photo!]))

/** 5. Your notes: the quiet, journal-toned heart of a path. */
export function YourNotes({ go }: ScreenProps) {
  const { entries, write, toggleHeart } = useRoom('notes', roomSoFar, 'city')
  const [draft, setDraft] = useState('')

  const leaveNote = async () => {
    await write(draft)
    setDraft('')
  }

  return (
    <Screen nav="notes" go={go} scrollable={Boolean(go)} bodyStyle={{ padding: '20px 24px 0', gap: 13 }}>
      <div style={{ textAlign: 'center' }}>
        <GoldCaps size={10} spacing={3}>
          ON THE PATH &middot; THE CITY
        </GoldCaps>
        <h1 style={{ margin: '6px 0 0', font: `500 30px/1.1 ${font.serif}`, color: color.ink }}>Your notes</h1>
        <div style={{ margin: '8px auto 0', width: 36, height: 1, background: color.gold }} />
      </div>

      <div
        style={{
          background: color.deepGreen,
          borderRadius: 18,
          padding: '20px 20px 14px',
          boxShadow: '0 4px 16px rgba(42,57,44,.2)',
          flex: 'none',
        }}
      >
        {go ? (
          <textarea
            className="note-input"
            placeholder="Write what this path stirred in you..."
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
        ) : (
          <>
            <div style={{ font: `italic 400 15px/1.5 ${font.serif}`, color: color.placeholderGreen }}>
              Write what this path stirred in you...
            </div>
            <div style={{ height: 38 }} />
          </>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(246,241,232,.15)',
            paddingTop: 12,
          }}
        >
          <button
            type="button"
            className={go ? 'btn-quiet tappable' : 'btn-quiet'}
            style={{ display: 'flex', alignItems: 'center', gap: 6, color: color.gold, font: `500 12px ${font.ui}` }}
          >
            <CameraIcon />
            add a photo
          </button>
          <button
            type="button"
            className="btn-primary"
            style={{ borderRadius: 18, padding: '8px 20px', font: `600 12px ${font.ui}` }}
            onClick={go && leaveNote}
          >
            Leave a note
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 'none' }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(38,38,38,.1)' }} />
        <div style={{ font: `italic 400 13px ${font.serif}`, color: color.muted }}>the room so far</div>
        <div style={{ flex: 1, height: 1, background: 'rgba(38,38,38,.1)' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: '1 1 auto' }}>
        {entries.map((note) => {
          const photo = samplePhotos[note.id]
          const name = note.author?.display_name ?? 'A member'
          const where = note.author?.where_from

          if (photo) {
            return (
              <div
                key={note.id}
                style={{
                  background: color.creamCard,
                  borderRadius: 16,
                  padding: '15px 18px',
                  boxShadow: '0 2px 8px rgba(38,38,38,.05)',
                  display: 'flex',
                  gap: 12,
                }}
              >
                <PhotoFrame
                  label={photo}
                  width={56}
                  height={56}
                  radius="28px 28px 4px 4px"
                  stripe={6}
                  labelSize={7.5}
                  labelPad={0}
                  style={{ flex: 'none' }}
                />
                <div>
                  <div style={{ font: `600 13px ${font.serif}`, color: color.ink }}>
                    {name}
                    {where && <span style={{ font: `400 10px ${font.ui}`, color: color.mutedWarm }}> &middot; {where}</span>}
                  </div>
                  <p style={{ margin: '6px 0 0', font: `400 12.5px/1.55 ${font.body}`, color: color.inkSoft }}>
                    {note.body}
                  </p>
                </div>
              </div>
            )
          }

          return (
            <div
              key={note.id}
              className={note.id.startsWith('local-') ? 'note-anim' : undefined}
              style={{
                background: color.creamCard,
                borderRadius: 16,
                padding: '15px 18px',
                boxShadow: '0 2px 8px rgba(38,38,38,.05)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ font: `600 13px ${font.serif}`, color: color.ink }}>
                  {name}
                  {where && <span style={{ font: `400 10px ${font.ui}`, color: color.mutedWarm }}> &middot; {where}</span>}
                </span>
                <button
                  type="button"
                  className={go ? 'btn-quiet heart' : 'btn-quiet'}
                  aria-pressed={note.hearted}
                  aria-label={`Warm ${name}'s note`}
                  onClick={go && (() => toggleHeart(note.id))}
                  style={{
                    font: `500 11px ${font.ui}`,
                    color: color.terracotta,
                    opacity: note.hearts === 0 ? 0.55 : 1,
                  }}
                >
                  &hearts; {note.hearts}
                </button>
              </div>
              <p style={{ margin: '7px 0 0', font: `400 13px/1.6 ${font.body}`, color: color.inkSoft }}>{note.body}</p>
            </div>
          )
        })}
      </div>

      <div
        style={{
          textAlign: 'center',
          font: `italic 400 12.5px ${font.serif}`,
          color: color.muted,
          paddingBottom: 6,
          flex: 'none',
        }}
      >
        No pressure here. Wander at your own depth.
      </div>
    </Screen>
  )
}
