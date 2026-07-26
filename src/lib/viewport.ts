/**
 * Make the page behave like an app rather than a document: no pinch zoom, no
 * dragging the whole thing around, no rubber-banding past the edges, and a
 * screen that is exactly as tall as the screen.
 *
 * The viewport meta tag handles Android and the installed home-screen app, but
 * iOS Safari deliberately ignores `user-scalable=no` for accessibility, so the
 * zoom gestures have to be refused directly. Double-tap zoom is handled in CSS
 * by `touch-action: manipulation`, which is gentler than intercepting taps:
 * refusing touchend by hand swallows real button presses.
 */
export function lockViewport() {
  const refuse = (event: Event) => event.preventDefault()

  // Safari's own pinch events, the only ones iOS honours.
  document.addEventListener('gesturestart', refuse, { passive: false })
  document.addEventListener('gesturechange', refuse, { passive: false })
  document.addEventListener('gestureend', refuse, { passive: false })

  // Browsers without gesture events: a second finger means a pinch.
  document.addEventListener(
    'touchmove',
    (event) => {
      if (event.touches.length > 1) event.preventDefault()
    },
    { passive: false },
  )

  trackHeight()
}

/**
 * Publish the real height of the window as --app-h.
 *
 * Every CSS way of asking "how tall is the screen" has let us down on iOS in
 * turn. 100dvh disagreed with the visible area as the toolbars moved; a chain
 * of height: 100% then broke wherever an ancestor had no height of its own;
 * and in an installed app neither reliably reaches the bottom of the display,
 * which is what left a band of page background under every screen.
 *
 * window.innerHeight is a number the browser has to be honest about, so the
 * layout is driven from that instead, and re-read whenever it can change.
 * Screens keep the home indicator clear with env(safe-area-inset-bottom).
 */
function trackHeight() {
  const apply = () => {
    const height = window.visualViewport?.height ?? window.innerHeight
    document.documentElement.style.setProperty('--app-h', `${Math.round(height)}px`)
  }

  apply()
  window.addEventListener('resize', apply)
  window.addEventListener('orientationchange', apply)
  // iOS settles its chrome after the rotation event, not during it.
  window.addEventListener('orientationchange', () => window.setTimeout(apply, 300))
  window.visualViewport?.addEventListener('resize', apply)
  window.addEventListener('pageshow', apply)
}
