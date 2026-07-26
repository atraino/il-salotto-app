import { GoldCaps, Screen } from '../components/Screen'
import { PhotoFrame } from '../components/PhotoFrame'
import { color, font } from '../theme'
import type { ScreenProps } from '../navigation'

export type ComingPath = {
  /** the Italian name, as it reads on How it works */
  italian: string
  /** the same name as a heading. Italian only: the paths are not translated */
  title: string
  line: string
  photo: string
}

export const comingPaths = {
  book: {
    italian: 'UN SENTIERO',
    title: 'Il Libro',
    line: 'The novel itself, its humor and its modern soul.',
    photo: 'drop: the book on a desk',
  },
  soul: {
    italian: 'UN SENTIERO',
    title: 'L’Anima',
    line: 'What it stirs in you, the stories we tell ourselves.',
    photo: 'drop: a window, a chair, soft light',
  },
} satisfies Record<string, ComingPath>

/**
 * A path whose resources are still being gathered. Deliberately a waiting room,
 * not a dead end: it says so warmly and points at the path that is open.
 */
export function PathComing({ path, go }: ScreenProps & { path: ComingPath }) {
  return (
    <Screen nav="paths" go={go} bodyStyle={{ padding: '18px 26px 0' }}>
      <button
        type="button"
        className="btn-quiet tappable"
        onClick={go && (() => go('sentieri'))}
        style={{ display: 'flex', alignItems: 'center', gap: 6, font: `500 11px ${font.ui}`, color: color.muted }}
      >
        <span>&lsaquo;</span>
        <span>I Sentieri</span>
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1 }}>
        <GoldCaps size={10} spacing={3} style={{ margin: '18px 0 0' }}>
          {path.italian}
        </GoldCaps>
        <h1 style={{ margin: '6px 0 0', font: `500 30px/1.1 ${font.serif}`, color: color.ink }}>{path.title}</h1>
        <div
          style={{
            margin: '8px 0 0',
            font: `italic 400 14px/1.5 ${font.serif}`,
            color: color.olive,
            maxWidth: 290,
          }}
        >
          {path.line}
        </div>

        <PhotoFrame
          label={path.photo}
          width={190}
          height={244}
          radius="95px 95px 6px 6px"
          innerRadius="88px 88px 4px 4px"
          border="1px solid rgba(200,107,74,.4)"
          pad={7}
          labelPad={18}
          style={{ margin: '24px 0 0' }}
        />

        <div
          style={{
            margin: '22px 0 0',
            width: '100%',
            border: '1px dashed rgba(201,162,74,.45)',
            borderRadius: 16,
            padding: '16px 18px',
          }}
        >
          <GoldCaps size={9} spacing={2.5}>
            IN PREPARAZIONE
          </GoldCaps>
          <div style={{ margin: '8px 0 0', font: `italic 400 15px/1.45 ${font.serif}`, color: color.ink }}>
            This path opens soon.
          </div>
          <p style={{ margin: '7px 0 0', font: `400 12.5px/1.6 ${font.body}`, color: color.inkSoft }}>
            Alexis is still gathering the readings, the film, and the photographs for this one. It will open inside this
            month&rsquo;s door, with nothing to catch up on.
          </p>
        </div>

        <div
          style={{
            margin: 'auto 0 0',
            padding: '16px 0 14px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div style={{ font: `italic 400 13px ${font.serif}`, color: color.muted }}>
            Il Luogo is open and waiting in the meantime.
          </div>
          <button
            type="button"
            className="btn-primary"
            style={{ padding: '13px 36px', font: `600 13.5px ${font.ui}` }}
            onClick={go && (() => go('path'))}
          >
            Wander Il Luogo
          </button>
        </div>
      </div>
    </Screen>
  )
}
