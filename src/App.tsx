import { useEffect, useState } from 'react'
import { Gallery } from './Gallery'
import { Prototype } from './Prototype'

type Mode = 'gallery' | 'prototype'

/** The phone frame at full size, bezel included. */
const FRAME_WIDTH = 412

function modeFromHash(): Mode | null {
  if (window.location.hash === '#/prototype') return 'prototype'
  if (window.location.hash === '#/gallery') return 'gallery'
  return null
}

/** On a phone, open straight into the clickable version. */
function defaultMode(): Mode {
  return window.innerWidth < 760 ? 'prototype' : 'gallery'
}

export function App() {
  const [mode, setMode] = useState<Mode>(() => modeFromHash() ?? defaultMode())

  useEffect(() => {
    const sync = () => {
      const fromHash = modeFromHash()
      if (fromHash) setMode(fromHash)
    }
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  // Scale the phone frame down to fit narrow viewports, never up past life size.
  useEffect(() => {
    const fit = () => {
      const scale = Math.min(1, (window.innerWidth - 28) / FRAME_WIDTH)
      document.documentElement.style.setProperty('--phone-scale', String(scale))
    }
    fit()
    window.addEventListener('resize', fit)
    window.addEventListener('orientationchange', fit)
    return () => {
      window.removeEventListener('resize', fit)
      window.removeEventListener('orientationchange', fit)
    }
  }, [])

  const choose = (next: Mode) => {
    window.location.hash = next === 'prototype' ? '#/prototype' : '#/gallery'
    setMode(next)
  }

  return (
    <>
      <header className="shell-head">
        <div>
          <div className="shell-title">Il Salotto</div>
          <div
            className="shell-sub"
            style={{ font: "italic 400 13px 'Playfair Display', serif", color: '#8b8172', marginTop: 2 }}
          >
            {mode === 'gallery'
              ? 'The mockup set: the cover, the front door, and the app inside.'
              : 'The clickable version. Wander it the way a member would.'}
          </div>
        </div>
        <div className="mode-switch">
          <button type="button" aria-pressed={mode === 'gallery'} onClick={() => choose('gallery')}>
            Mockups
          </button>
          <button type="button" aria-pressed={mode === 'prototype'} onClick={() => choose('prototype')}>
            Clickable
          </button>
        </div>
      </header>
      {mode === 'gallery' ? <Gallery /> : <Prototype />}
    </>
  )
}
