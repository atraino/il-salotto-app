import { GoldCaps, Screen } from '../components/Screen'
import { stripes } from '../components/PhotoFrame'
import { color, font } from '../theme'
import type { ScreenProps } from '../navigation'

/** 2. La Porta: this month's doorway, an arch you stand before and walk through. */
export function LaPorta({ go }: ScreenProps) {
  return (
    <Screen tone="green" nav="home" go={go} bodyStyle={{ padding: '24px 30px 0', alignItems: 'center' }}>
      <button
        type="button"
        className="btn-quiet tappable"
        onClick={go && (() => go('home'))}
        style={{
          alignSelf: 'flex-start',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          font: `500 11px ${font.ui}`,
          color: color.mutedGreen,
          marginBottom: 10,
        }}
      >
        <span>&lsaquo;</span>
        <span>Il Salotto</span>
      </button>
      <GoldCaps size={10.5} spacing={4}>
        LA PORTA DEL MESE
      </GoldCaps>

      {/*
        The arch used to be a hard 266x420. Added to everything below it that
        came to more than the screen on a shorter phone, which pushed Step
        through off the bottom. It now takes the room that is left and keeps
        its proportions, so the screen balances instead of overflowing.
      */}
      <div
        style={{
          flex: '1 1 auto',
          minHeight: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: '18px 0 0',
        }}
      >
      <div
        style={{
          height: '100%',
          aspectRatio: '266 / 420',
          maxHeight: 420,
          minHeight: 232,
          borderRadius: '133px 133px 0 0',
          border: '1px solid rgba(201,162,74,.55)',
          padding: 9,
          position: 'relative',
        }}
      >
        {/* the doorframe's own jambs, running down either side */}
        <div style={{ position: 'absolute', left: -14, top: 120, bottom: 0, width: 1, background: 'rgba(201,162,74,.25)' }} />
        <div style={{ position: 'absolute', right: -14, top: 120, bottom: 0, width: 1, background: 'rgba(201,162,74,.25)' }} />
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '124px 124px 0 0',
            background: `linear-gradient(rgba(20,28,21,.62), rgba(20,28,21,.62)), url(/photos/trieste-doorway.jpg) center/cover, ${stripes('green', 9)}`,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '0 20px 26px',
            position: 'relative',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 88,
              left: 0,
              right: 0,
              textAlign: 'center',
              font: `10px ${font.mono}`,
              color: color.placeholderGreen,
              padding: '0 30px',
            }}
          >
            drop: an old doorway in Trieste, warm light inside
          </span>
          <h1 style={{ margin: 0, textAlign: 'center', font: `500 34px/1.08 ${font.serif}`, color: color.cream }}>
            Svevo&rsquo;s
            <br />
            Trieste
          </h1>
          <div
            style={{
              margin: '8px 0 0',
              textAlign: 'center',
              font: `italic 400 14.5px/1.4 ${font.serif}`,
              color: color.gold,
            }}
          >
            The Italy that was barely Italy.
          </div>
        </div>
      </div>
      </div>

      {/* the door is a book: say which one, plainly */}
      <div
        style={{
          margin: '16px 0 0',
          textAlign: 'center',
          font: `italic 500 13.5px/1.45 ${font.serif}`,
          color: color.gold,
        }}
      >
        Italo Svevo&rsquo;s <i>La coscienza di Zeno</i>
      </div>
      <div style={{ margin: '2px 0 0', font: `400 11px ${font.body}`, color: color.mutedGreen }}>
        &ldquo;Zeno&rsquo;s Conscience&rdquo; &middot; Trieste, 1923
      </div>

      <p
        style={{
          margin: '14px 6px 0',
          font: `400 13px/1.7 ${font.body}`,
          color: color.creamGreenBody,
          textAlign: 'center',
          textWrap: 'pretty',
        }}
      >
        A port city that spoke four languages and belonged to none of them, and a novel that laughs gently at its own
        excuses. Step in with us.
      </p>

      <div
        style={{
          margin: '16px 0 0',
          textAlign: 'center',
          font: `italic 500 15.5px/1.5 ${font.serif}`,
          color: color.cream,
        }}
      >
        &ldquo;Life is neither ugly nor beautiful,
        <br />
        but it is original.&rdquo;
      </div>
      <div style={{ margin: '4px 0 0', font: `600 9px ${font.ui}`, letterSpacing: 2.5, color: color.mutedGreen }}>
        ITALO SVEVO
      </div>

      <div
        style={{
          margin: 'auto 0 0',
          padding: '14px 0 14px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <button
          type="button"
          className="btn-primary"
          style={{ padding: '14px 44px' }}
          onClick={go && (() => go('sentieri'))}
        >
          Step through
        </button>
        <div style={{ font: `italic 400 12.5px ${font.serif}`, color: color.mutedGreen }}>
          Three paths wait on the other side.
        </div>
      </div>
    </Screen>
  )
}
