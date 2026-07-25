import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'

import './fonts/fonts.css'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Home-screen install and offline support. Skipped in the single-file build,
// which has no server to register against.
if (import.meta.env.MODE !== 'artifact' && 'serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // no service worker is not an error worth bothering anyone about
    })
  })
}
