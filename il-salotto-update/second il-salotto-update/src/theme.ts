/**
 * Brand tokens for Il Salotto, taken straight from the design export
 * (project/Il Salotto Mockup.dc.html).
 */

export const color = {
  cream: '#F6F1E8',
  creamCard: '#FDFAF3',
  creamButtonText: '#FBF6EC',
  terracotta: '#C86B4A',
  terracottaLight: '#E0885F',
  olive: '#6F7D4E',
  gold: '#C9A24A',
  goldDeep: '#A8863B',
  deepGreen: '#2A392C',
  ink: '#262626',
  inkSoft: '#4a463f',
  muted: '#8b8172',
  mutedWarm: '#9a8f7c',
  /** muted text on deep green */
  mutedGreen: '#93a08b',
  /** body text on deep green */
  creamGreenBody: '#D8DCCB',
  /** placeholder labels on deep green */
  placeholderGreen: '#B9C4B3',
  pageBackground: '#EFE9DD',
} as const

export const font = {
  serif: "'Playfair Display', serif",
  body: 'Lora, serif',
  ui: 'Karla, sans-serif',
  script: 'Italianno, cursive',
  mono: 'ui-monospace, Menlo, monospace',
} as const

/** Screen geometry: a 390 x 822 portrait screen inside a light phone frame. */
export const screen = {
  width: 390,
  height: 822,
} as const
