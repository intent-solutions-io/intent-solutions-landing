import { defineCollection, z } from 'astro:content';

const fieldNotesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional().default([]),
    featured: z.boolean().optional().default(false),
    canonical: z.string().url().optional(),
  })
});

export const collections = { 'field-notes': fieldNotesCollection };
