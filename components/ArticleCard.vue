// components/ArticleCard.vue
<script setup lang="ts">
import type { Article } from '~/types/article'; // Dostosuj ścieżkę

defineProps<{
  article: Article; // Użyj zaimportowanego typu
}>();

// Funkcja do formatowania daty, jeśli data jest obiektem Date
const formatDate = (dateValue: string | Date | undefined): string => {
  if (!dateValue) return '';
  const date = new Date(dateValue);
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
</script>

<template>
  <div class="bg-background-primary shadow-lg rounded-lg overflow-hidden h-full flex flex-col">
    <NuxtLink v-if="article._path" :to="article._path">
      <img
        v-if="article.image"
        :src="article.image"
        :alt="article.image_alt || article.title"
        class="w-full h-48 object-cover"
        loading="lazy"
      />
      <div v-else class="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <span class="text-gray-500">Brak obrazka</span>
      </div>
    </NuxtLink>
    <div class="p-6 flex flex-col flex-grow">
      <NuxtLink v-if="article._path" :to="article._path" class="hover:text-primary transition-colors">
        <h3 class="text-xl font-bold mb-2 text-text-primary">{{ article.title || 'Brak tytułu' }}</h3>
      </NuxtLink>
      <p v-if="article.description" class="text-text-secondary text-sm mb-3 flex-grow">{{ article.description }}</p>
      <div class="text-xs text-text-secondary mt-auto">
        <span v-if="article.date">{{ formatDate(article.date) }}</span>
        <span v-if="article.author"> | {{ article.author }}</span>
      </div>
      <div v-if="article.category" class="mt-2">
        <NuxtLink :to="`/kategoria/${article.category.toLowerCase().replace(/\s+/g, '-')}`" class="text-xs bg-accent text-text-on-accent px-2 py-1 rounded-full hover:bg-opacity-80 transition-colors">
          {{ article.category }}
        </NuxtLink>
      </div>
      <div v-if="article.tags && article.tags.length" class="mt-2 flex flex-wrap gap-1">
        <NuxtLink
          v-for="tag in article.tags"
          :key="tag"
          :to="`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`"
          class="text-xs bg-gray-200 dark:bg-gray-700 text-text-secondary px-2 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          #{{ tag }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>