<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
      <template v-for="item in page" :key="item.id">
          <ArticleCard :article="item" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";


const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  console.log(`[pages/kategoria/...slug.vue] Próba wykonania queryCollection dla path: ${route.path}`);
    console.log(queryCollection('blog')
    .where('category', '=', route.params.slug)
    .all());
    
  return queryCollection('blog')
    .where('category', '=', route.params.slug)
    .all()
});
</script>
