// ~/types/article.ts
export interface Article {
  _id: string;         // Unikalne ID nadawane przez Nuxt Content
  _path: string;       // Ścieżka do pliku contentu, np. /blog/nazwa-artykulu
  title?: string;
  description?: string;
  image?: string;       // Ścieżka do obrazka lub obiekt obrazka
  image_alt?: string;
  category?: string;
  date?: string;        // Data publikacji, np. w formacie YYYY-MM-DD
  author?: string;      // Nazwa autora lub obiekt autora
  tags?: string[];
  body?: any;           // Przetworzona treść Markdown (opcjonalnie, jeśli potrzebujesz w ArticleCard)
  // Dodaj inne pola, które występują w Twoim frontmatter i są potrzebne
}