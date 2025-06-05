<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
      <template v-for="item in newItems" :key="item.id">
        <div v-if="item.type === 'article' && item.data" class="flex">
          <ArticleCard :article="item.data" />
        </div>
        <div v-else-if="item.type === 'ad'" class="flex items-stretch">
          <GoogleAds class="w-full h-full" />
        </div>
        
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Article } from "~/types/article";

interface DisplayItem {
  type: "article" | "ad";
  id: string;
  data?: Article;
  pending: boolean;
  error: any;
}

const props = defineProps<{
  articlesData: Article[] | null | undefined;
  pending: boolean;
  error: any;
  adsEveryNth?: number;
}>();

const articles = props.articlesData || [];
const newItems: DisplayItem[] = [];
let adIndex = 0;
const adsInterval =
  props.adsEveryNth && props.adsEveryNth > 0 ? props.adsEveryNth : 2;

articles.forEach((post, index) => {
  newItems.push({
    type: "article",
    id: post._id,
    data: post,
    pending: false,
    error: undefined,
  });

  if ((index +1) % adsInterval === 0 && index + 1 < articles.length) {
    newItems.push({
      type: "ad",
      id: `ad-${adIndex++}`,
      pending: false,
      error: undefined,
    });
  }

  return newItems;
});
</script>
