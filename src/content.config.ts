import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* The shape of a case study file. Everything here is edited in
   src/content/work/*.mdx — never in a layout. If you add a field, add it here
   too or the build will tell you the file is invalid. */

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.mdx' }),
  schema: z.object({
    number: z.string(),            // '01' — drives the rail and the listing
    title: z.string(),
    shortTitle: z.string(),        // used in nav and the rail where space is tight
    accent: z.enum(['signage', 'patchwork', 'steel', 'arena']),
    dates: z.string(),             // exactly as on the source deck
    projectType: z.string(),
    role: z.string(),
    // The one line on the home page. Name the INSTRUMENT, not the outcome.
    instrument: z.string(),
    question: z.string(),          // the framing question, rendered at size
    // Section names for the orientation rail, in reading order.
    sections: z.array(z.object({ id: z.string(), label: z.string() })),
    order: z.number(),
  }),
});

export const collections = { work };
