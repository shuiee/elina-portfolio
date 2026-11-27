# Style guide

The contract for this site's design. `src/styles/tokens.css` is the single
source of truth; this file explains how to use it and, more usefully, why it is
shaped the way it is. If the two ever disagree, the tokens are right and this
file is stale.

Run `npm run check:tokens` before committing. It is the only enforcement there
is — this project has no linter.

---

## The rule

**Nothing in a component is a raw hex, px, or ms.** Every value traces back to a
token. There are four exemptions, and they are exemptions because a token would
make the design *worse*, not because the rule is inconvenient:

1. **Values relative to the element's own type.** `padding: 0.3em 0.8em` on a
   control scales with that control's font size. Freeze it to a px token and the
   control stops fitting its own label the moment the label changes size.
2. **Drawing a physical object.** A phone bezel's `26px` radius is a fact about
   phones. It is not a design decision and has no business in the token file.
3. **Hit-target padding cancelled by a negative margin.** The numbers come from
   the line geometry they are correcting, not from the spacing scale.
4. **The reduced-motion kill switch** (`0.01ms !important`).

Mark any of these in the code with `/* literal-ok: why */` on the same line.
Always say why. The next person has to be able to judge whether it still holds.

---

## Colour

| Token | Value | Use |
|---|---|---|
| `--paper` | `#FCFCFA` | the page |
| `--field` | `#FFFFFF` | true white behind screenshots and scans |
| `--ink` | `#111111` | body and headings — 18.4:1 on paper |
| `--ink-quiet` | `#454950` | dates, roles, meta — 8.8:1. **The only grey allowed to touch type.** There is no third tier; if something needs to be quieter, cut it. |
| `--edge` | `#B3B1AC` | the border of a **static** panel: a Stop card, a stage, a badge (2.09:1) |
| `--edge-strong` | `#94928D` | the border of anything a reader can **operate**: a button, a card that is a link (3.03:1) |
| `--panel-fill` | `rgba(60,50,38,.03)` | the faint tint on a content panel — translucent, so the page ruling runs through it |
| `--rule` | `#C9C7C2` | **decorative** lines: table gridlines, row separators, the nav underline |
| `--ink-wash` | `rgba(60,50,38,.07)` | the page ruling and the inline-code chip |
| `--accent` / `--accent-ink` | per project | set by `[data-accent]`; never on the chassis |

**Three border roles, and picking the wrong one is the easiest mistake here.**
On a near-white page `--field` and `--paper` differ by 1.03:1, so a panel does
not separate from the page by luminance at all. Ask what the border is doing:

- Does it identify something the reader can **operate** — a button, a card that
  is a link? Then WCAG 1.4.11 applies and the border carries 3:1 itself:
  `--edge-strong`.
- Does it bound a **static** panel that its own heading already identifies?
  `--edge`, plus `--panel-fill` so the panel is findable by area as well as by
  edge. 1.4.11 does not govern this, but two cues beat one.
- Does it merely **divide** two bits of content, with nothing depending on
  seeing it? `--rule`.

**A faint fill cannot substitute for a compliant border.** This is worth
stating because it is counter-intuitive and I got it wrong once: ink over
`--paper` only reaches 3:1 somewhere past 50% opacity, which is a mid-grey
panel, not a faint one. A fill is a second cue. Where a border identifies a
control, the border does the contrast.

**`--panel-fill` is translucent on purpose.** An opaque panel background stops
the page ruling at its edge, which puts lines everywhere except under the
writing — backwards. Never swap it for a solid colour.

**Every text colour clears 7:1 on both grounds.** That is the site's own bar and
it is stricter than WCAG AA's 4.5:1. Keep it. If you change a colour, recompute
the ratio and update the number recorded beside it in `tokens.css`.

## Type

Three faces, each with a job:

- **Figtree** (`--font-text`) — everything that is read. Body, headings, controls, the question that opens a project.
- **Beth Ellen** (`--font-hand`) — page titles only, lowercase. The name of the page, written onto the sheet.
- **Optician Sans** (`--font-figure`) — digits and 2–3 word markers only. It is the face used in clinical visual-acuity testing, which is the benchmark project 01 measured against. It never sets running text.

Scale is 1.2, `--size-1` (13px) to `--size-11` (232px). `--size-4` (18px) is the
primary body size. Nothing below `--size-1` sets text anywhere.

**Body text sits on `--rule-step` (28px)**, not on a ratio, so it keeps a fixed
relationship to the page ruling instead of sliding against it down a long page.
Display-size text is excluded — pinning a 34px line to a 28px step collides.

## Spacing

`--space-1` … `--space-10`: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. A strict 4px
grid. The checker fails anything off it.

## Shape, shadow, motion

- `--radius: 2px` — essentially square. This site uses edges, not corners.
- Shadows are rare. `--shadow-mount` follows a cut-out's alpha via `drop-shadow`; a `box-shadow` would draw the image's rectangle instead. Tint shadows to `--ink-quiet`, never pure black.
- Two durations only: `--motion-fast` (120ms), `--motion-base` (240ms). One easing: `--motion-ease`. Honour `prefers-reduced-motion`.

---

## Components

### Panel — a bordered container holding content
`padding: var(--space-5) var(--space-6)` · hairline `--edge` · `--panel-fill` ·
`--radius`. The fill is translucent, so the page ruling runs *through* a panel
rather than stopping at every box.

### Control — buttons and button-like links
`padding: 0.3em 0.8em` · `--size-1` · `--track-label` · uppercase · hairline `--edge-strong` (it is a control, so 3:1).

| State | Treatment |
|---|---|
| default | as above |
| hover | accent wash at 24%, `--ink` text |
| focus-visible | the global ring: `--focus-width` solid `--ink`, offset `--focus-offset` |
| active | `transform: var(--press)` |
| coarse pointer | `min-height: var(--hit-min)` |

**Every control needs all four.** Hover does not exist on touch; without
`:active` a control gives no feedback at all before the page changes.

### Tag / badge
`padding: 0.15em 0.6em` · hairline `--edge` · `--panel-fill` · non-interactive, so no states.

### Project card (`/work/`)
Uniform `--shape-tile` frame, hairline `--edge-strong` — the whole tile is a link. Artwork either `mount`
(contained on an accent-tinted ground) or `bleed` (fills the frame). A mounted
cut-out must be a real cut-out — no white rectangle on a coloured ground.

### Navigation
Current page marked, hover underline, global focus ring. The underline beneath
the bar is decorative, so it stays `--rule`.

---

## Things that will bite you

- **A `color-mix()` fallback goes stale when `--paper` changes.** The literal before it is a hand-computed value, not a token, and nothing recomputes it. Grep for `color-mix` after touching `--paper`.
- **Custom properties that mix `var(--accent)` must be declared on the element carrying `data-accent`**, not an ancestor. Declared higher up they resolve once, against the default ink, and every project comes out the same grey.
- **Measure real glyph ink with canvas `actualBoundingBoxDescent`**, not `getBoundingClientRect` or a Range rect. Those return the line box and will report collisions that are not happening — and miss ones that are.
- **Unused components rot.** `CriterionBlock`, `Matrix` and `Pile` were deleted on 2026-11-26 after an audit found nothing rendered them. If you add a component to the MDX map in `src/pages/work/[...slug].astro`, use it or remove it.
