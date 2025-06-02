<script setup lang="ts">
import { useRoute } from '#app'; // useRoute jest auto-importowany
import { useAsyncData, useHead } from '#imports'; // useHead i useAsyncData są auto-importowane
import type { Article } from '~/types/article'; // Załóżmy, że typ Article jest zdefiniowany

// --- POBIERANIE DANYCH ARTYKUŁÓW SPORTOWYCH ---
const {
  data: articles,
  pending: isLoading,
  error: fetchError,
} = await useAsyncData<Article[]>(
  'sport-category-articles', // Unikalny klucz dla tej strony/kategorii
  () => {
    return queryCollection('sporty') // Zakładam, że 'sporty' to Twoja kolekcja dla artykułów sportowych
      .order('date', 'DESC')
      .limit(15)
      .all();
  }
);

// --- KONFIGURACJA SEO DLA STRONY KATEGORII SPORT ---

const siteDomain = "https://moodzik.pl"; // Główna domena Twojej strony
const blogName = "Moodzik.pl";
const route = useRoute(); // Pobranie aktualnej ścieżki

// Dynamiczne tworzenie pełnego URL bieżącej strony kategorii
// route.path będzie np. "/sporty"
const pageUrl = `${siteDomain}${route.path}`;

// Specyficzne dla strony Sport
const sportPageTitle = `Najnowsze wiadomości sportowe, wyniki i analizy | ${blogName} Sport`;
const sportPageDescription = `Śledź aktualne wydarzenia ze świata sportu na ${blogName}. Artykuły, wyniki na żywo, analizy meczów, wywiady z zawodnikami i wiele więcej. Twoje centrum informacji sportowych.`;

// Obrazki - zakładam, że są w głównym folderze /public/images
const defaultOgpImageUrl = `${siteDomain}/images/LOGO.png`; // Sugeruję dedykowany obrazek OG dla sportu, lub ogólny
const blogLogoUrl = `${siteDomain}/images/LOGO.png`; // Logo strony

useHead({
  title: sportPageTitle,
  htmlAttrs: {
    lang: "pl",
  },
  meta: [
    { name: "description", content: sportPageDescription },
    // Open Graph (OG) Tags
    { property: "og:title", content: sportPageTitle },
    { property: "og:description", content: sportPageDescription },
    { property: "og:image", content: defaultOgpImageUrl },
    { property: "og:image:alt", content: `Wiadomości sportowe na ${blogName}` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:url", content: pageUrl }, // Kanoniczny URL tej strony kategorii
    { property: "og:type", content: "object" }, // 'object' lub 'website' dla strony kategorii. 'article:section' jest też opcją.
    { property: "og:locale", content: "pl_PL" },
    { property: "og:site_name", content: blogName },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: sportPageTitle },
    { name: "twitter:description", content: sportPageDescription },
    { name: "twitter:image", content: defaultOgpImageUrl },
    { name: "twitter:image:alt", content: `Wiadomości sportowe na ${blogName}` },
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
        "name": sportPageTitle,
        "description": sportPageDescription,
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
        //   "itemListElement": articles.value?.map((article, index) => ({ // Użyj .value, jeśli articles to ref
        //     "@type": "ListItem",
        //     "position": index + 1,
        //     "url": `${siteDomain}${article.path}` // Zakładając, że artykuł ma pole 'path'
        //     // Możesz też dodać "name" dla każdego ListItem
        //   })) || []
        // }
      }),
    },
  ],
});
</script>