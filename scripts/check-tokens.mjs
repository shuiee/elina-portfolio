#!/usr/bin/env node
/* check-tokens — the design system's only enforcement.
 *
 * This repo has no linter and no build step that looks at CSS, so nothing
 * stops a hardcoded #hex or a 7px padding from being added. That is how a
 * token layer rots: not in one bad commit, but in twenty small ones that each
 * looked harmless. This script is the thing that notices.
 *
 * Run:  npm run check:tokens
 * Exit: 0 clean, 1 violations found.
 *
 * It deliberately does NOT flag em-relative values. `padding: 0.3em 0.8em` on
 * a control scales with that control's own type, which is a thing no px token
 * can do, and rewriting it as a token would make the design worse. The same
 * goes for drawing a physical object (a phone bezel's 26px radius is a fact
 * about phones, not a design decision) and for the 0.01ms reduced-motion kill
 * switch. Those are exemptions, not oversights.
 *
 * Escape hatch: put  /* literal-ok: why *\/  on the same line. Use it rarely
 * and always say why, so the next person can judge whether it still holds.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'src');
const TOKENS_FILE = join(SRC, 'styles/tokens.css');

/* ------------------------------------------------------------------ gather */
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(astro|css)$/.test(p)) out.push(p);
  }
  return out;
}

/* Comments hold documentation full of hex values and pixel sizes. Strip them
   or every rationale in tokens.css reads as a violation. */
const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));

/* CSS lives in .css files and in <style> blocks inside .astro. Nothing else in
   an .astro file is CSS, and scanning the markup produces noise. */
function cssOf(file, text) {
  if (file.endsWith('.css')) return stripComments(text);
  let out = text.replace(/[^\n]/g, ' ').split('');
  for (const m of text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
    const start = m.index + m[0].indexOf(m[1]);
    const body = stripComments(m[1]);
    for (let i = 0; i < body.length; i++) out[start + i] = body[i];
  }
  return out.join('');
}

/* ------------------------------------------------------------------- rules */
const SPACE = /^(padding|margin|gap|row-gap|column-gap|inset|top|right|bottom|left)(-(top|right|bottom|left|block|inline))?$/;
const TYPE = /^(font-size|line-height|letter-spacing)$/;
const SHAPE = /^(border-radius|box-shadow|border(-(top|right|bottom|left))?(-width)?)$/;
const MOTION = /^(transition|transition-duration|animation|animation-duration)$/;

const violations = [];
const add = (file, line, rule, detail) =>
  violations.push({ file: relative(ROOT, file), line, rule, detail });

const tokenSrc = stripComments(readFileSync(TOKENS_FILE, 'utf8'));
/* Global tokens — the ones a component is expected to reuse. */
const defined = new Set([...tokenSrc.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]));

const files = walk(SRC);
const referenced = new Set();

/* Components also set their own custom properties, often from an inline
   style= attribute so a prop can reach CSS (--cols, --stage-h and friends).
   Those are local plumbing, not design tokens, and must not be reported as
   missing — but they must not count as tokens either, so they live in their
   own set. */
const local = new Set();
for (const f of files) {
  const text = readFileSync(f, 'utf8');
  for (const m of text.matchAll(/(--[a-z0-9-]+)\s*:/g)) {
    if (!defined.has(m[1])) local.add(m[1]);
  }
  /* Some are set from script rather than written in CSS at all, e.g.
     el.style.setProperty('--stage-h', h + 'px'). Still defined, still local. */
  for (const m of text.matchAll(/setProperty\(\s*['"`](--[a-z0-9-]+)/g)) {
    if (!defined.has(m[1])) local.add(m[1]);
  }
}

for (const file of files) {
  const raw = readFileSync(file, 'utf8');
  const css = cssOf(file, raw);
  const rawLines = raw.split('\n');
  const lines = css.split('\n');

  for (const m of css.matchAll(/var\(\s*(--[a-z0-9-]+)/g)) referenced.add(m[1]);

  lines.forEach((text, i) => {
    const n = i + 1;
    const rawLine = rawLines[i] ?? '';
    if (/literal-ok:/.test(rawLine)) return;

    /* A colour literal directly above a color-mix() on the same property is a
       deliberate fallback for browsers without color-mix, not drift. */
    const next = (lines[i + 1] ?? '') + (lines[i + 2] ?? '');
    const isColorMixFallback = /color-mix\(/.test(next);

    if (!file.endsWith('tokens.css') && !isColorMixFallback) {
      for (const m of text.matchAll(/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\([^)]*\)/g)) {
        if (/data:image|url\(/.test(text)) continue;
        add(file, n, 'raw-colour', `${m[0]} — colours live in tokens.css`);
      }
    }

    for (const m of text.matchAll(/(^|[;{])\s*([-a-z]+)\s*:\s*([^;{}]+)/g)) {
      const prop = m[2];
      const val = m[3].trim();
      if (prop.startsWith('--') || val.includes('var(--')) continue;

      /* em/rem/% scale with context; ch is a measure unit; 0 and keywords are
         not magic numbers. Only absolute px/ms are checked. */
      const px = [...val.matchAll(/(?<![\w.#-])(\d*\.?\d+)px\b/g)].map((x) => +x[1]);
      const ms = [...val.matchAll(/(?<![\w.#-])(\d*\.?\d+)(ms|s)\b/g)].map((x) =>
        x[2] === 's' ? +x[1] * 1000 : +x[1]
      );

      /* A shadow's offset and blur are not spacing and have no business on a
         4px grid; only its colour is a system decision. */
      if (prop === 'box-shadow') continue;

      if (px.length && (SPACE.test(prop) || TYPE.test(prop) || SHAPE.test(prop))) {
        const offGrid = px.filter((v) => v !== 0 && v % 4 !== 0);
        if (offGrid.length)
          add(file, n, 'off-scale', `${prop}: ${val} — ${offGrid.join(', ')}px is off the 4px grid`);
        else add(file, n, 'untokenised', `${prop}: ${val} — use a --space-* / --size-* token`);
      }

      if (ms.length && MOTION.test(prop)) {
        const allowed = [120, 240, 0.01];
        const odd = ms.filter((v) => !allowed.includes(v));
        if (odd.length)
          add(file, n, 'off-motion', `${prop}: ${val} — durations are --motion-fast (120ms) or --motion-base (240ms)`);
      }
    }
  });
}

for (const t of defined) if (!referenced.has(t)) add(TOKENS_FILE, 0, 'dead-token', `${t} is defined but never used`);
for (const t of referenced)
  if (!defined.has(t) && !local.has(t)) add(TOKENS_FILE, 0, 'missing-token', `var(${t}) has no definition anywhere`);

/* ------------------------------------------------------------------ report */
if (!violations.length) {
  console.log('check-tokens: clean — every value traces to tokens.css');
  process.exit(0);
}
const byRule = violations.reduce((a, v) => ((a[v.rule] ??= []).push(v), a), {});
console.error(`check-tokens: ${violations.length} violation(s)\n`);
for (const [rule, list] of Object.entries(byRule)) {
  console.error(`  ${rule}  (${list.length})`);
  for (const v of list) console.error(`    ${v.file}${v.line ? ':' + v.line : ''}  ${v.detail}`);
  console.error('');
}
console.error('Fix by using a token, or add  /* literal-ok: reason */  if the literal is genuinely right.');
process.exit(1);
