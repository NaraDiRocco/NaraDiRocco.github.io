import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Colección: Equipo
const teamCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    specialization: z.string(),
    photo: z.string().optional(),
    order: z.number().default(0),
    linkedin: z.string().url().optional(),
    email: z.string().email().optional(),
    featured: z.boolean().default(false),
  }),
});

// Colección: Servicios / Áreas de práctica
const servicesCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    shortDescription: z.string(),
    icon: z.string(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Colección: Novedades / Blog
const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('MECOL ESTUDIO'),
    category: z
      .enum(['Legislación', 'Jurisprudencia', 'Opinión', 'Novedades'])
      .default('Novedades'),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  team: teamCollection,
  services: servicesCollection,
  blog: blogCollection,
};
