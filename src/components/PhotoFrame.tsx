import { useState, type CSSProperties, type ReactNode } from 'react'
import { color, font } from '../theme'

export type Tone = 'cream' | 'green'

/** The striped placeholder fill that stands in for a photo not yet dropped in. */
export function stripes(tone: Tone, size = 8): string {
  const [a, b] = tone === 'green' ? ['#374738', '#3E5040'] : ['#EDE4D3', '#F2EBDD']
  return `repeating-linear-gradient(45deg,${a},${a} ${size}px,${b} ${size}px,${b} ${size * 2}px)`
}

export function placeholderInk(tone: Tone): string {
  return tone === 'green' ? color.placeholderGreen : color.mutedWarm
}

type PhotoFrameProps = {
  /** The drop-zone instruction, e.g. "drop: a cozy room, books, soft light". */
  label: string
  /**
   * Basename of a real photo in public/photos, without extension. When the file
   * is there it fills the frame; when it isn't, the labeled placeholder shows,
   * so the app is never broken by a missing image.
   */
  photo?: string
  /** "contain" keeps a whole book cover visible; "cover" fills the arch. */
  fit?: 'cover' | 'contain'
  tone?: Tone
  width?: number | string
  height: number | string
  /** Outer radius, e.g. "136px 136px 10px 10px" for an arch. */
  radius: string
  /** Radius of the striped plate inside the hairline border. */
  innerRadius?: string
  /** Hairline border around the frame, omitted for bare plates. */
  border?: string
  /** Gap between the hairline border and the plate. */
  pad?: number
  stripe?: number
  labelSize?: number
  /** Horizontal breathing room around the label text. */
  labelPad?: number
  style?: CSSProperties
  plateStyle?: CSSProperties
  /** Content laid over the plate, such as the Porta title block. */
  children?: ReactNode
}

/**
 * An empty, labeled photo frame. Every image in Il Salotto is a drop zone the
 * host fills with her own warm, real Italy photography.
 */
export function PhotoFrame({
  label,
  photo,
  fit = 'cover',
  tone = 'cream',
  width,
  height,
  radius,
  innerRadius,
  border,
  pad = 8,
  stripe = 8,
  labelSize = 8.5,
  labelPad = 20,
  style,
  plateStyle,
  children,
}: PhotoFrameProps) {
  const [missing, setMissing] = useState(false)
  const showPhoto = Boolean(photo) && !missing

  const plate = (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: innerRadius ?? radius,
        background: showPhoto ? undefined : stripes(tone, stripe),
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...plateStyle,
      }}
    >
      {showPhoto && (
        <img
          src={`/photos/${photo}.jpg`}
          alt={label.replace(/^drop:\s*/, '')}
          onError={() => setMissing(true)}
          style={{ width: '100%', height: '100%', objectFit: fit, display: 'block' }}
        />
      )}
      {!showPhoto && (children ?? (
        <span
          style={{
            font: `${labelSize}px ${font.mono}`,
            color: placeholderInk(tone),
            textAlign: 'center',
            padding: `0 ${labelPad}px`,
          }}
        >
          {label}
        </span>
      ))}
    </div>
  )

  if (!border) {
    return (
      <div style={{ width, height, ...style }} aria-label={label}>
        {plate}
      </div>
    )
  }

  return (
    <div style={{ width, height, borderRadius: radius, border, padding: pad, ...style }} aria-label={label}>
      {plate}
    </div>
  )
}
