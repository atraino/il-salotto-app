import { BackLink, RuledCaps, Screen } from '../components/Screen'
import { PhotoFrame } from '../components/PhotoFrame'
import { color, font } from '../theme'
import type { ScreenProps } from '../navigation'

/* The Italian names stand on their own. The line underneath says what each is. */
const sentieri = [
  { name: 'IL LIBRO', line: 'the novel itself, its humor and its modern soul' },
  { name: 'IL LUOGO', line: 'Trieste and the Italy that made it' },
  { name: 'L’ANIMA', line: 'what it stirs in you, the stories we tell ourselves' },
]

/** B. How it works: one doorway, three paths, told with type rather than diagram lines. */
export function HowItWorks({ go }: ScreenProps) {
  return (
    <Screen bodyStyle={{ padding: '14px 28px 14px', alignItems: 'center', textAlign: 'center' }}>
      <BackLink go={go} to="landing" label="Il Salotto" />
      <h1 style={{ margin: 0, font: `500 27px/1.15 ${font.serif}`, color: color.ink }}>How it works</h1>
      <div style={{ margin: '7px 0 0', width: 36, height: 1, background: color.gold }} />
      <div
        style={{
          margin: '8px 0 0',
          font: `400 11.5px/1.6 ${font.body}`,
          color: color.muted,
          maxWidth: 300,
        }}
      >
        Each month opens with one doorway, and three paths lead deeper into it. Wander one, or all three.
      </div>

      <RuledCaps style={{ margin: '11px 0 0' }}>LA PORTA</RuledCaps>

      <PhotoFrame
        label="drop: a real Italian doorway, warm light"
        photo="doorway"
        width={122}
        height={152}
        radius="61px 61px 5px 5px"
        innerRadius="55px 55px 3px 3px"
        border="1px solid rgba(200,107,74,.4)"
        pad={6}
        style={{ margin: '10px 0 0', flex: 'none' }}
      />
      <div style={{ margin: '9px 0 0', font: `500 16.5px/1.25 ${font.serif}`, color: color.ink }}>
        This month&rsquo;s doorway: a book
      </div>
      <div style={{ margin: '4px 0 0', font: `italic 500 12.5px/1.45 ${font.serif}`, color: color.olive }}>
        Italo Svevo&rsquo;s <i>La coscienza di Zeno</i>
      </div>
      <div style={{ margin: '2px 0 0', font: `400 10.5px/1.45 ${font.body}`, color: color.mutedWarm }}>
        &ldquo;Zeno&rsquo;s Conscience&rdquo; &middot; Trieste, 1923
      </div>

      <RuledCaps style={{ margin: '12px 0 0' }}>I SENTIERI</RuledCaps>

      <div style={{ margin: '7px 0 0', font: `400 11px/1.5 ${font.body}`, color: color.goldDeep }}>
        Three ways into the same book. Take any, or all three.
      </div>

      <div style={{ display: 'flex', gap: 12, margin: '9px 0 0', width: '100%', flex: 'none' }}>
        {sentieri.map(({ name, line }) => (
          <div key={name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: color.terracotta }} />
            <div style={{ margin: '8px 0 0', font: `600 10px ${font.ui}`, letterSpacing: 1.6, color: color.ink }}>
              {name}
            </div>
            <div style={{ margin: '6px 0 0', font: `400 11px/1.6 ${font.body}`, color: color.olive }}>
              {line}
            </div>
          </div>
        ))}
      </div>

      {/* one warm line, in Alexis's words, about what the month arrives holding */}
      <div
        style={{
          margin: '12px 0 0',
          width: '100%',
          borderTop: '1px solid rgba(201,162,74,.4)',
          borderBottom: '1px solid rgba(201,162,74,.4)',
          padding: '11px 6px',
          font: `italic 400 13px/1.55 ${font.serif}`,
          color: color.goldDeep,
          flex: 'none',
        }}
      >
        Each month, one doorway into Italy, and everything you need to step through it.
      </div>

      <div
        style={{
          margin: 'auto 0 0',
          width: '100%',
          paddingTop: 10,
          flex: 'none',
        }}
      >
        <div style={{ font: `600 9px ${font.ui}`, letterSpacing: 3, color: color.terracotta }}>LA CONVERSAZIONE</div>
        <p style={{ margin: '5px 0 0', font: `400 11.5px/1.5 ${font.body}`, color: color.inkSoft }}>
          And all month, together: a warm room of curious people, talking it through. Italians welcome.
        </p>
        <button
          type="button"
          className="btn-primary"
          style={{ margin: '11px 0 0', padding: '12px 38px', font: `600 13px ${font.ui}` }}
          onClick={go && (() => go('why'))}
        >
          Continue
        </button>
      </div>
    </Screen>
  )
}
