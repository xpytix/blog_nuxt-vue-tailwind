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
// import ArticleList from '~/components/ArticleList.vue'; // Upewnij się, że ArticleList jest zaimportowany, jeśli nie jest globalny

// --- POBIERANIE DANYCH ARTYKUŁÓW ---

const {
  data: articles,
  pending: isLoading,
  error: fetchError,
} = await useAsyncData<Article[]>("home-page-articles", 
() => {
  return queryCollection("blog") 
    .order("date", "DESC")
    .limit(25) // Pobierasz 25 najnowszych artykułów
    .all();
  // Pamiętaj: jeśli .all() pobiera pełną treść, 25 artykułów to może być sporo danych.
  // Rozważ pobieranie tylko potrzebnych pól dla ArticleList, jeśli Twoje queryCollection to wspiera.
});

// --- KONFIGURACJA SEO DLA STRONY GŁÓWNEJ ---

// Wartości konfiguracyjne - najlepiej przenieść do runtimeConfig Nuxta lub pliku konfiguracyjnego
const siteUrl = "https://moodzik.pl"; // ZASTĄP swoim prawdziwym URL-em
const blogName = "Moodzik.pl"; // ZASTĄP prawdziwą nazwą bloga
const defaultBlogDescription =
  "Odkryj najnowsze artykuły, wnikliwe analizy i poradniki ze świata afer, biznesu, sportu i lifestyle na Moodzik.pl. Twoje źródło codziennej dawki wiedzy i inspiracji.";
const defaultOgpImageUrl = `${siteUrl}/images/social/moodzik-og-default.png`; // Przykładowa ścieżka, upewnij się, że obrazek istnieje w /public
const blogLogoUrl = `${siteUrl}/images/logos/moodzik-logo.png`; // Przykładowa ścieżka do logo
// const twitterHandle = '@TwojTwitterHandle'; // Opcjonalnie, jeśli masz

const route = useRoute();
const pageUrl = `${siteUrl}${route.path}`; // Kanoniczny URL bieżącej strony

useHead({
  title: `${blogName} - Afery, Biznes, Sport, Lifestyle | Strona Główna`, // Bardziej opisowy tytuł
  htmlAttrs: {
    lang: "pl", // Ustawienie języka dla całej strony HTML
  },
  meta: [
    { name: "description", content: defaultBlogDescription },
    // Open Graph (dla Facebook, LinkedIn, Pinterest itp.)
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
    // { name: 'twitter:site', content: twitterHandle }, // Jeśli masz konto Twitter dla strony

    // Dodatkowe meta tagi
    // { name: 'robots', content: 'index, follow' } // Zazwyczaj domyślne dla strony głównej, ale można dodać jawnie
  ],
  link: [
    { rel: "canonical", href: pageUrl },
    // Przykłady innych przydatnych linków:
    // { rel: 'alternate', hreflang: 'en', href: `${siteUrl}/en${route.path}` }, // Jeśli masz wersje językowe
    // { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    // { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    // { rel: 'manifest', href: '/site.webmanifest' }
  ],
  script: [
    // Dane strukturalne JSON-LD
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite", // Dla strony głównej. Jeśli to główna strona bloga, można też użyć 'Blog'
        url: siteUrl,
        name: blogName,
        description: defaultBlogDescription,
        // Opcjonalnie: Wyszukiwarka wewnątrzwitrynowa w wynikach Google
        // potentialAction: {
        //   '@type': 'SearchAction',
        //   target: {
        //     '@type': 'EntryPoint',
        //     urlTemplate: `${siteUrl}/szukaj?q={search_term_string}`
        //   },
        //   'query-input': 'required name=search_term_string'
        // },
        publisher: {
          // Informacje o wydawcy są zawsze dobrym pomysłem
          "@type": "Organization", // Lub 'Person', jeśli to blog osobisty
          name: blogName,
          logo: {
            "@type": "ImageObject",
            url: blogLogoUrl, // Upewnij się, że ten plik istnieje
            width: 200, // Przykładowe wymiary, dostosuj
            height: 50, // Przykładowe wymiary, dostosuj
          },
        },
      }),
    },
  ],
});
</script>

<style scoped>
/* Twoje style dla strony, jeśli jakieś są */
</style>
