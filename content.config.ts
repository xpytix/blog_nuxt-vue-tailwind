// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: 'blog/*.md',
      type: 'page',
      // Zdefiniuj niestandardowy schemat dla kolekcji blog
      schema: z.object({
        title: z.string(), // Dodaj title jeśli jeszcze nie ma
        description: z.string().optional(), // Dodaj description jeśli jeszcze nie ma
        tags: z.array(z.string()).optional(), // Oznacz jako opcjonalne jeśli nie wszystkie posty mają tagi
        image: z.string().optional(), // Oznacz jako opcjonalne
        date: z.date(),
        category: z.string().optional(), // Dodaj pole category, oznacz jako opcjonalne
        author: z.string().optional() // Dodaj autora, jeśli używasz
      })
    })
  }
})