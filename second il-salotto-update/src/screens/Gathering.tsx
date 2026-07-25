import { GoldCaps, Screen } from '../components/Screen'
import { PhotoFrame } from '../components/PhotoFrame'
import { color, font } from '../theme'
import type { ScreenId, ScreenProps } from '../navigation'

const archiveRows: { title: string; detail: string; target?: ScreenId }[] = [
  { title: 'Past gatherings', detail: 'Six conversations, recorded and kept' },
  { title: 'Past doors', detail: 'Every month stays open behind you', target: 'archive' },
]

/** 7. The Gathering: the monthly call, and the depth built behind it. */
export function Gathering({ go }: ScreenProps) {
  return (
    <Screen nav="gathering" go={go} bodyStyle={{ padding: '20px 26px 0', gap: 13 }}>
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
      </div>

      <div style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', minHeight: 0 }}>
        <PhotoFrame
          label="drop: the room, or a table laid for friends"
          photo="salotto-opening"
          width="100%"
          height="100%"
          radius="60px 60px 10px 10px"
          innerRadius="54px 54px 7px 7px"
          border="1px solid rgba(200,107,74,.3)"
          pad={6}
          labelSize={9}
          style={{ maxHeight: 132, minHeight: 74 }}
        />
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
