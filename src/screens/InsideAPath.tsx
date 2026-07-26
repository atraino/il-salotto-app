import type { ReactNode } from 'react'
import { GoldCaps, Screen } from '../components/Screen'
import { BookIcon, MapIcon, PhotosIcon, PlayIcon } from '../components/icons'
import { color, font } from '../theme'
import type { ScreenProps } from '../navigation'

type Resource = {
  icon: ReactNode
  tint: string
  ink: string
  title: string
  detail: string
}

const resources: Resource[] = [
  {
    icon: <BookIcon />,
    tint: 'rgba(111,125,78,.14)',
    ink: color.olive,
    title: 'A reading',
    detail: 'Trieste, the city that faced away · 12 min',
  },
  {
    icon: <PlayIcon />,
    tint: 'rgba(200,107,74,.13)',
    ink: color.terracotta,
    title: 'A short film',
    detail: 'The bora wind through the streets · 6 min',
  },
  {
    icon: <PhotosIcon />,
    tint: 'rgba(201,162,74,.16)',
    ink: color.goldDeep,
    title: 'A few photographs',
    detail: 'The canal, the caffè, the sea · 9 photos',
  },
  {
    icon: <MapIcon />,
    tint: 'rgba(42,57,44,.1)',
    ink: color.deepGreen,
    title: 'A map',
    detail: 'Walk Zeno’s Trieste, six places',
  },
]

/** 4. Inside a path, shown with THE CITY open as the example. */
export function InsideAPath({ go }: ScreenProps) {
  return (
    <Screen nav="paths" go={go} bodyStyle={{ padding: '18px 26px 0' }}>
      <button
        type="button"
        className="btn-quiet tappable"
        onClick={go && (() => go('sentieri'))}
        style={{ display: 'flex', alignItems: 'center', gap: 6, font: `500 11px ${font.ui}`, color: color.muted }}
      >
        <span>&lsaquo;</span>
        <span>I Sentieri</span>
      </button>

      <GoldCaps size={10} spacing={3} style={{ margin: '12px 0 0' }}>
        THE CITY
      </GoldCaps>
      <h1 style={{ margin: '4px 0 0', font: `500 30px/1.1 ${font.serif}`, color: color.ink }}>Trieste</h1>
      <div style={{ margin: '8px 0 0', font: `italic 400 14px/1.5 ${font.serif}`, color: color.olive }}>
        A city at the edge of Italy, and never only Italian.
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 9,
          margin: '16px 0 0',
          flex: '1 1 auto',
          justifyContent: 'space-evenly',
          minHeight: 0,
        }}
      >
        {resources.map((resource) => (
          <div
            key={resource.title}
            className={go ? 'card-tappable' : undefined}
            style={{
              background: color.creamCard,
              borderRadius: 14,
              padding: '13px 15px',
              display: 'flex',
              gap: 13,
              alignItems: 'center',
              boxShadow: '0 2px 8px rgba(38,38,38,.04)',
            }}
          >
            <div
              style={{
                flex: 'none',
                width: 38,
                height: 38,
                borderRadius: 19,
                background: resource.tint,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: resource.ink,
              }}
            >
              {resource.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ font: `600 12.5px ${font.ui}`, color: color.ink }}>{resource.title}</div>
              <div style={{ font: `400 11px ${font.ui}`, color: color.muted, marginTop: 2 }}>{resource.detail}</div>
            </div>
            <span style={{ color: color.terracotta, font: `600 14px ${font.ui}` }}>&rsaquo;</span>
          </div>
        ))}
      </div>

      <div
        style={{
          margin: '14px 0 0',
          background: 'rgba(201,162,74,.1)',
          border: '1px solid rgba(201,162,74,.35)',
          borderRadius: 14,
          padding: '13px 16px',
        }}
      >
        <div style={{ font: `400 22px/1 ${font.script}`, color: color.goldDeep }}>did you know?</div>
        <p style={{ margin: '5px 0 0', font: `400 12px/1.6 ${font.body}`, color: color.inkSoft }}>
          Svevo was James Joyce&rsquo;s English student in Trieste. When Italy ignored his novel, it was Joyce who
          championed it to the world.
        </p>
      </div>

      <div
        style={{
          margin: 'auto 0 0',
          padding: '16px 0 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div style={{ font: `italic 400 14.5px ${font.serif}`, color: color.deepGreen }}>
          What did this stir in you?
        </div>
        <button
          type="button"
          className="btn-primary"
          style={{ borderRadius: 20, padding: '10px 22px', font: `600 12.5px ${font.ui}` }}
          onClick={go && (() => go('notes'))}
        >
          Leave a note
        </button>
      </div>
    </Screen>
  )
}
