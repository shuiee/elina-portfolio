# Working on this repo

Astro 5 + hand-written CSS. No Tailwind, no PostCSS, no linter. Scoped `<style>`
blocks in components, plus `src/styles/tokens.css` and `src/styles/base.css`.

## Before you change any styling

Read **`STYLEGUIDE.md`**. It is short and it explains the reasoning, which
matters more than the values — most of the ways to break this site look
reasonable in isolation.

## Hard rules

- **No raw hex, px or ms in a component.** Every value comes from a token in
  `tokens.css`. The four exemptions are listed in `STYLEGUIDE.md`; mark each one
  in the code with `/* literal-ok: why */` and always say why.
- **Run `npm run check:tokens` before you finish.** It is the only enforcement
  that exists. A clean run is part of "done", like a passing build.
- **`--edge` for load-bearing boundaries, `--rule` for decorative lines.** On
  this near-white page a panel's border is the only thing separating it from the
  page. Getting this backwards makes panels disappear.
- **Body text ≥ 7:1 contrast**, which is stricter than WCAG AA. Ratios are
  recorded beside each colour in `tokens.css`; if you change a colour, recompute
  and update the recorded number.
- **Every interactive element needs hover, focus-visible, active, and a 44px
  target on coarse pointers.** Hover alone means a phone user gets nothing.
- **Self-host every font** in `public/fonts/` with its licence alongside. No
  remote font links, ever.
- **British spelling. No em dashes in anything a reader sees.** Projects are
  never called "case studies".
- **Invent nothing.** If a figure, date or credit is not in the source material,
  write a visible `TODO(elina):` rather than a plausible guess.

## Running the dev server

`npx` hangs indefinitely on this machine — it never resolves the command, so
`npx astro dev` and `npx astro build` both sit at 0% CPU forever. Call the
binary directly:

```
ASTRO_TELEMETRY_DISABLED=1 node ./node_modules/astro/astro.js dev --port 4321
ASTRO_TELEMETRY_DISABLED=1 node ./node_modules/astro/astro.js build
```

Dev is ready in well under a second this way. Do not spend time clearing caches
when a build appears to hang; check whether the command went through `npx`.

## Verifying visual work

Measure, do not eyeball, and do not ask Elina to check something you could have
checked yourself:

- Real glyph ink comes from canvas `actualBoundingBoxDescent`. `getBoundingClientRect`
  and Range rects return the *line box* and will report collisions that are not
  real — and hide ones that are.
- Contrast ratios: compute them, do not estimate them.
- Check a change at 375px as well as desktop. The type scale is a `clamp()`, so
  a gap that looks right at one size can collide at another.
- Screenshot after the fonts and images have actually loaded (`await
  document.fonts.ready`, then `img.decode()`), or you will photograph a
  half-rendered page and think the change failed.

## Giving her work

She asks for a draft before anything is committed. Show the rendered result,
say plainly what you changed and what it cost, and wait. When something is
blocked or you got something wrong, say so directly rather than working around
it quietly.
