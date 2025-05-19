<template>

  <NuxtLink :to="article._path || '/'" class="block group bg-background-primary hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden shadow-md h-full flex flex-col">
    <div class="aspect-video w-full overflow-hidden">
      <img
        v-if="article.image"
        :src="article.image"
        :alt="article.image_alt || article.title || 'Obrazek artykułu'" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div v-else class="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-text-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 opacity-50">
          <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      </div>
    </div>
    <div class="p-4 sm:p-5 flex-grow flex flex-col">
      <div class="mb-3 flex flex-wrap items-center text-xs gap-x-3 gap-y-1.5">
        <span 
          v-if="article.category" 
          class="font-semibold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full"
        >
          {{ article.category }}
        </span>
        <span v-if="article.author" class="text-text-secondary italic">
          <span class="opacity-80">przez</span> {{ article.author }}
        </span>
      </div>

      <h3 class="text-lg sm:text-xl font-heading font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">
        {{ article.title }}
      </h3>
      <p v-if="article.description" class="text-sm text-text-secondary font-sans mb-3 line-clamp-3 flex-grow">
        {{ article.description }}
      </p>
      <div class="mt-auto pt-3 text-xs text-text-secondary font-sans border-t border-border-theme/50">
        <span v-if="article.date">{{ formatDate(article.date) }}</span>
        <span v-else>Brak daty</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
// Użyj poprawnego importu dla ParsedContent, np. z '#content' jeśli Nuxt Content v2
// Jeśli poniższy import nadal sprawia problemy w IDE, upewnij się, że wykonałeś "Twardy Reset"
// i masz `typescript` w devDependencies.
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'; 


interface Article extends ParsedContent {
  title?: string; 
  description?: string;
  image?: string;
  image_alt?: string; // Dodajemy pole dla alt tekstu obrazka
  category?: string;  // Pole kategorii
  date?: string;
  author?: string;    // <-- Dodajemy pole autora
  _path?: string; 
}

defineProps<{
  article: Article;
}>();


const formatDate = (dateString?: string) => {
  if (!dateString) return 'Brak daty';
  try {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    console.error("Błąd formatowania daty:", dateString, e);
    return dateString; 
  }
};
</script>

<style scoped>
.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  /* Możesz dodać fallback dla max-height, jeśli nie używasz wtyczki: */
  /* max-height: calc(1.5em * 3); /* Dostosuj do swojego line-height */
}
</style>