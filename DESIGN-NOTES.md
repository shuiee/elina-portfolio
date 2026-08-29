# Design notes

What was chosen, what was rejected, and why — so you can argue with the decisions
instead of reverse-engineering them.

Everything here traces to one of three sources: `elina-design-persona.md`, the build
brief, or measurements taken from `portfolio_v3.pdf` (18 pages, 1920×1080).

---

## The argument the site is making

You cannot yet point to visual craft inside the project work, so the site has to carry
it. The claim it makes is the one from the persona brief: **the frame is the
contribution**. Every layout decision below serves that, and the ones that did not were
cut.

---

## Colour

**Chosen.** A soft warm grey page (`#EDEDEB`) with near-black ink, and **white**
exhibit sheets sitting on top of it. This is the second version of the palette; the
first was white page / cream exhibit, and it was inverted after taking the ground note
from the reference layout.

The inversion is the better idea. An exhibit that is *lighter* than the page reads as a
sheet laid on a desk, and it lifts off the ground without needing a border or a shadow.
Four project accents, each sampled from that project's own material, appear only inside
case studies.

**Rejected — pure black on the grey.** `#000000` on `#EDEDEB` rings slightly hard.
`#111111` gives 16.1:1 on the page and 18.9:1 on a white sheet, which is far past any
threshold that matters, and it sits better on a warm ground.

**Rejected — accent colour on the chassis.** The nav, landing page and footer are
grey-and-black only. The accents are evidence — this is Patchwork's green, this is the
SAP2000 violet — and using them as decoration on the frame would turn them back into
styling. Accent appears for the first time when a case study opens.

**The mistake worth recording.** The accent text variants were first computed to clear
7:1 **against white**. They are used on coloured grounds, where two of them measured
6.46:1 and 6.27:1 — a real failure, caught by auditing the rendered pages rather than
the palette. They are now computed against the *darker* of the two grounds they can
land on, so they cannot fail by being moved between them. The lowest contrast anywhere
on the site is 7.08:1.

Sampled accent values, and why each:

| Project | Sampled | From |
|---|---|---|
| 01 Signage | `#1A5F6E` | the teal process arrows, p.3 |
| 02 Patchwork | `#0CA514` | the cover underline green |
| 03 Steel Concrete | `#9746FF` | SAP2000 plot output, p.15 |
| 04 Arena | `#AA8F71` | glulam tone in the arch renders, p.17 |

---

## Typography

Three faces, each with one job.

**Inter — everything that has to be read.** Not a taste call. A width analysis of the
Type3 glyphs in the source deck ranks the Inter family top on every page tested,
reproducing the original line widths to within 1–3%. Body, navigation, tables,
captions.

**Optician Sans — digits and short markers only.** `01–04`, the percentage findings,
the criterion thresholds. Optician Sans is the face used in clinical visual-acuity
testing: the benchmark Johnston 100 was measured against in case study 01. The numbers
on this site are set in the instrument used to judge letterforms.

**Instrument Serif Italic — the written half.** A high-contrast italic with swashed
capitals, set against Inter's flat geometry. It sets the name in the landing hero, the
page titles (*Work*, *About*, *Curriculum vitae*), and the question that opens each
case study. It never sets a paragraph and never appears below display size.

**On the constraint it breaks — recorded deliberately.** The original brief forbade
decorative and curved letterforms, because finding 2 of case study 01 is that they lose
definition first under degradation. This face contradicts that, and Elina instructed
that the constraint be set aside for the sake of the design. It was, knowingly.

The consequence was not left implicit. The footer previously claimed the site followed
all four of her findings; it now claims **two** — contrast over colour accents, and
minimal predictable motion — and says plainly that the display face is chosen against
the third. A site that claimed all four while visibly breaking one would be worse than
a site that claims two and means them.

**Rejected — IBM Plex Mono, cut on instruction.** Proposed as a fourth face for verbatim
technical strings. A mono is what anyone would reach for on an engineering portfolio,
which is exactly why it did not survive. Inline code renders as Inter Medium instead.

---

## Layout

**Chosen — the landing page is a title page, not a contents page.** It carries the
name, the thesis, two short notes and one link. The four projects are not listed there;
they live on `/work/`, which became the contents page. A visitor who has just arrived
has not yet been told anything, and asking them to choose between four projects before
they have been given a reason to care puts the decision in the wrong place.

**Chosen — ✧ as the cursor.** It was first used as a mark set before every section
label and corner note, which read as a bullet point and cluttered the very labels it
was meant to quieten. It is now the pointer itself: an outline while reading, filled
over anything clickable. That makes it present on every page without occupying any
space in the layout, and it doubles as the site's only hover feedback. Touch devices
get the system cursor.

**Chosen — the navigation stays at the top.** The reference puts it mid-page under the
name; this site keeps a fixed top bar, and below 560px it stacks into two rows rather
than collapsing into a menu. Every destination stays visible.

**Chosen — a fixed five-part case study order.** The question → what counts as good →
the method → what it showed → what it means. Identical in all four. This is the
load-bearing decision on the site: it inverts the standard problem / process / solution
shape, puts the criteria above the fold, and demotes the outcome to fourth. The reader
meets your instrument before they meet your result.

**Chosen — persistent orientation, in two forms.** A sticky left rail on desktop
carrying both where you are in this case study and which of the four projects it is; a
3px progress bar pinned under the header on mobile. The filled portion is always `--ink`,
never a colour, so orientation never depends on telling two greys apart.

**Chosen — no hamburger menu.** Finding 4 from case study 01 is that decision-critical
information stays visible. Navigation qualifies. Three items fit on a phone.

**Rejected — the rail as the site's signature.** The first plan proposed reviving your
PDF's fixed `01–04` rail as the memorable element. Two problems: every portfolio has a
sticky index, so it fails on originality; and you had already removed that rail
deliberately in an earlier edit of the deck. Reviving something you cut and calling it
your signature is a bad read of your own judgement. It is orientation furniture now, not
the idea.

---

## The signature: the criterion block

**Chosen.** A panel headed *What counts as good*, appearing exactly once in every case
study, always in the same position — after the question, before the method — with a
fixed anatomy that never changes:

> the claim · the instrument · what it grades · the threshold · the alternative it
> replaced, and why that alternative was the wrong instrument

Filled four different ways: the three-tier marking scheme; the five-feature matrix; the
±10% sensitivity band; the five appraisal criteria.

**Why this and not something else.** Nobody else has four of these. A component that
recurs identically across a bus sign, a social app, a nuclear slab and an arena *is* the
argument that the method transfers — made visually instead of claimed in prose. It also
answers the honest limit in the persona brief: nothing has shipped, but the instrument is
finished, and the instrument is the exhibit.

**Rejected — a degradation demo.** An early idea was text that visibly pixelates or
degrades as you scroll, dramatising the dissertation. It breaks the motion rule, it makes
the page about the trick, and a site that deliberately degrades its own legibility to
talk about legibility is a joke told at its own expense.

---

## The hero

**Chosen — the measurement thesis.** *"I design the measurement before I design the
thing."* Followed by the four instruments named in one sentence each, so the project list
reads as evidence rather than as a menu.

**Rejected as a hero, kept as a colophon — the self-obeying site.** The brief proposed
opening with the four design implications and the claim that the site follows them. It
survives the "would I write this for anyone else?" test, but fails a different one: the
most valuable slot on the site should make a claim about you, not about the website. It
also indexes on one of four projects. It now sits in the footer, stated once, where it
reads as quiet proof of consistency rather than as a clever opening move.

**Rejected — the adjective attack.** *"Most design decisions are defended with
adjectives."* Sharper, and closer to the dry register, but it opens by describing other
people rather than you. Its list survived into the hero paragraph.

---

## Motion

One orchestration: sections fade in once on entry. Opacity only — nothing moves while it
is being read, nothing staggers, nothing parallaxes. Fully disabled under
`prefers-reduced-motion`, and everything renders visible with JavaScript off.

Scroll-position tracking (the rail marker, the mobile progress fill) is not animation and
is not disabled; it is orientation, and it updates a position rather than moving content.

---

## Content decisions

**Dates.** The brief described the signage experiments as running 2023–2025; the source
deck says the project ran 03/2022–06/2022, and you confirmed the deck is right. The three
experiments are therefore presented in sequence without years attached.

**Role labels, standardised.** "Innovator" is not a role and has been removed everywhere.
Co-author · Product and UX lead · Civil and structural engineer · Structural design,
sustainability strategy, construction sequencing.

**Patchwork's second pass is the centrepiece.** It was first drafted inside a numbered
step, which made it a process footnote and squeezed it into a narrow column. It now opens
*What it showed* at full width, as a Round 1 / Round 2 comparison read against the
project's own values. That was the brief's instruction and it is also the better page.

**Steel Concrete has no results section.** Only the method is written up, behind a visible
`TODO(elina)`, until you confirm what is publishable. A visible placeholder beats a
plausible invention.

**Tone, second pass.** The first draft was too wry — lines like "the sign is not a
spelling test", "it was just filed under engineering", "the situation where a team
quietly picks whichever one the strongest opinion in the room prefers". The dryness was
in the brief, but it had tipped into edge, and edge reads as performance, which is the
opposite of what the work is arguing. Every case study, the about page and the landing
copy were rewritten flatter: same claims, same specificity, fewer sharp endings.

**Nothing is claimed that was not supplied.** No metrics, outcomes, testimonials or
awards have been invented. Every gap is a marked `TODO(elina):`.

---

## What this build does not solve

- **The form-making gap is only half closed.** The site is now your first defensible
  form-making artifact, but the project work still stops at feature scope. Patchwork
  reaching interface design is the thing that would change that.
- **The images are all placeholders.** Every layout is sized for real assets, so the page
  rhythm will hold when you drop them in, but nobody has seen the actual work yet.
- **Four case studies, one shape.** The fixed five-part order is the site's strongest
  idea and also its risk: if a future project does not have an explicit criteria moment,
  the template will make its absence obvious. That is arguably the template working.
