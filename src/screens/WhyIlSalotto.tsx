import { Screen } from '../components/Screen'
import { PhotoFrame } from '../components/PhotoFrame'
import { color, font } from '../theme'
import type { ScreenProps } from '../navigation'

/*
 * The words on this screen are Alexis's, finalised, and are not to be
 * rewritten or tightened. Sizes here are chosen so the whole letter sits on
 * one screen; if something has to give, move the type, not the words.
 */
const paragraph = {
  margin: '10px 0 0',
  font: `400 11px/1.62 ${font.body}`,
  color: color.ink,
  textAlign: 'left',
  textWrap: 'pretty',
} as const

/** C. Why Il Salotto: a letter from the host, not a sales pitch. */
export function WhyIlSalotto({ go }: ScreenProps) {
  return (
    <Screen bodyStyle={{ padding: '10px 28px 14px', alignItems: 'center', textAlign: 'center' }}>
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
        <div style={{ font: `400 36px/1.05 ${font.script}`, color: color.terracotta }}>
          Benvenuti nel salotto.
        </div>

        {/* the photograph carries this screen: give it the room to */}
        <PhotoFrame
          label="drop: you in Italy, or Florence"
          photo="alexis"
          width={196}
          height={244}
          radius="98px 98px 7px 7px"
          innerRadius="91px 91px 5px 5px"
          border="1px solid rgba(200,107,74,.42)"
          pad={7}
          labelPad={20}
          style={{ margin: '10px 0 0', flex: 'none' }}
        />

        <div style={{ margin: '11px 0 0', font: `italic 400 15.5px/1.4 ${font.serif}`, color: color.goldDeep }}>
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

        <div style={{ margin: '11px 0 0', font: `italic 400 14px/1.4 ${font.serif}`, color: color.olive }}>
          There&rsquo;s a seat for you.
        </div>

        {/* signed, the way a letter is */}
        <div style={{ margin: '2px 0 0', font: `400 42px/1.1 ${font.script}`, color: color.terracotta }}>Alexis</div>
      </div>

      <div style={{ flex: 'none', paddingTop: 10 }}>
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
