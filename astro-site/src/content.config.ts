import { defineCollection, z } from 'astro:content';

const fieldNotesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z
      .string()
      .refine((s) => !Number.isNaN(Date.parse(s)), {
        message: 'date must be a parseable date string (e.g. "2026-04-22")',
      }),
    tags: z.array(z.string()).optional().default([]),
    featured: z.boolean().optional().default(false),
    canonical: z.string().url().optional(),
  }),
});

export const collections = { 'field-notes': fieldNotesCollection };
