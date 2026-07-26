import type { ScreenId, ScreenProps } from '../navigation'
import { Landing } from './Landing'
import { HowItWorks } from './HowItWorks'
import { WhyIlSalotto } from './WhyIlSalotto'
import { PeekInside } from './PeekInside'
import { Join } from './Join'
import { Login } from './Login'
import { Entering } from './Entering'
import { Home } from './Home'
import { LaPorta } from './LaPorta'
import { ISentieri } from './ISentieri'
import { InsideAPath } from './InsideAPath'
import { PathComing, comingPaths } from './PathComing'
import { YourNotes } from './YourNotes'
import { LaConversazione } from './LaConversazione'
import { Gathering } from './Gathering'
import { Archive } from './Archive'

type ScreenEntry = {
  /** The caption printed under the phone in the gallery. */
  caption: string
  Component: (props: ScreenProps) => JSX.Element
}

export const screens: Record<ScreenId, ScreenEntry> = {
  landing: { caption: 'A · Landing hero', Component: Landing },
  howItWorks: { caption: 'B · How it works', Component: HowItWorks },
  why: { caption: 'C · Why Il Salotto', Component: WhyIlSalotto },
  peek: { caption: 'D · A peek inside', Component: PeekInside },
  join: { caption: 'E · Join', Component: Join },
  login: { caption: 'F · Login', Component: Login },
  entering: { caption: '1 · You’re in', Component: Entering },
  home: { caption: '2 · Il Salotto, the room', Component: Home },
  porta: { caption: '3 · This month: La Porta', Component: LaPorta },
  sentieri: { caption: '4 · I Sentieri', Component: ISentieri },
  path: { caption: '5 · Inside a path: Il Luogo', Component: InsideAPath },
  pathBook: {
    caption: '5a · Il Libro, coming',
    Component: (props) => PathComing({ ...props, path: comingPaths.book }),
  },
  pathSoul: {
    caption: '5b · L’Anima, coming',
    Component: (props) => PathComing({ ...props, path: comingPaths.soul }),
  },
  notes: { caption: '6 · Your notes', Component: YourNotes },
  conversazione: { caption: '7 · La Conversazione', Component: LaConversazione },
  gathering: { caption: '8 · The Gathering', Component: Gathering },
  archive: { caption: '9 · The Archive', Component: Archive },
}

/** The screens grouped by flow, the way the design lays them out. */
export const groups: { num: string; name: string; ids: ScreenId[] }[] = [
  {
    num: '0',
    name: 'The front door: landing, joining, logging in',
    ids: ['landing', 'howItWorks', 'why', 'peek', 'join', 'login'],
  },
  { num: 'I', name: 'Arrive: the room itself', ids: ['entering', 'home'] },
  {
    num: 'II',
    name: 'The month: one door, three paths',
    ids: ['porta', 'sentieri', 'path', 'pathBook', 'pathSoul'],
  },
  { num: 'III', name: 'The room: notes and conversation', ids: ['notes', 'conversazione'] },
  { num: 'IV', name: 'The rhythm: gathering and archive', ids: ['gathering', 'archive'] },
]
