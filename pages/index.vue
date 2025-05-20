<template>
  <div>
    <PageHeader
      title="Najnowsze Artykuły"
      description="Przeglądaj nasze ostatnie wpisy."
    />
    <ArticleList
      :articles-data="articles"
      :pending="pending"
      :error="error"
      :ads-every-nth="3"
    />
  </div>
</template>

<script setup lang="ts">
// Importuj ArticleList, jeśli nie jest zarejestrowany globalnie
// import ArticleList from '~/components/ArticleList.vue';
// import PageHeader from '~/components/PageHeader.vue'; // Przykładowy komponent

// Interfejs dla danych artykułu, powinien być taki sam jak w ArticleList
// lub zaimportowany ze współdzielonego pliku typów.
interface ArticleFromQuery {
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
}

useHead({
  title: "Mój Super Blog PoC - Strona Główna",
  meta: [
    {
      name: "description",
      content:
        "Blog demonstracyjny stworzony z Nuxt.js, Tailwind CSS i Nuxt Content",
    },
  ],
});

// Pobieranie danych dla strony głównej
const {
  data: articles,
  pending,
  error,
} = await useAsyncData<PostFromQueryCollection[]>(
  "blog-collection-with-author-cat",

  async () => {
    try {
      const result = await queryCollection("blog").limit(8).all();
      console.log(result);
      
      return result || [];
    } catch (e: any) {
      console.error("[useAsyncData] BŁĄD w queryCollection:", e.message, e);

      return [];
    }
  },
);
</script>

<style scoped>
/* Style specyficzne dla strony */
</style>
