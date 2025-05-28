<template>
  <div>
    <div v-if="pending && !page" class="text-center py-20 text-text-secondary">
      Ładowanie artykułu...
    </div>
    <div v-else-if="error || !page" class="text-center py-20 text-red-500">
      <h1 class="text-2xl font-heading mb-4">
        {{ error && error.statusCode === 404 ? '404 - Nie znaleziono strony' : 'Wystąpił błąd' }}
      </h1>
      <p v-if="error">
        {{ error.message || (error.statusCode === 404 ? 'Strona, której szukasz, nie istnieje.' : 'Nie można załadować artykułu.') }}
      </p>
      <p v-else>Nie znaleziono artykułu pod tym adresem.</p>
      <NuxtLink to="/" class="mt-6 inline-block text-accent hover:underline">Wróć na stronę główną</NuxtLink>
    </div>

    <article v-else class="prose dark:prose-invert lg:prose-xl mx-auto bg-background-secondary p-6 sm:p-8 md:p-10 rounded-lg shadow-lg">
      <header class="mb-8">
        <img
          :src="displayImage"
          :alt="page.image_alt || page.meta?.image_alt || page.title || 'Obrazek tytułowy artykułu'"
          class="w-full aspect-[16/9] sm:aspect-[2/1] object-cover rounded-md mt-6 mb-8 shadow-md"
          loading="lazy"
          @error="onImageError"
        />
        <h1 class="!text-3xl sm:!text-4xl lg:!text-5xl font-heading text-text-primary !mb-3 !leading-tight">
          {{ page.title }}
        </h1>
        <div class="text-sm text-text-secondary font-sans flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4">
          <span v-if="page.date">
            Opublikowano: {{ formatDate(page.date) }}
          </span>
          <span v-if="page.author || page.meta?.author">
            Autor: {{ page.author || page.meta?.author }}
          </span>
        </div>
      </header>

      <ContentRenderer v-if="page && page.body" :value="page" class="font-sans" />

      <footer v-if="page.tags && page.tags.length" class="mt-12 pt-6 border-t border-border-theme">
        <h4 class="text-base font-semibold text-text-secondary mb-3">Tagi:</h4>
        <div class="flex flex-wrap gap-2">
          <NuxtLink
            v-for="tag in page.tags"
            :key="tag"
            :to="`/tag/${slugify(tag)}`"
            class="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-text-secondary dark:text-slate-300 px-3 py-1 rounded-full text-xs transition-colors"
          >
            {{ tag }}
          </NuxtLink>
        </div>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
import { useRoute, createError } from '#app'; // createError jest autoimportowany, ale można dla jasności
import { computed } from 'vue'; // Importuj computed
import { useHead, useAsyncData } from '#imports'; // useHead i useAsyncData są autoimportowane

// Definicja layoutu dla tej strony
definePageMeta({
  layout: 'blog', // Używa layouts/blog.vue
});

interface PageMeta {
  author?: string;
  category?: string;
  image_alt?: string;
  // Możesz dodać inne pola meta, jeśli są potrzebne
}
interface PageData {
  title: string;
  date?: string | Date;
  dateModified?: string | Date; // Dla schema.org
  author?: string;
  category?: string;
  image?: string;
  image_alt?: string;
  description?: string;
  tags?: string[];
  body?: any; // Typ z Nuxt Content dla renderowanej treści
  meta?: PageMeta;
  _path?: string; // Z Nuxt Content
  authorTwitterHandle?: string; // Np. @HandleAutora
}

const route = useRoute();

// --- POBIERANIE DANYCH ---
const { data: page, pending, error } = await useAsyncData<PageData>(
  `page-${route.path}`, // Unikalny klucz dla useAsyncData
  async () => {
    try {
      // Zakładam, że 'queryCollection' to Twoja funkcja. 'sporty' może być dynamiczne lub to nazwa kolekcji.
      // Jeśli używasz Nuxt Content, byłoby to np. queryContent<PageData>(route.path).findOne()
      // @ts-ignore - jeśli queryCollection to funkcja globalna/pluginowa
      const result = await queryCollection('sporty').path(route.path).first();

      if (!result) {
        // Użyj `createError` z Nuxta do obsługi 404
        throw createError({ statusCode: 404, statusMessage: 'Strona nie została znaleziona', fatal: true });
      }
      return result as PageData;
    } catch (e: any) {
      // Jeśli błąd już ma statusCode, przekaż go dalej, w przeciwnym razie ustaw 500
      throw createError({ statusCode: e.statusCode || 500, statusMessage: e.statusMessage || 'Błąd ładowania strony', fatal: true });
    }
  }
);

// --- FUNKCJE POMOCNICZE ---
const formatDate = (dateInput?: string | Date): string => {
  if (!dateInput) return '';
  const dateObject = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(dateObject.getTime())) return 'Nieprawidłowa data';
  return dateObject.toLocaleDateString('pl-PL', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
};

const slugify = (text: string = ''): string => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

// Obrazek do wyświetlenia w szablonie (z fallbackiem)
const displayImage = computed(() => {
  // Użyj obrazka z artykułu, jeśli jest. Jeśli nie, użyj domyślnego z folderu /images/ (zakładając, że jest w public)
  // Możesz chcieć mieć inny fallback niż ten dla social media.
  return page.value?.image || '/images/SPORT.png'; // Ten fallback jest specyficzny dla sportu, jak w Twoim kodzie
});

const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  if (!target.src.includes('/images/fallbacks/image-error.png')) { // Zapobiega pętli
    target.src = '/images/fallbacks/image-error.png'; // Upewnij się, że ten obrazek istnieje
  }
};


// --- SEO i META TAGI ---
// Pobierz konfigurację runtime, jeśli tam trzymasz siteUrl i blogName
// const runtimeConfig = useRuntimeConfig();
// const siteUrl = runtimeConfig.public.siteUrl;
// const blogName = runtimeConfig.public.blogName;

// Wersja z placeholderami:
const siteUrl = 'https://moodzik.pl'; // ZASTĄP!
const blogName = 'MOODZIK'; // ZASTĄP!
const defaultSocialImage = '/images/SPORT.png';
const blogLogoUrl = '/images/LOGO.png'; // Logo bloga

if (error.value && error.value.statusCode !== 404) {
  // Dla błędów serwera (np. 500) lub innych niż 404
  useHead({
    title: `Błąd | ${blogName}`,
    htmlAttrs: { lang: 'pl' },
    meta: [{ name: 'robots', content: 'noindex, nofollow' }]
  });
} else if (!page.value && !pending.value) { // Stan po załadowaniu, gdy strona nie istnieje (404)
  useHead({
    title: `404 - Nie znaleziono strony | ${blogName}`,
    htmlAttrs: { lang: 'pl' },
    meta: [{ name: 'robots', content: 'noindex, follow' }]
  });
} else if (page.value) { // Strona załadowana poprawnie
  const pageUrl = `${siteUrl}${route.path}`;
  const effectiveImageForSocial = page.value.image || defaultSocialImage;
  const socialImageUrlAbsolute = effectiveImageForSocial.startsWith('http')
    ? effectiveImageForSocial
    : `${siteUrl}${effectiveImageForSocial}`;

  const descriptionContent = page.value.description || `Przeczytaj artykuł ${page.value.title} na ${blogName}. ${page.value.category ? 'Kategoria: ' + page.value.category : ''}`;
  const pageTitle = `${page.value.title} | ${blogName}`;
  const imageAltContent = page.value.image_alt || page.value.meta?.image_alt || page.value.title || 'Obrazek artykułu';
  const authorName = page.value.author || page.value.meta?.author || blogName;

  useHead({
    title: pageTitle,
    htmlAttrs: { lang: 'pl' },
    meta: [
      { name: 'description', content: descriptionContent },
      // Open Graph
      { property: 'og:title', content: page.value.title },
      { property: 'og:description', content: descriptionContent },
      { property: 'og:image', content: socialImageUrlAbsolute },
      { property: 'og:image:alt', content: imageAltContent },
      { property: 'og:image:width', content: '1200' }, // Przykładowo
      { property: 'og:image:height', content: '630' }, // Przykładowo
      { property: 'og:url', content: pageUrl },
      { property: 'og:type', content: 'article' },
      { property: 'og:locale', content: 'pl_PL' },
      { property: 'og:site_name', content: blogName },
      { property: 'article:published_time', content: page.value.date ? new Date(page.value.date).toISOString() : undefined },
      { property: 'article:modified_time', content: page.value.dateModified ? new Date(page.value.dateModified).toISOString() : (page.value.date ? new Date(page.value.date).toISOString() : undefined) },
      { property: 'article:author', content: authorName },
      { property: 'article:section', content: page.value.category },
      ...(page.value.tags ? page.value.tags.map(tag => ({ property: 'article:tag', content: tag })) : []),

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: page.value.title },
      { name: 'twitter:description', content: descriptionContent },
      { name: 'twitter:image', content: socialImageUrlAbsolute },
      { name: 'twitter:image:alt', content: imageAltContent },
      // { name: 'twitter:site', content: '@TwojTwitterHandleBloga' },
      // { name: 'twitter:creator', content: page.value.authorTwitterHandle || '@TwojTwitterHandleBloga' },
    ],
    link: [
      { rel: 'canonical', href: pageUrl }
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
          headline: page.value.title,
          image: [socialImageUrlAbsolute],
          datePublished: page.value.date ? new Date(page.value.date).toISOString() : undefined,
          dateModified: page.value.dateModified ? new Date(page.value.dateModified).toISOString() : (page.value.date ? new Date(page.value.date).toISOString() : undefined),
          author: {
            '@type': (page.value.author || page.value.meta?.author) ? 'Person' : 'Organization',
            name: authorName,
          },
          publisher: {
            '@type': 'Organization',
            name: blogName,
            logo: {
              '@type': 'ImageObject',
              url: `${siteUrl}${blogLogoUrl}`,
              width: 600, // Przykładowo
              height: 60  // Przykładowo
            },
          },
          description: descriptionContent,
        }),
      },
    ],
  });
}
</script>

<style>

</style>