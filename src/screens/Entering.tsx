import { GoldCaps, Screen } from '../components/Screen'
import { PhotoFrame } from '../components/PhotoFrame'
import { color, font } from '../theme'
import type { ScreenProps } from '../navigation'

/**
 * The moment just after signing in: you are in, before anything asks anything
 * of you. One breath, then the room.
 */
export function Entering({ go }: ScreenProps) {
  return (
    <Screen
      tone="green"
      bodyStyle={{ padding: '28px 32px 26px', alignItems: 'center', textAlign: 'center' }}
    >
      <GoldCaps size={9.5} spacing={3}>
        YOU&rsquo;RE IN
      </GoldCaps>
      <div style={{ font: `400 66px/0.9 ${font.script}`, color: color.cream, margin: '12px 0 0' }}>benvenuta</div>
      <div
        style={{
          margin: '12px 0 0',
          font: `italic 400 15px/1.55 ${font.serif}`,
          color: color.gold,
          maxWidth: 280,
        }}
      >
        The door is open behind you. Come in, take your coat off, stay as long as you like.
      </div>

      <div
        style={{
          flex: '1 1 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '18px 0 4px',
          minHeight: 0,
        }}
      >
        <PhotoFrame
          tone="green"
          label="drop: a cozy room, books, soft light"
          photo="salotto-opening"
          width="auto"
          height="100%"
          radius="136px 136px 10px 10px"
          innerRadius="128px 128px 6px 6px"
          border="1px solid rgba(201,162,74,.55)"
          labelSize={10}
          labelPad={40}
          style={{ aspectRatio: '272 / 300', maxHeight: 306, minHeight: 168 }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 11, paddingTop: 4 }}>
        <button type="button" className="btn-primary" onClick={go && (() => go('home'))}>
          Step into the room
        </button>
        <div style={{ font: `italic 400 12.5px ${font.serif}`, color: color.mutedGreen }}>
          Nothing to catch up on. Everything is open.
        </div>
      </div>
    </Screen>
  )
}
