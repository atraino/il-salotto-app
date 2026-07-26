import { Screen } from '../components/Screen'
import { PhotoFrame } from '../components/PhotoFrame'
import { color, font } from '../theme'
import type { ScreenProps } from '../navigation'

const included = [
  'One new door into Italy, every month',
  'Three paths to wander at your own depth',
  'The room of notes and La Conversazione',
  'A live gathering around the table, monthly, never recorded',
  'Every past door, open behind you',
]

/** E. Join: the invitation to come in, warm rather than a paywall. */
export function Join({ go }: ScreenProps) {
  return (
    <Screen bodyStyle={{ padding: '24px 30px 26px', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ font: `400 42px/1 ${font.script}`, color: color.terracotta }}>benvenuta</div>
      <h1 style={{ margin: '6px 0 0', font: `500 29px/1.2 ${font.serif}`, color: color.ink }}>
        Come in and stay a while
      </h1>

      <div
        style={{
          margin: '20px 0 0',
          width: '100%',
          /* deep green, so the one thing being asked of you does not blend
             into the page it is sitting on */
          background: color.deepGreen,
          border: '1px solid rgba(201,162,74,.45)',
          borderRadius: 20,
          padding: '24px 24px 22px',
          boxShadow: '0 6px 20px rgba(42,57,44,.22)',
        }}
      >
        <div style={{ font: `600 9.5px ${font.ui}`, letterSpacing: 3, color: color.gold }}>MEMBERSHIP</div>
        <div style={{ margin: '12px 0 0', font: `500 44px/1 ${font.serif}`, color: color.cream }}>
          $8<span style={{ font: `italic 400 16px ${font.serif}`, color: color.mutedGreen }}> a month</span>
        </div>
        <div style={{ margin: '16px 0 0', display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left' }}>
          {included.map((line) => (
            <div key={line} style={{ display: 'flex', gap: 9, alignItems: 'baseline' }}>
              <span style={{ color: color.gold }}>&#10038;</span>
              <span style={{ font: `400 12.5px/1.55 ${font.body}`, color: color.creamGreenBody }}>{line}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          margin: '18px 0 0',
          font: `italic 400 14.5px/1.6 ${font.serif}`,
          color: color.olive,
          maxWidth: 290,
        }}
      >
        &ldquo;It feels like being let into someone&rsquo;s home in Italy, not joining a course.&rdquo;
      </div>
      <div style={{ margin: '5px 0 0', font: `600 9px ${font.ui}`, letterSpacing: 2.5, color: color.mutedWarm }}>
        SARAH &middot; MEMBER SINCE MARCH
      </div>

      <div style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', width: '100%', minHeight: 0, padding: '14px 0 2px' }}>
      <PhotoFrame
        label="drop: a table set for friends"
        width="100%"
        height="100%"
        radius="48px 48px 8px 8px"
        innerRadius="42px 42px 5px 5px"
        border="1px solid rgba(200,107,74,.35)"
        pad={6}
        style={{ maxHeight: 104, minHeight: 62 }}
      />
      </div>

      <div
        style={{
          paddingTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 11,
        }}
      >
        <button
          type="button"
          className="btn-primary"
          style={{ padding: '15px 46px' }}
          onClick={go && (() => go('login'))}
        >
          Join Il Salotto
        </button>
        <div style={{ font: `italic 400 12.5px ${font.serif}`, color: color.muted }}>
          Cancel anytime. Everything opens the moment you&rsquo;re in.
        </div>
      </div>
    </Screen>
  )
}
