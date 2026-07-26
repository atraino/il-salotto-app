import { useState } from 'react'
import { BackLink, Screen } from '../components/Screen'
import { color, font } from '../theme'
import { useAuth } from '../lib/auth'
import type { ScreenProps } from '../navigation'

const fieldStyle = {
  background: 'rgba(246,241,232,.05)',
  border: '1px solid rgba(201,162,74,.35)',
  borderRadius: 14,
  padding: '13px 18px',
  width: '100%',
} as const

const labelStyle = { font: `600 9px ${font.ui}`, letterSpacing: 2, color: color.gold } as const

type Mode = 'in' | 'up'

/** F. The door. Email and password, nothing to leave the app for. */
export function Login({ go }: ScreenProps) {
  const { live, session, signIn, signUp } = useAuth()
  const [mode, setMode] = useState<Mode>('in')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [problem, setProblem] = useState<string | null>(null)

  const joining = mode === 'up'

  const submit = async () => {
    setProblem(null)

    if (!live) {
      go?.('entering')
      return
    }
    if (session) {
      go?.('entering')
      return
    }
    if (joining && !name.trim()) {
      setProblem('What should the room call you?')
      return
    }
    if (!email.trim() || !password) {
      setProblem('Your email and a password, please.')
      return
    }

    setBusy(true)
    const error = joining ? await signUp(email, password, name) : await signIn(email, password)
    setBusy(false)
    if (error) setProblem(error)
    // On success the session arrives and the app walks itself into the room.
  }

  return (
    <Screen
      tone="green"
      scrollable
      bodyStyle={{
        padding: '26px 32px 26px',
        alignItems: 'center',
        textAlign: 'center',
        // bentornata.jpg sits behind the whole screen, under a deep green scrim
        background:
          'linear-gradient(rgba(30,42,32,.86), rgba(30,42,32,.93)), url(/photos/bentornata.jpg) center/cover no-repeat',
      }}
    >
      <BackLink go={go} to="join" label="Membership" tone="green" />
      <div style={{ font: `400 58px/1 ${font.script}`, color: color.gold, marginTop: 4 }}>bentornata</div>
      <div style={{ margin: '4px 0 0', font: `400 13.5px/1.6 ${font.body}`, color: color.creamGreenBody }}>
        {joining ? 'Take a seat. It only takes a moment.' : 'Welcome back to Il Salotto.'}
      </div>

      {/* log in / create account, so neither is buried behind the other */}
      <div
        style={{
          margin: '20px 0 0',
          display: 'flex',
          width: '100%',
          gap: 4,
          padding: 4,
          borderRadius: 20,
          background: 'rgba(246,241,232,.06)',
          border: '1px solid rgba(201,162,74,.24)',
        }}
      >
        {(['in', 'up'] as Mode[]).map((option) => (
          <button
            key={option}
            type="button"
            className="btn-quiet tappable"
            aria-pressed={mode === option}
            onClick={
              go &&
              (() => {
                setMode(option)
                setProblem(null)
              })
            }
            style={{
              flex: 1,
              padding: '9px 0',
              borderRadius: 16,
              font: `600 12px ${font.ui}`,
              background: mode === option ? color.gold : 'transparent',
              color: mode === option ? '#2A392C' : color.placeholderGreen,
              transition: 'background .18s ease, color .18s ease',
            }}
          >
            {option === 'in' ? 'Log in' : 'Create account'}
          </button>
        ))}
      </div>

      <div style={{ margin: '14px 0 0', width: '100%', display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left' }}>
        {joining && (
          <div className="field-wrap" style={fieldStyle}>
            <label style={labelStyle} htmlFor="il-salotto-name">
              YOUR NAME
            </label>
            <input
              id="il-salotto-name"
              className="field-input"
              type="text"
              autoComplete="name"
              placeholder="Alexis"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={!go}
            />
          </div>
        )}

        <div className="field-wrap" style={fieldStyle}>
          <label style={labelStyle} htmlFor="il-salotto-email">
            EMAIL
          </label>
          <input
            id="il-salotto-email"
            className="field-input"
            type="email"
            autoComplete="email"
            autoCapitalize="none"
            placeholder="you@somewhere.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={!go}
          />
        </div>

        <div className="field-wrap" style={fieldStyle}>
          <label style={labelStyle} htmlFor="il-salotto-password">
            PASSWORD
          </label>
          <input
            id="il-salotto-password"
            className="field-input"
            type="password"
            autoComplete={joining ? 'new-password' : 'current-password'}
            placeholder={joining ? 'at least six characters' : '••••••••'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={!go}
          />
        </div>
      </div>

      {problem && (
        <div
          role="alert"
          style={{ margin: '12px 0 0', font: `400 12px/1.55 ${font.ui}`, color: '#E0885F', textAlign: 'center' }}
        >
          {problem}
        </div>
      )}

      <button
        type="button"
        className="btn-primary"
        style={{ margin: '16px 0 0', width: '100%', padding: '14px 0', font: `600 13.5px ${font.ui}` }}
        onClick={go && submit}
        disabled={busy}
      >
        {busy ? 'One moment...' : joining ? 'Create my account' : 'Log in'}
      </button>

      <div style={{ margin: '14px 0 0', font: `400 12px ${font.ui}`, color: color.mutedGreen }}>
        {joining ? 'Already a member?' : 'New here?'}{' '}
        <button
          type="button"
          className="btn-quiet tappable"
          onClick={
            go &&
            (() => {
              setMode(joining ? 'in' : 'up')
              setProblem(null)
            })
          }
          style={{ color: color.gold, textDecoration: 'underline', font: `500 12px ${font.ui}` }}
        >
          {joining ? 'Log in' : 'Create an account'}
        </button>
      </div>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 18,
          font: `400 11.5px/1.6 ${font.body}`,
          color: color.mutedGreen,
        }}
      >
        You stay signed in on this device.
      </div>
    </Screen>
  )
}
