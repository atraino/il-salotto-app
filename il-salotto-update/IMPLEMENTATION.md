# Il Salotto, implemented

A React + Vite + TypeScript build of the Claude Design handoff in `project/Il Salotto Mockup.dc.html`.
Two views, same components:

- **Mockups** (default) is the static set: the cover card, then every screen in light phone frames,
  grouped by flow exactly as the design lays them out, plus the two paths still being written.
- **Clickable** is the tap-through prototype: one phone, real navigation, live notes and hearts.

Switch between them with the toggle at the top right, or by URL: `#/gallery` and `#/prototype`.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check and bundle into dist/
npm run preview  # serve the build
```

The four brand faces (Playfair Display, Lora, Karla, Italianno) are self-hosted through `@fontsource`
and imported in `src/main.tsx`. The woff2 files are bundled into `dist/`, so the app needs no network
at all and looks right offline. To add a weight, import it there, for example
`@fontsource/karla/700.css`.

## How it is put together

```
src/
  theme.ts              brand colors and font stacks, lifted from the design
  styles.css            phone frame, gallery chrome, buttons, transitions, form fields
  navigation.ts         ScreenId, the six nav items, and where each one leads
  components/
    Screen.tsx          PhoneFrame, Screen (status bar + body + nav), GoldCaps, RuledCaps
    BottomNav.tsx       the six-item bar, cream and deep-green tones
    StatusBar.tsx       9:41 and the battery sliver
    PhotoFrame.tsx      the labeled drop zones, plus the striped placeholder fill
    icons.tsx           door, path, pen, circle of chairs, calendar, archive box, resource icons
  screens/              one file per screen, plus index.ts (captions and flow groups)
  Gallery.tsx           the static mockup set
  Prototype.tsx         the clickable version
  App.tsx               header and the Mockups / Clickable switch
```

Every screen takes an optional `go` prop. The gallery renders screens without it, so they are plain,
non-interactive mockups; the prototype passes it, which is what turns buttons, cards, hearts, and the
bottom bar into working navigation. Screens that hold text entry (Login, Your notes, La
Conversazione) show the design's static placeholder copy in the gallery and real fields in the
prototype, styled to look identical.

## Photo frames

Every image is still an empty, labeled drop zone, with the design's wording kept word for word
("drop: a cozy room, books, soft light"). They are all `<PhotoFrame>`, so swapping in real
photography later is one component change: give `PhotoFrame` an optional `src` and render an `<img>`
with `object-fit: cover` inside the same arch, and every frame in the app picks it up at once.

## Notes on fidelity

Values come straight from the design file: 390 x 822 screens, the 54px phone radius, the arch radii,
the cream and deep-green alternation, type sizes and letter spacing, shadow values, and all copy
(no em-dashes anywhere, as briefed).

Changes made since the first pass, on request:

- **Continue buttons.** How it works, Why Il Salotto, and A peek inside now each end in a real
  terracotta Continue button, in both views, instead of a tap-anywhere gesture.
- **How it works** was rewritten: a clarifying line under the heading, the arched photo labeled as
  this month's doorway with the book named beneath it, and three equal paths marked with terracotta
  dots rather than i / ii / iii numbers, each with its Italian name, a small English gloss, and a
  line: IL LIBRO, IL LUOGO, L'ANIMA. La Conversazione and the no-pressure line still close it.
- **Paths that are still coming.** Il Libro and L'Anima open screen 4a and 4b: an "IN PREPARAZIONE"
  card that says the path opens soon and points at The City, which is open. On I Sentieri their cards
  read "Opens soon" instead of "Wander this path," so the state reads as intentional. Both screens
  come from one component, `screens/PathComing.tsx`.
- **Room to grow.** A screen body scrolls in the prototype once notes are added past 822px. In the
  gallery it stays fixed and clipped, the way the mockup does.

Login accepts any email and password, and nudges the field borders gold if either is empty.

## Wiring the real paths when the resources are ready

`screens/InsideAPath.tsx` is the finished shape: a `resources` array of icon, tint, title, and
detail, rendered as soft rows, with the fun-fact card and the note prompt beneath. To open Il Libro
or L'Anima, give it a path parameter the way `PathComing` takes one, move that path's entry in
`screens/ISentieri.tsx` from `target: 'pathBook'` to the real screen, and drop its `coming: true`.
The "Opens soon" label and the placeholder screen fall away on their own.
