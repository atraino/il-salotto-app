import { RuledCaps, Screen } from '../components/Screen'
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
    <Screen bodyStyle={{ padding: '20px 30px 22px', alignItems: 'center', textAlign: 'center' }}>
      <h1 style={{ margin: 0, font: `500 32px/1.15 ${font.serif}`, color: color.ink }}>How it works</h1>
      <div style={{ margin: '9px 0 0', width: 36, height: 1, background: color.gold }} />
      <div
        style={{
          margin: '11px 0 0',
          font: `400 12.5px/1.7 ${font.body}`,
          color: color.muted,
          maxWidth: 300,
        }}
      >
        Each month opens with one doorway, and three paths lead deeper into it. Wander one, or all three.
      </div>

      <RuledCaps style={{ margin: '16px 0 0' }}>LA PORTA</RuledCaps>

      <PhotoFrame
        label="drop: a real Italian doorway, warm light"
        photo="doorway"
        width={160}
        height={200}
        radius="80px 80px 6px 6px"
        innerRadius="73px 73px 4px 4px"
        border="1px solid rgba(200,107,74,.4)"
        pad={7}
        style={{ margin: '14px 0 0' }}
      />
      <div style={{ margin: '11px 0 0', font: `500 18px/1.25 ${font.serif}`, color: color.ink }}>
        This month&rsquo;s doorway: a book
      </div>
      <div style={{ margin: '5px 0 0', font: `italic 500 13.5px/1.5 ${font.serif}`, color: color.olive }}>
        Italo Svevo&rsquo;s <i>La coscienza di Zeno</i>
      </div>
      <div style={{ margin: '2px 0 0', font: `400 11.5px/1.5 ${font.body}`, color: color.mutedWarm }}>
        &ldquo;Zeno&rsquo;s Conscience&rdquo; &middot; Trieste, 1923
      </div>

      <RuledCaps style={{ margin: '18px 0 0' }}>I SENTIERI</RuledCaps>

      <div style={{ margin: '10px 0 0', font: `italic 400 12px/1.5 ${font.serif}`, color: color.goldDeep }}>
        Three ways into the same book. Take any, or all three.
      </div>

      <div style={{ display: 'flex', gap: 14, margin: '12px 0 0', width: '100%' }}>
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

      <div
        style={{
          margin: 'auto 0 0',
          width: '100%',
          borderTop: '1px solid rgba(38,38,38,.12)',
          paddingTop: 13,
        }}
      >
        <div style={{ font: `600 9.5px ${font.ui}`, letterSpacing: 3, color: color.terracotta }}>LA CONVERSAZIONE</div>
        <p style={{ margin: '6px 0 0', font: `400 12.5px/1.6 ${font.body}`, color: color.inkSoft }}>
          And all month, together: a warm room of curious people, talking it through. Italians welcome.
        </p>
        <div style={{ margin: '11px 0 0', font: `italic 400 13px/1.55 ${font.serif}`, color: color.muted }}>
          No pressure, come as deep as your life allows.
        </div>
        <button
          type="button"
          className="btn-primary"
          style={{ margin: '14px 0 0', padding: '13px 40px', font: `600 13.5px ${font.ui}` }}
          onClick={go && (() => go('why'))}
        >
          Continue
        </button>
      </div>
    </Screen>
  )
}
