// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

/* ---------------------------------------------------------------------------
   TWO VALUES TO SET BEFORE YOU DEPLOY. Both are explained in README.md.

   If your repo is named  <username>.github.io   ->  site: 'https://<username>.github.io'
                                                    base: '/'
   If your repo is named  anything else          ->  site: 'https://<username>.github.io'
                                                    base: '/<repo-name>/'
   --------------------------------------------------------------------------- */

const SITE = 'https://shuiee.github.io';
const BASE = '/elina-portfolio/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  integrations: [mdx()],

  /* Inserting the tooth project at 03 pushed the three projects below it down
     by one, and the slug carries the number, so their published URLs changed.
     These keep the old links working for anyone who already has one. Astro
     writes each as a small page that forwards to the new address. Delete a
     line only when you are content for that old URL to 404.
     The destinations carry BASE themselves. Astro applies base to the key,
     so the redirect page lands at the right address, but it does NOT apply it
     to the target, and a bare '/work/...' would send the reader to the domain
     root and a 404. */
  redirects: {
    '/work/03-patchwork/':      BASE + 'work/04-patchwork/',
    '/work/04-steel-concrete/': BASE + 'work/05-steel-concrete/',
    '/work/05-arena/':          BASE + 'work/06-arena/',
  },
  build: { format: 'directory' },
});
