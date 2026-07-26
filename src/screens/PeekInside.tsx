import { GoldCaps, Screen } from '../components/Screen'
import { PhotoFrame } from '../components/PhotoFrame'
import { color, font } from '../theme'
import type { ScreenProps } from '../navigation'

/** D. A peek inside: the feeling of this month, before anyone has joined. */
export function PeekInside({ go }: ScreenProps) {
  return (
    <Screen tone="green" bodyStyle={{ padding: '24px 30px 26px', alignItems: 'center', textAlign: 'center' }}>
      <h1 style={{ margin: 0, font: `500 29px/1.15 ${font.serif}`, color: color.cream }}>A look inside this month</h1>
      <div style={{ margin: '9px 0 0', width: 36, height: 1, background: color.gold }} />

      <GoldCaps size={9.5} spacing={3} style={{ margin: '18px 0 0' }}>
        LA PORTA DEL MESE
      </GoldCaps>

      <div style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 0 2px', minHeight: 0 }}>
        <PhotoFrame
          tone="green"
          label="drop: Trieste, the sea"
          photo="trieste"
          width="auto"
          height="100%"
          radius="93px 93px 0 0"
          innerRadius="86px 86px 0 0"
          border="1px solid rgba(201,162,74,.55)"
          pad={7}
          labelPad={24}
          style={{ aspectRatio: '186 / 216', maxHeight: 220, minHeight: 132 }}
        />
      </div>
      <div style={{ margin: '13px 0 0', font: `500 24px/1.15 ${font.serif}`, color: color.cream }}>
        Svevo&rsquo;s Trieste
      </div>
      <div style={{ margin: '5px 0 0', font: `italic 400 13.5px ${font.serif}`, color: color.gold }}>
        The Italy that was barely Italy.
      </div>

      <div
        style={{
          margin: '18px 0 0',
          width: '100%',
          background: color.creamCard,
          borderRadius: 16,
          padding: '13px 15px',
          display: 'flex',
          gap: 13,
          alignItems: 'center',
          textAlign: 'left',
          boxShadow: '0 4px 14px rgba(0,0,0,.18)',
        }}
      >
        <PhotoFrame
          label="drop: the book"
          photo="book-cover"
          fit="contain"
          width={48}
          height={62}
          radius="24px 24px 4px 4px"
          stripe={6}
          labelSize={6.5}
          labelPad={5}
          style={{ flex: 'none' }}
        />
        <div>
          <div style={{ font: `600 9px ${font.ui}`, letterSpacing: 2.5, color: color.gold }}>THE BOOK</div>
          <div style={{ font: `italic 400 12.5px/1.4 ${font.serif}`, color: color.inkSoft, margin: '4px 0 0' }}>
            Why this novel matters, its humor and its modern soul.
          </div>
        </div>
      </div>

      <div
        style={{
          margin: '10px 0 0',
          width: '100%',
          border: '1px dashed rgba(201,162,74,.45)',
          borderRadius: 16,
          padding: 11,
          font: `italic 400 13.5px ${font.serif}`,
          color: color.placeholderGreen,
        }}
      >
        and much more inside...
      </div>

      <div
        style={{
          margin: 'auto 0 0',
          paddingTop: 14,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <div style={{ font: `italic 400 13.5px/1.6 ${font.serif}`, color: color.gold }}>
          Every past door stays, so the depth
          <br />
          grows month over month.
        </div>
        <button
          type="button"
          className="btn-primary"
          style={{ padding: '13px 40px', font: `600 13.5px ${font.ui}` }}
          onClick={go && (() => go('join'))}
        >
          Continue
        </button>
      </div>
    </Screen>
  )
}
