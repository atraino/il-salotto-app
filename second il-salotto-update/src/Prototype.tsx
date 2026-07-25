import { useState } from 'react'
import { PhoneFrame } from './components/Screen'
import { screens } from './screens'
import type { ScreenId } from './navigation'

const hints: Partial<Record<ScreenId, string>> = {
  landing: 'Step inside, or log in if you have been here before.',
  howItWorks: 'Continue to read why Alexis built this.',
  why: 'Continue for a look inside this month.',
  peek: 'Continue to the invitation.',
  join: 'Join to reach the login door.',
  login: 'Any email and password will let you in.',
  entering: 'A breath, then the room.',
  home: 'Il Salotto itself. This month is one tap deeper.',
  porta: 'This month’s door. Step through to the three paths.',
  sentieri: 'Il Luogo is open. Il Libro and L’Anima are still being written.',
  path: 'Leave a note when something stirs.',
  pathBook: 'This path is waiting on its readings. The City is open.',
  pathSoul: 'This path is waiting on its readings. The City is open.',
  notes: 'Write a note and it joins the room. Tap a heart.',
  conversazione: 'Share a thought, or warm someone else’s.',
  gathering: 'Past doors leads to the archive.',
  archive: 'The month now open takes you back to its Porta.',
}

/** The app itself: one phone, real navigation, live notes and hearts. */
export function Prototype({ onShowMockups }: { onShowMockups?: () => void }) {
  const [screen, setScreen] = useState<ScreenId>('landing')
  const { caption, Component } = screens[screen]

  return (
    <div className="proto-stage live">
      <PhoneFrame>
        <div key={screen} className="screen-anim">
          <Component go={setScreen} />
        </div>
      </PhoneFrame>
      {/* Reviewer's scaffolding: useful on a desktop, in the way on a phone. */}
      <div className="proto-chrome">
        <div className="cap">{caption}</div>
        <p className="proto-hint">{hints[screen]}</p>
        <div style={{ display: 'flex', gap: 10 }}>
          {screen !== 'landing' && (
            <button type="button" className="proto-reset" onClick={() => setScreen('landing')}>
              Back to the front door
            </button>
          )}
          {onShowMockups && (
            <button type="button" className="proto-reset" onClick={onShowMockups}>
              See the mockup set
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
