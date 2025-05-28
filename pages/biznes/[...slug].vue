<template>
  <div>
    <div v-if="pending && !page" class="text-center py-20 text-text-secondary">
      Ładowanie artykułu...
    </div>
    <div v-else-if="error || !page" class="text-center py-20 text-red-500">
      <h1 class="text-2xl font-heading mb-4">Wystąpił błąd</h1>
      <p v-if="error">Błąd: {{ error.message || 'Nie można załadować artykułu.' }}</p>
      <p v-else>Nie znaleziono artykułu pod tym adresem.</p>
      <NuxtLink to="/" class="mt-6 inline-block text-accent hover:underline">Wróć na stronę główną</NuxtLink>
    </div>
    <article v-else class="prose dark:prose-invert lg:prose-xl mx-auto bg-background-secondary p-6 sm:p-8 md:p-10 rounded-lg shadow-lg">
      <header class="mb-8">
        <h1 class="!text-3xl sm:!text-4xl lg:!text-5xl font-heading text-text-primary !mb-3 !leading-tight">
          {{ page.title }}
        </h1>
        <div class="text-sm text-text-secondary font-sans flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4">
          <span v-if="page.date">
            Opublikowano: {{ formatDate(page.date) }}
          </span>
          <span v-if="page.author || page.meta?.author">
            Autor: {{ page.author || page.meta?.author }}
          </span>
          <NuxtLink 
            v-if="page.category || page.meta?.category" 
            :to="`/kategoria/${slugify(page.category || page.meta?.category)}`" 
            class="bg-accent/10 text-accent hover:bg-accent/20 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors"
          >
            {{ page.category || page.meta?.category }}
          </NuxtLink>
        </div>
        <img 
          v-if="page.image" 
          :src="page.image" 
          :alt="page.image_alt || page.meta?.image_alt || page.title" 
          class="w-full aspect-[16/9] sm:aspect-[2/1] object-cover rounded-md mt-6 mb-8 shadow-md"
        />
        <img 
          v-else
          src="/images/BIZNES.png"
          :alt="page.image_alt || page.meta?.image_alt || page.title" 
          class="w-full aspect-[16/9] sm:aspect-[2/1] object-cover rounded-md mt-6 mb-8 shadow-md"
        />
      </header>

      <ContentRenderer v-if="page && page.body" :value="page" class="font-sans" />
      <footer v-if="page.tags && page.tags.length" class="mt-12 pt-6 border-t border-border-theme">
        <h4 class="text-base font-semibold text-text-secondary mb-3">Tagi:</h4>
        <div class="flex flex-wrap gap-2">
          <NuxtLink 
            v-for="tag in page.tags" 
            :key="tag" 
            :to="`/tag/${slugify(tag)}`" 
            class="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-text-secondary dark:text-slate-300 px-3 py-1 rounded-full text-xs transition-colors"
          >
            {{ tag }}
          </NuxtLink>
        </div>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';


// Definicja layoutu dla tej strony
definePageMeta({
  layout: 'blog', // Używa layouts/blog.vue
});

interface PageData {
  title: string;
  date?: string | Date;
  author?: string;
  category?: string;
  image?: string;
  image_alt?: string;
  description?: string; // Dla meta tagów
  tags?: string[];
  body?: any; // Dla ContentRenderer - lub bardziej specyficzny typ, jeśli znasz strukturę body
  // Dodaj inne pola, które Twoje queryCollection może zwracać
  // np. jeśli meta jest zagnieżdżone
  meta?: {
    author?: string;
    category?: string;
    image_alt?: string;
  };
  // `path` jest używane w Twoim queryCollection, ale ContentRenderer i NuxtLink często oczekują `_path`
  // Jeśli `queryCollection` zwraca `_path`, użyj go.
  path?: string; 
  _path?: string;
}

const route = useRoute();
const { data: page, pending, error } = await useAsyncData<PageData>(
  route.path, // Używamy route.path jako klucza, co jest dobre dla stron dynamicznych
  async () => {
    try {

      const result = await queryCollection('biznes').path(route.path).first();
      
      if (!result) {
        throw createError({ statusCode: 404, statusMessage: 'Strona nie została znaleziona', fatal: true });
      }
      return result;
    } catch (e: any) {
      throw createError({ statusCode: 500, statusMessage: 'Błąd ładowania strony', fatal: true });
    }
  }
);

const formatDate = (dateInput?: string | Date) => {
  if (!dateInput) return '';
  const dateObject = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  return dateObject.toLocaleDateString('pl-PL', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
};

const slugify = (text: string = '') => { // Dodano domyślną wartość na wypadek undefined
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

// Ustawienia <head> dla SEO
// Sprawdzamy, czy `page.value` istnieje przed dostępem do jego właściwości
if (page.value) {
  useHead({
    title: page.value.title,
    meta: [
      { name: 'description', content: page.value.description || `Przeczytaj artykuł ${page.value.title} na naszym blogu` },
      { property: 'og:title', content: page.value.title },
      { property: 'og:description', content: page.value.description },
      { property: 'og:image', content: page.value.image },
    ]
  });
} else if (!pending.value && !error.value) {
  // Jeśli nie ma błędu, nie jest pending, ale strona nie istnieje (np. 404 rzucone przez useAsyncData)
  // useHead dla 404 może być obsługiwane globalnie w error.vue
  useHead({
    title: 'Nie znaleziono strony'
  });
}

</script>

<style>
/* ... (style dla .prose, jeśli używasz @tailwindcss/typography lub niestandardowe) ... */
.prose h1, .prose h2, .prose h3 {
  font-family: var(--font-heading);
  color: rgb(var(--color-text-primary));
}
/* ... reszta stylów ... */
</style>