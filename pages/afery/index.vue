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
  'afery', // Dobrą praktyką jest nadawanie unikalnego klucza dla useAsyncData
  () => {

    return queryCollection('afery')
      .all();
  }
);


</script>

<style scoped>
/* Twoje style dla strony, jeśli jakieś są */
</style>