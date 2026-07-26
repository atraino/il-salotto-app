import { color, font } from '../theme'
import { navIcons } from './icons'
import { navTarget, type NavId, type ScreenId } from '../navigation'
import type { Tone } from './PhotoFrame'

const items: { id: NavId; label: string }[] = [
  { id: 'home', label: 'Il Salotto' },
  { id: 'paths', label: 'Paths' },
  { id: 'notes', label: 'Notes' },
  { id: 'conversazione', label: 'Conversazione' },
  { id: 'gathering', label: 'Gathering' },
  { id: 'archive', label: 'Archive' },
]

type BottomNavProps = {
  active: NavId
  tone?: Tone
  go?: (screen: ScreenId) => void
}

/** The six-item bar that runs across every in-app screen. */
export function BottomNav({ active, tone = 'cream', go }: BottomNavProps) {
  const activeInk = tone === 'green' ? color.gold : color.terracotta
  const restInk = tone === 'green' ? color.mutedGreen : color.muted
  const rule = tone === 'green' ? 'rgba(246,241,232,.12)' : 'rgba(38,38,38,.08)'

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10px 6px 22px',
        borderTop: `1px solid ${rule}`,
      }}
    >
      {items.map(({ id, label }) => {
        const Icon = navIcons[id]
        const isActive = id === active
        return (
          <button
            key={id}
            type="button"
            className="btn-quiet nav-item"
            aria-current={isActive ? 'page' : undefined}
            onClick={go && (() => go(navTarget[id]))}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              color: isActive ? activeInk : restInk,
              width: 58,
            }}
          >
            <Icon />
            <span style={{ font: `500 7.5px ${font.ui}` }}>{label}</span>
          </button>
        )
      })}
    </div>
  )
}
