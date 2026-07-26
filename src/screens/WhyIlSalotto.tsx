import { GoldCaps, Screen } from '../components/Screen'
import { PhotoFrame } from '../components/PhotoFrame'
import { color, font } from '../theme'
import type { ScreenProps } from '../navigation'

/*
 * Left aligned, unlike the headings above them. Centred text is fine for a
 * line or two of flourish and punishing for three paragraphs: every line
 * starts in a different place and the eye has to hunt for it.
 */
const paragraph = {
  margin: '13px 0 0',
  font: `400 13px/1.75 ${font.body}`,
  color: color.ink,
  textAlign: 'left',
  textWrap: 'pretty',
} as const

/** C. Why Il Salotto: a letter from the host, not a sales pitch. */
export function WhyIlSalotto({ go }: ScreenProps) {
  return (
    <Screen
      scrollable
      bodyStyle={{ padding: '24px 32px 26px', alignItems: 'center', textAlign: 'center' }}
    >
      <GoldCaps>WHY IL SALOTTO</GoldCaps>
      <h1 style={{ margin: '10px 0 0', font: `500 30px/1.2 ${font.serif}`, color: color.olive }}>
        The Italy I wish
        <br />
        I&rsquo;d known first.
      </h1>

      <PhotoFrame
        label="drop: you in Italy, or Florence"
        photo="alexis"
        width={146}
        height={184}
        radius="73px 73px 6px 6px"
        innerRadius="66px 66px 4px 4px"
        border="1px solid rgba(200,107,74,.4)"
        pad={7}
        labelPad={18}
        /* smaller than it was: the letter grew, and the words are the point */
        style={{ margin: '16px 0 0', flex: 'none' }}
      />

      <p style={paragraph}>
        Most people fall in love with a fantasy of Italy, and the fantasy doesn&rsquo;t survive the real country. I
        know, because I came the same way. Then I spent a year in Florence studying Italy the way Italians study it,
        with Italian professors: history, literature, politics, art, language. It changed everything. I finally
        understood the place underneath the postcard.
      </p>
      <p style={paragraph}>
        Il Salotto is for anyone curious about Italy, in any way at all. If you are planning to move, this is the
        groundwork nobody hands you. If you are Italian, come and sit with us and bring your own: your region, your
        books, the things outsiders always get wrong. And if you have no plans to go anywhere and simply love this
        country, its art and its writers, you belong here exactly as much.
      </p>
      <p style={paragraph}>
        It is not a literature club. A book is only ever the door, and through it we get at a city, a history, an
        argument, an ordinary Tuesday. Nor is it a course to sit through: we learn from each other, and the room is
        at its best when someone says the thing the rest of us had not thought of.
      </p>
      <div style={{ margin: '14px 0 0', font: `400 40px/1 ${font.script}`, color: color.terracotta }}>Alexis</div>

      <div style={{ margin: 'auto 0 0', paddingTop: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <div style={{ font: `italic 400 13px ${font.serif}`, color: color.muted }}>
          Come sit a while. The door is open.
        </div>
        <button
          type="button"
          className="btn-primary"
          style={{ padding: '13px 40px', font: `600 13.5px ${font.ui}` }}
          onClick={go && (() => go('peek'))}
        >
          Continue
        </button>
      </div>
    </Screen>
  )
}
