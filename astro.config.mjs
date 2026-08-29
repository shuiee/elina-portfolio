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
  build: { format: 'directory' },
});
