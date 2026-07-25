import type { CSSProperties } from 'react'
import { GoldCaps, Screen } from '../components/Screen'
import { PhotoFrame, type Tone } from '../components/PhotoFrame'
import { color, font } from '../theme'
import type { ScreenId, ScreenProps } from '../navigation'

type Path = {
  caps: string
  line: string
  photo: string
  /** basename of the real photo in public/photos, when there is one */
  file?: string
  fit?: 'cover' | 'contain'
  tone: Tone
  /** how many of the three dots are filled, so far */
  explored: number
  /** where the card leads */
  target: ScreenId
  /** paths still waiting on their readings say so, rather than looking broken */
  coming?: boolean
}

const paths: Path[] = [
  {
    caps: 'THE BOOK',
    line: 'Why this novel matters, its humor and its modern soul.',
    photo: 'drop: the book on a desk',
    file: 'book-cover',
    fit: 'contain' as const,
    tone: 'cream',
    explored: 0,
    target: 'pathBook',
    coming: true,
  },
  {
    caps: 'THE CITY',
    line: 'Trieste, a place that was Austrian, Slovenian, Jewish, and Italian at once.',
    photo: 'drop: Trieste and the sea',
    file: 'trieste',
    tone: 'green',
    explored: 1,
    target: 'path',
  },
  {
    caps: 'THE INNER THREAD',
    line: 'The stories we tell ourselves, and who we become.',
    photo: 'drop: a window, a chair, soft light',
    tone: 'cream',
    explored: 0,
    target: 'pathSoul',
    coming: true,
  },
]

function ProgressDots({ explored, tone }: { explored: number; tone: Tone }) {
  const ink = tone === 'green' ? color.gold : color.olive
  return (
    <span style={{ display: 'flex', gap: 4 }}>
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            background: index < explored ? ink : 'transparent',
            border: index < explored ? undefined : `1px solid ${ink}`,
          }}
        />
      ))}
    </span>
  )
}

function PathCard({ path, onOpen }: { path: Path; onOpen?: () => void }) {
  const green = path.tone === 'green'
  const cardStyle: CSSProperties = green
    ? { background: color.deepGreen, boxShadow: '0 4px 14px rgba(42,57,44,.2)' }
    : { background: color.creamCard, boxShadow: '0 2px 10px rgba(38,38,38,.05)' }

  return (
    <div
      className={onOpen ? 'card-tappable' : undefined}
      onClick={onOpen}
      style={{ borderRadius: 18, padding: 14, display: 'flex', gap: 14, alignItems: 'center', ...cardStyle }}
    >
      <PhotoFrame
        tone={path.tone}
        label={path.photo}
        photo={path.file}
        fit={path.fit}
        width={78}
        height={100}
        radius="39px 39px 6px 6px"
        stripe={7}
        labelSize={7.5}
        labelPad={8}
        style={{ flex: 'none' }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ font: `600 9.5px ${font.ui}`, letterSpacing: 2.5, color: color.gold }}>{path.caps}</div>
        <div
          style={{
            font: `italic 400 13.5px/1.45 ${font.serif}`,
            color: green ? color.cream : color.inkSoft,
            margin: '5px 0 0',
          }}
        >
          {path.line}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '9px 0 0' }}>
          {path.coming ? (
            <span style={{ font: `600 11.5px ${font.ui}`, color: color.goldDeep }}>Opens soon &rsaquo;</span>
          ) : (
            <span style={{ font: `600 11.5px ${font.ui}`, color: green ? color.terracottaLight : color.terracotta }}>
              Wander this path &rsaquo;
            </span>
          )}
          <ProgressDots explored={path.explored} tone={path.tone} />
        </div>
      </div>
    </div>
  )
}

/** 3. I Sentieri: the three paths that open from this month's door. */
export function ISentieri({ go }: ScreenProps) {
  return (
    <Screen nav="paths" go={go} bodyStyle={{ padding: '20px 26px 0' }}>
      <GoldCaps style={{ textAlign: 'center' }}>I SENTIERI</GoldCaps>
      <h1
        style={{
          margin: '8px 0 0',
          textAlign: 'center',
          font: `500 26px/1.2 ${font.serif}`,
          color: color.ink,
        }}
      >
        Three paths open. Wander
        <br />
        the ones that pull you.
      </h1>

      {/* the three cards share the slack evenly instead of leaving a hole below */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          margin: '16px 0 0',
          flex: '1 1 auto',
          justifyContent: 'space-evenly',
          minHeight: 0,
        }}
      >
        {paths.map((path) => (
          <PathCard key={path.caps} path={path} onOpen={go && (() => go(path.target))} />
        ))}
      </div>

      <div
        style={{
          padding: '10px 0 10px',
          textAlign: 'center',
          font: `italic 400 12.5px ${font.serif}`,
          color: color.muted,
        }}
      >
        Everything is open from day one. No falling behind.
      </div>
    </Screen>
  )
}
