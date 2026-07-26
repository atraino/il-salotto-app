import { useEffect, useState } from 'react'
import { BackLink, GoldCaps, Screen } from '../components/Screen'
import { PhotoFrame } from '../components/PhotoFrame'
import { color, font } from '../theme'
import type { ScreenProps } from '../navigation'

/**
 * D. A look inside this month.
 *
 * Not a description of features: a handful of real fragments from inside the
 * month, cycling, so the room reads as inhabited rather than advertised. Each
 * fragment is one card — a fact, a voice, a resource, the book's own words.
 */

type Fragment = {
  kind: string
  /** photo in public/photos, or null for a type-only card */
  photo?: string
  body: string
  attribution?: string
}

const fragments: Fragment[] = [
  {
    kind: 'DID YOU KNOW',
    photo: 'trieste',
    body:
      'Svevo’s English teacher in Trieste was James Joyce. Joyce read the novel nobody in Italy would review, told him it was a masterpiece, and pressed it on his friends in Paris until they agreed.',
  },
  {
    kind: 'FROM LA CONVERSAZIONE',
    body:
      'Did anyone else notice Zeno never actually quits anything? I found that strangely comforting.',
    attribution: 'Kate · dreaming from Ohio',
  },
  {
    kind: 'INSIDE IL LIBRO',
    photo: 'book-cover',
    body:
      'Why this novel still surprises readers: it was written as a joke on psychoanalysis, and turned into the funniest honest book about being a person.',
  },
  {
    kind: 'FROM THE BOOK',
    body: 'Life is neither ugly nor beautiful, but it is original.',
    attribution: 'Italo Svevo, La coscienza di Zeno',
  },
  {
    kind: 'INSIDE IL LUOGO',
    photo: 'doorway',
    body:
      'A port city that spoke four languages and belonged to none of them. Trieste is why the book sounds like nowhere else in Italian.',
  },
]

const HOLD = 5200

export function PeekInside({ go }: ScreenProps) {
  const [index, setIndex] = useState(0)
  /* Interaction wins: once someone taps, stop moving the thing under them. */
  const [auto, setAuto] = useState(true)
  const live = Boolean(go)

  useEffect(() => {
    if (!live || !auto) return
    const tick = window.setInterval(() => setIndex((i) => (i + 1) % fragments.length), HOLD)
    return () => window.clearInterval(tick)
  }, [live, auto])

  const advance = () => {
    setAuto(false)
    setIndex((i) => (i + 1) % fragments.length)
  }

  const fragment = fragments[index]

  return (
    <Screen tone="green" bodyStyle={{ padding: '24px 30px 22px', alignItems: 'center', textAlign: 'center' }}>
      <BackLink go={go} to="why" label="About" tone="green" />
      <h1 style={{ margin: 0, font: `500 27px/1.15 ${font.serif}`, color: color.cream }}>A look inside this month</h1>
      <div style={{ margin: '9px 0 0', width: 36, height: 1, background: color.gold }} />
      <GoldCaps size={9.5} spacing={3} style={{ margin: '14px 0 0' }}>
        SVEVO&rsquo;S TRIESTE
      </GoldCaps>

      {/* the card takes the room that is left, so the screen never floats */}
      <div
        className={live ? 'card-tappable' : undefined}
        onClick={live ? advance : undefined}
        style={{
          flex: '1 1 auto',
          minHeight: 0,
          width: '100%',
          margin: '16px 0 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <div
          key={index}
          className="screen-anim"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 13,
            minHeight: 0,
          }}
        >
          {fragment.photo && (
            <PhotoFrame
              tone="green"
              label={`drop: ${fragment.photo}`}
              photo={fragment.photo}
              width="auto"
              height="100%"
              radius="86px 86px 8px 8px"
              innerRadius="79px 79px 5px 5px"
              border="1px solid rgba(201,162,74,.55)"
              pad={6}
              labelPad={22}
              style={{ aspectRatio: '172 / 186', maxHeight: 262, minHeight: 104 }}
            />
          )}

          {/*
            A fragment with no photograph gets a lit panel instead, so a voice
            from the room carries the same weight on screen as a picture does
            and the card never reads as a stranded line of text.
          */}
          <div
            style={
              fragment.photo
                ? { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 11, width: '100%' }
                : {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 13,
                    width: '100%',
                    background: 'rgba(246,241,232,.055)',
                    border: '1px solid rgba(201,162,74,.34)',
                    borderRadius: 22,
                    padding: '30px 24px',
                    boxShadow: '0 8px 26px rgba(12,18,13,.3)',
                  }
            }
          >
            <GoldCaps size={9} spacing={2.6}>
              {fragment.kind}
            </GoldCaps>

            <div
              style={{
                font: fragment.attribution
                  ? `italic 400 16px/1.62 ${font.serif}`
                  : `400 13px/1.72 ${font.body}`,
                color: fragment.attribution ? color.cream : color.creamGreenBody,
                maxWidth: 300,
                textWrap: 'pretty',
              }}
            >
              {fragment.attribution ? `“${fragment.body}”` : fragment.body}
            </div>

            {fragment.attribution && (
              <div style={{ font: `600 9px ${font.ui}`, letterSpacing: 2, color: color.mutedGreen }}>
                {fragment.attribution.toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* which fragment you are on, and the way to the next one */}
      <div style={{ display: 'flex', gap: 7, alignItems: 'center', margin: '14px 0 0' }}>
        {fragments.map((f, i) => (
          <span
            key={f.kind + i}
            style={{
              width: i === index ? 16 : 5,
              height: 5,
              borderRadius: 3,
              background: i === index ? color.gold : 'rgba(201,162,74,.32)',
              transition: 'width .3s ease, background .3s ease',
            }}
          />
        ))}
      </div>
      <div style={{ margin: '9px 0 0', font: `400 11px ${font.ui}`, color: color.mutedGreen }}>
        {live ? 'Tap to keep looking' : 'Five of many'}
      </div>

      <div
        style={{
          margin: 'auto 0 0',
          paddingTop: 14,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div style={{ font: `400 12.5px/1.65 ${font.body}`, color: color.gold, maxWidth: 290 }}>
          Every past door stays open, so the depth grows month over month.
        </div>
        <button
          type="button"
          className="btn-primary"
          style={{ padding: '13px 40px', font: `600 13.5px ${font.ui}` }}
          onClick={go && (() => go('join'))}
        >
          Continue
        </button>
      </div>
    </Screen>
  )
}
