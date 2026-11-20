# Captions removed from the project pages

Removed from the rendered pages on 2026-11-20 at Elina's request, kept here so the
facts in them survive her rewrite of the project detail sections. Every figure below
came from the project's own source material, so these are the numbers a rewrite has
to stay consistent with.

This file is not published: Astro only serves `src/pages` and `public`.

The `label` props were NOT touched. Those are the accessible descriptions of each
figure and they are still on the page.

## 02-saveeat.mdx

**`<Prototype>`**  _(was line 67)_

> The buyer flow as it runs in the Figma prototype.

**`<Prototype>`**  _(was line 92)_

> The two screens the buyer spends the most time on, panning the way they do on a phone rather than unrolled to their full length. The home feed shows bags near you with the dietary tags from onboarding already applied, and the store page carries stock, contents, tags and reviews, which together are what a health-led buyer needs before committing.

## 03-steel-concrete.mdx

**`<Figure>`** — `/images/steel/transform.svg`  _(was line 170)_

> The two differences that matter to a model, and the clause that decides how to represent them.

## 04-tooth.mdx

**`<Clip>`** — `/images/tooth/caries-clip`  _(was line 119)_

> The caries layer opened in the piece itself, showing that 36% of late medieval adults had no carious tooth while 15% had five or more, with the whole distribution laid out underneath and the dataset named below that, down to the sample size it rests on.

**`<Clip>`** — `/images/tooth/wear-clip`  _(was line 126)_

> Two layers opened at once on the same timeline, where molar wear builds from stage 2.8 at 18 to 24 years old up to 5.8 at 60 and over, while 31.4% of high medieval adults carried at least one stress line on the lower canine, which is 233 people out of 742.

**`<Clip>`** — `/images/tooth/metals-clip`  _(was line 140)_

> The metals layer, where lead in twentieth century childhood enamel averaged 6.55 ppm, ten times the archaeological level, although copper rose further still at fourteen times. The radar holds every element at once before the slope chart carries the Neolithic range across to the modern one.

**`<Clip>`** — `/images/tooth/pathogens-clip`  _(was line 155)_

> The pathogen layer, in which plague made up 69% of the 51 genomes recovered from the 1300s against 27% in the 1200s, while the count beside each century explains why this layer reports finds rather than rates, given that the 1300s gave up 51 genomes and the 1400s gave up only nine.

**`<Clip>`** — `/images/tooth/record-clip`  _(was line 243)_

> How the piece ends, with the modern tooth standing beside the one the data projects forward until both come apart into the points they were built from, and the question it opened with returns changed: what truths does a tooth tell now?

## Captions still held in source, not shown on the page

`<Screens>` in `02-saveeat.mdx` carries one string per screenshot. That string was
rendered as a visible caption AND used as the image's alt text. The visible line is
gone; the string stays in the `items` array and is now alt only, so the screenshots
are still described to a screen reader. Five strings, in `02-saveeat.mdx` at the
onboarding and A/B sections.

## Deliberately kept

`<Findings>` on `01-signage.mdx` and `04-tooth.mdx` renders a label under each large
figure — "6 / datasets behind one composite tooth". Those read as captions in the
markup (`findings__cap`) but they are what makes the number mean anything, so they
were left alone. Say the word if you want them gone too.
