import { GoldCaps, Screen } from '../components/Screen'
import { color, font } from '../theme'
import type { ScreenId, ScreenProps } from '../navigation'

const archiveRows: { title: string; detail: string; target?: ScreenId }[] = [
  // Never "recorded and kept": the calls are not recorded at all. See below.
  { title: 'Past gatherings', detail: 'Six conversations, each one only in the room' },
  { title: 'Past doors', detail: 'Every month stays open behind you', target: 'archive' },
]

/** 7. The Gathering: the monthly call, and the depth built behind it. */
export function Gathering({ go }: ScreenProps) {
  return (
    <Screen
      nav="gathering"
      go={go}
      scrollable={Boolean(go)}
      bodyStyle={{
        padding: '20px 26px 0',
        gap: 13,
        /* the hills behind the whole gathering, in place of the framed photo
           that used to sit in the middle of it */
        background:
          'linear-gradient(rgba(244,236,220,.9), rgba(244,236,220,.94)), url(/photos/tuscan-hills.jpg) center/cover no-repeat',
      }}
    >
      <div style={{ textAlign: 'center', flex: 'none' }}>
        <GoldCaps size={10} spacing={3}>
          L&rsquo;INCONTRO
        </GoldCaps>
        <h1 style={{ margin: '6px 0 0', font: `500 28px/1.15 ${font.serif}`, color: color.ink }}>
          We gather once a month
        </h1>
      </div>

      <div
        style={{
          background: color.deepGreen,
          borderRadius: 20,
          padding: '22px 22px 20px',
          boxShadow: '0 6px 20px rgba(42,57,44,.22)',
          textAlign: 'center',
          flex: 'none',
        }}
      >
        <GoldCaps size={9.5} spacing={3}>
          THIS MONTH&rsquo;S CONVERSATION
        </GoldCaps>
        <div style={{ margin: '12px 0 0', font: `500 24px/1.2 ${font.serif}`, color: color.cream }}>
          Svevo&rsquo;s Trieste,
          <br />
          around the table
        </div>
        <div style={{ margin: '12px 0 0', font: `500 13px ${font.ui}`, color: color.creamGreenBody }}>
          Sunday, July 26 &middot; 6:00 pm CET &middot; on Zoom
        </div>
        <button
          type="button"
          className="btn-primary"
          style={{ margin: '16px auto 0', borderRadius: 24, padding: '13px 34px', font: `600 13.5px ${font.ui}` }}
        >
          Join the conversation
        </button>
        <div style={{ margin: '12px 0 0', font: `italic 400 12.5px/1.5 ${font.serif}`, color: color.mutedGreen }}>
          Everyone brings their own read.
          <br />
          Italians welcome too.
        </div>

        {/*
          A standing promise, not a footnote: people speak differently when
          they know it is being kept. Stated wherever the call is offered.
        */}
        <div
          style={{
            margin: '14px 0 0',
            paddingTop: 12,
            borderTop: '1px solid rgba(201,162,74,.28)',
            font: `600 9.5px ${font.ui}`,
            letterSpacing: 2,
            color: color.gold,
          }}
        >
          NEVER RECORDED
        </div>
        <div style={{ margin: '6px 0 0', font: `400 11.5px/1.6 ${font.body}`, color: color.creamGreenBody }}>
          Our live conversations are never recorded. What is said in the room stays in the room.
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 'none' }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(38,38,38,.1)' }} />
        <div style={{ font: `italic 400 13px ${font.serif}`, color: color.muted }}>the depth so far</div>
        <div style={{ flex: 1, height: 1, background: 'rgba(38,38,38,.1)' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: '0 1 auto' }}>
        {archiveRows.map((row) => (
          <div
            key={row.title}
            className={go ? 'card-tappable' : undefined}
            onClick={go && row.target ? () => go(row.target as ScreenId) : undefined}
            style={{
              background: color.creamCard,
              borderRadius: 14,
              padding: '13px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 2px 8px rgba(38,38,38,.04)',
            }}
          >
            <div>
              <div style={{ font: `600 12.5px ${font.ui}`, color: color.ink }}>{row.title}</div>
              <div style={{ font: `400 11px ${font.ui}`, color: color.muted, marginTop: 2 }}>{row.detail}</div>
            </div>
            <span style={{ color: color.terracotta, font: `600 14px ${font.ui}` }}>&rsaquo;</span>
          </div>
        ))}
      </div>

      <div
        style={{
          paddingBottom: 12,
          textAlign: 'center',
          font: `italic 400 12.5px ${font.serif}`,
          color: color.muted,
          flex: 'none',
        }}
      >
        Come as deep as your life allows this month.
      </div>
    </Screen>
  )
}
