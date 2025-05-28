// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: '**',
      type: 'page',
      schema: z.object({
        title: z.string(), // Dodaj title jeśli jeszcze nie ma
        description: z.string().optional(), // Dodaj description jeśli jeszcze nie ma
        tags: z.array(z.string()).optional(), // Oznacz jako opcjonalne jeśli nie wszystkie posty mają tagi
        image: z.string().optional(), // Oznacz jako opcjonalne
        date: z.string(),
        category: z.string().optional(), // Dodaj pole category, oznacz jako opcjonalne
        author: z.string().optional(), // Dodaj autora, jeśli używasz
        path : z.string().optional(),
        isPartnerContent: z.string().optional()
      })
    }),
    biznes: defineCollection({
      source: 'biznes/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(), // Dodaj title jeśli jeszcze nie ma
        description: z.string().optional(), // Dodaj description jeśli jeszcze nie ma
        tags: z.array(z.string()).optional(), // Oznacz jako opcjonalne jeśli nie wszystkie posty mają tagi
        image: z.string().optional(), // Oznacz jako opcjonalne
        date: z.string(),
        isPartnerContent: z.string().optional(),

        category: z.string().optional(), // Dodaj pole category, oznacz jako opcjonalne
        author: z.string().optional(), // Dodaj autora, jeśli używasz
        path : z.string().optional()
      })
    }),
    sporty: defineCollection({
      source: 'sporty/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(), // Dodaj title jeśli jeszcze nie ma
        path : z.string().optional(),
        description: z.string().optional(), // Dodaj description jeśli jeszcze nie ma
        tags: z.array(z.string()).optional(), // Oznacz jako opcjonalne jeśli nie wszystkie posty mają tagi
        image: z.string().optional(), // Oznacz jako opcjonalne
        date: z.string(),
        isPartnerContent: z.string().optional(),

        category: z.string().optional(), // Dodaj pole category, oznacz jako opcjonalne
        author: z.string().optional() // Dodaj autora, jeśli używasz
      })
    }),
    praca: defineCollection({
      source: 'praca/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(), // Dodaj title jeśli jeszcze nie ma
        path : z.string().optional(),
        description: z.string().optional(), // Dodaj description jeśli jeszcze nie ma
        tags: z.array(z.string()).optional(), // Oznacz jako opcjonalne jeśli nie wszystkie posty mają tagi
        image: z.string().optional(), // Oznacz jako opcjonalne
        date: z.string(),
        isPartnerContent: z.string().optional(),

        category: z.string().optional(), // Dodaj pole category, oznacz jako opcjonalne
        author: z.string().optional() // Dodaj autora, jeśli używasz
        
      })
    }),
    afery: defineCollection({
      source: 'afery/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(), // Dodaj title jeśli jeszcze nie ma
        path : z.string().optional(),
        description: z.string().optional(), // Dodaj description jeśli jeszcze nie ma
        tags: z.array(z.string()).optional(), // Oznacz jako opcjonalne jeśli nie wszystkie posty mają tagi
        image: z.string().optional(), // Oznacz jako opcjonalne
        date: z.string(),
        category: z.string().optional(), // Dodaj pole category, oznacz jako opcjonalne
        author: z.string().optional(), // Dodaj autora, jeśli używasz
        isPartnerContent: z.string().optional()

      })
    })
  }
})