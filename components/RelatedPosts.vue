// components/RelatedPosts.vue
<template>
  <section
    v-if="processedRelatedPosts.length > 0"
    class="max-w-5xl mx-auto mt-16 py-8 px-4 sm:px-6 lg:px-8"
  >
    <h2
      class="text-2xl sm:text-3xl font-heading text-text-primary mb-8 text-center sm:text-left"
    >
      Więcej podobnych
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
      <ArticleCard
        v-for="relatedArticle in processedRelatedPosts"
        :key="relatedArticle._path"
        :article="relatedArticle"
      />
    </div>
  </section>
  <section
    v-else-if="!initialCheckFailed"
    class="max-w-5xl mx-auto mt-16 py-8 px-4 sm:px-6 lg:px-8"
  >
    <p class="text-center text-text-secondary">
      Obecnie brak podobnych artykułów do wyświetlenia.
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"; // Dodaj ref dla initialCheckFailed
import ArticleCard from "~/components/ArticleCard.vue";
import type { PageData } from "~/types/PageData";
// Upewnij się, że ten typ jest poprawnie zdefiniowany i pasuje do struktury Twoich danych
const props = defineProps<{
  currentArticle: PageData | null | undefined;
  allPosts: PageData[] | null | undefined;
  maxRelatedPosts?: number;
}>();

const initialCheckFailed = ref(false); // Flaga do debugowania

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

const processedRelatedPosts = computed<PageData[]>(() => {
  console.log("[RelatedPosts START] Obliczanie processedRelatedPosts...");
  console.log(
    "[RelatedPosts Props] currentArticle:",
    props.currentArticle
      ? JSON.parse(JSON.stringify(props.currentArticle))
      : props.currentArticle,
  );
  console.log(
    "[RelatedPosts Props] allPosts (długość):",
    props.allPosts ? props.allPosts.length : "null/undefined",
  );
  if (props.allPosts && props.allPosts.length > 0) {
    console.log(
      "[RelatedPosts Props] allPosts[0] (przykład):",
      JSON.parse(JSON.stringify(props.allPosts[0])),
    );
  }

  const limit = props.maxRelatedPosts || 3;

  if (!props.allPosts || props.allPosts.length === 0) {
    console.warn(
      "[RelatedPosts Logic] HALT: Brak `props.allPosts` lub `props.allPosts` jest puste. Zwracam [].",
    );
    initialCheckFailed.value = true;
    return [];
  }
  initialCheckFailed.value = false; // Reset flagi, jeśli allPosts jest OK

  let finalRelatedPosts: PageData[] = [];

  // Krok 1: Wyszukiwanie po tagach
  if (
    props.currentArticle &&
    props.currentArticle.tags &&
    props.currentArticle.tags.length > 0 &&
    typeof props.currentArticle._path === "string"
  ) {
    const currentArticlePath = props.currentArticle._path;
    const currentArticleTagsSlugs = props.currentArticle.tags.map((tag) =>
      slugify(tag),
    );

    console.log(
      "[RelatedPosts Logic Krok 1] Tagi bieżącego artykułu (slugified):",
      currentArticleTagsSlugs,
    );
    console.log(
      "[RelatedPosts Logic Krok 1] Ścieżka bieżącego artykułu:",
      currentArticlePath,
    );

    const tagBasedCandidates = props.allPosts
      .filter(
        (
          post,
        ): post is PageData & {
          _path: string;
          tags: string[];
          date?: string | Date;
          commonTagsCount?: number;
        } => {
          const isValidCandidate =
            !!post &&
            typeof post._path === "string" &&
            post._path !== currentArticlePath &&
            Array.isArray(post.tags) &&
            post.tags.length > 0;
          // if(!isValidCandidate && post) console.log(`[RelatedPosts DEBUG] Odrzucony kandydat w 1. filtrze: ${post?._path}`);
          return isValidCandidate;
        },
      )
      .map((post) => {
        const postTagsSlugs = post.tags!.map((tag) => slugify(tag)); // ! jest bezpieczne dzięki filtrowi powyżej
        const commonTagsCount = postTagsSlugs.filter((tagSlug) =>
          currentArticleTagsSlugs.includes(tagSlug),
        ).length;
        return { ...post, commonTagsCount };
      })
      .filter((post) => post.commonTagsCount > 0)
      .sort((a, b) => {
        if (b.commonTagsCount !== a.commonTagsCount) {
          return b.commonTagsCount - a.commonTagsCount;
        }
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        if (isNaN(dateA) && isNaN(dateB)) return 0;
        if (isNaN(dateA)) return 1;
        if (isNaN(dateB)) return -1;
        return dateB - dateA;
      });

    finalRelatedPosts = tagBasedCandidates;
    console.log(
      `[RelatedPosts Logic Krok 1] Znaleziono ${finalRelatedPosts.length} postów na podstawie tagów.`,
    );
    if (finalRelatedPosts.length > 0)
      console.log(
        "[RelatedPosts Logic Krok 1] Posty po tagach (ścieżki i liczba wspólnych tagów):",
        JSON.parse(
          JSON.stringify(
            finalRelatedPosts.map((p) => ({
              _path: p._path,
              commonTags: p.commonTagsCount,
            })),
          ),
        ),
      );
  } else {
    console.log(
      "[RelatedPosts Logic Krok 1] Pominięto wyszukiwanie po tagach (brak currentArticle, tagów w nim, lub _path).",
    );
  }

  // Krok 2: Uzupełnianie najnowszymi, jeśli potrzeba
  const postsNeeded = limit - finalRelatedPosts.length;
  console.log(
    `[RelatedPosts Logic Krok 2] Potrzeba ${postsNeeded} dodatkowych postów (limit: ${limit}, znaleziono po tagach: ${finalRelatedPosts.length}).`,
  );

  if (postsNeeded > 0) {
    const existingPaths = new Set<string>();
    if (
      props.currentArticle?._path &&
      typeof props.currentArticle._path === "string"
    ) {
      existingPaths.add(props.currentArticle._path);
    }
    finalRelatedPosts.forEach((p) => {
      if (p._path && typeof p._path === "string") existingPaths.add(p._path);
    });
    console.log(
      "[RelatedPosts Logic Krok 2] Ścieżki do wykluczenia (bieżący + znalezione po tagach):",
      Array.from(existingPaths),
    );

    const recentFallbackCandidates = props.allPosts
      .filter(
        (post): post is PageData & { _path: string; date?: string | Date } =>
          !!post &&
          typeof post._path === "string" &&
          !existingPaths.has(post._path),
      )
      .sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        if (isNaN(dateA) && isNaN(dateB)) return 0;
        if (isNaN(dateA)) return 1;
        if (isNaN(dateB)) return -1;
        return dateB - dateA;
      })
      .slice(0, postsNeeded);

    console.log(
      `[RelatedPosts Logic Krok 2] Znaleziono ${recentFallbackCandidates.length} postów jako fallback (najnowsze).`,
    );
    if (recentFallbackCandidates.length > 0)
      console.log(
        "[RelatedPosts Logic Krok 2] Posty fallback (ścieżki):",
        JSON.parse(
          JSON.stringify(recentFallbackCandidates.map((p) => p._path)),
        ),
      );

    finalRelatedPosts = [...finalRelatedPosts, ...recentFallbackCandidates];
  }

  const result = finalRelatedPosts.slice(0, limit);
  console.log(
    `[RelatedPosts Logic ZAKOŃCZENIE] Ostateczna liczba postów do wyświetlenia: ${result.length}.`,
  );
  if (result.length > 0)
    console.log(
      "[RelatedPosts Logic ZAKOŃCZENIE] Ostateczne posty (ścieżki):",
      JSON.parse(JSON.stringify(result.map((p) => p._path))),
    );

  return result;
});
</script>
