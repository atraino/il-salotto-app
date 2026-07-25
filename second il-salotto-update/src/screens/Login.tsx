import { useState } from 'react'
import { Screen } from '../components/Screen'
import { PhotoFrame } from '../components/PhotoFrame'
import { color, font } from '../theme'
import { useAuth } from '../lib/auth'
import type { ScreenProps } from '../navigation'

const fieldStyle = {
  background: 'rgba(246,241,232,.05)',
  border: '1px solid rgba(201,162,74,.35)',
  borderRadius: 14,
  padding: '15px 18px',
} as const

const labelStyle = { font: `600 9px ${font.ui}`, letterSpacing: 2, color: color.gold } as const
const valueStyle = { font: `400 14px ${font.body}`, color: color.placeholderGreen, marginTop: 3 } as const

/** F. Login: bentornata, the room just as she left it. Leads into Il Salotto. */
export function Login({ go }: ScreenProps) {
  const { live, session, sendLink } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nudge, setNudge] = useState(false)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [problem, setProblem] = useState<string | null>(null)

  // With a database behind it, one email is the whole sign-in: no password.
  const logIn = async () => {
    if (!live) {
      if (!email.trim() || !password.trim()) {
        setNudge(true)
        return
      }
      go?.('entering')
      return
    }

    if (session) {
      go?.('entering')
      return
    }

    if (!email.trim()) {
      setNudge(true)
      return
    }

    setSending(true)
    const error = await sendLink(email.trim())
    setSending(false)
    if (error) {
      setProblem(error)
      return
    }
    setSent(true)
  }

  const border = nudge ? '1px solid rgba(201,162,74,.75)' : fieldStyle.border

  return (
    <Screen
      tone="green"
      bodyStyle={{
        padding: '30px 34px 26px',
        alignItems: 'center',
        textAlign: 'center',
        // bentornata.jpg sits behind the whole screen, under a deep green scrim
        background:
          'linear-gradient(rgba(30,42,32,.82), rgba(30,42,32,.9)), url(/photos/bentornata.jpg) center/cover no-repeat',
      }}
    >
      <div style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, padding: '2px 0 6px' }}>
      <PhotoFrame
        tone="green"
        label="drop: a door ajar, warm light"
        photo="doorway"
        width="auto"
        height="100%"
        radius="64px 64px 5px 5px"
        innerRadius="58px 58px 3px 3px"
        border="1px solid rgba(201,162,74,.6)"
        pad={6}
        labelPad={16}
        style={{ aspectRatio: '128 / 164', maxHeight: 168, minHeight: 96 }}
      />
      </div>
      <div style={{ font: `400 60px/1 ${font.script}`, color: color.gold, margin: '20px 0 0' }}>bentornata</div>
      <div style={{ margin: '6px 0 0', font: `italic 400 14.5px/1.5 ${font.serif}`, color: color.cream }}>
        The room is just as you left it.
      </div>

      <div
        style={{
          margin: '30px 0 0',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          textAlign: 'left',
        }}
      >
        <div className="field-wrap" style={{ ...fieldStyle, border }}>
          <label style={labelStyle} htmlFor="il-salotto-email">
            EMAIL
          </label>
          {go ? (
            <input
              id="il-salotto-email"
              className="field-input"
              type="email"
              placeholder="you@somewhere.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setNudge(false)
              }}
            />
          ) : (
            <div style={valueStyle}>you@somewhere.com</div>
          )}
        </div>
        {!live && (
          <div className="field-wrap" style={{ ...fieldStyle, border }}>
            <label style={labelStyle} htmlFor="il-salotto-password">
              PASSWORD
            </label>
            {go ? (
              <input
                id="il-salotto-password"
                className="field-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setNudge(false)
                }}
              />
            ) : (
              <div style={valueStyle}>&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</div>
            )}
          </div>
        )}
        {live && !sent && (
          <div style={{ font: `italic 400 12.5px/1.5 ${font.serif}`, color: color.mutedGreen, textAlign: 'center' }}>
            No password to remember. We send a link that opens the door.
          </div>
        )}
        {sent && (
          <div style={{ font: `italic 400 13.5px/1.55 ${font.serif}`, color: color.gold, textAlign: 'center' }}>
            Check your email. The link opens Il Salotto, and stays open on this phone.
          </div>
        )}
        {problem && (
          <div style={{ font: `400 12px/1.5 ${font.ui}`, color: '#E0885F', textAlign: 'center' }}>{problem}</div>
        )}
      </div>

      <button
        type="button"
        className="btn-primary"
        style={{ margin: '22px 0 0', width: '100%', padding: '15px 0' }}
        onClick={go && logIn}
        disabled={sending}
      >
        {!live || session ? 'Log in' : sending ? 'Sending...' : sent ? 'Send it again' : 'Send my link'}
      </button>
      <div style={{ margin: '18px 0 0', font: `500 12px ${font.ui}`, color: color.mutedGreen }}>
        New here?{' '}
        <button
          type="button"
          className="btn-quiet tappable"
          onClick={go && (() => go('join'))}
          style={{ color: color.gold, textDecoration: 'underline', font: `500 12px ${font.ui}` }}
        >
          Create your account
        </button>
      </div>

      <div
        style={{
          marginTop: 'auto',
          width: '100%',
          borderTop: '1px solid rgba(201,162,74,.3)',
          paddingTop: 14,
          flex: 'none',
        }}
      >
        <div style={{ font: `italic 400 13.5px/1.6 ${font.serif}`, color: color.placeholderGreen }}>
          Everything is where you left it:
          <br />
          your notes, your paths, the room.
        </div>
        <div style={{ margin: '10px 0 0', font: `italic 400 12.5px ${font.serif}`, color: color.mutedGreen }}>
          It opens straight into the room.
        </div>
      </div>
      <span aria-live="polite" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
        {nudge ? 'Your email and password, please.' : ''}
      </span>
    </Screen>
  )
}
