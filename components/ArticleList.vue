<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="pending && itemsToDisplay.length === 0" class="text-center py-10 text-text-secondary">
      Ładowanie artykułów...
    </div>
    <div v-else-if="error" class="text-center py-10 text-red-500">
      <p>Wystąpił błąd podczas ładowania artykułów.</p>
      <pre class="mt-2 text-xs text-left bg-slate-100 dark:bg-slate-800 p-2 rounded overflow-auto">{{ error }}</pre>
    </div>
    <div v-else-if="itemsToDisplay.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
      <template v-for="item in itemsToDisplay" :key="item.id">
        <div v-if="item.type === 'article' && item.data" class="flex">
          <ArticleCard :article="item.data" />
        </div>
        <div v-else-if="item.type === 'ad'" class="flex items-stretch">
          <GoogleAds class="w-full h-full" />
        </div>
      </template>
    </div>
    <div v-else class="text-center py-10 text-text-secondary">
      Nie znaleziono żadnych artykułów.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface PostFromQueryCollection {
  id: string | number;
  path: string;
  title: string;
  description?: string;
  image?: string;
  image_alt?: string; // Dodajemy image_alt, jeśli ArticleCard go potrzebuje
  category?: string;  // Już było
  date?: string;
  author?: string;    // <-- DODAJEMY AUTORA
  _path?: string;
}

// Interfejs dla propsów oczekiwanych przez ArticleCard
interface ArticleCardProps {
  title?: string;
  description?: string;
  image?: string;
  image_alt?: string; // <-- DODAJEMY image_alt
  category?: string;  // Już było
  date?: string;
  author?: string;    // <-- DODAJEMY AUTORA
  _path?: string;
}

interface DisplayItem {
  type: 'article' | 'ad';
  id: string;
  data?: ArticleCardProps;
}


const { data: postsFromQuery, pending, error } = await useAsyncData<PostFromQueryCollection[]>(
  'blog-collection-with-author-cat', 
  async () => {
    try {
      const result = await queryCollection('blog').limit(8).all();
      return result || [];
    } catch (e: any) {
      console.error('[useAsyncData] BŁĄD w queryCollection:', e.message, e);
      return [];
    }
  }
);

const mapPostToArticleCardData = (post: PostFromQueryCollection): ArticleCardProps => {
  return {
    title: post.title,
    description: post.description,
    image: post.image,
    image_alt: post.image_alt || post.title, // Fallback dla image_alt
    category: post.category,
    date: post.date,
    author: post.author, // <-- MAPUJEMY AUTORA
    _path: post._path || post.path,
  };
};

const itemsToDisplay = computed<DisplayItem[]>(() => {
  if (pending.value && (!postsFromQuery.value || postsFromQuery.value.length === 0)) {
    return [];
  }
  if (!postsFromQuery.value || postsFromQuery.value.length === 0) {
    return [];
  }

  const articles = postsFromQuery.value;
  const newItems: DisplayItem[] = [];
  let adIndex = 0;

  articles.forEach((post, index) => {
    if (!post.path && !post._path) {
      console.warn(`[itemsToDisplay] Pomijam post (id: ${post.id}) z powodu braku path lub _path.`);
      return;
    }
    newItems.push({ 
      type: 'article', 
      id: post.id?.toString() || post._path || post.path,
      data: mapPostToArticleCardData(post) 
    });

    // Twoja logika wstawiania reklam: co drugi wpis (A1, A2, Ad, A3, A4, Ad ...)
    // Jeśli chcesz "co trzeci" (A1, A2, A3, Ad...), zmień (index + 1) % 2 na (index + 1) % 3
    if ((index + 1) % 2 === 0 && (index + 1) < articles.length) {
      newItems.push({ type: 'ad', id: `ad-${adIndex++}` });
    }
  });
  return newItems;
});

</script>