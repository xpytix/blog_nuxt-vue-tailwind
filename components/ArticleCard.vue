<script setup lang="ts">
import { computed } from "vue"; // Upewnij się, że computed jest zaimportowane
import type { Article } from "~/types/article"; // Dostosuj ścieżkę

const props = defineProps<{
  article: Article;
}>();

const formatDate = (dateValue: string | Date | undefined): string => {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  return date.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const category = computed(() => {
  if (props.article && props.article.path) {
    return props.article.path.split("/").filter(Boolean)[0] || "";
  }
  return "";
});

const categoryBackgroundClass = computed(() => {
  const categoryValue = category.value;
  switch (categoryValue) {
    case "afery":
      return "bg-red-600";
    case "biznes":
      return "bg-accent"; // Zielony akcent
    case "sporty":
      return "bg-sky-600";
    default:
      return "bg-gray-500";
  }
});

const categoryGradientClass = computed(() => {
  const categoryValue = category.value;
  // Użyjemy przezroczystości /60 dla gradientu, możesz to dostosować
  switch (categoryValue) {
    case "afery":
      return "from-red-600/60";
    case "biznes":
      return "from-accent/60";
    case "sporty":
      return "from-sky-600/60";
    default:
      return "from-gray-500/60"; // Domyślny gradient
  }
});

// Nowa właściwość obliczeniowa dla domyślnego obrazka zależnego od kategorii
const defaultImageSrc = computed(() => {
  const categoryValue = category.value;
  switch (categoryValue) {
    case "afery":
      return "/images/AFERY.png"; // Dostosuj ścieżkę
    case "biznes":
      return "/images/BIZNES.png"; // Dostosuj ścieżkę
    case "sporty":
      return "/images/SPORT.png"; // Dostosuj ścieżkę
    default:
      return "/images/AFERY.png"; // Domyślna ścieżka, jeśli kategoria nie pasuje lub brak
  }
});
</script>

<template>
  <div
    class="bg-background-primary w-full shadow-lg rounded-lg overflow-hidden h-full flex flex-col"
  >
    <NuxtLink :to="article.path" class="block">
      <div class="relative">
        <NuxtImg
          v-if="article.image"
          :src="article.image"
          class="w-full h-48 object-cover"
          loading="lazy"
          :alt="article.title || 'Obraz artykułu'"
        />
        <NuxtImg
          v-else
          :src="defaultImageSrc"
          class="w-full h-48 object-cover"
          loading="lazy"
          alt="Domyślny obraz artykułu"
        />
        <div
          :class="[
            'absolute inset-0 bg-gradient-to-t to-transparent',
            categoryGradientClass, // Dynamiczna klasa gradientu
          ]"
        ></div>
      </div>
    </NuxtLink>
    <div class="p-6 flex flex-col flex-grow">
      <NuxtLink class="hover:text-primary transition-colors" :to="article.path">
        <h3 class="text-xl font-bold mb-2 text-text-primary">
          {{ article.title || "Brak tytułu" }}
        </h3>
      </NuxtLink>
      <div class="flex place-content-between items-center mt-auto">
        <div>
          <NuxtLink
            :to="`/${category}`"
            :class="[
              'text-xs text-text-on-accent px-2 py-1 rounded-full hover:bg-opacity-80 transition-colors',
              categoryBackgroundClass, // Dynamiczna klasa tła
            ]"
          >
            {{ category.toUpperCase() }}
          </NuxtLink>
          
        </div>

        <div class="text-xs text-text-secondary">
          <span
            class="text-xs text-primary px-2 py-1 rounded-full font-semibold"
            v-if="article.isPartnerContent"
          > {{ article.isPartnerContent }} 
          </span>
          <span v-if="article.date">{{ formatDate(article.date) }}</span>
    
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose a,
h3 {  
  text-decoration: none;
  color: rgb(var(--color-text-primary));
}
</style>
