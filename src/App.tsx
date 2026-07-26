import { useEffect, useState } from 'react'
import { Gallery } from './Gallery'
import { Prototype } from './Prototype'
import { AuthProvider } from './lib/auth'

type Mode = 'gallery' | 'prototype'

/** The phone frame at full size, bezel included. */
const FRAME_WIDTH = 412
const FRAME_HEIGHT = 844

function modeFromHash(): Mode | null {
  const hash = window.location.hash
  if (hash === '#/prototype' || hash === '#/app') return 'prototype'
  if (hash === '#/mockups' || hash === '#/gallery') return 'gallery'
  return null
}

/** The app is the point. The mockup set lives at #/mockups. */
function defaultMode(): Mode {
  return 'prototype'
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

  // Scale the phone frame to fit the viewport, never up past life size. In the
  // clickable view it fits height as well, so a whole screen is visible at once
  // without the page scrolling under it.
  useEffect(() => {
    const fit = () => {
      const root = document.documentElement
      const chrome = document.querySelector('.shell-head')?.getBoundingClientRect().height ?? 0
      root.style.setProperty('--app-chrome', `${Math.round(chrome)}px`)

      // Below 760px the clickable view goes full bleed, so scaling doesn't apply.
      const fullBleed = mode === 'prototype' && window.innerWidth <= 760
      if (fullBleed) {
        root.style.setProperty('--phone-scale', '1')
        return
      }

      const byWidth = (window.innerWidth - 28) / FRAME_WIDTH
      const stage = document.querySelector('.proto-chrome')?.getBoundingClientRect().height ?? 0
      const byHeight = (window.innerHeight - chrome - stage - 46) / FRAME_HEIGHT
      const scale = mode === 'prototype' ? Math.min(1, byWidth, byHeight) : Math.min(1, byWidth)
      root.style.setProperty('--phone-scale', String(Math.max(scale, 0.4)))
    }
    fit()
    // a second pass once fonts have settled and the chrome has its final height
    const settle = window.setTimeout(fit, 250)
    window.addEventListener('resize', fit)
    window.addEventListener('orientationchange', fit)
    return () => {
      window.clearTimeout(settle)
      window.removeEventListener('resize', fit)
      window.removeEventListener('orientationchange', fit)
    }
  }, [mode])

  const choose = (next: Mode) => {
    window.location.hash = next === 'prototype' ? '#/app' : '#/mockups'
    setMode(next)
  }

  return (
    <AuthProvider>
      {mode === 'gallery' && (
        <header className="shell-head">
          <div>
            <div className="shell-title">Il Salotto</div>
            <div
              className="shell-sub"
              style={{ font: "italic 400 13px 'Playfair Display', serif", color: '#8b8172', marginTop: 2 }}
            >
              The mockup set: the cover, the front door, and the app inside.
            </div>
          </div>
          <button type="button" className="shell-link" onClick={() => choose('prototype')}>
            Open the app
          </button>
        </header>
      )}
      {mode === 'gallery' ? <Gallery /> : <Prototype onShowMockups={() => choose('gallery')} />}
    </AuthProvider>
  )
}
