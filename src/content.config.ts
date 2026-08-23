import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Shared shape for the "evidence composition" breakdown shown in EvidencePanel.
const studyComposition = z.object({
  metaAnalyses: z.number().default(0),
  rcts: z.number().default(0),
  crossover: z.number().default(0),
  observational: z.number().default(0),
});

// One Q&A pair for the FAQPage JSON-LD — must match the FAQ section rendered
// in the MDX body verbatim (schema has to match visible page content).
const faqItem = z.object({
  question: z.string(),
  answer: z.string(),
});

// Understand + Protocols share the same evidence metadata shape.
// lastReviewed/references/participants are optional because a page can be
// scaffolded (draft: true) before it has been reviewed against real sources —
// never fill these with invented numbers; leave them unset instead.
const reviewedArticle = {
  title: z.string(),
  description: z.string(),
  lastReviewed: z.date().optional(),
  references: z.number().optional(),
  participants: z.number().optional(),
  studyComposition: studyComposition.optional(),
  faq: z.array(faqItem).optional(),
  draft: z.boolean().default(false),
  slug: z.string().optional(),
};

const understand = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/understand' }),
  schema: z.object(reviewedArticle),
});

const protocols = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/protocols' }),
  schema: z.object(reviewedArticle),
});

const compounds = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/compounds' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    mechanism: z.string(),
    lastReviewed: z.date().optional(),
    references: z.number().optional(),
    participants: z.number().optional(),
    draft: z.boolean().default(false),
    recommendedProduct: z.object({
      name: z.string(),
      brand: z.string(),
      price: z.number(),
      affiliateUrl: z.string().url(),
      disclosure: z.string(),
    }).optional(),
  }),
});

const gear = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/gear' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    bestFor: z.string(),
    price: z.number().optional(),
    verdict: z.string().optional(),
    affiliateUrl: z.string().url().optional(),
    reviewed: z.boolean().default(false),
  }),
});

const fieldNotes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/field-notes' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    hypothesis: z.string().optional(),
    method: z.string().optional(),
    conclusion: z.string().optional(),
    dataAvailable: z.boolean().default(false),
  }),
});

export const collections = { understand, protocols, compounds, gear, 'field-notes': fieldNotes };
