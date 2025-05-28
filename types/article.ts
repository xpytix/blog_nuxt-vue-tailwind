// ~/types/article.ts
export interface Article {
  _id: string;          // Automatycznie przez Nuxt Content
  _path?: string;        // Automatycznie przez Nuxt Content (ścieżka bez rozszerzenia)

  title: string;
  description?: string;

  date: string;           // Data jako string (zgodnie ze schematem Zod)
  dateModified?: string;   // Opcjonalna data modyfikacji jako string

  category?: string;
  author?: string;
  authorTwitterHandle?: string; // Opcjonalny uchwyt Twittera autora

  image?: string;        // Ścieżka do obrazka
  image_alt?: string;    // Tekst alternatywny dla obrazka

  tags?: string[];
  isPartnerContent?: string | boolean; // Może być stringiem lub booleanem, dostosuj do danych
                                   // Jeśli w YAML używasz true/false, Zod powinien mieć z.boolean()
                                   // Jeśli string, to z.string() jest OK.

  body?: any;            // Treść artykułu (np. z Markdown)

  path?: string;           // Jeśli używasz tego pola do niestandardowego routingu/identyfikacji
                           // i jest ono inne niż _path. Często można polegać tylko na _path.
  // Usunięto zagnieżdżony obiekt 'meta', zakładając, że pola są na najwyższym poziomie
}