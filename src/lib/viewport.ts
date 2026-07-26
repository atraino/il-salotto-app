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

}

/*
 * There is deliberately no height measurement here any more.
 *
 * This module used to publish window.innerHeight for the layout to use, which
 * seemed like the one honest number available. It is not: in an installed iOS
 * app innerHeight leaves out the status bar and reports 823 on an 874 point
 * screen, while viewport-fit=cover still draws the app from the very top. The
 * app therefore started at the top, believed it was 823 tall, and left 51
 * points of page background along the bottom of every screen.
 *
 * The layout is pinned with position: fixed and inset: 0 instead, which is the
 * viewport by definition and needs no number at all. See styles.css.
 */
