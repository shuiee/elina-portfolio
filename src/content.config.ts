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
    accent: z.enum(['signage', 'saveeat', 'patchwork', 'steel', 'arena']),
    dates: z.string(),             // exactly as on the source deck
    projectType: z.string(),
    role: z.string(),
    // What the project IS, in one or two plain sentences. This is the first
    // thing a reader meets on /work/, so it should describe the thing rather
    // than the method — the method is inside the project page.
    about: z.string(),
    // Optional preview shown on /work/. 16:9. Omit and the entry shows a
    // marked placeholder instead.
    thumb: z.string().optional(),
    thumbAlt: z.string().optional(),
    // The three labelled groups shown under each entry on /work/.
    // Only list what the project actually used — leave a group out rather than
    // padding it.
    concepts: z.array(z.string()).default([]),
    skills: z.array(z.string()).default([]),
    tools: z.array(z.string()).default([]),
    question: z.string(),          // the framing question, rendered at size
    // Section names for the orientation rail, in reading order.
    sections: z.array(z.object({ id: z.string(), label: z.string() })),
    order: z.number(),
  }),
});

export const collections = { work };
