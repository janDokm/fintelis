# Fintelis Workspace (skeleton)

Sibling project to `fintelis-main`. Nothing in the original was modified.
Shares your brand tokens (`@theme` copied verbatim), fonts, lucide + motion stack, and **reuses `Magnetic`, `TextScramble` and `CustomCursor` verbatim**.
Patterns lifted from fintelis-main: eyebrow labels, gradient headlines, grid + ring backdrops, glass tilt cards (`TiltCard` from Services), ticker (`Ticker` from Marquee), pill CTAs.
One deliberate deviation: the custom cursor is not hidden over inputs/selects, so text editing keeps a native caret.

    npm install && npm run dev      # http://localhost:3001

## Routes (hash router, `src/lib/router.tsx`)
| Route | Page |
|---|---|
| `#/login`, `#/signup` | `pages/Auth.tsx` (UI only) |
| `#/` | `pages/Dashboard.tsx` |
| `#/sheet` | `pages/Sheet.tsx` |
| `#/documents`, `#/workflows`, `#/reports` | `pages/Placeholder.tsx` (scaffolded) |

## Where to build next
- `src/lib/data.ts`: mock data and column schema. Replace with API calls.
- `src/components/ui.tsx`: Button, Pill, Avatar, Logo, Kbd. Add new primitives here.
- `src/components/Shell.tsx`: top nav, ⌘K palette, account menu. Edit `NAV` to add pages.

## Sheet: what is wired vs. decorative
Wired: cell select / range drag / shift-arrows, type-to-edit, Enter / Tab / Esc, typed editors per column type,
bulk status/owner from the contextual bar, details panel edits, column show/hide, add row, range Sum/Average/Count, panel toggles.
Decorative (visual only): menu bar, most toolbar buttons, views, saved filters, sheet tabs, add column, share, history.

## Light / dark mode
`src/lib/theme.ts` toggles a `light` class on `<html>` and remembers the choice (localStorage `fintelis-theme`, default dark).
The light palette is the `:root.light` block in `src/index.css`. Every `white/xx` utility reads `--color-white`, which flips to ink in light mode,
so new pages switch automatically. Avoid hard-coded hex/rgba colours in components; use the brand tokens.
Switches: sidebar header, front-door pages, Profile > Appearance, and Ctrl/Cmd+K.

## Profile editing
`updateMyProfile()` in `src/lib/auth.tsx` writes display name, NRIC/passport, internship dates and focus residence to Firestore `users/{email}`
(and the display name to Firebase Auth). Email is the primary key and is read-only. Firestore rules must let a person write their own document:

    match /users/{email} {
      allow read, write: if request.auth != null && request.auth.token.email.lower() == email;
    }
