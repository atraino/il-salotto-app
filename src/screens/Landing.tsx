import { GoldCaps, Screen } from '../components/Screen'
import { PhotoFrame } from '../components/PhotoFrame'
import { color, font } from '../theme'
import type { ScreenProps } from '../navigation'

/** A. Landing hero: the public front door, the first thing a stranger sees. */
export function Landing({ go }: ScreenProps) {
  return (
    <Screen
      tone="green"
      bodyStyle={{ padding: '26px 32px 26px', alignItems: 'center', textAlign: 'center' }}
    >
      <GoldCaps>YOUR BRIDGE TO ITALY</GoldCaps>
      <div style={{ font: `400 78px/0.9 ${font.script}`, color: color.cream, margin: '18px 0 0' }}>Il Salotto</div>
      {/* Lora, not Playfair italic: this is a sentence to read, not a flourish */}
      <div
        style={{
          margin: '14px 0 0',
          font: `400 14px/1.7 ${font.body}`,
          color: color.gold,
          maxWidth: 300,
        }}
      >
        The Italian sitting room, where each month we step through one door into the real Italy, and understand it
        together.
      </div>

      {/* the photo takes whatever height is left, so nothing floats */}
      <div style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0 4px', minHeight: 0 }}>
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
          /*
           * The cap used to be 300, which left about a hundred pixels of dead
           * green between the paragraph and the arch on a full-size phone. Let
           * it take the room it is given; width runs out before height does.
           */
          style={{ aspectRatio: '272 / 296', maxHeight: 390, minHeight: 168 }}
        />
      </div>

      <div
        style={{
          paddingTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {/*
          Same metrics as Continue on the cream screens, so the button reads as
          one family throughout. The shadow is the difference: on deep green
          behind a lit photograph, a flat fill sits on top of the picture
          instead of in it.
        */}
        <button
          type="button"
          className="btn-primary"
          style={{
            padding: '13px 40px',
            font: `600 13.5px ${font.ui}`,
            boxShadow: '0 6px 18px rgba(20,28,21,.45)',
          }}
          onClick={go && (() => go('howItWorks'))}
        >
          Step inside
        </button>
        <div style={{ font: `500 12px ${font.ui}`, color: color.mutedGreen }}>
          Already a member?{' '}
          <button
            type="button"
            className="btn-quiet tappable"
            onClick={go && (() => go('login'))}
            style={{ color: color.gold, textDecoration: 'underline', font: `500 12px ${font.ui}` }}
          >
            Log in
          </button>
        </div>
      </div>
    </Screen>
  )
}
