<template>
  
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold text-center my-8">Mój Super Blog PoC</h1>



    <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="article in articles"
        :key="article._path"
        class="bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <NuxtLink :to="article._path">
          <img
            v-if="article.image"
            :src="article.image"
            :alt="article.title"
            class="w-full h-48 object-cover"
          />
          <div
            v-else
            class="w-full h-48 bg-gray-300 flex items-center justify-center"
          >
            <span class="text-gray-500">Brak obrazka</span>
          </div>
        </NuxtLink>
        <div class="p-6">
          <NuxtLink :to="`/kategoria/${article.category.toLowerCase()}`">
            <span class="text-sm text-blue-500 uppercase font-semibold">{{
              article.category
            }}</span>
          </NuxtLink>
          <NuxtLink :to="article._path">
            <h2 class="text-2xl font-bold my-2 hover:text-blue-700">
              {{ article.title }}
            </h2>
          </NuxtLink>
          <p class="text-gray-700 text-base mb-4">
            {{ article.description }}
          </p>
          <NuxtLink
            :to="article._path"
            class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Czytaj więcej
          </NuxtLink>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Mój Super Blog PoC - Strona Główna",
  meta: [
    {
      name: "description",
      content:
        "Blog demonstracyjny stworzony z Nuxt.js, Tailwind CSS i Nuxt Content",
    },
  ],



});




</script>

<style scoped>
/* Możesz tu dodać style specyficzne dla tej strony, jeśli Tailwind nie wystarczy */
</style>
