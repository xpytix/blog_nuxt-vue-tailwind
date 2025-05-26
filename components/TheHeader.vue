<template>
  <header class="bg-background-secondary shadow-md sticky top-0 z-40">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <NuxtLink to="/"
        class="text-2xl font-bold uppercase font-heading text-text-primary hover:text-accent transition-colors">
        Moodzik.pl
      </NuxtLink>

      <nav class="hidden md:block">
        
        <ul class="flex space-x-4 lg:space-x-6 items-center">          
          <li v-for="category in categories" :key="category.slug">
            <NuxtLink :to="`/${category.slug}`"
              class="text-text-secondary hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
              active-class="text-primary bg-primary/10">
              {{ category.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="md:hidden">
        <button @click="toggleMobileMenu"
          class="text-text-primary focus:outline-none p-2 rounded-md hover:bg-primary/10" aria-label="Otwórz menu">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="isMobileMenuOpen"
      class="md:hidden fixed inset-0 z-50 bg-background-primary/95 backdrop-blur-sm flex flex-col items-center justify-center p-6"
      @click.self="closeMobileMenu">
      <button @click="closeMobileMenu"
        class="absolute top-4 right-4 text-text-primary focus:outline-none p-2 rounded-md hover:bg-primary/10"
        aria-label="Zamknij menu">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-7 h-7">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <nav class="flex flex-col items-center space-y-6">
        <NuxtLink to="/" @click="closeMobileMenu"
          class="text-2xl font-heading text-text-primary hover:text-primary transition-colors"
          _comment="Dodałem font-heading również tutaj" active-class="text-primary font-semibold">
          Strona Główna
        </NuxtLink>
        <NuxtLink v-for="category in categories" :key="category.slug" :to="`/${category.slug}`" @click="closeMobileMenu"
          class="text-2xl font-heading text-text-primary hover:text-primary transition-colors"
          _comment="Dodałem font-heading również tutaj" active-class="text-primary font-semibold">
          {{ category.name }}
        </NuxtLink>
      </nav>
<!-- 
        <p class="mt-12 text-sm text-text-secondary font-sans" _comment="Upewniłem się, że ten tekst używa font-sans">
        Moodzik &copy; {{ new Date().getFullYear() }}
      </p> -->

      <ThemeSwitcher class="mt-4" />

    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
// Zakładając, że ThemeSwitcher.vue jest w tym samym katalogu co Header.vue
// Jeśli jest w components/ ThemeSwitcher.vue, a Header.vue też jest w components/,
// Nuxt 3 powinien go automatycznie zaimportować, jeśli masz auto-import włączony.
// W przeciwnym razie, dostosuj ścieżkę lub upewnij się, że jest auto-importowany.
// W Twoim kodzie miałeś explicite import, co jest OK.
import ThemeSwitcher from "./ThemeSwitcher.vue"; // Ścieżka może wymagać korekty

const categories = ref([
  { name: "Biznes", slug: "biznes" },
  { name: "Afery", slug: "afery" },
  { name: "Sporty", slug: "sporty" },
  { name: "Spoko Praca", slug: "praca" },
]);

const isMobileMenuOpen = ref(false);
const route = useRoute();

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

watch(isMobileMenuOpen, (isOpen) => {
  if (process.client) {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
});

watch(
  () => route.path,
  () => {
    if (isMobileMenuOpen.value) {
      closeMobileMenu();
    }
  }
);
</script>

<style scoped>
.sticky {
  position: sticky;
}

/* Możesz zostawić puste, jeśli nie potrzebujesz dodatkowych styli */
</style>