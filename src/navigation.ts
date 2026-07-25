/** Every screen in the mockup set, in flow order. */
export type ScreenId =
  | 'landing'
  | 'howItWorks'
  | 'why'
  | 'peek'
  | 'join'
  | 'login'
  | 'welcome'
  | 'porta'
  | 'sentieri'
  | 'path'
  /** the two paths still waiting on their resources */
  | 'pathBook'
  | 'pathSoul'
  | 'notes'
  | 'conversazione'
  | 'gathering'
  | 'archive'

/** The six items in the in-app bottom bar. */
export type NavId = 'thisMonth' | 'paths' | 'notes' | 'conversazione' | 'gathering' | 'archive'

export const navTarget: Record<NavId, ScreenId> = {
  thisMonth: 'welcome',
  paths: 'sentieri',
  notes: 'notes',
  conversazione: 'conversazione',
  gathering: 'gathering',
  archive: 'archive',
}

/**
 * Screens receive `go` only in the clickable prototype. In the static gallery it
 * is undefined, so every screen renders as a plain, non-interactive mockup.
 */
export type ScreenProps = {
  go?: (screen: ScreenId) => void
}
