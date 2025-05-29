<template>
  <div
    v-if="articles.length > 0"
  class="container mx-auto mb-8 "
  >
    <h2
    class="text-2xl font-bold uppercase sm:text-3xl font-heading text-text-primary mb-6 sm:text-left" >
      MOODZIK NA DZIŚ:
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
      <ArticleCard
        v-for="relatedArticle in articles"
        :key="relatedArticle._path"
        :article="relatedArticle"
      />
    </div>
</div>
</template>

<script setup lang="ts">
const {
  data: articles,
  pending: isLoading,
  error: fetchError,
} = await useAsyncData("newest-articles", () => {
  return queryCollection("blog").order("date", "DESC").limit(3).all();
});


</script>

<style>



</style>
