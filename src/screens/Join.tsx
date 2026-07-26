import { BackLink, Screen } from '../components/Screen'
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
    <Screen
      tone="green"
      bodyStyle={{
        padding: '14px 26px 18px',
        alignItems: 'center',
        textAlign: 'center',
        /*
         * The Tuscan hills carry the whole screen. The scrim is heavier behind
         * the card than at the top so the hills stay legible as a photograph
         * while the words on top of them stay legible as words.
         */
        background:
          'linear-gradient(rgba(26,36,27,.34), rgba(26,36,27,.46) 50%, rgba(22,31,23,.62)), url(/photos/tuscan-hills.jpg) center/cover no-repeat',
      }}
    >
      <BackLink go={go} to="peek" label="A look inside" tone="green" />

      <div style={{ font: `400 40px/1 ${font.script}`, color: color.gold, margin: '6px 0 0' }}>benvenuta</div>
      <h1 style={{ margin: '4px 0 0', font: `500 25px/1.2 ${font.serif}`, color: color.cream }}>
        Come in and stay a while
      </h1>

      <div
        style={{
          margin: '16px 0 0',
          width: '100%',
          background: 'rgba(26,36,27,.62)',
          border: '1px solid rgba(201,162,74,.5)',
          borderRadius: 20,
          padding: '20px 22px 18px',
          boxShadow: '0 10px 30px rgba(12,18,13,.4)',
          backdropFilter: 'blur(2px)',
        }}
      >
        <div style={{ font: `600 9.5px ${font.ui}`, letterSpacing: 3, color: color.gold }}>MEMBERSHIP</div>
        <div style={{ margin: '10px 0 0', font: `500 42px/1 ${font.serif}`, color: color.cream }}>
          $8<span style={{ font: `italic 400 15px ${font.serif}`, color: color.mutedGreen }}> a month</span>
        </div>
        <div style={{ margin: '14px 0 0', display: 'flex', flexDirection: 'column', gap: 9, textAlign: 'left' }}>
          {included.map((line) => (
            <div key={line} style={{ display: 'flex', gap: 9, alignItems: 'baseline' }}>
              <span style={{ color: color.gold, flex: 'none' }}>&#10038;</span>
              <span style={{ font: `400 12px/1.5 ${font.body}`, color: color.creamGreenBody }}>{line}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          margin: '14px 0 0',
          font: `italic 400 13.5px/1.55 ${font.serif}`,
          color: color.cream,
          maxWidth: 290,
        }}
      >
        &ldquo;It feels like being let into someone&rsquo;s home in Italy, not joining a course.&rdquo;
      </div>
      <div style={{ margin: '5px 0 0', font: `600 8.5px ${font.ui}`, letterSpacing: 2.5, color: color.mutedGreen }}>
        SARAH &middot; MEMBER SINCE MARCH
      </div>

      <div
        style={{
          margin: 'auto 0 0',
          paddingTop: 14,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 9,
        }}
      >
        <button
          type="button"
          className="btn-primary"
          style={{ padding: '14px 46px', font: `600 13.5px ${font.ui}`, boxShadow: '0 6px 18px rgba(12,18,13,.45)' }}
          onClick={go && (() => go('login'))}
        >
          Join Il Salotto
        </button>
        <div style={{ font: `400 11.5px ${font.body}`, color: color.mutedGreen }}>
          Cancel anytime. Everything opens the moment you&rsquo;re in.
        </div>
      </div>
    </Screen>
  )
}
