<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const rawTag = route.params.tag as string || ''
const decodedTag = decodeURIComponent(rawTag).toLowerCase().trim()

const { data: allPosts } = await useAsyncData('all-blog-posts', () =>
  queryCollection('blog').all()
)

const data = computed(() =>
  (allPosts.value || []).filter(post =>
    post.tags?.some((tag: string) => tag.toLowerCase() === decodedTag)
  )
)
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Wpisy z tagiem: "{{ decodedTag }}"</h1>

    <div v-if="data.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
      <ArticleCard v-for="item in data" :key="item.id" :article="item" />
    </div>

    <p v-else class="text-text-secondary">Brak wpisów z tym tagiem.</p>
  </div>
</template>
