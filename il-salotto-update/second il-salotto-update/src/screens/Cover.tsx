import { PhotoFrame } from '../components/PhotoFrame'
import { color, font } from '../theme'

/** The title card that opens the mockup set. */
export function Cover() {
  return (
    <div
      style={{
        width: 1250,
        maxWidth: '100%',
        background: color.deepGreen,
        borderRadius: 24,
        padding: '70px 80px',
        display: 'flex',
        gap: 70,
        alignItems: 'center',
        boxShadow: '0 16px 40px rgba(42,57,44,.25)',
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ font: `600 11px ${font.ui}`, letterSpacing: 4, color: color.gold }}>
          YOUR BRIDGE TO ITALY PRESENTS
        </div>
        <div style={{ font: `400 96px/0.9 ${font.script}`, color: color.cream, margin: '26px 0 0' }}>Il Salotto</div>
        <div style={{ font: `italic 400 21px/1.5 ${font.serif}`, color: color.gold, margin: '14px 0 0' }}>
          The Italian sitting room, where we understand the real Italy together.
        </div>
        <p
          style={{
            font: `400 15px/1.75 ${font.body}`,
            color: color.creamGreenBody,
            margin: '24px 0 0',
            maxWidth: 520,
            textWrap: 'pretty',
          }}
        >
          Each month, one door opens. La Porta leads into the real Italy, a book, a city, a film, an artist, a piece of
          history, daily life. From it, three paths, I Sentieri, wander at your own depth. Notes are left, the room
          fills, and once a month we gather.
        </p>
        <div
          style={{
            display: 'flex',
            gap: 26,
            margin: '32px 0 0',
            font: `500 12px ${font.ui}`,
            color: color.mutedGreen,
          }}
        >
          <span>App UI mockup</span>
          <span>&middot;</span>
          <span>Nine screens</span>
          <span>&middot;</span>
          <span>Sample month: Svevo&rsquo;s Trieste</span>
        </div>
      </div>

      <PhotoFrame
        tone="green"
        label="drop: a warm doorway in Italy, light spilling out"
        photo="doorway"
        width={300}
        height={440}
        radius="150px 150px 0 0"
        innerRadius="140px 140px 0 0"
        border="1px solid rgba(201,162,74,.55)"
        pad={10}
        stripe={10}
        labelSize={11}
        labelPad={40}
        style={{ flex: 'none' }}
      />
    </div>
  )
}
