import { GoldCaps, Screen } from '../components/Screen'
import { PhotoFrame } from '../components/PhotoFrame'
import { color, font } from '../theme'
import type { ScreenProps } from '../navigation'

type Door = {
  month: string
  title: string
  photo: string
  /** the month now open, shown in deep green */
  current?: boolean
}

const doors: Door[] = [
  { month: 'JULY · NOW OPEN', title: 'Svevo’s Trieste', photo: 'drop: Trieste', current: true },
  { month: 'JUNE', title: 'The Leopard’s Sicily', photo: 'drop: Sicily' },
  { month: 'MAY', title: 'Ferrante’s Naples', photo: 'drop: Naples' },
  { month: 'APRIL', title: 'Fellini’s Rimini', photo: 'drop: Rimini' },
]

/** 8. The Archive: the doors we have walked through, growing month over month. */
export function Archive({ go }: ScreenProps) {
  return (
    <Screen nav="archive" go={go} bodyStyle={{ padding: '20px 26px 0' }}>
      <GoldCaps size={10} spacing={3} style={{ textAlign: 'center' }}>
        L&rsquo;ARCHIVIO
      </GoldCaps>
      <h1
        style={{
          margin: '8px 0 0',
          textAlign: 'center',
          font: `500 27px/1.2 ${font.serif}`,
          color: color.ink,
        }}
      >
        The doors we&rsquo;ve
        <br />
        walked through
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '18px 0 0' }}>
        {doors.map((door) => (
          <div
            key={door.month}
            className={go ? 'card-tappable' : undefined}
            onClick={go && (() => go(door.current ? 'porta' : 'archive'))}
            style={{
              background: door.current ? color.deepGreen : color.creamCard,
              borderRadius: 16,
              padding: 12,
              textAlign: 'center',
              boxShadow: door.current ? '0 4px 12px rgba(42,57,44,.2)' : '0 2px 8px rgba(38,38,38,.05)',
            }}
          >
            <PhotoFrame
              tone={door.current ? 'green' : 'cream'}
              label={door.photo}
              width="100%"
              height={110}
              radius="55px 55px 4px 4px"
              stripe={7}
              labelSize={7.5}
              labelPad={12}
            />
            <div
              style={{
                font: `600 8.5px ${font.ui}`,
                letterSpacing: 2,
                color: door.current ? color.gold : color.goldDeep,
                margin: '9px 0 0',
              }}
            >
              {door.month}
            </div>
            <div
              style={{
                font: `500 14px/1.25 ${font.serif}`,
                color: door.current ? color.cream : color.ink,
                margin: '4px 0 2px',
              }}
            >
              {door.title}
            </div>
            {!door.current && (
              <div style={{ font: `500 10px ${font.ui}`, color: color.terracotta }}>revisit &rsaquo;</div>
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          margin: 'auto 0 0',
          padding: '14px 0 10px',
          textAlign: 'center',
          font: `italic 400 12.5px ${font.serif}`,
          color: color.muted,
        }}
      >
        Seven doors so far. The room keeps growing.
      </div>
    </Screen>
  )
}
