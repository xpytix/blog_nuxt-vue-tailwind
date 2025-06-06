<template>
  <div >
    <div v-if="pending && !page" class="text-center py-20 text-text-secondary">
      Ładowanie artykułu...
    </div>
    <div v-else-if="error || !page" class="text-center py-20 text-red-500">
      <h1 class="text-2xl font-heading mb-4">
        {{
          error && error.statusCode === 404
            ? "404 - Nie znaleziono strony"
            : "Wystąpił błąd"
        }}
      </h1>
      <p v-if="error">
        {{
          error.message ||
          (error.statusCode === 404
            ? "Strona, której szukasz, nie istnieje."
            : "Nie można załadować artykułu.")
        }}
      </p>
      <p v-else>Nie znaleziono artykułu pod tym adresem.</p>
      <NuxtLink to="/" class="mt-6 inline-block text-accent hover:underline"
        >Wróć na stronę główną</NuxtLink
      >
    </div>

    <template v-else-if="page">
      <article 
        class="container mx-auto prose dark:prose-invert lg:prose-xl mx-auto bg-background-secondary p-6 mt-6 sm:p-8 md:p-2"
      >
        <header class="mb-8">
          <h1
            class="!text-3xl sm:!text-4xl lg:!text-5xl font-heading text-text-primary !mb-3 !leading-tight"
          >
            {{ page.title }}
          </h1>
          <div
            class="text-sm text-text-secondary font-sans flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4"
          >
            <span v-if="page.date"
              >Opublikowano: {{ formatDate(page.date) }}</span
            >
            <span v-if="page.author || page.meta?.author"
              >Autor: {{ page.author || page.meta?.author }}</span
            >
          </div>
          <img
            v-if="page.image"
            :src="page.image"
            :alt="
              page.image_alt ||
              page.meta?.image_alt ||
              page.title ||
              'Obrazek artykułu'
            "
            class="w-full aspect-[16/9] sm:aspect-[2/1] object-cover rounded-md mt-6 mb-4 shadow-md"
            loading="lazy"
            @error="onImageError"
          />
          <img
            v-else
            src="/images/AFERY.png"
            :alt="
              page.image_alt ||
              page.meta?.image_alt ||
              page.title ||
              'Domyślny obrazek artykułu'
            "
            class="w-full aspect-[16/9] sm:aspect-[2/1] object-cover rounded-md mt-6 mb-4 shadow-md"
            loading="lazy"
            @error="onImageError"
          />
        </header>
        <ContentRenderer v-if="page.body" :value="page" class="font-sans" :anchor-links="false" />
        <div class="flex items-stretch">
          <GoogleAds class="w-full h-full" />
        </div>
        <div
          v-if="page.tags && page.tags.length"
          class="mt-8 pt-6 border-t border-border-theme"
        >
          <h4 class="text-base font-semibold text-text-secondary mb-3">
            Tagi:
          </h4>
          <div class="flex flex-wrap gap-2">
            <NuxtLink
              v-for="tag in page.tags"
              :key="tag"
              :to="`/tag/${tag}`"
              class="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-text-secondary dark:text-slate-300 px-3 py-1 rounded-full text-xs transition-colors"
            >
              {{ tag }}
            </NuxtLink>
          </div>
          <div class="flex items-stretch mt-8">
            <GoogleAds class="w-full h-full" />
          </div>
        </div>
      </article>
      <div
        class="prose dark:prose-invert lg:prose-xl mx-auto bg-background-secondary rounded-lg shadow-lg"
      >
      <NewestPosts/>
      <PartnerPosts/>
    </div>
    </template>
  </div>
</template>

<script setup lang="ts">
// Importy pozostają podobne, ale usuwamy logikę `relatedPosts`
import { useRoute, createError } from "#app";
import { useAsyncData, useHead } from "#imports";

definePageMeta({
  layout: "blog",
});

// Definicja typu PageData - powinna być spójna z tą używaną w RelatedPosts.vue
// Najlepiej przenieść do ~/types/pagedata.ts i importować w obu miejscach.
interface PageMeta {
  author?: string;
  category?: string;
  image_alt?: string;
}
interface PageData {
  title: string;
  date?: string | Date;
  dateModified?: string | Date;
  author?: string;
  category?: string;
  image?: string;
  image_alt?: string;
  description?: string;
  tags?: string[];
  body?: any;
  meta?: PageMeta;
  _path?: string;
  path?: string;
  authorTwitterHandle?: string;
}

const route = useRoute();

const {
  data: page,
  pending,
  error,
} = await useAsyncData<PageData>(`page-${route.path}`, async () => {
  try {
    // @ts-ignore
    const result = await queryCollection("afery").path(route.path).first();
    if (!result) {
      throw createError({
        statusCode: 404,
        statusMessage: "Strona nie została znaleziona",
        fatal: true,
      });
    }
    return result as PageData;
  } catch (e: any) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.statusMessage || "Błąd ładowania strony",
      fatal: true,
    });
  }
});

// Pobieranie allPosts pozostaje w komponencie strony, ponieważ RelatedPosts oczekuje tego jako prop
const { data: allPosts } = await useAsyncData<PageData[]>(
  "all-blog-posts-for-related",
  () => {
    return queryCollection("blog").all();
  },
);

// Funkcja slugify (jeśli nie jest w globalnych utils, a jest potrzebna np. dla linku do kategorii w headerze)
const slugify = (text: string = ""): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const formatDate = (dateInput?: string | Date): string => {
  if (!dateInput) return "";
  const dateObject =
    typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(dateObject.getTime())) return "Nieprawidłowa data";
  return dateObject.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  if (!target.src.includes("/images/fallbacks/image-error.png")) {
    target.src = "/images/fallbacks/image-error.png";
  }
};

// Logika SEO (useHead) pozostaje bez zmian (jak w poprzedniej odpowiedzi)
// ... (wklej tutaj całą sekcję useHead)
// Dla skrótu, nie wklejam jej ponownie, ale powinna tu być cała logika useHead
// Pamiętaj o definicji siteUrl, blogName etc.

const siteUrl = "https://moodzik.pl"; // ZASTĄP!
const blogName = "Moodzik"; // ZASTĄP!
const defaultSocialImage ="/images/AFERY.png";
const blogLogoUrl = "/images/logo.png";

if (error.value && error.value.statusCode !== 404) {
  useHead({
    title: `Błąd | ${blogName}`,
    htmlAttrs: { lang: "pl" },
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  });
} else if (!page.value && !pending.value) {
  useHead({
    title: `404 - Nie znaleziono strony | ${blogName}`,
    htmlAttrs: { lang: "pl" },
    meta: [{ name: "robots", content: "noindex, follow" }],
  });
} else if (page.value) {
  const pageUrl = `${siteUrl}${route.path}`;
  const effectiveImageForSocial = page.value.image || defaultSocialImage;
  const socialImageUrlAbsolute = effectiveImageForSocial.startsWith("http")
    ? effectiveImageForSocial
    : `${siteUrl}${effectiveImageForSocial}`;

  const descriptionContent =
    page.value.description ||
    `Przeczytaj artykuł ${page.value.title} na ${blogName}. ${page.value.category ? "Kategoria: " + page.value.category : ""}`;
  const pageTitle = `${page.value.title} | ${blogName}`;
  const imageAltContent =
    page.value.image_alt ||
    page.value.meta?.image_alt ||
    page.value.title ||
    "Obrazek artykułu";
  const authorName = page.value.author || page.value.meta?.author || blogName;

  useHead({
    title: pageTitle,
    htmlAttrs: { lang: "pl" },
    meta: [
      { name: "description", content: descriptionContent },
      { property: "og:title", content: page.value.title },
      { property: "og:description", content: descriptionContent },
      { property: "og:image", content: socialImageUrlAbsolute },
      { property: "og:image:alt", content: imageAltContent },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: pageUrl },
      { property: "og:type", content: "article" },
      { property: "og:locale", content: "pl_PL" },
      { property: "og:site_name", content: blogName },
      {
        property: "article:published_time",
        content: page.value.date
          ? new Date(page.value.date).toISOString()
          : undefined,
      },
      {
        property: "article:modified_time",
        content: page.value.dateModified
          ? new Date(page.value.dateModified).toISOString()
          : page.value.date
            ? new Date(page.value.date).toISOString()
            : undefined,
      },
      { property: "article:author", content: authorName },
      { property: "article:section", content: page.value.category },
      ...(page.value.tags
        ? page.value.tags.map((tag) => ({
            property: "article:tag",
            content: tag,
          }))
        : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: page.value.title },
      { name: "twitter:description", content: descriptionContent },
      { name: "twitter:image", content: socialImageUrlAbsolute },
      { name: "twitter:image:alt", content: imageAltContent },
    ],
    link: [{ rel: "canonical", href: pageUrl }],
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
          headline: page.value.title,
          image: [socialImageUrlAbsolute],
          datePublished: page.value.date
            ? new Date(page.value.date).toISOString()
            : undefined,
          dateModified: page.value.dateModified
            ? new Date(page.value.dateModified).toISOString()
            : page.value.date
              ? new Date(page.value.date).toISOString()
              : undefined,
          author: {
            "@type":
              page.value.author || page.value.meta?.author
                ? "Person"
                : "Organization",
            name: authorName,
          },
          publisher: {
            "@type": "Organization",
            name: blogName,
            logo: {
              "@type": "ImageObject",
              url: `${siteUrl}${blogLogoUrl}`,
              width: 600,
              height: 60,
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
