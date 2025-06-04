<template>
  <div>
    <ArticleList
      :articles-data="articles || []"
      :pending="isLoading"
      :error="fetchError"
      :ads-every-nth="3"
    />
    <div class=" mt-8 pt-6 border-t border-border-theme" >
      <NewestPosts />
      <PartnerPosts />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "#app"; // useRoute jest auto-importowany, ale można dla jasności
import { useAsyncData, useHead } from "#imports"; // useHead i useAsyncData są auto-importowane
import type { Article } from "~/types/article"; // Załóżmy, że typ Article jest zdefiniowany

// --- POBIERANIE DANYCH ARTYKUŁÓW ---



onMounted(async () => {
  const {
  data: articles,
  pending: isLoading,
  error: fetchError,
} = await useAsyncData<Article[]>("home-page-articles", 
() => {
  return queryCollection("blog") 
    .order("date", "DESC")
    .limit(15) // Pobierasz 15 najnowszych artykułów
    .all();
});})


const siteUrl = "https://moodzik.pl"; 
const blogName = "Moodzik.pl"; 
const defaultBlogDescription =
  "Odkryj najnowsze artykuły, wnikliwe analizy i poradniki ze świata afer, biznesu, sportu i lifestyle na Moodzik.pl. Twoje źródło codziennej dawki wiedzy i inspiracji.";
const defaultOgpImageUrl = `${siteUrl}/images/LOGO.png`; // Przykładowa ścieżka, upewnij się, że obrazek istnieje w /public
const blogLogoUrl = `${siteUrl}/images/LOGO.png`; // Przykładowa ścieżka do logo


const route = useRoute();
const pageUrl = `${siteUrl}${route.path}`; 

useHead({
  title: `${blogName} - Afery, Biznes, Sport, Lifestyle | Strona Główna`, // Bardziej opisowy tytuł
  htmlAttrs: {
    lang: "pl", 
  },
  meta: [
    { name: "description", content: defaultBlogDescription },
    {
      property: "og:title",
      content: `${blogName} - Twoje Centrum Wiedzy i Inspiracji`,
    },
    { property: "og:description", content: defaultBlogDescription },
    { property: "og:image", content: defaultOgpImageUrl },
    { property: "og:image:alt", content: `Logo ${blogName}` },
    { property: "og:image:width", content: "1200" }, // Standardowe wymiary dla OG
    { property: "og:image:height", content: "630" },
    { property: "og:url", content: pageUrl }, // Kanoniczny URL tej strony
    { property: "og:type", content: "website" }, // Dla strony głównej lub głównej strony bloga
    { property: "og:locale", content: "pl_PL" },
    { property: "og:site_name", content: blogName },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" }, // Duży obrazek w karcie Twittera
    {
      name: "twitter:title",
      content: `${blogName} - Twoje Centrum Wiedzy i Inspiracji`,
    },
    { name: "twitter:description", content: defaultBlogDescription },
    { name: "twitter:image", content: defaultOgpImageUrl },
    { name: "twitter:image:alt", content: `Logo ${blogName}` },

  ],
  link: [
    { rel: "canonical", href: pageUrl }
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: siteUrl,
        name: blogName,
        description: defaultBlogDescription,
        publisher: {
          "@type": "Organization", 
          name: blogName,
          logo: {
            "@type": "ImageObject",
            url: blogLogoUrl, 
            width: 200, 
            height: 50, 
          },
        },
      }),
    },
  ],
});
</script>

<style scoped>
</style>
