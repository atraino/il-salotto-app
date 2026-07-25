# Il Salotto

The app UI for **Il Salotto**, the monthly Italian learning experience inside Your Bridge to Italy.
Each month one door opens, La Porta, and three paths lead deeper into it, I Sentieri.

Built in React + Vite + TypeScript from the Claude Design mockups in `project/`.

## Two views

- **Mockups** — the full set of screens in light phone frames, grouped by flow. The default on a
  laptop.
- **Clickable** — the same screens with real navigation, live notes and hearts. The default on a
  phone.

Switch with the toggle at the top right, or by URL: `#/gallery` and `#/prototype`.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
```

## Building

```bash
npm run build           # standard build into dist/, this is what Vercel deploys
npm run preview         # serve that build locally
npm run build:artifact  # one self-contained HTML file in dist-single/, for sharing
npm run typecheck       # types only, no build
```

`build:artifact` inlines everything, fonts included, into a single file that opens straight from
disk with no server and no network. Handy for sending the prototype to someone.

## Deploying to Vercel

Vercel detects Vite on its own. If it ever asks:

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |

Every push to `main` redeploys. Pull requests get their own preview URL.

## Where things are

```
src/
  theme.ts          brand colors and font stacks
  styles.css        phone frame, gallery chrome, buttons, responsive scaling
  navigation.ts     the screens, the six nav items, and where each one leads
  components/       PhoneFrame, Screen, BottomNav, StatusBar, PhotoFrame, icons
  screens/          one file per screen, plus index.ts (captions and flow groups)
  fonts/            Playfair Display, Lora, Karla, Italianno, self-hosted
project/            the original Claude Design mockups and uploads
docs/               the design handoff notes and the chat transcript
IMPLEMENTATION.md   how the build maps to the design, and what to change next
```

Photos are still empty labeled drop zones. `IMPLEMENTATION.md` explains the one-component swap that
turns them into real images, and how to open the two paths that are still in preparazione.

## The database

Notes, posts, and hearts live in Supabase, with email magic-link sign-in. Without keys the app runs
as a prototype: the sample room, nothing saved. See `docs/SUPABASE-SETUP.md` for the twenty-minute
setup, and `supabase/schema.sql` for the tables and their security policies.

```bash
cp .env.example .env.local   # then paste your Supabase URL and anon key
```

## Installing to a phone

The app is a PWA: `public/manifest.webmanifest`, `public/sw.js`, and the door icons. On iPhone, open
it in Safari, tap Share, then **Add to Home Screen**; on Android, Chrome offers to install it. It
opens full-screen with no browser bars, and the service worker always checks the network for the
page itself, so a deploy is live immediately rather than stuck behind a cached copy.
