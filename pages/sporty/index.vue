<template>
  <div>
    <ArticleList
      :articles-data="articles || []"
      :pending="pending"
      :error="error"
      :ads-every-nth="3"
    />
  </div>
</template>

<script setup lang="ts">

const {
  data: articles,
  pending, // 'pending' to standardowa nazwa dla statusu ładowania w useAsyncData
  error, // 'error' to standardowa nazwa dla obiektu błędu
} = await useAsyncData<any[]>( // Używam ParsedContent[], możesz użyć Article[] jeśli pasuje
  "sport-category-articles-index", // Unikalny klucz dla tej strony/kategorii, dodałem "-index" dla jasności
  () => {
    // Zakładam, że masz treści w katalogu content/sporty/
    // Jeśli "sporty" to pole kategorii wewnątrz plików .md, zapytanie byłoby inne, np.:
    // queryContent<ParsedContent>().where({ category: 'sporty' }).sort({ date: -1 }).limit(15).find()
    return queryCollection("sporty") // Pobiera dokumenty z katalogu /content/sporty/
      .order("date", "DESC") //Sortowanie: -1 dla DESC, 1 dla ASC; zakładam, że masz pole 'date' w frontmatter
      .limit(15)
      .all(); // .find() jest aliasem dla .all() i jest częściej używane
  },
);


const siteDomain = "https://moodzik.pl";
const blogName = "Moodzik.pl";
const route = useRoute();
const pageUrl = `${siteDomain}${route.path}`; // route.path dla strony głównej to "/"

// Tytuł i opis dla strony głównej skoncentrowanej na sporcie
const pageTitle = `Sport na ${blogName}: Najnowsze wiadomości, analizy i wyniki`;
const pageDescription = `Śledź najświeższe informacje ze świata sportu na ${blogName}. Artykuły, wywiady, analizy i wyniki sportowe. Bądź na bieżąco z ulubionymi dyscyplinami.`;

const defaultOgpImageUrl = `${siteDomain}/images/LOGO.png`; // Upewnij się, że ten obraz istnieje i jest odpowiedni
const blogLogoUrl = `${siteDomain}/images/LOGO.png`;

useHead({
  title: pageTitle, // Używamy ogólnego pageTitle, bo to strona główna
  htmlAttrs: {
    lang: "pl",
  },
  meta: [
    { name: "description", content: pageDescription },
    // Open Graph (OG) Tags
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: pageDescription },
    { property: "og:image", content: defaultOgpImageUrl },
    { property: "og:image:alt", content: `Wiadomości sportowe na ${blogName}` },
    { property: "og:image:width", content: "1200" }, // Standardowe wymiary dla OG image
    { property: "og:image:height", content: "630" },
    { property: "og:url", content: pageUrl },
    { property: "og:type", content: "website" }, // Dla strony głównej 'website' jest bardziej odpowiednie
    { property: "og:locale", content: "pl_PL" },
    { property: "og:site_name", content: blogName },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: pageTitle },
    { name: "twitter:description", content: pageDescription },
    { name: "twitter:image", content: defaultOgpImageUrl },
    {
      name: "twitter:image:alt",
      content: `Wiadomości sportowe na ${blogName}`,
    },
  ],
  link: [{ rel: "canonical", href: pageUrl }],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite", // Dla strony głównej, 'WebSite' lub 'Blog'
        name: blogName,
        url: siteDomain,
        description: pageDescription,
        publisher: {
          "@type": "Organization",
          name: blogName,
          logo: {
            "@type": "ImageObject",
            url: blogLogoUrl,
            // "width": 200, // Podaj rzeczywiste wymiary loga
            // "height": 50,
          },
        },
        // Można rozważyć dodanie 'mainEntityOfPage' jeśli strona główna ma jednoznaczny główny temat
        // lub 'hasPart' do listowania głównych sekcji/kategorii, jeśli to strona portalowa
        // Dla listy artykułów bardziej pasowałby typ 'Blog' lub 'CollectionPage',
        // ale skoro to index.vue, 'WebSite' jest bezpiecznym wyborem.
        // Jeśli chcesz, aby schema.org odzwierciedlała listę artykułów:
        /*
        "@type": "Blog", // lub CollectionPage
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": articles.value?.map((article, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `${siteDomain}${article._path}`, // _path to standardowe pole w Nuxt Content
            "name": article.title
          })) || []
        }
        */
      }),
    },
  ],
});
</script>
