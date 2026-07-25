import { GoldCaps, Screen } from '../components/Screen'
import { PhotoFrame } from '../components/PhotoFrame'
import { color, font } from '../theme'
import type { ScreenProps } from '../navigation'

/** 1. Welcome: the sitting room, the way in to this month's door. */
export function Welcome({ go }: ScreenProps) {
  return (
    <Screen
      nav="thisMonth"
      go={go}
      bodyStyle={{ padding: '26px 30px 0', alignItems: 'center', textAlign: 'center' }}
    >
      <GoldCaps>YOUR BRIDGE TO ITALY</GoldCaps>
      <div style={{ font: `400 72px/0.9 ${font.script}`, color: color.terracotta, margin: '20px 0 0' }}>
        Il Salotto
      </div>
      <div
        style={{
          margin: '12px 0 0',
          font: `italic 400 15.5px/1.5 ${font.serif}`,
          color: color.deepGreen,
          maxWidth: 280,
        }}
      >
        The Italian sitting room, where we understand the real Italy together.
      </div>

      <PhotoFrame
        label="drop: a cozy room, books, soft afternoon light"
        width={280}
        height={280}
        radius="140px 140px 12px 12px"
        innerRadius="132px 132px 8px 8px"
        border="1px solid rgba(200,107,74,.4)"
        stripe={9}
        labelSize={10}
        labelPad={40}
        style={{ margin: '24px 0 0' }}
      />

      <div
        style={{
          margin: 'auto 0 0',
          padding: '20px 0 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <button
          type="button"
          className="btn-primary"
          style={{ padding: '15px 42px' }}
          onClick={go && (() => go('porta'))}
        >
          Enter this month&rsquo;s Porta
        </button>
        <div style={{ font: `italic 400 14px ${font.serif}`, color: color.muted }}>
          This month: Svevo&rsquo;s Trieste
        </div>
      </div>
    </Screen>
  )
}
