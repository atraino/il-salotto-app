import type { NavId } from '../navigation'

type IconProps = { size?: number }

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.3,
} as const

/** Bottom-nav icons: door, path, pen, circle of chairs, calendar, archive box. */
export function DoorIcon({ size = 19 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...stroke}>
      <path d="M5 17V9a5 5 0 0 1 10 0v8" />
      <path d="M3 17h14" />
    </svg>
  )
}

export function PathIcon({ size = 19 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...stroke}>
      <path d="M4 17c6-2 2-7 7-8 4-.8 4-4 4-6" />
      <circle cx="4" cy="17" r="1.2" />
      <circle cx="15" cy="3" r="1.2" />
    </svg>
  )
}

export function PenIcon({ size = 19 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...stroke}>
      <path d="M4 16l1-4 9-9 3 3-9 9-4 1z" />
    </svg>
  )
}

export function ChairsIcon({ size = 19 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...stroke}>
      <circle cx="10" cy="10" r="6.5" />
      <circle cx="10" cy="4" r="1" />
      <circle cx="16" cy="10" r="1" />
      <circle cx="10" cy="16" r="1" />
      <circle cx="4" cy="10" r="1" />
    </svg>
  )
}

export function CalendarIcon({ size = 19 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...stroke}>
      <rect x="3" y="4" width="14" height="13" rx="1.5" />
      <path d="M3 8h14M7 2.5V5M13 2.5V5" />
    </svg>
  )
}

export function ArchiveIcon({ size = 19 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...stroke}>
      <rect x="3" y="7" width="14" height="9" rx="1" />
      <path d="M3 7l1.5-3h11L17 7M8 11h4" />
    </svg>
  )
}

/** Resource-row icons on the inside-a-path screen. */
export function BookIcon({ size = 17 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...stroke}>
      <path d="M10 4c-2-1.5-5-1.5-7 0v12c2-1.5 5-1.5 7 0 2-1.5 5-1.5 7 0V4c-2-1.5-5-1.5-7 0zM10 4v12" />
    </svg>
  )
}

export function PlayIcon({ size = 17 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...stroke}>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M8.5 7l4.5 3-4.5 3z" />
    </svg>
  )
}

export function PhotosIcon({ size = 17 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...stroke}>
      <rect x="3" y="4" width="14" height="12" rx="2" />
      <circle cx="7.5" cy="8.5" r="1.5" />
      <path d="M3 14l4-4 3 3 3-3 4 4" />
    </svg>
  )
}

export function MapIcon({ size = 17 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...stroke}>
      <path d="M7 4L3 5.5v10L7 14l6 2 4-1.5v-10L13 6zM7 4v10M13 6v10" />
    </svg>
  )
}

export function CameraIcon({ size = 15 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.4}>
      <rect x="2.5" y="5.5" width="15" height="11" rx="2" />
      <circle cx="10" cy="11" r="3" />
      <path d="M7 5.5l1.2-2h3.6l1.2 2" />
    </svg>
  )
}

export const navIcons: Record<NavId, (props: IconProps) => JSX.Element> = {
  home: DoorIcon,
  paths: PathIcon,
  notes: PenIcon,
  conversazione: ChairsIcon,
  gathering: CalendarIcon,
  archive: ArchiveIcon,
}
