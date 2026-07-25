import { GoldCaps, Screen } from '../components/Screen'
import { PhotoFrame } from '../components/PhotoFrame'
import { color, font } from '../theme'
import type { ScreenId, ScreenProps } from '../navigation'

const rooms: { caps: string; title: string; line: string; target: ScreenId }[] = [
  {
    caps: 'LA CONVERSAZIONE',
    title: 'The table',
    line: 'Paola asked the room a question this morning',
    target: 'conversazione',
  },
  {
    caps: 'L’INCONTRO',
    title: 'We gather Sunday',
    line: 'July 26 · 6:00 pm CET, around the table',
    target: 'gathering',
  },
]

/**
 * Home: Il Salotto itself, the room you walk into. This month lives one tap
 * deeper, so the sitting room and the current door are never the same place.
 */
export function Home({ go }: ScreenProps) {
  return (
    <Screen nav="home" go={go} bodyStyle={{ padding: '18px 24px 0' }}>
      <div style={{ textAlign: 'center', flex: 'none' }}>
        <GoldCaps size={9.5} spacing={3.5}>
          YOUR BRIDGE TO ITALY
        </GoldCaps>
        <div style={{ font: `400 54px/0.95 ${font.script}`, color: color.terracotta, margin: '6px 0 0' }}>
          Il Salotto
        </div>
        <div style={{ margin: '2px 0 0', font: `italic 400 13.5px/1.45 ${font.serif}`, color: color.deepGreen }}>
          The Italian sitting room. Come in, it&rsquo;s warm.
        </div>
      </div>

      {/* the room itself */}
      <div
        style={{
          flex: '1 1 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px 0 12px',
          minHeight: 0,
        }}
      >
        <PhotoFrame
          label="drop: a cozy room, books, soft afternoon light"
          photo="salotto-opening"
          width="auto"
          height="100%"
          radius="110px 110px 10px 10px"
          innerRadius="103px 103px 6px 6px"
          border="1px solid rgba(200,107,74,.4)"
          stripe={9}
          labelSize={9.5}
          labelPad={30}
          style={{ aspectRatio: '220 / 236', maxHeight: 236, minHeight: 124 }}
        />
      </div>

      {/* this month's door, one tap deeper */}
      <div
        className={go ? 'card-tappable' : undefined}
        onClick={go && (() => go('porta'))}
        style={{
          background: color.deepGreen,
          borderRadius: 18,
          padding: 14,
          display: 'flex',
          gap: 14,
          alignItems: 'center',
          boxShadow: '0 4px 16px rgba(42,57,44,.22)',
          flex: 'none',
        }}
      >
        <PhotoFrame
          tone="green"
          label="drop: an old doorway in Trieste"
          photo="trieste-doorway"
          width={62}
          height={82}
          radius="31px 31px 5px 5px"
          stripe={7}
          labelSize={6.5}
          labelPad={6}
          style={{ flex: 'none' }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ font: `600 9px ${font.ui}`, letterSpacing: 2.5, color: color.gold }}>LA PORTA DEL MESE</div>
          <div style={{ margin: '4px 0 0', font: `500 19px/1.15 ${font.serif}`, color: color.cream }}>
            Svevo&rsquo;s Trieste
          </div>
          <div style={{ margin: '3px 0 0', font: `italic 400 12px ${font.serif}`, color: color.gold }}>
            The Italy that was barely Italy.
          </div>
        </div>
        <span style={{ color: color.terracottaLight, font: `600 15px ${font.ui}` }}>&rsaquo;</span>
      </div>

      <button
        type="button"
        className="btn-primary"
        style={{ margin: '10px 0 0', width: '100%', padding: '14px 0', flex: 'none' }}
        onClick={go && (() => go('porta'))}
      >
        Enter this month
      </button>

      {/* the rest of the room, quietly */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '12px 0 0', flex: 'none' }}>
        {rooms.map((room) => (
          <div
            key={room.caps}
            className={go ? 'card-tappable' : undefined}
            onClick={go && (() => go(room.target))}
            style={{
              background: color.creamCard,
              borderRadius: 14,
              padding: '11px 14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10,
              boxShadow: '0 2px 8px rgba(38,38,38,.04)',
            }}
          >
            <div>
              <div style={{ font: `600 8.5px ${font.ui}`, letterSpacing: 2.2, color: color.goldDeep }}>{room.caps}</div>
              <div style={{ margin: '3px 0 0', font: `500 14px ${font.serif}`, color: color.ink }}>{room.title}</div>
              <div style={{ margin: '2px 0 0', font: `400 10.5px ${font.ui}`, color: color.muted }}>{room.line}</div>
            </div>
            <span style={{ color: color.terracotta, font: `600 14px ${font.ui}` }}>&rsaquo;</span>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: '12px 0 10px',
          textAlign: 'center',
          font: `italic 400 12.5px ${font.serif}`,
          color: color.muted,
          flex: 'none',
        }}
      >
        Wander at your own depth. Nothing here expires.
      </div>
    </Screen>
  )
}
