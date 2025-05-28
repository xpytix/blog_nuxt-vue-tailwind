<template>
    <div> <div v-if="isLoading" class="text-center py-10 text-text-secondary">
        Ładowanie partnerów... </div>
  
      <div v-else-if="fetchError" class="text-center py-10 text-red-500">
        <p class="font-semibold">Wystąpił błąd podczas ładowania informacji o partnerach.</p>
        <p class="text-sm mt-1">{{ fetchError.message || fetchError }}</p>
      </div>
  
      <div
        v-else-if="articles && articles.length > 0"
        class="max-w-5xl mx-auto sm:px-6 lg:px-8 py-8" >
        <h2
          class="text-2xl sm:text-3xl font-heading text-text-primary mb-6 sm:text-left" >
          To dzięki nim:
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          <ArticleCard
            v-for="partnerArticle in articles" :key="partnerArticle.path || partnerArticle.title" :article="partnerArticle"
          />
        </div>
      </div>
  
      <div v-else class="max-w-5xl mx-auto sm:px-6 lg:px-8 py-8 text-center text-text-secondary">
        <h2
          class="text-2xl sm:text-3xl font-heading text-text-primary mb-6 sm:text-left"
        >
          To dzięki nim:
        </h2>
        <p>Obecnie nie wyróżniamy żadnych partnerów.</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
  const {
  data: articles,
  pending: isLoading,
  error: fetchError,
} = await useAsyncData("partner-articles", () => {
  return queryCollection("blog")
  .where('isPartnerContent', 'IS NOT NULL')
  .order("date", "DESC")
  .limit(12).all();
});

  </script>
  
  <style scoped>
 
  </style>