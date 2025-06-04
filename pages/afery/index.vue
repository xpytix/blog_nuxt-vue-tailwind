<template>
  <div>
    <Head>
      <Title>Afery</Title>
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
import { useRoute } from '#app'; // useRoute jest auto-importowany
import { useAsyncData, useHead } from '#imports'; // useHead i useAsyncData są auto-importowane
import type { Article } from '~/types/article'; // Załóżmy, że typ Article jest zdefiniowany

// --- POBIERANIE DANYCH ARTYKUŁÓW O AFERACH ---


onMounted(async () => {
  const {
  data: articles,
  pending: isLoading,
  error: fetchError,
} = await useAsyncData<Article[]>(
  'afery-category-articles', // Unikalny klucz dla tej strony/kategorii
  () => {
    return queryCollection('afery') // Zakładam, że 'afery' to Twoja kolekcja dla artykułów o tej tematyce
      .order('date', 'DESC') // Możesz dodać sortowanie, jeśli potrzebne
      .limit(15)           // Możesz dodać limit, jeśli potrzebne
      .all();
  }
);
})


// --- KONFIGURACJA SEO DLA STRONY KATEGORII AFERY ---

const siteDomain = "https://moodzik.pl"; // Główna domena Twojej strony
const blogName = "Moodzik.pl";
const route = useRoute(); // Pobranie aktualnej ścieżki

// Dynamiczne tworzenie pełnego URL bieżącej strony kategorii
// route.path będzie np. "/afery"
const pageUrl = `${siteDomain}${route.path}`;

// Specyficzne dla strony Afery
const aferyPageTitle = `Najgłośniejsze afery i kontrowersje – śledztwa i analizy | ${blogName} Afery`;
const aferyPageDescription = `Odkryj kulisy największych afer i kontrowersji na ${blogName}. Dogłębne analizy, dziennikarskie śledztwa i aktualne informacje o głośnych sprawach. Bądź na bieżąco z ${blogName} Afery.`;

// Obrazki - zakładam, że są w głównym folderze /public/images
// Rozważ stworzenie dedykowanego obrazka OG dla kategorii afery
const defaultOgpImageUrl = `${siteDomain}/images/moodzik-og-afery.png`; // np. moodzik-og-afery.png
const blogLogoUrl = `${siteDomain}/images/moodzik-logo.png`; // Logo strony

useHead({
  title: aferyPageTitle,
  htmlAttrs: {
    lang: "pl",
  },
  meta: [
    { name: "description", content: aferyPageDescription },
    // Open Graph (OG) Tags
    { property: "og:title", content: aferyPageTitle },
    { property: "og:description", content: aferyPageDescription },
    { property: "og:image", content: defaultOgpImageUrl },
    { property: "og:image:alt", content: `Afery i kontrowersje na ${blogName}` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:url", content: pageUrl }, // Kanoniczny URL tej strony kategorii
    { property: "og:type", content: "object" }, // 'object' lub 'website' dla strony kategorii
    { property: "og:locale", content: "pl_PL" },
    { property: "og:site_name", content: blogName },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: aferyPageTitle },
    { name: "twitter:description", content: aferyPageDescription },
    { name: "twitter:image", content: defaultOgpImageUrl },
    { name: "twitter:image:alt", content: `Afery i kontrowersje na ${blogName}` },
  ],
  link: [
    { rel: "canonical", href: pageUrl }
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage", // Odpowiedni typ dla strony kategorii/listy
        "name": aferyPageTitle,
        "description": aferyPageDescription,
        "url": pageUrl,
        "isPartOf": { // Wskazuje, że ta strona jest częścią większej witryny
          "@type": "WebSite",
          "url": siteDomain,
          "name": blogName
        },
        "publisher": {
          "@type": "Organization",
          "name": blogName,
          "logo": {
            "@type": "ImageObject",
            "url": blogLogoUrl,
            "width": 200, // Upewnij się, że te wymiary odpowiadają rzeczywistemu obrazkowi logo
            "height": 50,
          },
        },
        // Opcjonalnie: można dodać elementy listy, jeśli chcesz je jawnie oznaczyć
        // "mainEntity": {
        //   "@type": "ItemList",
        //   "itemListElement": articles.value?.map((article, index) => ({
        //     "@type": "ListItem",
        //     "position": index + 1,
        //     "url": `${siteDomain}${article.path}`, // Zakładając, że artykuł ma pole 'path'
        //     "name": article.title // Zakładając, że artykuł ma pole 'title'
        //   })) || []
        // }
      }),
    },
  ],
});
</script>