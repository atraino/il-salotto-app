import { BackLink, Screen } from '../components/Screen'
import { PhotoFrame } from '../components/PhotoFrame'
import { color, font } from '../theme'
import type { ScreenProps } from '../navigation'

/*
 * The words on this screen are Alexis's, finalised, and are not to be
 * rewritten or tightened. Sizes are chosen to fit the shortest viewport this
 * has to survive — Safari with its address bar showing, about 720pt — because
 * that is where her signature was being cut off. If something has to give,
 * move the type, not the words.
 */
const paragraph = {
  margin: '9px auto 0',
  font: `400 10.5px/1.58 ${font.body}`,
  color: color.ink,
  textAlign: 'center',
  maxWidth: 300,
  textWrap: 'balance',
} as const

/** C. Why Il Salotto: a letter from the host, not a sales pitch. */
export function WhyIlSalotto({ go }: ScreenProps) {
  return (
    <Screen scrollable bodyStyle={{ padding: '8px 26px 12px', alignItems: 'center', textAlign: 'center' }}>
      <BackLink go={go} to="howItWorks" label="How it works" />

      <div
        style={{
          flex: '1 1 auto',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {/*
          Italianno is drawn with one hairline weight, so it cannot simply be
          made bold. A little stroke on the letterforms thickens it, and a
          deeper terracotta gives it the contrast it was missing on cream.
        */}
        <div
          style={{
            font: `400 40px/1.05 ${font.script}`,
            color: '#A85536',
            WebkitTextStroke: '0.4px #A85536',
            marginTop: 2,
          }}
        >
          Benvenuti nel salotto.
        </div>

        <PhotoFrame
          label="drop: you in Italy, or Florence"
          photo="alexis"
          width={168}
          height={210}
          radius="84px 84px 6px 6px"
          innerRadius="78px 78px 4px 4px"
          border="1px solid rgba(200,107,74,.42)"
          pad={6}
          labelPad={18}
          style={{ margin: '8px 0 0', flex: 'none' }}
        />

        <div style={{ margin: '9px 0 0', font: `italic 400 14.5px/1.35 ${font.serif}`, color: color.goldDeep }}>
          Sono felice che tu sia qui.
        </div>

        <p style={paragraph}>
          I&rsquo;m Alexis, an Italian-American writer and artist. I moved to Italy three years ago, the way most
          people come, in love with an idea of Italy. Then I got to study it deeply, the way Italians study their own
          country: its literature, history, art, politics, language, and daily life. And I stayed, and lived it. The
          real Italy turned out to be deeper and more complicated and more beautiful than the one I&rsquo;d imagined.
        </p>
        <p style={paragraph}>
          Il Salotto is a place to get to know the real Italy, together. Whether you&rsquo;re planning to move,
          you&rsquo;re Italian and want to join and share your own culture, or you simply love Italy and want to know
          it more, you belong here. No background needed, just curiosity. I&rsquo;m still learning too, and I made
          this so we could explore it alongside each other.
        </p>

        <div style={{ margin: '9px 0 0', font: `italic 400 13.5px/1.35 ${font.serif}`, color: color.olive }}>
          There&rsquo;s a seat for you.
        </div>

        {/* signed, the way a letter is — and never clipped by the button below */}
        <div style={{ margin: '0', font: `400 38px/1.15 ${font.script}`, color: color.terracotta, flex: 'none' }}>
          Alexis
        </div>
      </div>

      <div style={{ flex: 'none', paddingTop: 8 }}>
        <button
          type="button"
          className="btn-primary"
          style={{ padding: '12px 38px', font: `600 13px ${font.ui}` }}
          onClick={go && (() => go('peek'))}
        >
          Continue
        </button>
      </div>
    </Screen>
  )
}
