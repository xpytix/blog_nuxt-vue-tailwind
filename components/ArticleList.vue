// components/ArticleList.vue

<template>
  <div class="container mx-auto px-4 py-8">
    <div
      v-if="pending && itemsToDisplay.length === 0"
      class="text-center py-10 text-text-secondary"
    >
      Ładowanie artykułów...
    </div>
    <div v-else-if="error" class="text-center py-10 text-red-500">
      <p>Wystąpił błąd podczas ładowania artykułów.</p>
      <pre
        class="mt-2 text-xs text-left bg-slate-100 dark:bg-slate-800 p-2 rounded overflow-auto"
      >{{ error }}</pre>
    </div>
    <div
      v-else-if="itemsToDisplay.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8"
    >
      <template v-for="item in itemsToDisplay" :key="item.id">
        <div v-if="item.type === 'article' && item.data" class="flex">
          <ArticleCard :article="item.data" />
        </div>
        <div v-else-if="item.type === 'ad'" class="flex items-stretch">
          <GoogleAds class="w-full h-full" /> </div>
      </template>
    </div>
    <div v-else class="text-center py-10 text-text-secondary">
      Nie znaleziono żadnych artykułów.
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { Article } from '~/types/article'; // Dostosuj ścieżkę

// Interfejs ArticleFromQuery staje się teraz tożsamy z Article (lub bardzo podobny)
// Możesz go zastąpić bezpośrednio przez Article, jeśli nie ma dodatkowych pól
// specyficznych tylko dla wyniku queryContent.
// Dla uproszczenia, zakładamy, że ArticleFromQuery to po prostu Article.
// Jeśli queryContent zwraca trochę inną strukturę, zachowaj ArticleFromQuery
// i upewnij się, że mapPostToArticleCardData poprawnie mapuje na Article.

interface DisplayItem {
  type: 'article' | 'ad';
  id: string;
  data?: Article; // Używamy teraz typu Article
}

const props = defineProps<{
  articlesData: Article[] | null | undefined; // Używamy typu Article[]
  pending: boolean;
  error: any;
  adsEveryNth?: number;
}>();

const mapPostToArticleData = (post: Article): Article => { // Zmieniona nazwa funkcji i typ zwracany
  return {
    _id: post._id,
    _path: post._path,
    title: post.title,
    description: post.description,
    image: post.image,
    image_alt: post.image_alt || post.title,
    category: post.category,
    date: post.date,
    author: post.author,
    tags: post.tags,
  };
};

const itemsToDisplay = computed<DisplayItem[]>(() => {
  // ... (logika pozostaje podobna, ale używa `mapPostToArticleData`) ...
  // console.log(`[ArticleList] itemsToDisplay:`, props.articlesData); // Możesz to usunąć po debugowaniu
  // console.log(props.pending);
  // console.log(props.error);

  if (props.pending && (!props.articlesData || props.articlesData.length === 0)) {
    return [];
  }
  // Poniższy warunek jest ważny, aby obsłużyć sytuację, gdy dane są puste po załadowaniu
  if (!props.pending && (!props.articlesData || props.articlesData.length === 0)) {
    return [];
  }
  // Jeśli jest błąd, ale mamy jakieś dane (np. z SSR), możemy je pokazać, ale błąd też powinien być widoczny.
  // Jednakże, jeśli błąd oznacza brak danych, lepiej zwrócić pustą tablicę.
  // Jeśli jest error, a nie ma danych, to też zwracamy pustą listę.
  if (props.error && (!props.articlesData || props.articlesData.length === 0)) {
    return [];
  }


  const articles = props.articlesData || [];
  const newItems: DisplayItem[] = [];
  let adIndex = 0;
  const adsInterval = props.adsEveryNth && props.adsEveryNth > 0 ? props.adsEveryNth : 2;

  articles.forEach((post, index) => {
    if (!post._path) {
      console.warn(`[ArticleList] Pomijam post (tytuł: ${post.title || 'Brak tytułu'}) z powodu braku _path.`);
      return;
    }
    newItems.push({
      type: 'article',
      id: post._id || post._path,
      data: mapPostToArticleData(post) // Używamy nowej funkcji mapującej
    });

    if ((index + 1) % adsInterval === 0 && (index + 1) < articles.length) {
      newItems.push({ type: 'ad', id: `ad-${adIndex++}` });
    }
  });
  return newItems;
});
</script>