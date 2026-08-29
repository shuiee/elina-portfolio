# Elina J. Lee — portfolio

A static site built with [Astro](https://astro.build) and plain CSS. No Tailwind, no
CSS-in-JS, no component library. Four case studies, an about page and a CV.

This README is for someone comfortable with code but new to front-end. It covers the
four things you will actually want to do: run it, edit copy, swap images, change a
design value — and then how to get it onto GitHub Pages.

---

## Run it

You need [Node.js](https://nodejs.org) 20 or newer. Check with `node -v`.

```bash
npm install
```

```bash
npm run dev
```

That prints a local address (usually `http://localhost:4321/elina-portfolio/`). Leave it
running; it reloads as you save. `Ctrl-C` stops it.

```bash
npm run build
```

Builds the finished site into `dist/`. You do not need to run this yourself to deploy —
GitHub does it for you — but it is the fastest way to check nothing is broken.

---

## Where everything is

```
src/
  content/work/          THE CASE STUDIES — edit these
    01-signage.mdx
    02-patchwork.mdx
    03-steel-concrete.mdx
    04-arena.mdx
  content.config.ts      the list of fields a case study must have
  pages/                 one file per page: index (home), about, cv, work/
  layouts/               the page frames
  components/            the reusable pieces used inside case studies
  styles/
    tokens.css           EVERY DESIGN DECISION — colour, type, spacing, motion
    base.css             element styles; reads tokens only
  lib/url.js             internal-link helper (see "Deploy" below)
public/
  fonts/                 Inter and Optician Sans, both SIL Open Font License
  images/                put your exported images here
```

---

## Edit copy

All four case studies are `.mdx` files in `src/content/work/`. An `.mdx` file is
Markdown that can also contain components. You never need to touch a layout to change
words.

Each file has two parts.

**1. The frontmatter** — everything between the two `---` lines at the top. This is
structured data: the title, dates, role, and the one-line "instrument" that shows on the
home page.

```yaml
---
number: "01"
title: Seeing Information in Transport Systems
shortTitle: Transport signage        # used where space is tight
accent: signage                      # which project colour to use
dates: March – June 2022
projectType: Academic, group
role: Co-author
instrument: A three-tier marking scheme for misremembered station names.
question: How much does a person take in at once…
sections:                            # the left-hand orientation rail
  - { id: question, label: The question }
  …
---
```

If you mistype a field name or leave one out, the build stops and tells you which file
and which field. That is deliberate — the rules live in `src/content.config.ts`.

**2. The body** — the case study itself. Plain Markdown for prose, wrapped in five
`<Section>` blocks that never change order:

> the question → what counts as good → the method → what it showed → what it means

You can write normal Markdown inside them: `**bold**`, `*italic*`, `[links](…)`, lists.

### The components you can use in a case study

You do **not** need to import these. They are available in every `.mdx` file in
`src/content/work/`. (If you want to add a new one, register it in the `components`
object at the bottom of `src/pages/work/[...slug].astro`.)

| Component | What it is | Use it |
|---|---|---|
| `<Section>` | one of the five fixed parts | always, five per case study |
| `<CriterionBlock>` | **the signature panel** — "what counts as good" | exactly once per case study |
| `<Method>` + `<Step>` | the numbered process run | once per case study |
| `<Findings>` | large percentage figures | where you have numbers |
| `<Matrix>` | a comparison table | Patchwork |
| `<Compare>` | two options judged against named criteria | Patchwork, Arena |
| `<Figure>` | an image, or a marked placeholder | anywhere |

Copy an existing usage from one of the four files rather than writing one from scratch —
they are all commented.

**`<Step wide>`** puts the step number above the content instead of beside it, which
gives the step full width. Use it when a step holds a `<Compare>` or a `<Matrix>`.

---

## Swap images

Right now every image is a dashed placeholder showing its aspect ratio and a caption
describing what belongs there. To replace one:

1. Put the file in `public/images/` — e.g. `public/images/pearl-rig.jpg`.
2. Add a `src` to the `<Figure>`:

```mdx
<Figure
  src="/images/pearl-rig.jpg"
  ratio="16/9"
  caption="PEARL experiment setup: printed sign and LED sign rigs."
/>
```

The `caption` doubles as the image's alt text, so write it as a description of what is
actually in the picture, not as a label.

Keep `ratio` matching the real image (`16/9`, `4/3`, `1/1`, `3/2`) so the page does not
jump while the image loads.

---

## Change a design value

**Everything is in `src/styles/tokens.css`.** One file, heavily commented. Nothing
outside it should contain a raw colour or size — if you find one, that is a bug.

Some examples:

```css
--ink:       #000000;   /* body and heading colour */
--field:     #F4F2ED;   /* the cream ground behind exhibits */
--size-4:    18px;      /* primary body size */
--measure:   62ch;      /* how long a line of text is allowed to get */
--space-8:   64px;      /* the big vertical gaps */
```

Change the value, save, and the whole site follows.

### The one rule to keep

Body text on this site is at **7:1 contrast or better** against its background. The site
argues, in case study 01, that luminance contrast is the primary driver of readability —
so it cannot fail its own check.

If you change a colour that touches text, verify it. Paste both values into any contrast
checker (e.g. WebAIM) and confirm 7:1 or higher. The current ratios are recorded in
comments next to each token, and the lowest anywhere on the site is 7.05:1.

Note the trap I already fell into: the accent colours are used on the **cream** field,
not on white, and a value that passes on white can fail on cream. `--accent-ink` is
computed against `--field` for exactly that reason.

### Project accent colours

Each case study gets one accent, sampled from that project's own material. They appear
only inside case studies — never on the home page chassis, the nav, or the footer. To
change one, edit the `[data-accent="…"]` lines near the bottom of `tokens.css`. Each
accent is a pair: `--accent` for rules and marks, `--accent-ink` for anything that has to
carry a word.

---

## Deploy to GitHub Pages

**1. Set two values in `astro.config.mjs`.**

```js
const SITE = 'https://YOUR-USERNAME.github.io';
const BASE = '/elina-portfolio/';      // must match the repo name, with slashes
```

If you name the repo `YOUR-USERNAME.github.io`, the site is served at the root instead,
and `BASE` becomes `'/'`.

**2. Push to GitHub**, on a branch called `main`.

**3. In the repo: Settings → Pages → Build and deployment → Source → "GitHub Actions".**
Once only.

Every push to `main` now rebuilds and republishes. The workflow is
`.github/workflows/deploy.yml`; you can watch runs in the repo's Actions tab. The live URL
appears there and under Settings → Pages.

### Why internal links go through `href()`

GitHub Pages serves a project repo from a sub-path (`/elina-portfolio/`), so a hard-coded
`href="/about/"` would 404. Every internal link uses the helper in `src/lib/url.js`:

```astro
<a href={href('/about/')}>About</a>
```

Write links that way and changing `BASE` will never break them.

### Linking between case studies

Inside an `.mdx` file, link to another case study with a **relative** path:

```markdown
the same instinct as [Patchwork](../02-patchwork/)
```

Relative links work whatever `BASE` is set to. Do not write `/work/02-patchwork/` —
that would 404 on GitHub Pages. In `.astro` files, use the `href()` helper instead.

---

## Things left to do

Search the project for `TODO(elina)` — each one is a decision or asset only you can
supply. As of this build:

- Confirm what is publishable from Steel Concrete before the site goes live.
- Reconcile the Mott MacDonald end date against the MDE start (CV page).
- Committee chair dates.
- Confirm the seven platform names and cell values in the Patchwork matrix.
- LinkedIn / GitHub links (footer and about page).
- A downloadable CV PDF.
- Export the images.
