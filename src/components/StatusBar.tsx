import { color, font } from '../theme'
import type { Tone } from './PhotoFrame'

/** The 9:41 and battery sliver at the top of every screen. */
export function StatusBar({ tone = 'cream' }: { tone?: Tone }) {
  const ink = tone === 'green' ? color.cream : color.ink
  return (
    /*
     * Layout lives in styles.css, not here. An inline display beats any
     * stylesheet rule, so while it was set here the phone's own rule could not
     * hide this bar: the mockup's 9:41 drew straight over the real clock.
     * Only the tone-dependent colour stays inline.
     */
    <div className="status-bar" style={{ font: `600 13px ${font.ui}`, color: ink }}>
      <span>9:41</span>
      <span
        style={{
          width: 16,
          height: 9,
          border: `1px solid ${ink}`,
          borderRadius: 2.5,
          display: 'inline-block',
          position: 'relative',
        }}
      >
        <span style={{ position: 'absolute', inset: '1.5px 4px 1.5px 1.5px', background: ink, borderRadius: 1 }} />
      </span>
    </div>
  )
}
