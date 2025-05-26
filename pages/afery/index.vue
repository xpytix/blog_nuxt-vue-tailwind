// pages/index.vue
<template>
  <div>
    <Head>
      <Title>Mój Blog</Title>
      <Meta name="description" content="Przeglądaj najnowsze artykuły na moim blogu." />
    </Head>

    <ArticleList
      :articles-data="articles || []"
      :pending="isLoading"
      :error="fetchError"
      :ads-every-nth="3"
    />

  </div>
</template>

<script setup lang="ts">
// Destrukturujemy `data`, `pending` i `error` z wyniku useAsyncData
// Zmieniłem nazwy dla lepszej czytelności, ale możesz użyć oryginalnych `data`, `pending`, `error`
const { data: articles, pending: isLoading, error: fetchError } = await useAsyncData(
  'home-page-articles', // Dobrą praktyką jest nadawanie unikalnego klucza dla useAsyncData
  () => {
    // Zakładam, że queryCollection to Twoja niestandardowa funkcja do pobierania danych.
    // Upewnij się, że zwraca ona Promise.
    // Parametr 'nuxtApp' (dawniej 'e') jest dostępny, jeśli go potrzebujesz, ale często nie jest konieczny.
    return queryCollection('afery')
      // .where('published', '=', true) // Twoje przykładowe warunki
      // .orWhere(query => query.where('featured', '=', true).where('priority', '>', 5))
      .all();
  }
);

// Jeśli używasz Nuxt Content, typowe zapytanie wyglądałoby mniej więcej tak:
// import { queryContent } from '#imports'; // Lub jest auto-importowane
// const { data: articles, pending: isLoading, error: fetchError } = await useAsyncData(
//   'home-page-articles',
//   () => queryContent('/blog') // Ścieżka do Twoich artykułów w katalogu /content
//     // .where({ published: true }) // Przykład filtrowania
//     .sort({ date: -1 }) // Przykładowe sortowanie
//     .find()
// );
</script>

<style scoped>
/* Twoje style dla strony, jeśli jakieś są */
</style>