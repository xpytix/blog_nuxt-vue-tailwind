// مثلاً types/article.ts
export interface Article {
    _id?: string;
    _path?: string;
    title?: string;
    description?: string;
    image?: string;
    image_alt?: string;
    category?: string;
    date?: string | Date;
    author?: string;
    tags?: string[];
    // Dodaj inne pola, które są wspólne i potrzebne
  }