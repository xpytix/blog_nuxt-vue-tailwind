<template>
  <div>
    
    <Head>
      <Title>Biznes</Title>
      <Meta
        name="description"
        content="Przeglądaj najnowsze artykuły na moim blogu."
      />
    </Head>
    <SwiperHero :slides="(articles || []).slice(0, 3)"/>

    <ArticleList
      :articles-data="articles || []"
      :pending="pending"
      :error="error"
      :ads-every-nth="3"
    />
  </div>
</template>
<script setup lang="ts">

import type { Article } from "~/types/article"; // Załóżmy, że typ Article jest zdefiniowany

// --- POBIERANIE DANYCH ARTYKUŁÓW BIZNESOWYCH ---

const {
  data: articles,
  pending, // 'pending' to standardowa nazwa dla statusu ładowania w useAsyncData
  error, // 'error' to standardowa nazwa dla obiektu błędu
} = await useAsyncData<Article[]>( // Używam ParsedContent[], możesz użyć Article[] jeśli pasuje
  "biznes-category-articles-index", // Unikalny klucz dla tej strony/kategorii, dodałem "-index" dla jasności
  () => {
    // Zakładam, że masz treści w katalogu content/sporty/
    // Jeśli "sporty" to pole kategorii wewnątrz plików .md, zapytanie byłoby inne, np.:
    // queryContent<ParsedContent>().where({ category: 'sporty' }).sort({ date: -1 }).limit(15).find()
    return queryCollection("biznes") // Pobiera dokumenty z katalogu /content/sporty/
      .order("date", "DESC") //Sortowanie: -1 dla DESC, 1 dla ASC; zakładam, że masz pole 'date' w frontmatter
      .limit(15)
      .all(); // .find() jest aliasem dla .all() i jest częściej używane
  },
);

// --- KONFIGURACJA SEO DLA STRONY KATEGORII BIZNES ---

const siteDomain = "https://moodzik.pl"; // Główna domena Twojej strony
const blogName = "Moodzik.pl";
const route = useRoute(); // Pobranie aktualnej ścieżki

// Dynamiczne tworzenie pełnego URL bieżącej strony kategorii
// route.path będzie np. "/biznes"
const pageUrl = `${siteDomain}${route.path}`;

// Specyficzne dla strony Biznes
const biznesPageTitle = `Najnowsze wiadomości biznesowe, analizy rynkowe i finanse | ${blogName} Biznes`;
const biznesPageDescription = `Odkryj świat biznesu z ${blogName}. Aktualne informacje gospodarcze, analizy trendów rynkowych, porady finansowe i inspirujące historie sukcesu. Twoje źródło wiedzy biznesowej.`;

// Obrazki - zakładam, że są w głównym folderze /public/images
// Rozważ stworzenie dedykowanego obrazka OG dla kategorii biznesowej
const defaultOgpImageUrl = `${siteDomain}/images/LOGO.png`; // np. moodzik-og-biznes.png
const blogLogoUrl = `${siteDomain}/images/LOGO.png`; // Logo strony

useHead({
  title: biznesPageTitle,
  htmlAttrs: {
    lang: "pl",
  },
  meta: [
    { name: "description", content: biznesPageDescription },
    // Open Graph (OG) Tags
    { property: "og:title", content: biznesPageTitle },
    { property: "og:description", content: biznesPageDescription },
    { property: "og:image", content: defaultOgpImageUrl },
    {
      property: "og:image:alt",
      content: `Wiadomości i analizy biznesowe na ${blogName}`,
    },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:url", content: pageUrl }, // Kanoniczny URL tej strony kategorii
    { property: "og:type", content: "object" }, // 'object' lub 'website' dla strony kategorii
    { property: "og:locale", content: "pl_PL" },
    { property: "og:site_name", content: blogName },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: biznesPageTitle },
    { name: "twitter:description", content: biznesPageDescription },
    { name: "twitter:image", content: defaultOgpImageUrl },
    {
      name: "twitter:image:alt",
      content: `Wiadomości i analizy biznesowe na ${blogName}`,
    },
  ],
  link: [{ rel: "canonical", href: pageUrl }],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage", // Odpowiedni typ dla strony kategorii/listy
        name: biznesPageTitle,
        description: biznesPageDescription,
        url: pageUrl,
        isPartOf: {
          // Wskazuje, że ta strona jest częścią większej witryny
          "@type": "WebSite",
          url: siteDomain,
          name: blogName,
        },
        publisher: {
          "@type": "Organization",
          name: blogName,
          logo: {
            "@type": "ImageObject",
            url: blogLogoUrl,
            width: 200, // Upewnij się, że te wymiary odpowiadają rzeczywistemu obrazkowi logo
            height: 50,
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
