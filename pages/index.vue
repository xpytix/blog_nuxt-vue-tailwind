<template>
  <div>
    <SwiperHero :slides="(articles || []).slice(0, 3)" />

    <BestPartner
      logoUrl="/images/mainPartner.png"
      partnerLink="https://stronapartnera.com"
      altText="Nazwa Partnera XYZ"
    />
    <ArticleList
      :articles-data="articles || []"
      :pending="pending"
      :error="error"
      :ads-every-nth="3"
    />
    <div
      class="prose dark:prose-invert lg:prose-xl mx-auto bg-background-secondary rounded-lg shadow-lg"
    >
      <NewestPosts />
      <PartnerPosts />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Article } from "~/types/article";

const {
  data: articles,
  pending, // 'pending' to standardowa nazwa dla statusu ładowania w useAsyncData
  error, // 'error' to standardowa nazwa dla obiektu błędu
} = await useAsyncData<Article[]>( // Używam ParsedContent[], możesz użyć Article[] jeśli pasuje
  "home-page-articles", // Unikalny klucz dla tej strony/kategorii, dodałem "-index" dla jasności
  () => {
    // Zakładam, że masz treści w katalogu content/sporty/
    // Jeśli "sporty" to pole kategorii wewnątrz plików .md, zapytanie byłoby inne, np.:
    // queryContent<ParsedContent>().where({ category: 'sporty' }).sort({ date: -1 }).limit(15).find()
    return queryCollection("blog") // Pobiera dokumenty z katalogu /content/sporty/
      .order("date", "DESC") //Sortowanie: -1 dla DESC, 1 dla ASC; zakładam, że masz pole 'date' w frontmatter
      .limit(15)
      .all(); // .find() jest aliasem dla .all() i jest częściej używane
  },
);

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
  link: [{ rel: "canonical", href: pageUrl }],
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

<style scoped></style>
