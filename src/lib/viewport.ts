/**
 * Make the page behave like an app rather than a document: no pinch zoom, no
 * dragging the whole thing around, no rubber-banding past the edges.
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
}
