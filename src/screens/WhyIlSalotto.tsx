import { GoldCaps, Screen } from '../components/Screen'
import { PhotoFrame } from '../components/PhotoFrame'
import { color, font } from '../theme'
import type { ScreenProps } from '../navigation'

/** C. Why Il Salotto: a letter from the host, not a sales pitch. */
export function WhyIlSalotto({ go }: ScreenProps) {
  return (
    <Screen bodyStyle={{ padding: '24px 32px 26px', alignItems: 'center', textAlign: 'center' }}>
      <GoldCaps>WHY IL SALOTTO</GoldCaps>
      <h1 style={{ margin: '10px 0 0', font: `500 30px/1.2 ${font.serif}`, color: color.olive }}>
        The Italy I wish
        <br />
        I&rsquo;d known first.
      </h1>

      <PhotoFrame
        label="drop: you in Italy, or Florence"
        width={168}
        height={212}
        radius="84px 84px 6px 6px"
        innerRadius="77px 77px 4px 4px"
        border="1px solid rgba(200,107,74,.4)"
        pad={7}
        labelPad={18}
        style={{ margin: '18px 0 0' }}
      />

      <p
        style={{
          margin: '18px 0 0',
          font: `400 13.5px/1.75 ${font.body}`,
          color: color.ink,
          textWrap: 'pretty',
        }}
      >
        Most people fall in love with a fantasy of Italy, and the fantasy doesn&rsquo;t survive the real country. I
        know, because I came the same way. Then I spent a year in Florence studying Italy the way Italians study it, a
        full curriculum with Italian professors: history, literature, politics, art, language, all of it. It changed
        everything. I finally understood the place underneath the postcard.
      </p>
      <p
        style={{
          margin: '12px 0 0',
          font: `400 13.5px/1.75 ${font.body}`,
          color: color.ink,
          textWrap: 'pretty',
        }}
      >
        Il Salotto is the thing I wish I&rsquo;d had before I ever came. A door into the real Italy, walked through
        together.
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
