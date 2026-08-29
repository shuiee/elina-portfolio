/* Build an internal link that survives being served from a sub-path.
 *
 * GitHub Pages serves a project repo at /<repo-name>/, so a hard-coded
 * href="/work/01-signage/" would 404 there. Every internal link on this site
 * goes through this function instead. Never write a leading-slash href by hand.
 *
 *   href('/')                 -> '/elina-portfolio/'
 *   href('/work/01-signage/') -> '/elina-portfolio/work/01-signage/'
 */
export function href(path = '/') {
  const base = import.meta.env.BASE_URL; // always ends in '/'
  return (base + String(path).replace(/^\//, '')).replace(/\/{2,}/g, '/');
}

/* Same, for files in public/ — fonts, images, the CV pdf. */
export const asset = href;
