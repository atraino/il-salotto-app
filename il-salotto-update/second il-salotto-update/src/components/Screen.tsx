import type { CSSProperties, ReactNode } from 'react'
import { font } from '../theme'
import { BottomNav } from './BottomNav'
import { StatusBar } from './StatusBar'
import type { NavId, ScreenId } from '../navigation'
import type { Tone } from './PhotoFrame'

/**
 * The light phone outline the screens sit inside. The wrapper carries the
 * scale set by --phone-scale, so a 390px screen fits a real phone viewport
 * without any of the design's measurements changing.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="ph-fit">
      <div className="ph">{children}</div>
    </div>
  )
}

type ScreenProps = {
  tone?: Tone
  /** Which bottom-nav item is lit. Omit on the landing and login screens, which have no bar. */
  nav?: NavId
  go?: (screen: ScreenId) => void
  /** Padding and layout of the area between the status bar and the nav. */
  bodyStyle?: CSSProperties
  /** Let the body scroll when live content outgrows the screen. Prototype only. */
  scrollable?: boolean
  children: ReactNode
}

/** Status bar, body, and (where the design has one) the bottom nav. */
export function Screen({ tone = 'cream', nav, go, bodyStyle, scrollable, children }: ScreenProps) {
  return (
    <div className={tone === 'green' ? 'scr scr--green' : 'scr'}>
      <StatusBar tone={tone} />
      <div className={scrollable ? 'scr-body scr-scroll' : 'scr-body'} style={bodyStyle}>
        {children}
      </div>
      {nav && <BottomNav active={nav} tone={tone} go={go} />}
    </div>
  )
}

/** Small gold spaced caps, the editorial section marker used throughout. */
export function GoldCaps({
  children,
  size = 10,
  spacing = 3.5,
  color: ink = '#C9A24A',
  style,
}: {
  children: ReactNode
  size?: number
  spacing?: number
  color?: string
  style?: CSSProperties
}) {
  return (
    <div style={{ font: `600 ${size}px ${font.ui}`, letterSpacing: spacing, color: ink, ...style }}>{children}</div>
  )
}

/** Gold caps with a hairline rule running out to each side. */
export function RuledCaps({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ width: '100%', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
        <span className="hairline-gold" />
        <GoldCaps>{children}</GoldCaps>
        <span className="hairline-gold" />
      </div>
    </div>
  )
}
